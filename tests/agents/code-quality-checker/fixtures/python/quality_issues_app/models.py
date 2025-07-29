"""
Database models with code quality issues
"""

import sqlite3
import json
from datetime import datetime

# PRODUCTION BLOCKER 1: TODO comment
# TODO: Add proper ORM integration instead of raw SQL

# LANGUAGE ISSUE 1: Missing class docstring
class User:
    # LANGUAGE ISSUE 2: No type hints
    def __init__(self, username, email, password):
        self.username = username
        self.email = email
        self.password = password
        self.created_at = datetime.now()
        
        # PRODUCTION BLOCKER 2: Debug print in constructor
        print(f"Creating user: {username}")
    
    # LANGUAGE ISSUE 3: Missing method docstring
    def save(self):
        # STRUCTURE ISSUE 1: No error handling for database operations
        conn = sqlite3.connect('test.db')
        cursor = conn.cursor()
        
        # PRODUCTION BLOCKER 3: SQL injection vulnerability
        query = f"INSERT INTO users (username, email, password, created_at) VALUES ('{self.username}', '{self.email}', '{self.password}', '{self.created_at}')"
        cursor.execute(query)
        
        conn.commit()
        conn.close()
        
        # PRODUCTION BLOCKER 4: Debug print with sensitive data
        print(f"Saved user {self.username} with password {self.password}")
    
    # STRUCTURE ISSUE 2: Method without error handling
    def update_profile(self, first_name, last_name, bio, phone, address, city, state, country, preferences):
        # STRUCTURE ISSUE 3: Too many parameters (should use kwargs or data object)
        conn = sqlite3.connect('test.db')
        cursor = conn.cursor()
        
        # Another SQL injection opportunity
        update_query = f"""
            UPDATE users SET 
                first_name='{first_name}',
                last_name='{last_name}',
                bio='{bio}',
                phone='{phone}',
                address='{address}',
                city='{city}',
                state='{state}',
                country='{country}',
                preferences='{json.dumps(preferences)}',
                updated_at='{datetime.now()}'
            WHERE username='{self.username}'
        """
        cursor.execute(update_query)
        conn.commit()
        conn.close()

    @staticmethod
    # LANGUAGE ISSUE 4: Missing docstring for static method
    def find_by_username(username):
        # STRUCTURE ISSUE 4: Duplicate database connection pattern
        conn = sqlite3.connect('test.db')
        cursor = conn.cursor()
        
        # More SQL injection
        query = f"SELECT * FROM users WHERE username='{username}'"
        cursor.execute(query)
        result = cursor.fetchone()
        
        conn.close()
        
        if result:
            # MAINTAINABILITY ISSUE 1: Magic numbers (array indices)
            user = User(result[1], result[2], result[3])  # Using array positions instead of named fields
            return user
        return None

# LANGUAGE ISSUE 5: Class without docstring
class Product:
    # STRUCTURE ISSUE 5: Constructor with too many parameters
    def __init__(self, name, description, price, category, sku, inventory, weight, dimensions, color, size, brand):
        self.name = name
        self.description = description
        self.price = price
        self.category = category
        self.sku = sku
        self.inventory = inventory
        self.weight = weight
        self.dimensions = dimensions
        self.color = color
        self.size = size
        self.brand = brand
        self.created_at = datetime.now()
    
    def save(self):
        # STRUCTURE ISSUE 6: Duplicate code pattern (same as User.save())
        conn = sqlite3.connect('test.db')
        cursor = conn.cursor()
        
        # SQL injection vulnerability
        query = f"""
            INSERT INTO products (name, description, price, category, sku, inventory_count, weight, dimensions, color, size, brand, created_at) 
            VALUES ('{self.name}', '{self.description}', {self.price}, '{self.category}', '{self.sku}', {self.inventory}, {self.weight}, '{self.dimensions}', '{self.color}', '{self.size}', '{self.brand}', '{self.created_at}')
        """
        cursor.execute(query)
        conn.commit()
        conn.close()

# PRODUCTION BLOCKER 5: Commented out code
# class OldUserModel:
#     def __init__(self, data):
#         self.data = data
#     
#     def validate(self):
#         # Old validation logic
#         if 'username' in self.data and 'email' in self.data:
#             return True
#         return False

# LANGUAGE ISSUE 6: Global variable
USER_CACHE = {}

