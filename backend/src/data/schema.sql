DROP DATABASE IF EXISTS expense_tracker;
CREATE DATABASE expense_tracker;
USE expense_tracker;

CREATE TABLE users (
    user_id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE categories (
    category_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    category_name VARCHAR(100) NOT NULL,
    category_type VARCHAR(20) NOT NULL,
    UNIQUE(user_id, category_name),
    FOREIGN KEY (user_id)
        REFERENCES users(user_id)
);

CREATE TABLE transactions (
    transaction_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    category_id INT NOT NULL,
    amount DECIMAL(10,2) NOT NULL CHECK (amount > 0),
    transaction_type VARCHAR(20) NOT NULL,
    description VARCHAR(255),
    transaction_date DATE NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id)
        REFERENCES users(user_id),
    FOREIGN KEY (category_id)
        REFERENCES categories(category_id)
);

CREATE TABLE budgets (
    budget_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    category_id INT,
    budget_amount DECIMAL(10,2) NOT NULL CHECK (budget_amount > 0),
    start_date DATE NOT NULL,
    end_date DATE NOT NULL,
    FOREIGN KEY (user_id)
        REFERENCES users(user_id),
    FOREIGN KEY (category_id)
        REFERENCES categories(category_id),
    CHECK (end_date >= start_date)
);

CREATE TABLE shared_expenses (
    shared_expense_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    title VARCHAR(150) NOT NULL,
    total_amount DECIMAL(10,2) NOT NULL CHECK (total_amount > 0),
    description VARCHAR(255),
    expense_date DATE NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id)
        REFERENCES users(user_id)
);

CREATE TABLE shared_expense_members (
    shared_member_id INT AUTO_INCREMENT PRIMARY KEY,
    shared_expense_id INT NOT NULL,
    member_name VARCHAR(100) NOT NULL,
    amount_owed DECIMAL(10,2) NOT NULL CHECK (amount_owed >= 0),
    paid_status BOOLEAN DEFAULT FALSE,
    FOREIGN KEY (shared_expense_id)
        REFERENCES shared_expenses(shared_expense_id)
);

INSERT INTO users
(name, email, password_hash)
VALUES
('Alex Johnson', 'alex@example.com', 'temporary_password');

INSERT INTO categories
(user_id, category_name, category_type)
VALUES
(1,'Food & Dining','expense'),
(1,'Transportation','expense'),
(1,'Housing','expense'),
(1,'Entertainment','expense'),
(1,'Health','expense'),
(1,'Shopping','expense'),
(1,'Education','expense'),
(1,'Salary','income'),
(1,'Pension','income'),
(1,'Travel','expense');
