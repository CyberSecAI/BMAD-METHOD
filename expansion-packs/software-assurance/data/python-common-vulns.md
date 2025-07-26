# Python Common Vulnerabilities Database

## Overview

This database catalogs common security vulnerabilities found in Python applications, organized by vulnerability category with examples, detection methods, and remediation guidance. Content is mapped to NIST SSDF practices for compliance validation.

**NIST SSDF Practice Mapping**: This document supports RV.1 (Identify and Confirm Vulnerabilities) and PW.4 (Secure Coding Practices) validation

## Injection Vulnerabilities

### SQL Injection (CWE-89)

**NIST SSDF Practice**: PW.4.1 - Source Code Security Implementation  
**NIST Impact**: Violation of secure coding practices for database operations

**Description**: Occurs when untrusted input is inserted into SQL queries without proper sanitization.

**Common Patterns**:

```python
# String formatting
cursor.execute("SELECT * FROM users WHERE id = %s" % user_id)

# f-strings
cursor.execute(f"SELECT * FROM users WHERE id = {user_id}")

# String concatenation
query = "SELECT * FROM users WHERE name = '" + username + "'"
```

**Detection Indicators**:

- Direct string concatenation in SQL queries
- Use of `%` operator or f-strings with user input
- Dynamic query construction without parameterization
- ORM queries with raw SQL and string formatting

**Remediation**:

```python
# Use parameterized queries
cursor.execute("SELECT * FROM users WHERE id = ?", (user_id,))

# ORM with bound parameters
session.query(User).filter(User.id == user_id).first()
```

**CVSS Score**: 9.8 (Critical)
**CWE**: CWE-89

### Command Injection (CWE-78)

**NIST SSDF Practice**: PW.4.1 - Source Code Security Implementation  
**NIST Impact**: Violation of secure coding practices for system command execution

**Description**: Execution of arbitrary commands through unsanitized input to system calls.

**Common Patterns**:

```python
# os.system with user input
os.system(f"ping {hostname}")

# subprocess with shell=True
subprocess.call(f"ls {directory}", shell=True)

# eval/exec with user input
eval(user_expression)
```

**Detection Indicators**:

- Use of `os.system()` with user input
- `subprocess` calls with `shell=True`
- `eval()`, `exec()`, or `compile()` with untrusted input
- String concatenation in system commands

**Remediation**:

```python
# Use argument lists instead of shell commands
subprocess.run(['ping', '-c', '1', hostname])

# Validate input before system calls
if re.match(r'^[a-zA-Z0-9.-]+$', hostname):
    subprocess.run(['ping', '-c', '1', hostname])
```

**CVSS Score**: 9.8 (Critical)
**CWE**: CWE-78

### NoSQL Injection (CWE-943)

**Description**: Injection attacks against NoSQL databases like MongoDB.

**Common Patterns**:

```python
# MongoDB query injection
db.users.find({"username": username, "password": password})

# When username = {"$ne": ""} and password = {"$ne": ""}
# Results in: db.users.find({"username": {"$ne": ""}, "password": {"$ne": ""}})
```

**Detection Indicators**:

- Direct insertion of user input into NoSQL queries
- Lack of input type validation for NoSQL operations
- Use of operators like `$where`, `$regex` with user input

**Remediation**:

```python
# Validate input types and values
if not isinstance(username, str) or not isinstance(password, str):
    raise ValueError("Invalid input type")

# Use proper query structure
db.users.find({"username": username, "password": hashed_password})
```

**CVSS Score**: 8.1 (High)
**CWE**: CWE-943

## Cross-Site Scripting (XSS)

### Reflected XSS (CWE-79)

**NIST SSDF Practice**: PW.4.1 - Source Code Security Implementation  
**NIST Impact**: Violation of secure coding practices for output encoding

**Description**: User input is reflected back in the response without proper encoding.

**Common Patterns**:

```python
# Direct output without escaping
return f"<p>Hello {username}</p>"

# Template with |safe filter
template.render(message=user_input|safe)

# Manual HTML construction
html = "<div>" + user_input + "</div>"
```

**Detection Indicators**:

