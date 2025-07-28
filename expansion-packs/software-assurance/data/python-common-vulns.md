# Python Common Vulnerabilities — Simplified Reference

## Overview

This reference provides quick-look detection and remediation patterns for common Python security vulnerabilities. Each item includes CWE mapping, dangerous code indicators, and secure coding examples aligned to NIST SSDF PW\.4.

---

## Injection Attacks — TL;DR

- **SQL Injection (CWE-89)**: Never use string formatting for SQL. Always parameterize.

```python
# 🚨 Vulnerable
cursor.execute(f"SELECT * FROM users WHERE id = {user_id}")

# ✅ Secure
cursor.execute("SELECT * FROM users WHERE id = ?", (user_id,))
```

- **Command Injection (CWE-78)**: Never use `shell=True` or `os.system()` with untrusted input.

```python
# 🚨 Vulnerable
subprocess.call(f"rm {filename}", shell=True)

# ✅ Secure
subprocess.run(['rm', filename])
```

- **NoSQL Injection (CWE-943)**: Validate input types before using in NoSQL queries.

```python
# 🚨 Vulnerable
users.find({"username": username, "password": password})

# ✅ Secure
if isinstance(username, str) and isinstance(password, str):
    users.find({"username": username, "password": password})
```

---

## XSS (Cross-Site Scripting) — TL;DR

- **Reflected XSS (CWE-79)**: Escape all user output in templates.

```python
# 🚨 Vulnerable
f"<div>{user_input}</div>"

# ✅ Secure
from markupsafe import escape
f"<div>{escape(user_input)}</div>"
```

- **Stored XSS**: Sanitize before storing, escape before rendering.

```python
import bleach
clean = bleach.clean(user_content)
```

---

## Deserialization — TL;DR

- **Pickle (CWE-502)**: Never unpickle untrusted data.

```python
# 🚨 Vulnerable
pickle.loads(data)

# ✅ Secure
json.loads(data)
```

- **YAML**: Use `safe_load()` only.

```python
# ✅ Secure
yaml.safe_load(data)
```

---

## Cryptographic Failures — TL;DR

- **Weak Password Hashing (CWE-327)**: Never use MD5, SHA1.

```python
# 🚨 Vulnerable
hashlib.md5(p.encode()).hexdigest()

# ✅ Secure
bcrypt.hashpw(password.encode(), bcrypt.gensalt())
```

- **Weak RNG (CWE-330)**: Use `secrets` not `random`.

```python
# 🚨 Vulnerable
random.randint(1000, 9999)

# ✅ Secure
secrets.token_urlsafe(16)
```

---

## Path Traversal — TL;DR

- **Directory Traversal (CWE-22)**: Sanitize filenames with `os.path.basename()`.

```python
# 🚨 Vulnerable
open("uploads/" + filename)

# ✅ Secure
safe = os.path.join("uploads", os.path.basename(filename))
```

---

## Session Management — TL;DR

- **Session Fixation (CWE-384)**: Regenerate session ID on login.

```python
session_id = secrets.token_urlsafe(32)
```

- **Long-lived Sessions (CWE-613)**: Set expiration limits.

```python
'expires_at': datetime.utcnow() + timedelta(hours=2)
```

---

## File Uploads — TL;DR

- **Unrestricted Upload (CWE-434)**: Validate type, size, name.

```python
# ✅ Secure
if filetype not in allowed:
    raise ValueError("Invalid type")
```

---

## XML — TL;DR

- **XXE (CWE-611)**: Use `defusedxml` or disable entity loading.

```python
import defusedxml.ElementTree as ET
ET.fromstring(xml_data)
```

---

## ReDoS — TL;DR

- **ReDoS (CWE-1333)**: Avoid complex regexes with nested quantifiers.

```python
# 🚨 Vulnerable
re.match(r"(a+)+", input_data)

# ✅ Secure
re.match(r"a+", input_data)
```

---

## Numeric Vulnerabilities — TL;DR

- **Integer Overflow (CWE-190)**: Validate numeric inputs and ranges.

```python
# 🚨 Vulnerable
def allocate_memory(size):
    return [0] * size  # No bounds checking

# ✅ Secure
def allocate_memory(size):
    if not isinstance(size, int) or size < 0 or size > 1000000:
        raise ValueError("Invalid size")
    return [0] * size
```

- **Floating Point Precision (CWE-681)**: Use Decimal for financial calculations.

```python
# 🚨 Vulnerable
price = 0.1 + 0.2  # 0.30000000000000004

# ✅ Secure
from decimal import Decimal
price = Decimal('0.1') + Decimal('0.2')  # 0.3
```

---

## Concurrency Vulnerabilities — TL;DR

- **Race Conditions (CWE-362)**: Use locks for shared resources.

```python
# 🚨 Vulnerable
shared_counter = 0
def increment():
    global shared_counter
    shared_counter += 1

# ✅ Secure
import threading
shared_counter = 0
counter_lock = threading.Lock()

def increment():
    global shared_counter
    with counter_lock:
        shared_counter += 1
```

- **TOCTOU Issues (CWE-367)**: Use atomic operations.

```python
# 🚨 Vulnerable
if os.path.exists(filename):
    with open(filename, 'r') as f:  # File could be deleted between check and open
        content = f.read()

# ✅ Secure
try:
    with open(filename, 'r') as f:
        content = f.read()
except FileNotFoundError:
    content = None
```

---

## Format String Vulnerabilities — TL;DR

- **Format String Injection (CWE-134)**: Never use user input as format strings.

```python
# 🚨 Vulnerable
print(user_input % data)
logging.info(user_controlled_format % values)

# ✅ Secure
print("User data: {}".format(user_input))
logging.info("Processing user data: %s", user_input)
```

---

## Information Disclosure — TL;DR

- **Debug Exposure (CWE-209)**: Never show stack traces in responses.

```python
# ✅ Secure
logger.error("error", exc_info=True)
return "Something went wrong"
```

---

## Detection and Tools — TL;DR

- **Use Static Tools**: Bandit, Semgrep
- **Dependency Scanners**: Safety, Snyk
- **Review Checklist**:

  - [ ] All inputs validated
  - [ ] No shell/SQL injections
  - [ ] No untrusted deserialization
  - [ ] No weak hashes/random
  - [ ] Errors logged, not returned
  - [ ] Secure session/token handling
  - [ ] Security headers and CSP
