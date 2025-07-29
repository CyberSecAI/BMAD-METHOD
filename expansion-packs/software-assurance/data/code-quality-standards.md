# Code Quality Standards — Production Readiness Reference

## Overview

This reference provides comprehensive code quality standards for production readiness, maintainability, and development best practices. This is reference material for AI agents to understand quality patterns and provide guidance - not executable code.

**Purpose**: Reference guide for the code-quality-checker agent to identify quality issues and provide remediation recommendations.

**Integration**: Complements security analysis by focusing on code quality, maintainability, and production readiness rather than security vulnerabilities.

---

## Production Blockers — TL;DR

These are **critical issues** that must be resolved before production deployment.

### TODO/FIXME Comments — TL;DR

- **Issue**: Unfinished work markers in production code
- **Impact**: Indicates incomplete implementations or known issues
- **Detection**: `TODO`, `FIXME`, `HACK`, `XXX`, `BUG`, `TEMP`

```python
# 🚨 Production Blocker
def process_payment(amount):
    # TODO: Add fraud detection
    # FIXME: Handle edge case for zero amount
    return charge_card(amount)

# ✅ Production Ready
def process_payment(amount):
    if amount <= 0:
        raise ValueError("Amount must be positive")

    fraud_result = fraud_detector.check(amount)
    if fraud_result.is_suspicious:
        raise FraudException("Transaction flagged")

    return charge_card(amount)
```

### Debug Statements — TL;DR

- **Issue**: Development debugging code left in production
- **Impact**: Performance overhead, information leakage, cluttered logs
- **Detection**: `print()`, `console.log()`, `System.out.println()`

```python
# 🚨 Production Blocker
def authenticate_user(username, password):
    print(f"Debug: Authenticating {username}")  # Remove before production
    user = get_user(username)
    print(f"Debug: User object: {user}")        # Remove before production
    return verify_password(user, password)

# ✅ Production Ready
def authenticate_user(username, password):
    logger.info(f"Authentication attempt for user: {username}")
    user = get_user(username)
    return verify_password(user, password)
```

### Placeholder Text — TL;DR

- **Issue**: Incomplete implementations with placeholder content
- **Impact**: Runtime failures, incorrect behavior, missing functionality
- **Detection**: "Replace with actual", "Coming soon", "Not implemented"

```python
# 🚨 Production Blocker
API_KEY = "replace-with-actual-key"
DATABASE_URL = "update-this-later"

def send_email(to, subject, body):
    # Coming soon - email implementation
    pass

# ✅ Production Ready
API_KEY = os.environ.get('API_KEY')
DATABASE_URL = os.environ.get('DATABASE_URL')

def send_email(to, subject, body):
    if not all([to, subject, body]):
        raise ValueError("Missing required email parameters")

    return email_service.send(
        recipient=to,
        subject=subject,
        content=body
    )
```

### Commented-Out Code — TL;DR

- **Issue**: Dead code blocks that are commented but not removed
- **Impact**: Code clutter, confusion, maintenance burden
- **Detection**: Large blocks of commented code (>3 lines)

```python
# 🚨 Production Blocker
def calculate_price(base_price, discount):
    # Old implementation - remove before production
    # if discount > 0.5:
    #     discount = 0.5
    # return base_price * (1 - discount)

    # New implementation
    validated_discount = min(discount, 0.5)
    return base_price * (1 - validated_discount)

# ✅ Production Ready
def calculate_price(base_price, discount):
    """Calculate final price with discount validation."""
    validated_discount = min(discount, 0.5)
    return base_price * (1 - validated_discount)
```

---

## Code Structure Issues — TL;DR

These are **high priority** issues affecting maintainability and reliability.

### Function Length — TL;DR

- **Standard**: Functions should not exceed 50 lines
- **Impact**: Reduced readability, harder testing, increased complexity
- **Solution**: Break into smaller, focused functions

```python
# 🚨 Code Structure Issue (78 lines)
def process_order(order_data):
    # Validation (15 lines)
    if not order_data:
        raise ValueError("Order data required")
    if 'items' not in order_data:
        raise ValueError("Items required")
    # ... more validation

    # Inventory check (20 lines)
    for item in order_data['items']:
        if not check_inventory(item['id']):
            raise OutOfStockError(f"Item {item['id']} out of stock")
    # ... more inventory logic

    # Payment processing (25 lines)
    payment_result = process_payment(order_data['payment'])
    if not payment_result.success:
        raise PaymentError("Payment failed")
    # ... more payment logic

    # Order creation (18 lines)
    order = create_order(order_data)
    send_confirmation_email(order)
    update_inventory(order_data['items'])
    # ... more order logic

# ✅ Well-Structured Code
def process_order(order_data):
    """Process customer order through validation, payment, and fulfillment."""
    validate_order_data(order_data)
    check_item_availability(order_data['items'])
    payment_result = process_order_payment(order_data['payment'])
    order = create_and_fulfill_order(order_data)
    return order

def validate_order_data(order_data):
    """Validate order data completeness and format."""
    # 10-15 lines of focused validation logic

def check_item_availability(items):
    """Verify all items are in stock."""
    # 10-15 lines of focused inventory logic
```