- Direct concatenation of user input in HTML responses
- Use of `|safe` filter in templates with user input
- Manual HTML construction with unescaped user data
- Lack of Content Security Policy headers

**Remediation**:

```python
# Use template auto-escaping (default in most frameworks)
template = Template("<p>Hello {{ username }}</p>")

# Manual escaping when needed
from markupsafe import escape
safe_output = escape(user_input)
```

**CVSS Score**: 6.1 (Medium)
**CWE**: CWE-79

### Stored XSS (CWE-79)

**Description**: Malicious scripts stored in database and executed when viewed by other users.

**Common Patterns**:

```python
# Storing unvalidated user input
db.execute("INSERT INTO posts (content) VALUES (?)", (user_content,))

# Later retrieving and displaying without escaping
post = db.execute("SELECT content FROM posts WHERE id = ?", (post_id,))
return f"<div>{post['content']}</div>"
```

**Detection Indicators**:

- User input stored without validation or sanitization
- Database content displayed without proper encoding
- Rich text editors without proper sanitization
- File uploads that allow HTML content

**Remediation**:

```python
# Sanitize input before storage
import bleach
clean_content = bleach.clean(user_content, tags=['p', 'br', 'strong', 'em'])

# Always escape on output
from markupsafe import escape
return f"<div>{escape(post['content'])}</div>"
```

**CVSS Score**: 7.2 (High)
**CWE**: CWE-79

## Insecure Deserialization

### Pickle Deserialization (CWE-502)

**NIST SSDF Practice**: PW.4.1 - Source Code Security Implementation  
**NIST Impact**: Critical violation of secure coding practices for data serialization

**Description**: Arbitrary code execution through deserializing untrusted pickle data.

**Common Patterns**:

```python
# Deserializing user-provided data
data = pickle.loads(request.data)

# Loading pickle files from untrusted sources
with open(user_uploaded_file, 'rb') as f:
    obj = pickle.load(f)

# Redis/cache with pickle serialization
cached_data = pickle.loads(redis.get(key))
```

**Detection Indicators**:

- Use of `pickle.loads()` or `pickle.load()` with external data
- Caching systems using pickle serialization
- Inter-process communication using pickle
- API endpoints accepting serialized data

**Remediation**:

```python
# Use safe serialization formats
import json
data = json.loads(request.data)

# For complex objects, use restricted unpickling
class SafeUnpickler(pickle.Unpickler):
    def find_class(self, module, name):
        if module in ['builtins', 'datetime'] and name in SAFE_CLASSES:
            return getattr(sys.modules[module], name)
        raise pickle.UnpicklingError(f"global '{module}.{name}' is forbidden")
```

**CVSS Score**: 9.8 (Critical)  
**CWE**: CWE-502

### YAML Deserialization (CWE-502)

**Description**: Code execution through YAML deserialization of untrusted data.

**Common Patterns**:

```python
# Using yaml.load() with untrusted input
config = yaml.load(user_config_file)

# Loading YAML from HTTP requests
data = yaml.load(request.body)
```

**Detection Indicators**:

- Use of `yaml.load()` instead of `yaml.safe_load()`
- YAML parsing of user-provided data
- Configuration files loaded from untrusted sources

**Remediation**:

```python
# Use safe_load for untrusted data
config = yaml.safe_load(user_config_file)

# Or specify safe loader explicitly
data = yaml.load(request.body, Loader=yaml.SafeLoader)
```

**CVSS Score**: 9.8 (Critical)
**CWE**: CWE-502

## Cryptographic Failures

### Weak Password Hashing (CWE-327)

**NIST SSDF Practice**: PW.4.1 - Source Code Security Implementation  
**NIST Impact**: Violation of cryptographic implementation requirements

**Description**: Use of weak or inappropriate hashing algorithms for passwords.

**Common Patterns**:

```python
# Using MD5 or SHA1 for passwords
password_hash = hashlib.md5(password.encode()).hexdigest()

# Plain SHA256 without salt
password_hash = hashlib.sha256(password.encode()).hexdigest()

# Custom weak hashing
def weak_hash(password):
    return str(hash(password))
```

