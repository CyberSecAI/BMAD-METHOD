#!/usr/bin/env python3
"""
Quality Issues Test App - Main Module

This application intentionally contains code quality issues for testing
the code-quality-checker sub-agent. It includes production blockers,
structure issues, and maintainability problems.

WARNING: This code has intentional quality issues and should NOT be used in production!
"""

import os
import sys,json,requests  # Multiple imports on one line - PEP 8 violation
import sqlite3
from flask import Flask, request, render_template, session
import hashlib

app = Flask(__name__)

# PRODUCTION BLOCKER 1: Hardcoded secret key
app.secret_key = "hardcoded_secret_key_123"

# PRODUCTION BLOCKER 2: TODO comment
# TODO: Replace this with proper configuration management

# PRODUCTION BLOCKER 3: Debug flag enabled
DEBUG_MODE = True

def init_database():
    # PRODUCTION BLOCKER 4: Debug print statement
    print("Initializing database...")  # Remove before production
    
    conn = sqlite3.connect('test.db')
    cursor = conn.cursor()
    
    # STRUCTURE ISSUE 1: Long function (this will exceed 50 lines total)
    cursor.execute("""
        CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY,
            username TEXT UNIQUE,
            email TEXT,
            password TEXT,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            is_active BOOLEAN DEFAULT 1,
            role TEXT DEFAULT 'user',
            last_login TIMESTAMP,
            failed_login_attempts INTEGER DEFAULT 0,
            locked_until TIMESTAMP,
            profile_picture TEXT,
            bio TEXT,
            phone_number TEXT,
            address TEXT,
            city TEXT,
            state TEXT,
            zip_code TEXT,
            country TEXT DEFAULT 'US',
            timezone TEXT DEFAULT 'UTC',
            language TEXT DEFAULT 'en',
            notifications_enabled BOOLEAN DEFAULT 1,
            email_verified BOOLEAN DEFAULT 0,
            phone_verified BOOLEAN DEFAULT 0,
            two_factor_enabled BOOLEAN DEFAULT 0,
            backup_codes TEXT,
            subscription_tier TEXT DEFAULT 'free',
            subscription_expires TIMESTAMP,
            api_key TEXT,
            api_calls_remaining INTEGER DEFAULT 1000,
            last_api_call TIMESTAMP,
            preferences TEXT,
            metadata TEXT
        )
    """)
    
    cursor.execute("""
        CREATE TABLE IF NOT EXISTS products (
            id INTEGER PRIMARY KEY,
            name TEXT NOT NULL,
            description TEXT,
            price DECIMAL(10,2),
            category_id INTEGER,
            sku TEXT UNIQUE,
            inventory_count INTEGER DEFAULT 0,
            weight DECIMAL(8,2),
            dimensions TEXT,
            color TEXT,
            size TEXT,
            brand TEXT,
            model TEXT,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            is_active BOOLEAN DEFAULT 1,
            is_featured BOOLEAN DEFAULT 0,
            discount_percentage DECIMAL(5,2) DEFAULT 0,
            tags TEXT,
            image_urls TEXT,
            review_count INTEGER DEFAULT 0,
            average_rating DECIMAL(3,2) DEFAULT 0
        )
    """)
    
    # Insert test data with hardcoded values
    cursor.execute("INSERT OR IGNORE INTO users (username, password, email) VALUES (?, ?, ?)",
                   ("admin", "password123", "admin@test.com"))  # PRODUCTION BLOCKER: Hardcoded password
    
    conn.commit()
    conn.close()
    
    # PRODUCTION BLOCKER 5: More debug prints
    print("Database initialization complete")

# LANGUAGE ISSUE 1: Missing docstring for public function
def process_user_data(data):
    # MAINTAINABILITY ISSUE 1: Single letter variable
    r = []
    
    # STRUCTURE ISSUE 2: No error handling for external operations
    response = requests.get("https://api.example.com/validate")
    validation_result = response.json()
    
    # MAINTAINABILITY ISSUE 2: Complex logic without comments
    for i in data:
        if isinstance(i, dict) and 'user_id' in i and 'email' in i:
            if '@' in i['email'] and '.' in i['email'].split('@')[1]:
                if len(i['email']) > 5 and len(i['email']) < 100:
                    if validation_result.get('status') == 'ok':
                        temp_user = {
                            'id': i['user_id'],
                            'email': i['email'],
                            'processed': True,
                            'timestamp': __import__('datetime').datetime.now()
                        }
                        r.append(temp_user)
    
    return r