### Missing Error Handling — TL;DR

- **Issue**: External operations without proper exception handling
- **Impact**: Unhandled crashes, poor user experience, system instability
- **Required**: API calls, file operations, database queries, network requests

```python
# 🚨 Missing Error Handling
def get_user_profile(user_id):
    response = requests.get(f"/api/users/{user_id}")  # No error handling
    data = response.json()                            # Could fail
    return data['profile']                            # Could fail

def save_user_data(user_data):
    with open('users.json', 'w') as f:               # Could fail
        json.dump(user_data, f)                     # Could fail

# ✅ Proper Error Handling
def get_user_profile(user_id):
    try:
        response = requests.get(
            f"/api/users/{user_id}",
            timeout=10
        )
        response.raise_for_status()
        data = response.json()

        if 'profile' not in data:
            raise ValueError("Profile data missing from response")

        return data['profile']

    except requests.RequestException as e:
        logger.error(f"Failed to fetch user profile: {e}")
        raise UserServiceError(f"Could not retrieve user {user_id}")
    except ValueError as e:
        logger.error(f"Invalid user profile data: {e}")
        raise DataValidationError("Invalid profile format")

def save_user_data(user_data):
    try:
        with open('users.json', 'w') as f:
            json.dump(user_data, f, indent=2)
        logger.info("User data saved successfully")

    except IOError as e:
        logger.error(f"Failed to save user data: {e}")
        raise FileOperationError("Could not save user data")
    except (TypeError, ValueError) as e:
        logger.error(f"Invalid user data format: {e}")
        raise DataValidationError("User data not serializable")
```

### Unused Code — TL;DR

- **Issue**: Imports, variables, or functions that are never used
- **Impact**: Code clutter, larger bundle sizes, maintenance confusion
- **Detection**: Unused imports, unreferenced variables, dead functions

```python
# 🚨 Unused Code
import os                    # Used
import json                  # Used
import requests              # Never used - remove
from datetime import datetime, timedelta  # Only datetime used

def get_config():
    debug_mode = True        # Never used - remove
    config_path = 'config.json'

    with open(config_path, 'r') as f:
        config = json.load(f)

    return config

def legacy_function():       # Never called - remove
    return "old implementation"

# ✅ Clean Code
import os
import json
from datetime import datetime

def get_config():
    config_path = 'config.json'
    with open(config_path, 'r') as f:
        config = json.load(f)
    return config
```

---

## Language-Specific Quality — TL;DR

### Python Quality Standards — TL;DR

- **Style Guide**: PEP 8 compliance
- **Required**: Docstrings for public functions, type hints, proper imports
- **Avoid**: Bare except clauses, wildcard imports, global variables

```python
# 🚨 Python Quality Issues
from mymodule import *        # Wildcard import
import sys,os,json           # Multiple imports on one line

def calc(x,y):               # No docstring, no type hints
    try:
        result=x/y           # No space around operators
    except:                   # Bare except clause
        result=0
    return result

# ✅ Python Quality Standards
import json
import os
import sys
from typing import Union

def calculate_division(dividend: float, divisor: float) -> Union[float, None]:
    """
    Calculate division with error handling.

    Args:
        dividend: The number to be divided
        divisor: The number to divide by

    Returns:
        Result of division or None if divisor is zero

    Raises:
        TypeError: If inputs are not numeric
    """
    if not isinstance(dividend, (int, float)) or not isinstance(divisor, (int, float)):
        raise TypeError("Inputs must be numeric")

    if divisor == 0:
        return None

    return dividend / divisor
```

### JavaScript Quality Standards — TL;DR

- **Style Guide**: ESLint compliance
- **Required**: `const`/`let` over `var`, strict equality, proper async patterns
- **Avoid**: Global variables, string evaluation, loose equality

```javascript
// 🚨 JavaScript Quality Issues
var userName = "admin"; // Use const/let
var isLoggedIn = false;

function checkUser(id) {
  // No JSDoc
  if (id == null) {
    // Use strict equality
    return false;
  }

  var userData = getUserData(id); // Use const/let
  if (userData != null) {
    // Use strict equality
    return true;
  }
  return false;
}

// ✅ JavaScript Quality Standards
const DEFAULT_USER = "guest";
let currentUser = DEFAULT_USER;

/**
 * Check if user exists and is valid
 * @param {string} id - User identifier
 * @returns {Promise<boolean>} True if user is valid
 * @throws {Error} If user ID is invalid format
 */
async function checkUser(id) {
  if (typeof id !== "string" || id.length === 0) {
    throw new Error("User ID must be a non-empty string");
  }

  if (id === null || id === undefined) {
    return false;
  }

  try {
    const userData = await getUserData(id);
    return userData !== null && userData !== undefined;
  } catch (error) {
    console.error(`Failed to check user ${id}:`, error);
    return false;
  }
}
```