**Detection Indicators**:

- Use of MD5, SHA1, or unsalted SHA256 for passwords
- Custom hashing implementations
- Lack of salt in password hashing
- Fast hashing algorithms for password storage

**Remediation**:

```python
# Use bcrypt with proper cost factor
import bcrypt
password_hash = bcrypt.hashpw(password.encode(), bcrypt.gensalt(rounds=12))

# Or Argon2 (recommended)
from argon2 import PasswordHasher
ph = PasswordHasher()
password_hash = ph.hash(password)
```

**CVSS Score**: 7.5 (High)
**CWE**: CWE-327

### Weak Random Number Generation (CWE-330)

**Description**: Use of predictable random number generators for security purposes.

**Common Patterns**:

```python
# Using random module for security
import random
session_id = str(random.randint(100000, 999999))

# Time-based tokens
import time
token = str(int(time.time()))

# Predictable UUID
import uuid
api_key = str(uuid.uuid1())  # Based on MAC address and time
```

**Detection Indicators**:

- Use of `random` module for security tokens
- Time-based token generation
- Predictable patterns in generated values
- Use of `uuid.uuid1()` for security purposes

**Remediation**:

```python
# Use cryptographically secure random
import secrets
session_id = secrets.token_urlsafe(32)

# For UUIDs, use uuid4 (random)
import uuid
api_key = str(uuid.uuid4())

# Generate secure passwords
def generate_password(length=16):
    alphabet = string.ascii_letters + string.digits + "!@#$%^&*"
    return ''.join(secrets.choice(alphabet) for _ in range(length))
```

**CVSS Score**: 7.5 (High)
**CWE**: CWE-330

## Path Traversal Vulnerabilities

### Directory Traversal (CWE-22)

**Description**: Access to files outside intended directory through path manipulation.

**Common Patterns**:

```python
# Direct file access with user input
file_path = f"uploads/{filename}"
with open(file_path, 'r') as f:
    content = f.read()

# URL-based file serving
@app.route('/files/<path:filename>')
def serve_file(filename):
    return send_file(f"static/{filename}")
```

**Detection Indicators**:

- Direct concatenation of user input in file paths
- Lack of path validation or canonicalization
- File serving endpoints without path restrictions
- Use of `../` sequences in user input

**Remediation**:

```python
# Validate and sanitize file paths
import os
def safe_file_access(filename):
    # Remove path components and restrict to current directory
    safe_name = os.path.basename(filename)
    full_path = os.path.join("uploads", safe_name)

    # Ensure path is within allowed directory
    if not os.path.abspath(full_path).startswith(os.path.abspath("uploads")):
        raise ValueError("Invalid file path")

    return full_path
```

**CVSS Score**: 7.5 (High)
**CWE**: CWE-22

## Authentication and Session Management

### Session Fixation (CWE-384)

**Description**: Attacker fixes user's session ID before authentication.

**Common Patterns**:

```python
# Not regenerating session ID after login
def login(username, password):
    if authenticate(username, password):
        session['user_id'] = username
        return "Login successful"

# Predictable session IDs
def create_session():
    session_id = hashlib.md5(f"{user_id}{time.time()}".encode()).hexdigest()
    return session_id
```

**Detection Indicators**:

- Session ID not regenerated after authentication
- Predictable session ID generation
- Lack of session validation
- Long session lifetimes

**Remediation**:

```python
# Regenerate session ID after authentication
def login(username, password):
    if authenticate(username, password):
        session.regenerate_id()  # Flask: session.permanent = True
        session['user_id'] = username
        return "Login successful"

# Use cryptographically secure session IDs
import secrets
def create_session():
    return secrets.token_urlsafe(32)
```

**CVSS Score**: 6.8 (Medium)
**CWE**: CWE-384

### Insufficient Session Expiration (CWE-613)

**Description**: Sessions that don't expire or have excessively long lifetimes.

**Common Patterns**:

```python
# Sessions without expiration
sessions[session_id] = {'user_id': user_id}

# Very long session lifetimes
SESSION_TIMEOUT = 86400 * 365  # 1 year

# No session cleanup
def validate_session(session_id):
    return sessions.get(session_id)
```

