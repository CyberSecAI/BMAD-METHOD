"""
Utility functions with various code quality issues
"""

import os
import json
from datetime import datetime
import re

# PRODUCTION BLOCKER 1: TODO comment
# TODO: Refactor these utility functions for better organization

# LANGUAGE ISSUE 1: Wildcard import (anti-pattern)
from math import *

# STRUCTURE ISSUE 1: Function exceeding 50 lines
def validate_and_process_user_input(user_input, validation_rules, default_values, processing_options):
    """Process user input with validation - this function is too long"""
    
    # PRODUCTION BLOCKER 2: Debug print statement
    print(f"Processing input: {user_input}")
    
    if not user_input:
        return default_values
    
    # MAINTAINABILITY ISSUE 1: Complex nested logic without clear structure
    if isinstance(user_input, dict):
        processed_data = {}
        for key, value in user_input.items():
            if key in validation_rules:
                rule = validation_rules[key]
                if 'required' in rule and rule['required']:
                    if not value:
                        processed_data[key] = default_values.get(key, '')
                    else:
                        if 'type' in rule:
                            if rule['type'] == 'email':
                                if '@' in str(value) and '.' in str(value):
                                    processed_data[key] = str(value).lower().strip()
                                else:
                                    processed_data[key] = default_values.get(key, '')
                            elif rule['type'] == 'phone':
                                cleaned = re.sub(r'[^\d]', '', str(value))
                                if len(cleaned) == 10:
                                    processed_data[key] = f"({cleaned[:3]}) {cleaned[3:6]}-{cleaned[6:]}"
                                else:
                                    processed_data[key] = default_values.get(key, '')
                            elif rule['type'] == 'age':
                                try:
                                    age = int(value)
                                    if 0 <= age <= 150:
                                        processed_data[key] = age
                                    else:
                                        processed_data[key] = default_values.get(key, 0)
                                except ValueError:
                                    processed_data[key] = default_values.get(key, 0)
                            else:
                                processed_data[key] = str(value).strip()
                        else:
                            processed_data[key] = str(value).strip()
                else:
                    if value:
                        processed_data[key] = str(value).strip()
            else:
                if processing_options.get('include_unknown', False):
                    processed_data[key] = str(value).strip()
        
        # More processing logic
        if 'normalize_names' in processing_options and processing_options['normalize_names']:
            for key in ['first_name', 'last_name', 'middle_name']:
                if key in processed_data:
                    processed_data[key] = processed_data[key].title()
        
        if 'generate_username' in processing_options and processing_options['generate_username']:
            if 'first_name' in processed_data and 'last_name' in processed_data:
                username = f"{processed_data['first_name']}.{processed_data['last_name']}".lower()
                processed_data['username'] = re.sub(r'[^\w.]', '', username)
        
        return processed_data
    
    return default_values

# LANGUAGE ISSUE 2: Missing docstring
def calculate_metrics(data):
    # STRUCTURE ISSUE 2: No error handling for file operations
    with open('metrics.json', 'w') as f:
        json.dump(data, f)
    
    # MAINTAINABILITY ISSUE 2: Single letter variables
    x = 0
    y = 0
    z = 0
    
    for d in data:
        x += d.get('value', 0)
        y += d.get('count', 0) 
        z += d.get('weight', 1)
    
    # MAINTAINABILITY ISSUE 3: Magic numbers without explanation
    result = (x * 0.7) + (y * 0.2) + (z * 0.1)
    
    return result

# STRUCTURE ISSUE 3: Duplicate code pattern (similar file operation)
def save_user_preferences(preferences):
    # STRUCTURE ISSUE 4: No error handling again
    with open('preferences.json', 'w') as f:
        json.dump(preferences, f)
    
    # PRODUCTION BLOCKER 3: Debug print
    print("Preferences saved successfully")

# LANGUAGE ISSUE 3: Bare except clause (anti-pattern)
def risky_operation():
    try:
        # STRUCTURE ISSUE 5: Missing error handling context
        with open('important_file.txt', 'r') as f:
            content = f.read()
        return content
    except:  # LANGUAGE ISSUE: Bare except - should specify exception types
        return None

