/**
 * JavaScript Quality Issues Test App
 * 
 * This application intentionally contains various JavaScript code quality issues
 * for testing the code-quality-checker sub-agent.
 * 
 * WARNING: This code has intentional quality issues and should NOT be used in production!
 */

// LANGUAGE ISSUE 1: var declarations instead of const/let
var express = require('express');
var bodyParser = require('body-parser');
var sqlite3 = require('sqlite3').verbose();

// PRODUCTION BLOCKER 1: Debug statement
console.log('Starting application with debug mode enabled');

// PRODUCTION BLOCKER 2: Hardcoded configuration
var app = express();
var PORT = 3000;
var DB_PATH = './test.db';
var SECRET_KEY = 'hardcoded_secret_123';  // PRODUCTION BLOCKER: Hardcoded secret

// LANGUAGE ISSUE 2: Missing JSDoc documentation
app.use(bodyParser.json());

// PRODUCTION BLOCKER 3: TODO comment
// TODO: Add proper authentication middleware

// STRUCTURE ISSUE 1: Long function exceeding 50 lines
function initializeDatabase() {
    // PRODUCTION BLOCKER 4: Debug output
    console.log('Initializing database...');
    
    var db = new sqlite3.Database(DB_PATH);
    
    // STRUCTURE ISSUE 2: No error handling
    db.serialize(function() {
        db.run(`CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            username TEXT UNIQUE NOT NULL,
            email TEXT NOT NULL,
            password TEXT NOT NULL,
            first_name TEXT,
            last_name TEXT,
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
            updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
            is_active BOOLEAN DEFAULT 1,
            role TEXT DEFAULT 'user',
            last_login DATETIME,
            failed_attempts INTEGER DEFAULT 0,
            locked_until DATETIME,
            profile_picture TEXT,
            bio TEXT,
            phone TEXT,
            address TEXT,
            city TEXT,
            state TEXT,
            zip_code TEXT,
            country TEXT DEFAULT 'US',
            timezone TEXT DEFAULT 'UTC',
            language TEXT DEFAULT 'en',
            notifications BOOLEAN DEFAULT 1,
            email_verified BOOLEAN DEFAULT 0,
            two_factor BOOLEAN DEFAULT 0,
            api_key TEXT,
            preferences TEXT
        )`);
        
        db.run(`CREATE TABLE IF NOT EXISTS posts (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            user_id INTEGER NOT NULL,
            title TEXT NOT NULL,
            content TEXT NOT NULL,
            status TEXT DEFAULT 'draft',
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
            updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
            published_at DATETIME,
            tags TEXT,
            category TEXT,
            view_count INTEGER DEFAULT 0,
            like_count INTEGER DEFAULT 0,
            comment_count INTEGER DEFAULT 0,
            featured BOOLEAN DEFAULT 0,
            meta_description TEXT,
            meta_keywords TEXT,
            FOREIGN KEY (user_id) REFERENCES users (id)
        )`);
        
        // PRODUCTION BLOCKER 5: Hardcoded test data insertion
        db.run("INSERT OR IGNORE INTO users (username, email, password) VALUES ('admin', 'admin@test.com', 'password123')");
        db.run("INSERT OR IGNORE INTO users (username, email, password) VALUES ('testuser', 'test@test.com', 'test123')");
    });
    
    // PRODUCTION BLOCKER 6: More debug output
    console.log('Database initialization complete');
    
    return db;
}

// LANGUAGE ISSUE 3: Missing JSDoc and poor parameter naming
function processUserData(d, opts) {
    // MAINTAINABILITY ISSUE 1: Single letter parameter
    // STRUCTURE ISSUE 3: No error handling
    // LANGUAGE ISSUE 4: Loose equality
    if (d == null) {
        return null;
    }
    
    // MAINTAINABILITY ISSUE 2: Complex nested logic without clear structure
    var result = {};
    for (var key in d) {  // LANGUAGE ISSUE 5: var in loop
        if (d.hasOwnProperty(key)) {
            if (opts && opts.lowercase) {
                if (typeof d[key] == 'string') {  // LANGUAGE ISSUE 6: Loose equality
                    result[key] = d[key].toLowerCase();
                } else {
                    result[key] = d[key];
                }
            } else {
                result[key] = d[key];
            }
        }
    }
    
    return result;
}

// STRUCTURE ISSUE 4: Function with too many parameters
function createUserProfile(username, email, password, firstName, lastName, phone, address, city, state, zip, country, bio) {
    // LANGUAGE ISSUE 7: No JSDoc documentation
    // STRUCTURE ISSUE 5: No input validation
    
    var db = new sqlite3.Database(DB_PATH);
    
    // PRODUCTION BLOCKER 7: SQL injection vulnerability
    var query = `INSERT INTO users (username, email, password, first_name, last_name, phone, address, city, state, zip_code, country, bio) 
                 VALUES ('${username}', '${email}', '${password}', '${firstName}', '${lastName}', '${phone}', '${address}', '${city}', '${state}', '${zip}', '${country}', '${bio}')`;
    
    // STRUCTURE ISSUE 6: No error handling for database operation
    db.run(query, function(err) {
        if (err) {
            console.log('Error creating user:', err.message);  // PRODUCTION BLOCKER 8: Debug output
        } else {
            console.log('User created with ID:', this.lastID);  // PRODUCTION BLOCKER 9: Debug output
        }
    });
    
    db.close();
}