**Detection Indicators**:

- Sessions without expiration times
- Extremely long session lifetimes
- No session cleanup mechanisms
- Lack of idle timeout

**Remediation**:

```python
# Implement proper session expiration
from datetime import datetime, timedelta

def create_session(user_id):
    session_id = secrets.token_urlsafe(32)
    sessions[session_id] = {
        'user_id': user_id,
        'created_at': datetime.utcnow(),
        'last_accessed': datetime.utcnow(),
        'expires_at': datetime.utcnow() + timedelta(hours=2)
    }
    return session_id

def validate_session(session_id):
    session = sessions.get(session_id)
    if not session:
        return None

    # Check expiration
    if datetime.utcnow() > session['expires_at']:
        del sessions[session_id]
        return None

    # Update last accessed time
    session['last_accessed'] = datetime.utcnow()
    return session
```

**CVSS Score**: 5.3 (Medium)
**CWE**: CWE-613

## File Upload Vulnerabilities

### Unrestricted File Upload (CWE-434)

**Description**: Allowing upload of dangerous file types without proper validation.

**Common Patterns**:

```python
# No file type validation
def upload_file(file):
    file.save(f"uploads/{file.filename}")

# Client-side validation only
def upload_image(file):
    if file.filename.endswith('.jpg'):
        file.save(f"uploads/{file.filename}")

# Trusting MIME type headers
def upload_document(file):
    if file.content_type == 'application/pdf':
        file.save(f"uploads/{file.filename}")
```

**Detection Indicators**:

- No server-side file type validation
- Relying on file extensions or MIME types only
- Allowing executable file types
- No file size limits

**Remediation**:

```python
import magic
from PIL import Image

ALLOWED_EXTENSIONS = {'.jpg', '.jpeg', '.png', '.pdf', '.txt'}
MAX_FILE_SIZE = 5 * 1024 * 1024  # 5MB

def secure_upload(file):
    # Check file extension
    ext = os.path.splitext(file.filename)[1].lower()
    if ext not in ALLOWED_EXTENSIONS:
        raise ValueError("File type not allowed")

    # Check file size
    file.seek(0, 2)
    if file.tell() > MAX_FILE_SIZE:
        raise ValueError("File too large")
    file.seek(0)

    # Validate file content
    file_content = file.read()
    mime_type = magic.from_buffer(file_content, mime=True)

    if not is_safe_mime_type(mime_type, ext):
        raise ValueError("File content mismatch")

    # Generate safe filename
    safe_filename = secrets.token_urlsafe(16) + ext
    save_path = os.path.join("uploads", safe_filename)

    with open(save_path, 'wb') as f:
        f.write(file_content)

    return safe_filename
```

**CVSS Score**: 8.8 (High)
**CWE**: CWE-434

## XML Processing Vulnerabilities

### XML External Entity (XXE) (CWE-611)

**Description**: Processing XML with external entity references leading to information disclosure.

**Common Patterns**:

```python
# Using default XML parser
import xml.etree.ElementTree as ET
root = ET.fromstring(xml_data)

# lxml without security settings
from lxml import etree
parser = etree.XMLParser()
root = etree.fromstring(xml_data, parser)
```

**Detection Indicators**:

- Use of default XML parsers without security configuration
- Processing of external XML data
- Lack of entity processing restrictions

**Remediation**:

```python
# Use defusedxml for safe XML processing
import defusedxml.ElementTree as ET
root = ET.fromstring(xml_data)

# Or configure parser to disable external entities
import xml.etree.ElementTree as ET
from xml.parsers.expat import ParserCreate

def safe_xml_parse(xml_data):
    parser = ParserCreate()
    parser.DefaultHandler = lambda data: None
    parser.ExternalEntityRefHandler = lambda *args: False

    # Parse with disabled external entities
    tree = ET.XMLParser()
    tree.parser.DefaultHandler = None
    tree.parser.ExternalEntityRefHandler = None
    return ET.fromstring(xml_data, tree)
```

**CVSS Score**: 8.2 (High)
**CWE**: CWE-611

