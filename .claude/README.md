# Claude Code Sub-Agents Integration Architecture

## Overview

This document explains the hybrid architecture that integrates Claude Code sub-agents with the BMad Method framework for enhanced security analysis. The architecture combines SAST tools (like Semgrep) with LLM analysis for comprehensive, context-aware security assessment.

## Implementation Status

✅ **COMPLETED**: Core sub-agent integration is now fully implemented and operational.

### Recently Completed
- ✅ VulnerabilityTech agent enhanced with sub-agent coordination capabilities
- ✅ Four new sub-agent delegation tasks implemented:
  - `*specialized-security-review` - Multi sub-agent orchestration
  - `*dependency-security-scan` - Dependency scanner sub-agent coordination
  - `*pattern-security-analysis` - Pattern analyzer sub-agent coordination  
  - `*test-security-validation` - Test validator sub-agent coordination
- ✅ Comprehensive testing infrastructure with fixtures and validation
- ✅ Updated web bundles generated with sub-agent support
- ✅ YAML configuration validation passed
- ✅ End-to-end testing completed with sub-agent coordination validation

## Architecture Diagram

```mermaid
graph TD
    A[User Request] --> B[VulnerabilityTech Agent]
    B --> C[*specialized-security-review]
    
    C --> D[Security-Reviewer Sub-Agent]
    C --> E[Dependency-Scanner Sub-Agent]
    C --> F[Pattern-Analyzer Sub-Agent]
    C --> G[Test-Validator Sub-Agent]
    
    D --> H[Semgrep-Enhanced Sub-Agent]
    D --> I[Custom-Analysis Sub-Agent]
    
    E --> J[Safety-Scanner Sub-Agent]
    E --> K[NPM-Audit Sub-Agent]
    
    F --> L[Pattern-Detection Sub-Agent]
    F --> M[Framework-Analysis Sub-Agent]
    
    G --> N[Test-Coverage Sub-Agent]
    G --> O[Security-Test Sub-Agent]
    
    H --> P[Semgrep Tool]
    H --> Q[LLM Code Analysis]
    H --> R[Results Correlation]
    
    style A fill:#e1f5fe
    style B fill:#f3e5f5
    style C fill:#e8f5e8
    style D fill:#fff3e0
    style E fill:#fff3e0
    style F fill:#fff3e0
    style G fill:#fff3e0
    style H fill:#ffebee
    style I fill:#ffebee
    style P fill:#fce4ec
    style Q fill:#fce4ec
    style R fill:#fce4ec
```

## Component Hierarchy

### **Level 1: BMad Agents**
- **VulnerabilityTech Agent**: Master coordinator for security analysis
- **Commands**: `*specialized-security-review`, `*dependency-security-scan`, etc.
- **Role**: Orchestrates comprehensive security assessment workflows

### **Level 2: Specialized Sub-Agents**
- **Security-Reviewer**: Code vulnerability analysis coordination
- **Dependency-Scanner**: Third-party component security assessment
- **Pattern-Analyzer**: Secure coding pattern validation
- **Test-Validator**: Security test coverage and quality analysis

### **Level 3: Tool-Specific Sub-Agents**
- **Semgrep-Enhanced**: Hybrid SAST + LLM analysis
- **Safety-Scanner**: Python dependency vulnerability scanning
- **NPM-Audit**: Node.js dependency security assessment
- **Custom-Analysis**: Pure LLM business logic analysis

### **Level 4: Security Tools**
- **Semgrep**: Static analysis security testing
- **Ruff**: Python code quality and security linting
- **Safety**: Python dependency vulnerability scanner
- **NPM Audit**: Node.js dependency vulnerability scanner

## Hybrid SAST + LLM Analysis Workflow

### **Phase 1: LLM Primary Analysis**

```mermaid
sequenceDiagram
    participant SA as Security-Reviewer Sub-Agent
    participant SE as Semgrep-Enhanced Sub-Agent
    participant LLM as LLM Analysis Engine
    participant SG as Semgrep Tool
    
    SA->>SE: Request security analysis
    SE->>LLM: Analyze source code directly
    Note over LLM: Read code files<br/>Understand business logic<br/>Identify potential vulnerabilities
    LLM-->>SE: Initial vulnerability assessment
    SE->>SG: Run targeted Semgrep scan
    SG-->>SE: SAST findings (JSON)
    SE->>SE: Correlate LLM + SAST results
    SE-->>SA: Enhanced security analysis report
```

### **Phase 2: Code Provision Strategy**

The code is provided to LLM analysis through Claude Code's file access capabilities:

```markdown
## Code Access Methods

### 1. Direct File Reading
```python
# Semgrep-Enhanced Sub-Agent uses Read tool
file_content = read_file("src/auth/login.py")

# LLM analyzes the actual source code:
def login(username, password):
    # LLM sees actual implementation
    query = f"SELECT * FROM users WHERE username='{username}'"
    cursor.execute(query)
    return cursor.fetchone()
```

### 2. Targeted Code Analysis
```python
# Pattern-Analyzer Sub-Agent uses Glob + Read tools
security_files = glob_pattern("**/*auth*.py")
for file_path in security_files:
    code_content = read_file(file_path)
    # LLM analyzes each file for security patterns
```

### 3. Context-Aware Analysis
```python
# Custom-Analysis Sub-Agent for business logic
business_logic_files = [
    "src/payments/processor.py",
    "src/auth/permissions.py", 
    "src/api/validators.py"
]

for file_path in business_logic_files:
    code = read_file(file_path)
    # LLM analyzes with business context understanding
```
```

## Enhanced Analysis Example

### **Input: Python Payment Processing Code**

```python
# src/payments/processor.py
def process_payment(user_id, amount, card_number):
    """Process payment for user"""
    
    # Business logic that LLM can understand
    if not user_id:
        return {"error": "Invalid user"}
    
    # Missing authorization check (LLM detects)
    # Missing amount validation (LLM detects)
    
    # SQL injection vulnerability (both LLM and Semgrep detect)
    query = f"INSERT INTO payments (user_id, amount) VALUES ({user_id}, {amount})"
    cursor.execute(query)
    
    # Sensitive data handling (LLM understands context)
    log.info(f"Processing payment for {user_id}: ${amount}")
    
    return {"success": True, "payment_id": payment_id}
```

### **LLM Analysis Process**

```markdown
## LLM Security Analysis

### 1. Business Logic Understanding
- **Function Purpose**: Payment processing (high-security context)
- **Data Sensitivity**: card_number (PCI compliance), amount (financial)
- **User Context**: user_id requires authorization validation
- **Business Rules**: Payment amounts need validation

### 2. Security Vulnerability Detection
- **Authorization Gap**: No check if user_id can process payments
- **Input Validation**: Missing amount validation (negative, zero, maximum)
- **SQL Injection**: String formatting in database query
- **Data Exposure**: Logging sensitive payment information
- **Error Handling**: Generic error messages may aid attackers

### 3. Framework-Specific Analysis
- **Database ORM**: Not using parameterized queries
- **Logging Framework**: Exposing sensitive data in logs
- **Authentication**: Missing user session validation
```

### **Semgrep Validation**

```bash
# Semgrep execution by Semgrep-Enhanced Sub-Agent
semgrep \
  --config=python \
  --config=security-audit \
  --config=sql-injection \
  --config=owasp-top-ten \
  --json \
  src/payments/
```

```json
{
  "results": [
    {
      "check_id": "python.lang.security.audit.sql-injection-f-string",
      "path": "src/payments/processor.py",
      "start": {"line": 11, "col": 5},
      "end": {"line": 11, "col": 78},
      "message": "Detected SQL statement formatted with f-string",
      "severity": "ERROR",
      "metadata": {
        "cwe": "CWE-89: SQL Injection",
        "owasp": "A03:2021 – Injection"
      }
    }
  ]
}
```

### **Intelligent Correlation**

```markdown
## Enhanced Analysis Report

### High-Confidence Findings (LLM + SAST Agreement)
1. **SQL Injection Vulnerability**
   - **LLM Finding**: String formatting in SQL query creates injection risk
   - **Semgrep Finding**: `sql-injection-f-string` rule match
   - **Business Context**: Payment processing vulnerability = financial fraud risk
   - **CVSS Score**: 9.8 (Critical)
   - **Remediation**: Use parameterized queries

### LLM-Specific Findings (Business Logic)
2. **Missing Authorization Control**
   - **Finding**: No validation that user_id can process payments
   - **Business Impact**: Users could process payments for other accounts
   - **CVSS Score**: 8.5 (High)
   - **Remediation**: Add authorization middleware

3. **Payment Amount Validation Gap**
   - **Finding**: No validation of payment amount (negative, zero, limits)
   - **Business Impact**: Fraudulent transactions, business logic bypass
   - **CVSS Score**: 7.2 (High)
   - **Remediation**: Implement business rule validation

### Data Protection Issues
4. **Sensitive Data Logging**
   - **Finding**: Payment details logged in plain text
   - **Compliance Impact**: PCI DSS violation
   - **CVSS Score**: 6.5 (Medium)
   - **Remediation**: Remove sensitive data from logs
```