# MAINTAINABILITY ISSUE 4: Poor function naming
def do_stuff(a, b, c):  # What does this function actually do?
    # MAINTAINABILITY ISSUE 5: No comments explaining complex logic
    if isinstance(a, str) and isinstance(b, int) and isinstance(c, list):
        return [x for x in c if len(str(x)) > b and a in str(x)]
    return []

# STRUCTURE ISSUE 6: Unused function (never called)
def legacy_format_date(date_str):
    return datetime.strptime(date_str, '%Y-%m-%d').strftime('%m/%d/%Y')

# LANGUAGE ISSUE 4: Global variable usage
CACHE = {}

def get_cached_data(key):
    global CACHE  # LANGUAGE ISSUE 5: Global modification
    
    if key in CACHE:
        # PRODUCTION BLOCKER 4: Debug print with potentially sensitive data
        print(f"Cache hit for key: {key}")
        return CACHE[key]
    
    # STRUCTURE ISSUE 7: No error handling for external API call
    response = __import__('requests').get(f'https://api.example.com/data/{key}')
    data = response.json()
    
    CACHE[key] = data
    return data

# PRODUCTION BLOCKER 5: Commented out code block
# def old_validation_method(email):
#     # This was the old email validation
#     if '@' in email:
#         return True
#     return False
# 
# def deprecated_sanitization(text):
#     return text.replace('<', '').replace('>', '')

# STRUCTURE ISSUE 8: Function with too many parameters
def generate_report(user_id, start_date, end_date, report_type, include_charts, include_summary, format_type, output_path, email_recipients):
    # LANGUAGE ISSUE 6: No type hints or docstring
    # STRUCTURE ISSUE 9: Missing input validation
    # STRUCTURE ISSUE 10: No error handling
    
    report_data = {
        'user_id': user_id,
        'period': f"{start_date} to {end_date}",
        'type': report_type,
        'generated_at': datetime.now().isoformat()
    }
    
    # MAINTAINABILITY ISSUE 6: Nested conditionals that could be simplified
    if report_type == 'sales':
        if include_charts:
            if include_summary:
                report_data['sections'] = ['summary', 'charts', 'details']
            else:
                report_data['sections'] = ['charts', 'details']
        else:
            if include_summary:
                report_data['sections'] = ['summary', 'details']
            else:
                report_data['sections'] = ['details']
    
    # STRUCTURE ISSUE 11: File operation without error handling
    with open(output_path, 'w') as f:
        if format_type == 'json':
            json.dump(report_data, f)
        else:
            f.write(str(report_data))
    
    # PRODUCTION BLOCKER 6: Debug print in production function
    print(f"Report generated: {output_path}")
    
    return report_data

# LANGUAGE ISSUE 7: Unused import (os is imported but never used in meaningful way)
# STRUCTURE ISSUE 12: Function that should be split into smaller functions
def process_bulk_operations(operations_list):
    results = []
    errors = []
    
    for op in operations_list:
        try:
            if op['type'] == 'create':
                # Inline creation logic that should be extracted
                if 'data' in op and isinstance(op['data'], dict):
                    if 'name' in op['data'] and 'email' in op['data']:
                        result = {'id': len(results) + 1, 'status': 'created', 'data': op['data']}
                        results.append(result)
                    else:
                        errors.append({'operation': op, 'error': 'Missing required fields'})
                else:
                    errors.append({'operation': op, 'error': 'Invalid data format'})
            elif op['type'] == 'update':
                # Inline update logic
                if 'id' in op and 'data' in op:
                    result = {'id': op['id'], 'status': 'updated', 'data': op['data']}
                    results.append(result)
                else:
                    errors.append({'operation': op, 'error': 'Missing id or data'})
            elif op['type'] == 'delete':
                # Inline delete logic
                if 'id' in op:
                    result = {'id': op['id'], 'status': 'deleted'}
                    results.append(result)
                else:
                    errors.append({'operation': op, 'error': 'Missing id'})
        except Exception as e:
            errors.append({'operation': op, 'error': str(e)})
    
    # PRODUCTION BLOCKER 7: Debug output
    print(f"Processed {len(results)} operations, {len(errors)} errors")
    
    return {'results': results, 'errors': errors}