## Regular Expression Vulnerabilities

### ReDoS (Regular Expression Denial of Service) (CWE-1333)

**Description**: Catastrophic backtracking in regular expressions causing denial of service.

**Common Patterns**:

```python
# Nested quantifiers
import re
pattern = r"(a+)+"
re.match(pattern, "a" * 100 + "X")

# Alternation with overlap
pattern = r"(a|a)*"
re.match(pattern, "a" * 100 + "X")

# Complex grouping
pattern = r"(a|b)*abb"
re.match(pattern, "a" * 100 + "X")
```

**Detection Indicators**:

- Nested quantifiers in regex patterns
- Overlapping alternation
- Complex grouping with quantifiers
- User input directly used in regex patterns

**Remediation**:

```python
# Use atomic groups or possessive quantifiers
import re

# Instead of (a+)+, use (?>a+)+ or atomic grouping
# Python doesn't support atomic groups, so rewrite pattern
pattern = r"a+"  # Simplified

# Set timeout for regex operations
import signal

def timeout_handler(signum, frame):
    raise TimeoutError("Regex timeout")

def safe_regex_match(pattern, text, timeout=1):
    signal.signal(signal.SIGALRM, timeout_handler)
    signal.alarm(timeout)
    try:
        result = re.match(pattern, text)
        signal.alarm(0)
        return result
    except TimeoutError:
        return None
```

**CVSS Score**: 7.5 (High)
**CWE**: CWE-1333

## Information Disclosure

### Debug Information Exposure (CWE-209)

**Description**: Exposing sensitive debug information in production environments.

**Common Patterns**:

```python
# Debug mode in production
app.debug = True

# Exposing stack traces
try:
    risky_operation()
except Exception as e:
    return str(e) + "\n" + traceback.format_exc()

# Verbose error messages
def login(username, password):
    user = get_user(username)
    if not user:
        return "User does not exist"
    if not check_password(password, user.password):
        return "Invalid password for user " + username
```

**Detection Indicators**:

- Debug mode enabled in production
- Stack traces exposed to users
- Detailed error messages revealing system information
- Logging sensitive data

**Remediation**:

```python
# Disable debug in production
app.debug = False

# Generic error messages
def login(username, password):
    if authenticate(username, password):
        return "Login successful"
    else:
        return "Invalid credentials"  # Generic message

# Proper error logging
import logging
logger = logging.getLogger(__name__)

def safe_operation():
    try:
        risky_operation()
    except Exception as e:
        logger.error("Operation failed", exc_info=True)
        return "An error occurred"
```

**CVSS Score**: 5.3 (Medium)
**CWE**: CWE-209

## Detection Tools and Techniques

**NIST SSDF Practice**: RV.1.1 - Vulnerability Detection Process Validation  
**Compliance Criteria**: Automated vulnerability scanning, tool integration, continuous monitoring

### Static Analysis Tools

- **Bandit**: Python security linter (SAST)
- **Semgrep**: Pattern-based static analysis
- **PyUp Safety**: Dependency vulnerability scanner
- **Snyk**: Security vulnerability scanner
- **SonarQube**: Code quality and security analysis

### Dynamic Analysis Tools

- **OWASP ZAP**: Web application security scanner
- **Burp Suite**: Web vulnerability scanner
- **SQLmap**: SQL injection testing tool
- **Nikto**: Web server scanner

### Manual Code Review Checklist

**NIST SSDF Practice**: PW.6.1 - Code Review Process Validation  
**Compliance Criteria**: Security-focused reviews, vulnerability identification

- [ ] Input validation on all user inputs (PW.4.1)
- [ ] Parameterized queries for database operations (PW.4.1)
- [ ] Proper error handling without information disclosure (PW.4.1)
- [ ] Secure random number generation (PW.4.1)
- [ ] Strong cryptographic implementations (PW.4.1)
- [ ] Proper session management (PW.4.1)
- [ ] File upload validation (PW.4.1)
- [ ] XML processing security (PW.4.1)
- [ ] Regular expression safety (PW.4.1)
- [ ] Debug information disabled in production (PW.8.1)
