# Python Secure Coding Guidelines

## Overview

This guide provides comprehensive security guidance for Python development, covering common vulnerabilities, secure coding practices, and recommended security libraries and tools.

## Input Validation and Sanitization

### User Input Validation

```python
# ❌ Dangerous - No validation
def process_user_id(user_id):
    return f"User ID: {user_id}"

# ✅ Secure - Proper validation
import re

def process_user_id(user_id):
    # Validate format (alphanumeric, max 20 chars)
    if not re.match(r'^[a-zA-Z0-9]{1,20}$', str(user_id)):
        raise ValueError("Invalid user ID format")
    return f"User ID: {user_id}"
```

### File Path Validation

```python
# ❌ Dangerous - Path traversal vulnerability
import os

def read_file(filename):
    with open(f"uploads/{filename}", 'r') as f:
        return f.read()

# ✅ Secure - Path validation
import os
import os.path

def read_file(filename):
    # Sanitize filename
    filename = os.path.basename(filename)
    safe_path = os.path.join("uploads", filename)

    # Ensure path is within allowed directory
    if not os.path.abspath(safe_path).startswith(os.path.abspath("uploads")):
        raise ValueError("Invalid file path")

    with open(safe_path, 'r') as f:
        return f.read()
```

## SQL Injection Prevention

### Database Queries

```python
# ❌ Dangerous - SQL injection vulnerability
import sqlite3

def get_user(user_id):
    conn = sqlite3.connect('database.db')
    cursor = conn.cursor()
    # Never concatenate user input directly
    cursor.execute(f"SELECT * FROM users WHERE id = {user_id}")
    return cursor.fetchone()

# ✅ Secure - Parameterized queries
def get_user(user_id):
    conn = sqlite3.connect('database.db')
    cursor = conn.cursor()
    # Use parameterized queries
    cursor.execute("SELECT * FROM users WHERE id = ?", (user_id,))
    return cursor.fetchone()

# ✅ Also secure - Using SQLAlchemy ORM
from sqlalchemy.orm import sessionmaker
from sqlalchemy import text

def get_user_orm(session, user_id):
    # ORM prevents SQL injection
    return session.query(User).filter(User.id == user_id).first()

    # For raw SQL, use text() with parameters
    result = session.execute(text("SELECT * FROM users WHERE id = :user_id"),
                           {"user_id": user_id})
    return result.fetchone()
```

## Command Injection Prevention

### System Commands

```python
# ❌ Dangerous - Command injection vulnerability
import os
import subprocess

def ping_host(hostname):
    # Never use shell=True with user input
    os.system(f"ping -c 1 {hostname}")

def convert_file(filename):
    # Shell injection possible
    subprocess.call(f"convert {filename} output.jpg", shell=True)

# ✅ Secure - Safe command execution
import subprocess
import shlex

def ping_host(hostname):
    # Validate hostname format
    if not re.match(r'^[a-zA-Z0-9.-]+$', hostname):
        raise ValueError("Invalid hostname")

    # Use subprocess with list of arguments
    result = subprocess.run(['ping', '-c', '1', hostname],
                          capture_output=True, text=True, timeout=10)
    return result.stdout

def convert_file(filename):
    # Validate filename
    if not os.path.basename(filename) == filename:
        raise ValueError("Invalid filename")

    # Use argument list instead of shell
    subprocess.run(['convert', filename, 'output.jpg'], check=True)
```

## Cross-Site Scripting (XSS) Prevention

### Template Rendering

```python
# ❌ Dangerous - XSS vulnerability in Jinja2
from jinja2 import Template

def render_message(user_message):
    template = Template('<p>Message: {{ message|safe }}</p>')
    return template.render(message=user_message)

# ✅ Secure - Proper escaping
from jinja2 import Template
from markupsafe import escape

def render_message(user_message):
    # Jinja2 auto-escapes by default, don't use |safe
    template = Template('<p>Message: {{ message }}</p>')
    return template.render(message=user_message)

# For manual escaping
def render_message_manual(user_message):
    escaped_message = escape(user_message)
    return f'<p>Message: {escaped_message}</p>'
```

### JSON Output

```python
# ❌ Dangerous - Potential XSS in JSON
import json

def user_data_json(user_data):
    # Raw JSON in HTML context can be dangerous
    return f'<script>var userData = {json.dumps(user_data)};</script>'

# ✅ Secure - Proper JSON escaping
import json
import html

def user_data_json(user_data):
    # Escape JSON for HTML context
    json_data = json.dumps(user_data)
    escaped_json = html.escape(json_data)
    return f'<script>var userData = {escaped_json};</script>'

# ✅ Better - Use proper template engine
def user_data_template(user_data):
    template = Template('<script>var userData = {{ data|tojson }};</script>')
    return template.render(data=user_data)
```