# MAINTAINABILITY ISSUE 2: Poor function naming
def get_stuff(id):  # What kind of "stuff"?
    # LANGUAGE ISSUE 7: Global variable usage
    global USER_CACHE
    
    if id in USER_CACHE:
        return USER_CACHE[id]
    
    # STRUCTURE ISSUE 7: No error handling
    conn = sqlite3.connect('test.db')
    cursor = conn.cursor()
    
    query = f"SELECT * FROM users WHERE id={id}"  # SQL injection
    cursor.execute(query)
    result = cursor.fetchone()
    
    conn.close()
    
    if result:
        USER_CACHE[id] = result
    
    return result

# STRUCTURE ISSUE 8: Function that should be a class method
def validate_user_data(username, email, password):
    # LANGUAGE ISSUE 8: Missing docstring and type hints
    # MAINTAINABILITY ISSUE 3: Complex validation logic without clear structure
    errors = []
    
    if not username:
        errors.append("Username is required")
    elif len(username) < 3:
        errors.append("Username too short")
    elif len(username) > 50:
        errors.append("Username too long")
    elif not username.isalnum():
        errors.append("Username must be alphanumeric")
    
    if not email:
        errors.append("Email is required")
    elif '@' not in email:
        errors.append("Invalid email format")
    elif '.' not in email.split('@')[1] if '@' in email else False:
        errors.append("Invalid email domain")
    elif len(email) > 100:
        errors.append("Email too long")
    
    if not password:
        errors.append("Password is required")
    elif len(password) < 8:
        errors.append("Password too short")
    elif len(password) > 128:
        errors.append("Password too long")
    elif not any(c.isupper() for c in password):
        errors.append("Password needs uppercase letter")
    elif not any(c.islower() for c in password):
        errors.append("Password needs lowercase letter")
    elif not any(c.isdigit() for c in password):
        errors.append("Password needs number")
    
    return errors

# STRUCTURE ISSUE 9: Class with methods that should be split
class DatabaseManager:
    def __init__(self):
        self.db_path = 'test.db'
        
        # PRODUCTION BLOCKER 6: Debug print in constructor
        print("DatabaseManager initialized")
    
    # STRUCTURE ISSUE 10: Method that's too long and does too many things
    def backup_and_migrate_data(self, backup_path, migration_scripts):
        """This method does too many things and should be split"""
        
        # STRUCTURE ISSUE 11: No error handling for file operations
        conn = sqlite3.connect(self.db_path)
        cursor = conn.cursor()
        
        # Get all table names
        cursor.execute("SELECT name FROM sqlite_master WHERE type='table'")
        tables = cursor.fetchall()
        
        backup_data = {}
        for table in tables:
            table_name = table[0]
            cursor.execute(f"SELECT * FROM {table_name}")  # Potential SQL injection if table_name is user input
            rows = cursor.fetchall()
            cursor.execute(f"PRAGMA table_info({table_name})")
            columns = [column[1] for column in cursor.fetchall()]
            
            backup_data[table_name] = {
                'columns': columns,
                'rows': rows
            }
        
        # Save backup
        with open(backup_path, 'w') as f:
            json.dump(backup_data, f, default=str)
        
        # Run migrations
        for script in migration_scripts:
            with open(script, 'r') as f:
                migration_sql = f.read()
            
            # Execute migration (could be dangerous without validation)
            cursor.executescript(migration_sql)
        
        conn.commit()
        conn.close()
        
        # PRODUCTION BLOCKER 7: Debug print
        print(f"Backup created at {backup_path}, migrations applied")
        
        # Verify migration success
        conn = sqlite3.connect(self.db_path)
        cursor = conn.cursor()
        
        for table in tables:
            table_name = table[0]
            try:
                cursor.execute(f"SELECT COUNT(*) FROM {table_name}")
                count = cursor.fetchone()[0]
                print(f"Table {table_name} has {count} rows after migration")  # More debug output
            except Exception as e:
                print(f"Error checking table {table_name}: {e}")  # Error handling through print
        
        conn.close()
        
        return True

# STRUCTURE ISSUE 12: Unused class
class DeprecatedDataProcessor:
    """This class is no longer used but hasn't been removed"""
    
    def __init__(self):
        pass
    
    def process(self, data):
        return data

# MAINTAINABILITY ISSUE 4: Function with unclear purpose and poor naming
def do_db_stuff(a, b, c=None):
    # LANGUAGE ISSUE 9: No docstring, no type hints, unclear parameters
    # STRUCTURE ISSUE 13: No error handling
    conn = sqlite3.connect('test.db')
    cursor = conn.cursor()
    
    if c:
        cursor.execute(f"SELECT * FROM {a} WHERE {b} = '{c}'")  # SQL injection risk
    else:
        cursor.execute(f"SELECT * FROM {a}")
    
    results = cursor.fetchall()
    conn.close()
    
    return results