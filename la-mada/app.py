import os

from cs50 import SQL
from datetime import datetime
from flask import Flask, current_app, flash, redirect, render_template, request, session
from flask_session import Session
from tempfile import mkdtemp
from werkzeug.security import check_password_hash, generate_password_hash

from helpers import login_required, kes

app = Flask(__name__)

app.jinja_env.filters["kes"] = kes

app.config["SESSION_PERMANENT"] = False
app.config["SESSION_TYPE"] = "filesystem"
Session(app)

db = SQL("sqlite:///la-mada.db")


@app.after_request
def after_request(response):
    response.headers["Cache-Control"] = "no-cache, no-store, must-revalidate"
    response.headers["Expires"] = 0
    response.headers["Pragma"] = "no-cache"
    return response


@app.context_processor
def user_details():
    if request.path == "/login":
        return {}
    row = db.execute(
        "SELECT first_name, last_name, role FROM users WHERE id = ?", session["user_id"]
    )
    return dict(user=row[0])


@app.route("/")
@login_required
def index():
    user = db.execute("SELECT role from users WHERE id = ?", session["user_id"])
    bookings = db.execute("SELECT * FROM bookings ORDER BY id DESC LIMIT 5")
    if user[0]["role"] == "receptionist":
        return render_template("reception.html", bookings=bookings)
    return render_template("admin.html", bookings=bookings)


@app.route("/login", methods=["GET", "POST"])
def login():
    error = None
    session.clear()
    if request.method == "POST":
        rows = db.execute(
            "SELECT * FROM users WHERE email = ?", request.form.get("email")
        )
        if len(rows) != 1 or not check_password_hash(
            rows[0]["password"], request.form.get("password")
        ):
            error = "Invalid Username or Password"
        else:
            session["user_id"] = rows[0]["id"]
            flash("Successfully Logged In")
            return redirect("/")
    return render_template("login.html", error=error)


@app.route("/logout")
def logout():
    session.clear()
    return redirect("/login")


@app.route("/rooms", methods=["GET", "POST"])
@login_required
def rooms():
    rows = db.execute("SELECT room_number, type, rate, status FROM rooms")
    user = db.execute("SELECT role from users WHERE id = ?", session["user_id"])
    if user[0]["role"] == "receptionist":
        return render_template("recep-room.html", rooms=rows)
    return render_template("rooms.html", rooms=rows)


@app.route("/register-room", methods=["GET", "POST"])
@login_required
def register_room():
    if request.method == "POST":
        type = request.form.get("room-type")
        rate = request.form.get("rate")
        room_number = request.form.get("room-number").lower()
        rows = db.execute("SELECT room_number FROM rooms")
        for row in rows:
            if row["room_number"] == room_number:
                flash("Room Already Exists")
                return redirect("/rooms")
        db.execute(
            "INSERT INTO rooms (type, rate, room_number) VALUES (?, ?, ?)",
            type,
            rate,
            room_number,
        )
        flash("Successfuly Added Room")
        return redirect("/rooms")
    else:
        return redirect("/")


@app.route("/staff", methods=["GET", "POST"])
@login_required
def staff():
    rows = db.execute(
        "SELECT id, first_name, last_name, email, role FROM users ORDER BY role"
    )
    return render_template("staff.html", employees=rows)


@app.route("/register-employee", methods=["GET", "POST"])
@login_required
def register_employee():
    if request.method == "POST":
        first_name = request.form.get("first").lower()
        last_name = request.form.get("last").lower()
        email = request.form.get("email").lower()
        role = request.form.get("role").lower()
        password = (first_name + last_name).lower()
        password = generate_password_hash(password)
        db.execute(
            "INSERT INTO users (email, first_name, last_name, role, password) VALUES(?,?,?,?,?)",
            email,
            first_name,
            last_name,
            role,
            password,
        )
        return redirect("/staff")
    else:
        return render_template("add-staff.html")


@app.route("/update-employee", methods=["GET", "POST"])
@login_required
def update_employee():
    if request.method == "POST":
        id = request.form.get("employee-id")
        first_name = request.form.get("first-name").lower()
        last_name = request.form.get("second-name").lower()
        role = request.form.get("role").lower()
        email = request.form.get("email")
        password = (first_name + last_name).lower()
        password = generate_password_hash(password)

        db.execute(
            "UPDATE users SET email=?, first_name=?, last_name=?, role=?, password=? WHERE id=?",
            email,
            first_name,
            last_name,
            role,
            password,
            id,
        )
        return redirect("/staff")
    else:
        return render_template("staff.html")


@app.route("/allocate-room", methods=["GET", "POST"])
@login_required
def allocate_room():
    if request.method == "POST":
        customer_phone = request.form.get("customer-phone")
        customer_name = request.form.get("customer-name")
        room_number = request.form.get("bk-rm-number")
        room_type = request.form.get("bk-rm-type")
        check_in = request.form.get("check-in")
        check_out = request.form.get("check-out-date")
        amount_paid = request.form.get("bk-rm-rate")

        db.execute(
            "INSERT INTO bookings( customer_phone,customer_name,room_number,room_type, check_in,check_out,amount_paid) VALUES(?, ?,?, ?, ?, ?, ?)",
            customer_phone,
            customer_name,
            room_number,
            room_type,
            check_in,
            check_out,
            amount_paid,
        )

        db.execute("UPDATE rooms SET status=0 WHERE room_number=?", room_number)
        message = {
            "message": "Thank you for booking with La Mada",
            "name": customer_name,
            "room": room_number.upper(),
            "time": datetime.now().strftime("%H:%M"),
            "date": datetime.now().strftime("%b,%d,%Y"),
            "check-in": check_in,
            "check-out": check_out,
            "amount": amount_paid,
        }

        return render_template("receipt.html", message=message)
    else:
        return redirect("/")


@app.route("/check-out", methods=["GET", "POST"])
@login_required
def check_out():
    if request.method == "POST":
        room_number = request.form.get("check-out-rm")
        db.execute("UPDATE rooms SET status=1 where room_number =?", room_number)
        return redirect("/rooms")
    return


@app.route("/history")
@login_required
def booking_history():
    rows = db.execute("SELECT * FROM bookings")
    rows.reverse()
    return render_template("history.html", bookings=rows)