// LANGUAGE ISSUE 8: Using var instead of const for function
var authenticateUser = function(username, password) {  
    // MAINTAINABILITY ISSUE 3: Poor variable naming
    var db = new sqlite3.Database(DB_PATH);
    var result = null;
    
    // SQL injection vulnerability
    var query = `SELECT * FROM users WHERE username = '${username}' AND password = '${password}'`;
    
    // STRUCTURE ISSUE 7: Synchronous database operation (blocking)
    db.get(query, function(err, row) {
        if (err) {
            console.log('Authentication error:', err.message);  // Debug output
            return null;
        }
        
        if (row) {
            console.log('User authenticated:', username);  // PRODUCTION BLOCKER 10: Sensitive logging
            result = row;
        }
    });
    
    db.close();
    return result;
};

// STRUCTURE ISSUE 8: Route handlers should be in separate file/module
app.get('/', function(req, res) {
    // STRUCTURE ISSUE 9: Unused variable
    var unusedVariable = 'This is never used';
    
    res.send('<h1>Quality Issues Test App</h1><a href="/users">View Users</a>');
});

app.get('/users', function(req, res) {
    var db = new sqlite3.Database(DB_PATH);
    
    // STRUCTURE ISSUE 10: No error handling
    db.all('SELECT * FROM users', function(err, rows) {
        if (err) {
            res.status(500).send('Database error');
            return;
        }
        
        // MAINTAINABILITY ISSUE 4: Inline HTML generation instead of templates
        var html = '<h2>Users:</h2><ul>';
        for (var i = 0; i < rows.length; i++) {  // LANGUAGE ISSUE 9: var in loop
            var user = rows[i];  // LANGUAGE ISSUE 10: var declaration
            html += '<li>' + user.username + ' - ' + user.email + '</li>';
        }
        html += '</ul>';
        
        res.send(html);
    });
    
    db.close();
});

app.post('/users', function(req, res) {
    // STRUCTURE ISSUE 11: No input validation
    var userData = req.body;
    
    // PRODUCTION BLOCKER 11: Debug logging of potentially sensitive data
    console.log('Creating user with data:', JSON.stringify(userData));
    
    // STRUCTURE ISSUE 12: Duplicate database connection pattern
    var db = new sqlite3.Database(DB_PATH);
    
    // Another SQL injection opportunity
    var query = `INSERT INTO users (username, email, password) VALUES ('${userData.username}', '${userData.email}', '${userData.password}')`;
    
    db.run(query, function(err) {
        if (err) {
            res.status(500).json({ error: 'Failed to create user' });
        } else {
            res.status(201).json({ message: 'User created', id: this.lastID });
        }
    });
    
    db.close();
});

// PRODUCTION BLOCKER 12: Commented out code block
// app.get('/admin', function(req, res) {
//     // Old admin route - deprecated
//     if (req.query.secret === 'admin123') {
//         res.send('Admin panel');
//     } else {
//         res.status(403).send('Access denied');
//     }
// });
// 
// function oldAuthMethod(user) {
//     return user.username === 'admin' && user.password === 'admin123';
// }

// STRUCTURE ISSUE 13: Global variable usage
var currentUser = null;

// MAINTAINABILITY ISSUE 5: Function with unclear purpose
function doSomething(a, b, c) {  // What does this function do?
    if (a && b) {
        return c ? a + b + c : a + b;
    }
    return 0;
}

// LANGUAGE ISSUE 11: setTimeout with string (anti-pattern)
setTimeout("console.log('Delayed log')", 5000);  // PRODUCTION BLOCKER 13: Debug statement + anti-pattern

// STRUCTURE ISSUE 14: Duplicate error handling pattern
app.get('/posts', function(req, res) {
    var db = new sqlite3.Database(DB_PATH);
    
    db.all('SELECT * FROM posts', function(err, rows) {
        if (err) {
            res.status(500).send('Database error');  // Same error handling as /users
            return;
        }
        
        res.json(rows);
    });
    
    db.close();
});

// LANGUAGE ISSUE 12: == instead of === for null check
app.get('/posts/:id', function(req, res) {
    var postId = req.params.id;
    
    if (postId == null) {  // Should use === null
        res.status(400).json({ error: 'Post ID required' });
        return;
    }
    
    var db = new sqlite3.Database(DB_PATH);
    
    // SQL injection in parameterized-looking query
    var query = `SELECT * FROM posts WHERE id = ${postId}`;  // Should use ? placeholder
    
    db.get(query, function(err, row) {
        if (err) {
            res.status(500).json({ error: 'Database error' });
            return;
        }
        
        if (row == null) {  // LANGUAGE ISSUE 13: == instead of ===
            res.status(404).json({ error: 'Post not found' });
        } else {
            res.json(row);
        }
    });
    
    db.close();
});

// STRUCTURE ISSUE 15: No graceful shutdown handling
process.on('SIGINT', function() {
    console.log('Received SIGINT, shutting down...');  // PRODUCTION BLOCKER 14: Debug output
    process.exit(0);
});

// Initialize database
var db = initializeDatabase();

// Start server
app.listen(PORT, function() {
    // PRODUCTION BLOCKER 15: Debug output on startup
    console.log(`Server running on port ${PORT} in development mode`);
    console.log(`Database path: ${DB_PATH}`);
    console.log(`Secret key: ${SECRET_KEY}`);  // PRODUCTION BLOCKER 16: Logging secret
});

// STRUCTURE ISSUE 16: Unused function
function deprecatedFunction() {
    return 'This function is no longer used';
}