---

## Performance & Maintainability — TL;DR

### Poor Naming — TL;DR

- **Issue**: Non-descriptive variable, function, and class names
- **Impact**: Reduced readability, harder maintenance, team confusion
- **Standard**: Names should clearly indicate purpose and content

```python
# 🚨 Poor Naming
def d(x, y):                 # What does 'd' do?
    return x / y

def process(data):           # Too generic
    r = []                   # What is 'r'?
    for i in data:           # What is 'i'?
        if i > 0:
            r.append(i * 2)
    return r

# ✅ Descriptive Naming
def calculate_ratio(numerator, denominator):
    """Calculate the ratio between two numbers."""
    if denominator == 0:
        raise ValueError("Denominator cannot be zero")
    return numerator / denominator

def filter_and_double_positive_numbers(numbers):
    """Filter positive numbers and double their values."""
    doubled_positives = []
    for number in numbers:
        if number > 0:
            doubled_positives.append(number * 2)
    return doubled_positives
```

### Missing Documentation — TL;DR

- **Issue**: Complex logic without explanatory comments
- **Impact**: Harder to understand, maintain, and debug
- **Required**: Business logic, algorithms, complex calculations

```python
# 🚨 Missing Documentation
def calculate_shipping(weight, distance, zone):
    base = 5.99
    if weight > 10:
        base += (weight - 10) * 0.5
    if distance > 100:
        base *= 1.2
    if zone == 'express':
        base *= 1.5
    return round(base, 2)

# ✅ Well-Documented Code
def calculate_shipping_cost(weight_lbs, distance_miles, shipping_zone):
    """
    Calculate shipping cost based on package weight, distance, and zone.

    Pricing Structure:
    - Base cost: $5.99 for packages ≤10 lbs
    - Weight surcharge: $0.50 per lb over 10 lbs
    - Distance surcharge: 20% for distances >100 miles
    - Express zone: 50% premium over standard shipping

    Args:
        weight_lbs: Package weight in pounds
        distance_miles: Shipping distance in miles
        shipping_zone: 'standard' or 'express'

    Returns:
        Total shipping cost rounded to nearest cent

    Example:
        >>> calculate_shipping_cost(15, 150, 'express')
        13.47  # (5.99 + 2.50) * 1.2 * 1.5
    """
    # Start with base shipping rate for packages ≤10 lbs
    base_cost = 5.99

    # Add weight surcharge for packages over 10 lbs
    if weight_lbs > 10:
        weight_surcharge = (weight_lbs - 10) * 0.50
        base_cost += weight_surcharge

    # Apply distance multiplier for long-distance shipping
    if distance_miles > 100:
        base_cost *= 1.2  # 20% surcharge

    # Apply express shipping premium
    if shipping_zone == 'express':
        base_cost *= 1.5  # 50% premium

    return round(base_cost, 2)
```

---

## Detection Tools and Automation — TL;DR

### Static Analysis Tools

- **Python**: `black`, `pylint`, `flake8`, `mypy`
- **JavaScript**: `eslint`, `prettier`, `jshint`
- **Java**: `checkstyle`, `spotbugs`, `pmd`
- **Multi-language**: `sonarqube`, `codeclimate`

### Quality Checklist

- [ ] No TODO/FIXME comments in production code
- [ ] No debug statements (print, console.log, etc.)
- [ ] No placeholder text or hardcoded values
- [ ] Functions under 50 lines
- [ ] Proper error handling for external operations
- [ ] No unused imports or variables
- [ ] Descriptive naming for all identifiers
- [ ] Documentation for complex business logic
- [ ] Language-specific style guide compliance
- [ ] Type hints/annotations where supported

### CI/CD Integration Patterns

Common patterns for automated quality checks in continuous integration:

**Python Quality Checks**:

- Code formatting validation (black, autopep8)
- Linting analysis (pylint, flake8)
- Type checking (mypy)
- Documentation coverage

**JavaScript Quality Checks**:

- ESLint rule validation
- Code formatting (prettier)
- Dependency analysis
- Bundle size monitoring

**Generic Quality Gates**:

- TODO/FIXME comment detection
- Debug statement scanning
- Documentation coverage thresholds
- Code complexity metrics

This reference ensures production-ready code quality while maintaining clear separation from security analysis, focusing on maintainability, readability, and deployment readiness.