## Sub-Agent Implementation Details

### **Directory Structure**

```
.claude/
├── agents/
│   ├── security-reviewer.md          # L2: Security coordination
│   ├── dependency-scanner.md         # L2: Dependency analysis
│   ├── pattern-analyzer.md           # L2: Pattern validation
│   ├── test-validator.md             # L2: Test analysis
│   └── tools/
│       ├── semgrep-enhanced.md       # L3: Hybrid SAST+LLM
│       ├── custom-analysis.md        # L3: Pure LLM analysis
│       ├── safety-scanner.md         # L3: Python dependencies
│       ├── npm-audit.md              # L3: Node.js dependencies
│       └── ruff-validator.md         # L3: Python code quality
└── config/
    ├── security-tools.yaml           # Tool configurations
    └── analysis-patterns.yaml        # Analysis patterns
```

### **Tool Configuration Example**

```yaml
# .claude/config/security-tools.yaml
languages:
  python:
    static_analysis:
      primary:
        tool: semgrep
        configs: ["python", "django", "flask", "security-audit", "owasp-top-ten"]
        severity: ["ERROR", "WARNING"]
      secondary:
        tool: ruff
        rules: ["S", "B", "A"]  # Security, bugbear, flake8-builtins
    
    dependency_scan:
      tools:
        - safety
        - pip-audit
      
    frameworks:
      django:
        semgrep_configs: ["django", "django-security"]
        focus_areas: ["ORM", "middleware", "authentication"]
      flask:
        semgrep_configs: ["flask", "flask-security"]
        focus_areas: ["routes", "sessions", "templating"]

  javascript:
    static_analysis:
      primary:
        tool: semgrep
        configs: ["javascript", "react", "nodejs", "security-audit"]
      secondary:
        tool: eslint
        plugins: ["security", "@typescript-eslint"]
```

## Implementation Benefits

### **Enhanced Accuracy**
- **Reduced False Positives**: LLM validates SAST findings with business context
- **Better Coverage**: LLM catches business logic flaws SAST tools miss
- **Context-Aware Analysis**: Understanding of framework usage and business rules

### **Improved Actionability**
- **Business Impact Assessment**: LLM explains real-world implications
- **Prioritized Remediation**: Risk-based prioritization with business context
- **Framework-Specific Guidance**: Tailored recommendations for technology stack

### **Comprehensive Security**
- **Multi-Layer Analysis**: SAST tools + LLM analysis + dependency scanning
- **Continuous Integration**: Automated analysis in development workflows
- **Standards Compliance**: NIST SSDF practice validation and reporting

## Usage Examples

### **Basic Security Review**
```bash
# VulnerabilityTech Agent command
*specialized-security-review

# This triggers:
# 1. Security-Reviewer sub-agent coordination
# 2. Semgrep-Enhanced hybrid analysis
# 3. Custom business logic analysis
# 4. Results correlation and reporting
```

### **Focused Dependency Scan**
```bash
# VulnerabilityTech Agent command
*dependency-security-scan

# This triggers:
# 1. Dependency-Scanner sub-agent
# 2. Language-specific dependency tools
# 3. Supply chain security assessment
# 4. NIST SSDF PW.3 compliance validation
```

### **Pattern Analysis**
```bash
# VulnerabilityTech Agent command
*pattern-security-analysis

# This triggers:
# 1. Pattern-Analyzer sub-agent
# 2. Secure coding pattern detection
# 3. Framework-specific security validation
# 4. NIST SSDF PW.4 compliance assessment
```

### **Test Security Validation**
```bash
# VulnerabilityTech Agent command
*test-security-validation

# This triggers:
# 1. Test-Validator sub-agent
# 2. Security test coverage analysis
# 3. Test quality and effectiveness assessment
# 4. NIST SSDF PW.7 compliance validation
```

## Testing and Validation

The sub-agent integration includes comprehensive testing infrastructure:

- **Test Framework**: Located in `tests/` directory with agent-specific test suites
- **Validation Scripts**: `npm run test:subagents` for sub-agent coordination testing
- **Test Reports**: Automated generation in `tests/reports/` with JSON, Markdown, and HTML formats
- **Performance Monitoring**: Sub-agent execution time and effectiveness tracking

## Ready for Production

This hybrid architecture provides comprehensive, context-aware security analysis that combines the precision of SAST tools with the understanding and flexibility of LLM analysis, all integrated seamlessly within the BMad Method framework. The implementation is now complete and ready for production use.