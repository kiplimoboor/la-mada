import os

from cs50 import SQL
from flask import Flask, current_app, flash, redirect, render_template, request, session
from flask_session import Session
from tempfile import mkdtemp
from werkzeug.security import check_password_hash, generate_password_hash

from helpers import login_required

app = Flask(__name__)


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

    return render_template("index.html")


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
        flash("Successfuly Added New Employee")
        return redirect("/staff")
    else:
        return redirect("/")


@app.route("/staff", methods=["GET", "POST"])
@login_required
def staff():
    id = session["user_id"]
    rows = db.execute("SELECT id, first_name, last_name, role FROM users")
    return render_template("staff.html", employees=rows)
