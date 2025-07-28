# Mermaid Diagram Syntax Guide

## CRITICAL MERMAID SYNTAX RULES

**LLMs frequently generate broken Mermaid diagrams due to syntax violations. Follow these rules strictly:**

### ❌ FORBIDDEN CHARACTERS IN NODE LABELS

- **NO double quotes (`"`)** in any node labels
- **NO parentheses (`()`)** in any node labels
- **NO single quotes (`'`)** in node labels
- **NO special characters** like `@#$%^&*+=<>?/\|`
- **NO colons (`:`)** in node labels (conflicts with Mermaid syntax)
- **NO numbered lists (1. 2. 3.)** in node labels - these break Mermaid parsing

### ✅ CORRECT NODE LABEL SYNTAX

**Use square brackets `[]` for labels with spaces:**

```mermaid
graph TD
    nodeId[Node Label With Spaces]
    auth[User Authentication]
    data[Database Access]
```

**Use simple identifiers without spaces for short labels:**

```mermaid
graph TD
    start --> process --> end
```

### 📋 LABEL FORMATTING GUIDELINES

**Replace problematic characters:**

- `Authentication (OAuth)` → `Authentication - OAuth`
- `"Admin" Access` → `Admin Access`
- `User: Login Flow` → `User Login Flow`
- `DB (PostgreSQL)` → `DB - PostgreSQL`
- `API Gateway (Rate Limited)` → `API Gateway - Rate Limited`
- `1. Discover API endpoint` → `Discover API endpoint`
- `2. Send tampered request` → `Send tampered request`

### 🔧 COMMON FIXES

**WRONG:**

```mermaid
graph TD
    root["Compromise Application (Critical)"]
    auth["Gain "Admin" Access"]
    db["Database: PostgreSQL (Port 5432)"]
    step1["1. Discover endpoint"]
    step2["2. Send request"]
```

**CORRECT:**

```mermaid
graph TD
    root[Compromise Application - Critical]
    auth[Gain Admin Access]
    db[Database PostgreSQL Port 5432]
    step1[Discover endpoint]
    step2[Send request]
```

### 📊 DIAGRAM TYPES AND SYNTAX

**Flowchart/Graph:**

```mermaid
graph TD
    A[Start] --> B[Process]
    B --> C[Decision]
    C -->|Yes| D[Action]
    C -->|No| E[End]
```

**Sequence Diagram:**

```mermaid
sequenceDiagram
    participant User
    participant App
    participant DB

    User->>App: Login Request
    App->>DB: Validate User
    DB-->>App: User Valid
    App-->>User: Login Success
```

### ⚠️ VALIDATION CHECKLIST

Before generating any Mermaid diagram, verify:

- [ ] No double quotes in node labels
- [ ] No parentheses in node labels
- [ ] No colons in node labels (except for diagram syntax)
- [ ] Labels with spaces use square brackets `[]`
- [ ] All node connections use proper arrow syntax
- [ ] Diagram type is correctly specified

### 🛠️ ERROR DETECTION PATTERNS

**Common broken patterns to avoid:**

- `node["Label with "quotes""]`
- `node["Label (with parentheses)"]`
- `node["Label: with colon"]`
- `node['Label with single quotes']`
- `node["1. First step"]`
- `node["2. Second step"]`

**Safe replacement patterns:**

- `node[Label with quotes removed]`
- `node[Label - with dashes instead]`
- `node[Label with colon removed]`
- `node[Label without quotes]`
- `node[First step]`
- `node[Second step]`

### 📖 EXAMPLES BY SECURITY CONTEXT

**Threat Modeling Attack Tree:**

```mermaid
graph TD
    root[Compromise System]
    auth[Bypass Authentication]
    root --> auth

    token[Token Manipulation]
    brute[Brute Force Attack]
    auth --> token
    auth --> brute

    jwt[JWT Forgery]
    session[Session Hijacking]
    token --> jwt
    token --> session
```

**Data Flow Diagram:**

```mermaid
graph LR
    user[User] --> web[Web App]
    web --> api[API Gateway]
    api --> auth[Auth Service]
    api --> db[Database]
    auth --> ldap[LDAP Server]
```

**Security Architecture:**

```mermaid
graph TD
    internet[Internet] --> waf[Web Application Firewall]
    waf --> lb[Load Balancer]
    lb --> web1[Web Server 1]
    lb --> web2[Web Server 2]
    web1 --> app[Application Layer]
    web2 --> app
    app --> db[Database Layer]
```

## IMPLEMENTATION NOTES FOR AGENTS

When generating Mermaid diagrams:

1. **Pre-process labels**: Remove or replace forbidden characters before diagram generation
2. **Validate syntax**: Check for common violations before outputting
3. **Test rendering**: If possible, validate that the diagram would render correctly
4. **Provide alternatives**: If a complex label is needed, use a simple label and explain in accompanying text

## ERROR RECOVERY

If a Mermaid diagram fails to render:

1. **Check for quotes and parentheses** in node labels
2. **Simplify complex labels** by removing special characters
3. **Use dashes instead of parentheses** for clarification
4. **Break long labels** into shorter, simpler text
5. **Verify arrow syntax** is correct (`-->`, `->>`, `-->>`)

Remember: **Simple, clean labels make better diagrams than complex, broken ones.**