## Cryptography and Password Security

### Password Hashing

```python
# ❌ Dangerous - Weak hashing
import hashlib

def hash_password_weak(password):
    # MD5/SHA1 are not suitable for passwords
    return hashlib.md5(password.encode()).hexdigest()

# ✅ Secure - Using bcrypt
import bcrypt

def hash_password(password):
    # Generate salt and hash password
    salt = bcrypt.gensalt()
    hashed = bcrypt.hashpw(password.encode('utf-8'), salt)
    return hashed

def verify_password(password, hashed):
    return bcrypt.checkpw(password.encode('utf-8'), hashed)

# ✅ Also secure - Using Argon2
from argon2 import PasswordHasher
from argon2.exceptions import VerifyMismatchError

ph = PasswordHasher()

def hash_password_argon2(password):
    return ph.hash(password)

def verify_password_argon2(password, hashed):
    try:
        ph.verify(hashed, password)
        return True
    except VerifyMismatchError:
        return False
```

### Encryption

```python
# ❌ Dangerous - Weak encryption
from Crypto.Cipher import DES

def encrypt_weak(data, key):
    # DES is deprecated and insecure
    cipher = DES.new(key, DES.MODE_ECB)
    return cipher.encrypt(data)

# ✅ Secure - Using Fernet (symmetric encryption)
from cryptography.fernet import Fernet

def generate_key():
    return Fernet.generate_key()

def encrypt_data(data, key):
    f = Fernet(key)
    encrypted = f.encrypt(data.encode())
    return encrypted

def decrypt_data(encrypted_data, key):
    f = Fernet(key)
    decrypted = f.decrypt(encrypted_data)
    return decrypted.decode()

# ✅ Secure - Using AES with proper mode
from cryptography.hazmat.primitives.ciphers import Cipher, algorithms, modes
from cryptography.hazmat.primitives import padding
import os

def encrypt_aes(data, key):
    # Generate random IV
    iv = os.urandom(16)

    # Pad data to block size
    padder = padding.PKCS7(128).padder()
    padded_data = padder.update(data.encode()) + padder.finalize()

    # Encrypt
    cipher = Cipher(algorithms.AES(key), modes.CBC(iv))
    encryptor = cipher.encryptor()
    encrypted = encryptor.update(padded_data) + encryptor.finalize()

    return iv + encrypted  # Prepend IV to encrypted data
```

## Secure Random Number Generation

### Random Values

```python
# ❌ Dangerous - Predictable random numbers
import random

def generate_token_weak():
    # Python's random module is not cryptographically secure
    return str(random.randint(100000, 999999))

# ✅ Secure - Cryptographically secure random
import secrets
import string

def generate_token():
    # Use secrets module for cryptographic operations
    return secrets.token_urlsafe(32)

def generate_password(length=12):
    alphabet = string.ascii_letters + string.digits + "!@#$%^&*"
    return ''.join(secrets.choice(alphabet) for _ in range(length))

def generate_session_id():
    return secrets.token_hex(32)
```

## Deserialization Security

### Pickle Security

```python
# ❌ Dangerous - Arbitrary code execution via pickle
import pickle

def load_user_data(data):
    # Never unpickle untrusted data
    return pickle.loads(data)

# ✅ Secure - Use safe serialization formats
import json

def load_user_data_safe(data):
    try:
        # JSON is safe from code execution
        return json.loads(data)
    except json.JSONDecodeError:
        raise ValueError("Invalid JSON data")

# For complex data, use restricted unpickling
import pickle
import io

class RestrictedUnpickler(pickle.Unpickler):
    def find_class(self, module, name):
        # Only allow safe classes
        if module == "builtins" and name in ("list", "dict", "str", "int", "float"):
            return getattr(__builtins__, name)
        # Allow specific safe classes
        if module == "datetime" and name == "datetime":
            import datetime
            return datetime.datetime
        raise pickle.UnpicklingError(f"global '{module}.{name}' is forbidden")

def safe_pickle_loads(data):
    return RestrictedUnpickler(io.BytesIO(data)).load()
```

## File Upload Security

### Secure File Handling

