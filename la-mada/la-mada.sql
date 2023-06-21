CREATE TABLE IF NOT EXISTS 'users' (
    'id' INTEGER PRIMARY KEY AUTOINCREMENT,
    'email' VARCHAR(50) NOT NULL,
    'first_name' CHAR(50),
    'last_name' CHAR(50),
    'role' CHAR(50),
    'password' VARCHAR
);
CREATE TABLE IF NOT EXISTS 'rooms' (
    'id' INTEGER PRIMARY KEY AUTOINCREMENT,
    'type' CHAR(30) NOT NULL,
    'status' BIT NOT NULL DEFAULT 1,
    'rate' INTEGER NOT NULL,
    'room_number' CHAR(30) NOT NULL
);
CREATE TABLE IF NOT EXISTS 'bookings'(
    'id' INTEGER PRIMARY KEY AUTOINCREMENT,
    'customer_phone' VARCHAR (12) NOT NULL,
    'customer_name' VARCHAR (50) NOT NULL,
    'room_number' CHAR(30) NOT NULL,
    'check_in' DATE NOT NULL,
    'check_out' DATE NOT NULL,
    'amount_paid' INTEGER NOUT NULL
);
INSERT INTO bookings (
        customer_phone,
        customer_name,
        room_number,
        check_in,
        check_out,
        amount_paid
    )
VALUES(
        '0705630032',
        'kiplimo boor',
        'g1',
        '2023-10-12',
        '2023-9-12',
        '2000'
    );