# STRUCTURE ISSUE 3: Function with too many parameters (>7)
def create_user_profile(username, email, password, first_name, last_name, phone, address, city, state, zip_code, country, bio):
    # LANGUAGE ISSUE 2: No type hints
    # LANGUAGE ISSUE 3: Missing docstring
    
    # STRUCTURE ISSUE 4: Missing error handling
    conn = sqlite3.connect('test.db')
    cursor = conn.cursor()
    
    # PRODUCTION BLOCKER 6: SQL injection vulnerability (also a security issue)
    query = f"INSERT INTO users (username, email, password, first_name, last_name, phone, address, city, state, zip_code, country, bio) VALUES ('{username}', '{email}', '{password}', '{first_name}', '{last_name}', '{phone}', '{address}', '{city}', '{state}', '{zip_code}', '{country}', '{bio}')"
    cursor.execute(query)
    
    conn.commit()
    conn.close()
    
    # PRODUCTION BLOCKER 7: Debug print with sensitive data
    print(f"Created user: {username} with password: {password}")

@app.route('/')
def home():
    # STRUCTURE ISSUE 5: Unused variable
    unused_variable = "This is never used"
    
    return '<h1>Quality Issues Test App</h1><a href="/users">View Users</a>'

@app.route('/users')
def list_users():
    # STRUCTURE ISSUE 6: No error handling for database operations
    conn = sqlite3.connect('test.db')
    cursor = conn.cursor()
    cursor.execute("SELECT * FROM users")
    users = cursor.fetchall()
    conn.close()
    
    # MAINTAINABILITY ISSUE 3: Inline HTML instead of templates
    html = "<h2>Users:</h2><ul>"
    for u in users:  # MAINTAINABILITY ISSUE 4: Non-descriptive variable name
        html += f"<li>{u[1]} - {u[2]}</li>"
    html += "</ul>"
    
    return html

# PRODUCTION BLOCKER 8: Commented out code block
# def old_authentication_method(username, password):
#     # This was the old way of doing authentication
#     if username == "admin" and password == "admin123":
#         return True
#     return False
# 
# def deprecated_hash_function(password):
#     return hashlib.md5(password.encode()).hexdigest()

# LANGUAGE ISSUE 4: Global variable usage
current_user = None

def authenticate_user(username, password):
    global current_user  # LANGUAGE ISSUE 5: Global variable modification
    
    # STRUCTURE ISSUE 7: No input validation
    # STRUCTURE ISSUE 8: No error handling
    conn = sqlite3.connect('test.db')
    cursor = conn.cursor()
    
    # More SQL injection vulnerability
    query = f"SELECT * FROM users WHERE username='{username}' AND password='{password}'"
    cursor.execute(query)
    user = cursor.fetchone()
    
    if user:
        current_user = user
        # PRODUCTION BLOCKER 9: Debug print in authentication
        print(f"User {username} authenticated successfully")  # Security risk + quality issue
        return True
    
    return False

# STRUCTURE ISSUE 9: Duplicate code pattern (similar to list_users)
@app.route('/products')
def list_products():
    # No error handling again
    conn = sqlite3.connect('test.db')
    cursor = conn.cursor()
    cursor.execute("SELECT * FROM products")
    products = cursor.fetchall()
    conn.close()
    
    # Same inline HTML pattern
    html = "<h2>Products:</h2><ul>"
    for p in products:  # Same non-descriptive variable
        html += f"<li>{p[1]} - ${p[3]}</li>"
    html += "</ul>"
    
    return html

if __name__ == '__main__':
    init_database()
    
    # PRODUCTION BLOCKER 10: Debug mode enabled in main
    app.run(debug=True, host='0.0.0.0', port=5000)  # Also a security risk