```python
# ❌ Dangerous - File upload vulnerabilities
import os

def upload_file(file, filename):
    # No validation - dangerous
    with open(f"uploads/{filename}", 'wb') as f:
        f.write(file.read())

# ✅ Secure - Comprehensive file validation
import os
import magic
from PIL import Image

ALLOWED_EXTENSIONS = {'.jpg', '.jpeg', '.png', '.gif', '.pdf', '.txt'}
MAX_FILE_SIZE = 5 * 1024 * 1024  # 5MB

def upload_file_secure(file, filename):
    # Validate file extension
    file_ext = os.path.splitext(filename)[1].lower()
    if file_ext not in ALLOWED_EXTENSIONS:
        raise ValueError("File type not allowed")

    # Check file size
    file.seek(0, 2)  # Seek to end
    file_size = file.tell()
    file.seek(0)  # Reset to beginning

    if file_size > MAX_FILE_SIZE:
        raise ValueError("File too large")

    # Validate file content matches extension
    file_content = file.read()
    file.seek(0)

    mime_type = magic.from_buffer(file_content, mime=True)
    if not is_valid_mime_type(mime_type, file_ext):
        raise ValueError("File content doesn't match extension")

    # Generate safe filename
    safe_filename = generate_safe_filename(filename)
    upload_path = os.path.join("uploads", safe_filename)

    # Ensure path is within uploads directory
    if not os.path.abspath(upload_path).startswith(os.path.abspath("uploads")):
        raise ValueError("Invalid upload path")

    # Save file
    with open(upload_path, 'wb') as f:
        f.write(file_content)

    return safe_filename

def generate_safe_filename(filename):
    # Remove dangerous characters and limit length
    safe_chars = "-_.() abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"
    safe_filename = ''.join(c for c in filename if c in safe_chars)
    return safe_filename[:100]  # Limit length
```

## Session Management

### Secure Sessions

```python
# ❌ Dangerous - Insecure session handling
import hashlib
import time

def create_session_weak(user_id):
    # Predictable session ID
    session_id = hashlib.md5(f"{user_id}{time.time()}".encode()).hexdigest()
    sessions[session_id] = user_id
    return session_id

# ✅ Secure - Proper session management
import secrets
import hashlib
import hmac
from datetime import datetime, timedelta

class SecureSession:
    def __init__(self, secret_key):
        self.secret_key = secret_key
        self.sessions = {}

    def create_session(self, user_id):
        # Generate cryptographically secure session ID
        session_id = secrets.token_urlsafe(32)

        # Set expiration time
        expires_at = datetime.utcnow() + timedelta(hours=2)

        # Store session data
        self.sessions[session_id] = {
            'user_id': user_id,
            'created_at': datetime.utcnow(),
            'expires_at': expires_at,
            'csrf_token': secrets.token_urlsafe(32)
        }

        return session_id

    def validate_session(self, session_id):
        if session_id not in self.sessions:
            return None

        session = self.sessions[session_id]

        # Check expiration
        if datetime.utcnow() > session['expires_at']:
            del self.sessions[session_id]
            return None

        return session

    def generate_csrf_token(self, session_id):
        session = self.validate_session(session_id)
        if not session:
            return None
        return session['csrf_token']

    def validate_csrf_token(self, session_id, token):
        session = self.validate_session(session_id)
        if not session:
            return False
        return hmac.compare_digest(session['csrf_token'], token)
```

## Error Handling and Logging

### Secure Error Handling

```python
# ❌ Dangerous - Information disclosure
import traceback

def process_request(data):
    try:
        # Process data
        result = risky_operation(data)
        return {"success": True, "data": result}
    except Exception as e:
        # Never expose internal errors to users
        return {"error": str(e), "traceback": traceback.format_exc()}

# ✅ Secure - Safe error handling
import logging
import uuid

logger = logging.getLogger(__name__)

def process_request(data):
    request_id = str(uuid.uuid4())

    try:
        result = risky_operation(data)
        return {"success": True, "data": result}
    except ValidationError as e:
        # User-facing validation errors are safe to show
        logger.warning(f"Request {request_id}: Validation error: {e}")
        return {"error": "Invalid input provided"}
    except Exception as e:
        # Log full error details internally
        logger.error(f"Request {request_id}: Unexpected error", exc_info=True)
        # Return generic error to user
        return {"error": "An unexpected error occurred", "request_id": request_id}
```

## XML Processing Security

### XML External Entity (XXE) Prevention

