# Python Secure Coding Guidelines

## Overview

This guide provides focused, actionable security guidance for Python development, aligned with NIST SSDF practices. Each section includes a TL;DR summary, dangerous patterns to avoid, and secure alternatives.

**NIST SSDF Mapping**: Supports PW\.4 (Create Source Code with Secure Coding Practices)

---

## Input Validation and Sanitization — TL;DR

- Validate **all user inputs** on the server side
- Sanitize filenames, enforce strict types or regex patterns
- Never trust client-side validation

**NIST SSDF Practice**: PW\.4.1 — Source Code Security Implementation

### Red Flags

- Dynamic path or filename construction without validation
- No input type enforcement

### Secure Example

```python
import re

def process_user_id(user_id):
    if not re.match(r'^[a-zA-Z0-9]{1,20}$', str(user_id)):
        raise ValueError("Invalid user ID format")
    return f"User ID: {user_id}"
```

---

## SQL Injection Prevention — TL;DR

- Always use **parameterized queries** or an ORM
- Never embed input in SQL strings

**NIST SSDF Practice**: PW\.4.1
**CWE**: CWE-89 (SQL Injection)

### Secure Patterns

```python
cursor.execute("SELECT * FROM users WHERE id = ?", (user_id,))
```

```python
session.query(User).filter(User.id == user_id).first()
```

---

## Command Injection Prevention — TL;DR

- Avoid `shell=True` and `os.system()` with input
- Use `subprocess.run()` with validated arguments

**CWE**: CWE-78

### Red Flags

```python
os.system(f"ping {hostname}")  # 🚨 Dangerous
```

### Secure Pattern

```python
subprocess.run(['ping', '-c', '1', hostname])
```

---

## XSS Prevention — TL;DR

- Never mark user input as safe in templates
- Use template auto-escaping and CSP headers

**CWE**: CWE-79

### Secure Pattern (Jinja2)

```python
template = Template('<p>{{ message }}</p>')
```

---

## Password and Cryptography — TL;DR

- Use `bcrypt` or `argon2` for password hashing
- Use `secrets` for secure tokens
- Never use `MD5`, `SHA1`, or `random` for security

**CWE**: CWE-327

### Secure Example

```python
import bcrypt
hashed = bcrypt.hashpw(password.encode(), bcrypt.gensalt())
```

---

## Secure Random Number Generation — TL;DR

- Use `secrets` for all security-sensitive randomness

**CWE**: CWE-330

### Secure Pattern

```python
import secrets
session_id = secrets.token_urlsafe(32)
```

---

## Deserialization — TL;DR

- Avoid `pickle.loads()` on untrusted data
- Use `json` or `RestrictedUnpickler`

**CWE**: CWE-502

### Secure Pattern

```python
json.loads(data)
```

---

## File Upload Security — TL;DR

- Validate file type by content, not just extension
- Enforce max file size
- Sanitize filenames before saving

**CWE**: CWE-434, CWE-22

---

## Session Management — TL;DR

- Use secure, random session IDs
- Enforce session expiration and CSRF tokens

**CWE**: CWE-384, CWE-613

---

## Error Handling — TL;DR

- Don’t leak stack traces to users
- Log full errors internally with UUIDs

**CWE**: CWE-209

---

## Resource Management — TL;DR

- Always use context managers for file/network operations
- Set timeouts on network requests
- Implement proper cleanup in exception handlers

**CWE**: CWE-664

### Secure Pattern

```python
# ✅ Secure resource handling
import requests
with requests.Session() as session:
    response = session.get(url, timeout=10)
```

```python
# ✅ Secure file handling with cleanup
try:
    with open(filename, 'r') as f:
        data = f.read()
except IOError:
    logger.error("Failed to read file", exc_info=True)
finally:
    # Cleanup if needed
    pass
```

---

## Numeric Security — TL;DR

- Validate all numeric inputs for type and range
- Use Decimal for financial calculations to avoid floating point errors
- Check for integer overflow in calculations

**CWE**: CWE-682, CWE-190, CWE-681

### Secure Pattern

```python
from decimal import Decimal

def calculate_price(base_price, tax_rate):
    if not isinstance(base_price, (int, float, Decimal)):
        raise TypeError("Invalid price type")
    if base_price < 0:
        raise ValueError("Price cannot be negative")

    base = Decimal(str(base_price))
    tax = Decimal(str(tax_rate))
    return base * (1 + tax)
```

---

## Concurrency Security — TL;DR

- Use locks for shared mutable state
- Avoid race conditions with proper synchronization
- Use thread-safe data structures when possible

**CWE**: CWE-362, CWE-367

### Secure Pattern

```python
import threading
from collections import deque

# Thread-safe queue
shared_queue = deque()
queue_lock = threading.Lock()

def add_item(item):
    with queue_lock:
        shared_queue.append(item)
```

---

## XML Security — TL;DR

- Use `defusedxml` for parsing XML
- Disable external entity references

**CWE**: CWE-611

---

## Security Headers and Flask Config — TL;DR

- Use `flask-talisman` to enforce secure headers
- Configure secure session cookies

---

## Testing and Automation — TL;DR

- Write security-focused unit tests
- Run Bandit, Semgrep, and dependency scanners in CI

---

## Quick Reference — Secure Coding Rules

- Validate all input
- Use parameterized DB queries
- Use `secrets`, not `random`
- Never deserialize untrusted `pickle`
- Use `bcrypt` or `argon2` for passwords
- Sanitize all filenames and user uploads
- Never output raw error messages
- Use secure libraries (`cryptography`, `defusedxml`, `flask-talisman`)
- Use Bandit/Safety/Semgrep in CI