```python
# ❌ Dangerous - XXE vulnerability
import xml.etree.ElementTree as ET

def parse_xml_unsafe(xml_data):
    # Default parser is vulnerable to XXE
    root = ET.fromstring(xml_data)
    return root

# ✅ Secure - XXE prevention
import xml.etree.ElementTree as ET
from xml.parsers.expat import ParserCreate

def parse_xml_safe(xml_data):
    # Create parser with XXE protection
    parser = ParserCreate()
    parser.DefaultHandler = lambda data: None
    parser.ExternalEntityRefHandler = lambda *args: False

    # Use defusedxml for additional protection
    try:
        import defusedxml.ElementTree as ET_safe
        root = ET_safe.fromstring(xml_data)
        return root
    except ImportError:
        # Fallback: disable external entity processing
        parser = ET.XMLParser()
        parser.parser.DefaultHandler = lambda data: None
        parser.parser.ExternalEntityRefHandler = lambda *args: False
        root = ET.fromstring(xml_data, parser)
        return root
```

## Security Headers and Configuration

### Flask Security Configuration

```python
# ✅ Secure Flask configuration
from flask import Flask
from flask_talisman import Talisman

app = Flask(__name__)

# Security headers
Talisman(app,
    force_https=True,
    strict_transport_security=True,
    content_security_policy={
        'default-src': "'self'",
        'script-src': "'self' 'unsafe-inline'",
        'style-src': "'self' 'unsafe-inline'",
        'img-src': "'self' data:",
    }
)

# Secure session configuration
app.config.update(
    SECRET_KEY=os.environ.get('SECRET_KEY', secrets.token_urlsafe(32)),
    SESSION_COOKIE_SECURE=True,
    SESSION_COOKIE_HTTPONLY=True,
    SESSION_COOKIE_SAMESITE='Lax',
    PERMANENT_SESSION_LIFETIME=timedelta(hours=2)
)
```

## Security Testing

### Unit Tests for Security

```python
import unittest
from unittest.mock import patch

class SecurityTests(unittest.TestCase):

    def test_sql_injection_prevention(self):
        # Test that SQL injection attempts are blocked
        malicious_input = "1'; DROP TABLE users; --"
        result = get_user(malicious_input)
        self.assertIsNone(result)

    def test_xss_prevention(self):
        # Test XSS prevention
        malicious_script = "<script>alert('XSS')</script>"
        result = render_message(malicious_script)
        self.assertNotIn("<script>", result)
        self.assertIn("&lt;script&gt;", result)

    def test_path_traversal_prevention(self):
        # Test path traversal prevention
        with self.assertRaises(ValueError):
            read_file("../../../etc/passwd")

    def test_password_hashing(self):
        password = "test_password"
        hashed = hash_password(password)

        # Verify password can be verified
        self.assertTrue(verify_password(password, hashed))

        # Verify wrong password fails
        self.assertFalse(verify_password("wrong_password", hashed))

        # Verify hash is not predictable
        hashed2 = hash_password(password)
        self.assertNotEqual(hashed, hashed2)
```

## Common Python Security Libraries

### Essential Security Libraries

```python
# Cryptography
from cryptography.fernet import Fernet
from cryptography.hazmat.primitives import hashes, serialization
from cryptography.hazmat.primitives.asymmetric import rsa, padding

# Password hashing
import bcrypt
from argon2 import PasswordHasher

# XML security
import defusedxml.ElementTree as ET

# Input validation
import validators
import bleach

# Security headers (Flask)
from flask_talisman import Talisman

# CSRF protection (Django)
from django.middleware.csrf import CsrfViewMiddleware

# Rate limiting
from flask_limiter import Limiter

# SQL injection prevention
from sqlalchemy import text  # For parameterized queries
```

## Security Checklist for Python Code

### Pre-deployment Security Review

- [ ] All user inputs are validated and sanitized
- [ ] Database queries use parameterized statements
- [ ] Passwords are hashed with bcrypt/Argon2
- [ ] Cryptographically secure random numbers are used
- [ ] File uploads are properly validated
- [ ] XML processing is protected against XXE
- [ ] Error messages don't leak sensitive information
- [ ] Security headers are configured
- [ ] Sessions are managed securely
- [ ] CSRF protection is implemented
- [ ] Dependencies are up to date and scanned for vulnerabilities
- [ ] Logging captures security events
- [ ] No hardcoded secrets in code
- [ ] Input validation covers all attack vectors
- [ ] Output encoding prevents XSS

### Tools and Static Analysis

- **Bandit**: Security linter for Python
- **Safety**: Dependency vulnerability scanner
- **Semgrep**: Static analysis for security patterns
- **PyUp**: Dependency monitoring
- **Snyk**: Vulnerability scanning
- **OWASP Dependency Check**: Dependency vulnerability scanner
