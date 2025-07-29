# BMAD Method Test Framework

## Overview

Comprehensive test framework for validating BMAD Method agents, workflows, and integrations. Supports automated testing of security analysis, agent coordination, and end-to-end development workflows.

## Directory Structure

```
tests/
├── agents/                     # Agent-specific tests
│   ├── vulnerabilityTech/      # VulnerabilityTech agent tests
│   ├── code-quality-checker/   # Code Quality Checker agent tests
│   ├── security/               # Security agent tests
│   ├── dev/qa/sm/architect/    # Other agent tests
├── workflows/                  # Workflow-specific tests
├── integration/                # Cross-agent integration tests
├── fixtures/                   # Shared test fixtures and sample projects
├── scripts/                    # Test automation scripts
└── lib/                        # Test framework libraries
```

## Quick Start

### Run All Tests

```bash
npm run test:all
```

### Run Agent-Specific Tests

```bash
# Test VulnerabilityTech agent (comprehensive security analysis)
npm run test:vulnerabilitytech

# Test VulnerabilityTech sub-agent coordination
npm run test:subagents

# Test individual Semgrep triage analysis
npm run test:triage

# Test Code Quality Checker agent
npm run test:code-quality

# Test Security agent
npm run test:security
```

### Run Integration Tests

```bash
npm run test:integration
```

### Run Workflow Tests

```bash
npm run test:workflow
```

## Test Categories

### Agent Tests (`tests/agents/`)

Individual agent functionality testing:

- Command execution validation
- Output format verification
- Sub-agent coordination (for VulnerabilityTech)
- Integration with framework components

### Workflow Tests (`tests/workflows/`)

Complete workflow validation:

- Greenfield development workflows
- Brownfield integration workflows
- Security compliance workflows

### Integration Tests (`tests/integration/`)

Cross-component testing:

- Agent handoffs and communication
- Story lifecycle management
- Compliance workflow validation

## Adding New Tests

### For a New Agent

1. Create directory: `tests/agents/{agent_name}/`
2. Add fixtures: `tests/agents/{agent_name}/fixtures/`
3. Create integration tests: `tests/agents/{agent_name}/integration/`
4. Define expected results: `tests/agents/{agent_name}/expected_results/`

### For a New Workflow

1. Create directory: `tests/workflows/{workflow_name}/`
2. Add test scenarios and expected outcomes
3. Update test runner configuration

## Test Framework Components

### Scripts (`tests/scripts/`)

- `run_agent_test.js` - Execute agent-specific tests
- `run_workflow_test.js` - Execute workflow tests
- `run_integration_test.js` - Execute integration tests
- `test_utils.js` - Shared testing utilities

### Libraries (`tests/lib/`)

- `agent_runner.js` - Agent execution utilities
- `result_validator.js` - Result validation framework
- `test_reporter.js` - Test reporting and output

### Fixtures (`tests/fixtures/`)

- Sample projects for different technology stacks
- Reusable test scenarios and data
- Template files for consistent testing

## Current Test Coverage

### ✅ VulnerabilityTech Agent

- **Sub-agent coordination testing**: Validates Level 2 → Level 3 orchestration
- **Vulnerable test application**: Uses intentionally insecure Flask app with multiple CVEs
- **SAST + LLM hybrid analysis**: Tests Semgrep-Enhanced sub-agent integration
- **Business logic analysis**: Tests Custom-Analysis sub-agent capabilities
- **Dependency scanning**: Tests Safety-Scanner sub-agent functionality
- **Individual triage analysis**: Tests Semgrep-Triage sub-agent for false positive reduction
- **Intelligent correlation**: Validates cross-sub-agent finding correlation
- **Performance validation**: Tests execution time and resource usage

### ✅ Code Quality Checker Agent

- **Production readiness assessment**: Validates code quality for deployment
- **Multi-language support**: Tests Python, JavaScript quality analysis
- **Quality scoring system**: 0-100 scale with letter grades (A-F)
- **Categorized findings**: Critical (production blockers), High (structure), Medium (language-specific), Low (maintainability)
- **Structured findings with precise locations**: Reports include file:line:column details for agents to make fixes
- **Auto-fix capabilities**: Identifies which issues can be automatically resolved
- **Machine-readable JSON output**: Structured findings for agent-to-agent communication
- **Performance validation**: Sub-second execution for typical codebases
- **Comprehensive test fixtures**: Realistic code with intentional quality issues
- **Integration testing**: Works within BMAD Method Software Assurance Framework

### 🚧 In Development

- Security agent planning phase testing
- Cross-agent handoff validation
- Complete workflow integration testing

### 📋 Planned

- All core agents (Dev, QA, SM, Architect)
- End-to-end story lifecycle testing
- Performance benchmarking framework

## Getting Started

### 1. Setup Test Environment

```bash
npm run test:setup
```

### 2. Run Your First Test

```bash
# Test VulnerabilityTech agent with vulnerable Flask app
npm run test:vulnerabilitytech

# Test Code Quality Checker agent
npm run test:code-quality
```

### 3. View Generated Reports

```bash
# Reports are saved to tests/reports/
# Open the HTML report in your browser for interactive viewing
```

## Test Results and Structured Findings

The code quality checker now generates structured JSON findings with precise file:line:column locations that agents can use to make fixes. The test reports include both human-readable summaries and machine-readable structured data.

### Accessing Structured Findings

Test reports contain detailed findings in the `metadata.findings` section:

```json
{
  "findings": {
    "critical": [
      {
        "id": "TODO-001",
        "rule": "production-blocker-todo",
        "severity": "critical",
        "file": "main.py",
        "line": 21,
        "column": 1,
        "message": "TODO comment found in production code",
        "autoFixable": false,
        "fixSuggestion": "Complete the user validation implementation"
      }
    ],
    "medium": [
      {
        "id": "RUFF-F401-001",
        "rule": "F401",
        "file": "main.py",
        "line": 3,
        "column": 1,
        "autoFixable": true,
        "autoFix": "import sys",
        "ruffCommand": "ruff check --fix main.py"
      }
    ]
  }
}
```

### How Agents Use Structured Findings

1. **Precise Location**: `file:line:column` allows agents to navigate to exact issue locations
2. **Auto-fix Information**: `autoFixable` and `autoFix` fields provide ready-to-apply solutions
3. **Command Integration**: `ruffCommand` provides executable fix commands for Python issues
4. **Categorized Severity**: Critical/High/Medium/Low helps agents prioritize fixes

## Vulnerable Test Application

The VulnerabilityTech agent tests use an intentionally vulnerable Flask application located at:
`tests/agents/vulnerabilityTech/fixtures/python/vulnerable_app/`

### Security Vulnerabilities Included

The test application contains multiple intentional security flaws:

#### **Code-Level Vulnerabilities**

- **SQL Injection**: Direct string concatenation in database queries (main.py:81)
- **Command Injection**: Unsanitized user input passed to subprocess (main.py:67)
- **Cross-Site Scripting (XSS)**: Unsafe template rendering (main.py:123-128)
- **Hardcoded Secrets**: Secret keys embedded in source code (main.py:20)
- **Path Traversal**: Unvalidated file path operations (main.py:156)
- **Insecure Cryptographic Storage**: Weak hashing algorithms (auth.py:23)
- **Authentication Bypass**: Session fixation vulnerabilities (auth.py:45)

#### **dependency Vulnerabilities**

The `requirements.txt` includes outdated packages with known CVEs:

- **Flask 1.0.2**: CVE-2019-1010083 (Improper Input Validation)
- **Jinja2 2.10.1**: CVE-2019-10906 (Sandbox escape)
- **Werkzeug 0.15.3**: CVE-2019-14806 (Insufficient validation)
- **requests 2.19.1**: CVE-2018-18074 (HTTP header injection)
- **PyYAML 3.13**: CVE-2017-18342 (Arbitrary code execution)
- **Pillow 5.2.0**: Multiple buffer overflow CVEs
- **cryptography 2.3.1**: CVE-2018-10903 (GCM tag forgery)
- **urllib3 1.23**: CVE-2019-11324 (Certificate verification bypass)

### Test Commands for Vulnerable App

```bash
# Comprehensive security analysis (tests both code and dependencies)
npm run test:vulnerabilitytech

# Sub-agent coordination testing
npm run test:subagents

# Individual Semgrep triage analysis
npm run test:triage
```

### Expected Test Results

The vulnerable app typically generates:

- **Critical findings**: 15+ security vulnerabilities
- **Total findings**: 120+ issues (including dependencies)
- **Sub-agent coordination**: 5 sub-agents (Security-Reviewer, Semgrep-Enhanced, Custom-Analysis, Safety-Scanner, Semgrep-Triage)
- **Execution time**: 25-30 seconds for comprehensive analysis

**⚠️ Important**: This application is intentionally insecure and should NEVER be deployed or used in production environments.

## Test Results Example

When you run `npm run test:vulnerabilitytech` or `npm run test:code-quality`, you'll see output like:

```
🚀 Starting tests for vulnerabilityTech agent...

📋 Testing command: *specialized-security-review

🔍 VulnerabilityTech Agent Activated
📋 Initiating specialized security review...
🤖 Coordinating sub-agents:
  ├─ Activating Security-Reviewer sub-agent...
  │  ├─ Executing Semgrep-Enhanced analysis...
  │  │  ├─ LLM code analysis: Found 8 business logic vulnerabilities
  │  │  ├─ Semgrep SAST scan: Found 12 pattern-based vulnerabilities
  │  │  └─ Intelligent correlation: 15 high-confidence findings
  │  └─ Security-Reviewer complete: 23 total vulnerabilities identified
  ├─ Activating Safety-Scanner sub-agent...
  │  └─ Safety-Scanner complete: 83 dependency vulnerabilities
  └─ Correlating findings across sub-agents...

📊 Specialized Security Review Complete
   • Critical: 15 issues (SQL injection, command injection, XSS)
   • High: 0 issues (filtered by triage analysis)
   • Medium: 112 issues (dependencies + configuration)

  ✅ Execution: *specialized-security-review (28.0s)
  ❌ Validation: 80% passed (security_findings_count outside expected range)

📊 Test Summary for vulnerabilityTech Agent
════════════════════════════════════════
Tests Executed: 2 (*specialized-security-review, *dependency-security-scan)
Successful Executions: 2/2 (100%)
Passed Validations: 1/2 (50%)
Total Duration: 42.6s

📄 Reports Generated:
  • Consolidated Security Report: tests/reports/consolidated-security-report.md
  • JSON Report: tests/reports/test-report-latest.json
  • HTML Report: tests/reports/test-report-*.html

⚠️ Some validation tests failed - this is expected with the vulnerable test app
   which generates more findings than the baseline expectations.
```

### Code Quality Checker Test Example

```
🚀 Starting tests for code-quality-checker agent...

📋 Testing command: *help

🔍 Code Quality Checker Agent Activated
📋 Analyzing codebase for production readiness...

🤖 Quality Analysis Results:
- Files analyzed: 4 Python source files
- Overall quality score: 25/100 (Grade F)
- Production readiness: NOT READY - Critical blockers found
- Total issues: 4 findings with precise locations

Structured Findings Generated:
✓ Found 4 structured findings with file:line:column locations
✓ 2 auto-fixable issues identified with remediation commands
✓ JSON output ready for agent consumption

Production Blockers (with precise locations):
1. **main.py:21** - TODO comment found in production code [Manual fix required]
2. **main.py:28** - Debug print statement [Auto-fixable: replace with logging.debug()]
3. **main.py:3** - Unused 'os' import [Auto-fixable: ruff check --fix main.py]
4. **main.py:45** - Function exceeds 50 line limit [Refactoring required]

  ✅ Execution: *help (102ms)
  ✅ Validation: 100% passed
  ✓ Structured findings extracted and stored in metadata

📊 Test Summary for code-quality-checker Agent
════════════════════════════════════════
Tests Executed: 1
Successful Executions: 1/1 (100%)
Passed Validations: 1/1 (100%)
Structured Findings: 4 with precise locations

🎉 All tests passed with actionable findings!
```

### Report Files Generated

Each test run creates multiple report formats with consistent, agent-based naming:

#### **Naming Convention**

- **Single Command**: `test-report-{agent-name}-{command-name}.{format}`
- **Multiple Commands**: `test-report-{agent-name}-comprehensive.{format}`

#### **Report Formats**

- **JSON Report**: Complete structured data including findings with file:line:column locations
- **Markdown Report**: Human-readable summary for documentation
- **HTML Report**: Interactive web view for browser viewing

#### **Example Filenames**

```
# Single command tests
test-report-code-quality-checker-help.json
test-report-vulnerabilitytech-individual-semgrep-triage.md

# Multi-command comprehensive tests
test-report-vulnerabilitytech-comprehensive.html

# Latest symlinks (always point to most recent)
test-report-latest.json
test-report-latest.md
```

The JSON reports contain structured findings in `metadata.findings` that agents can directly use to make code fixes. These consistent filenames make it easy to save reports in version control and track testing history.

## Contributing

When adding new tests:

1. Follow the established directory structure
2. Include both positive and negative test cases
3. Provide clear expected results
4. Update this README with new test categories
5. Ensure tests are deterministic and repeatable

## Dependencies

Test framework uses:

- Node.js for test automation
- Local security tools (Semgrep, Safety, pip-audit)
- BMAD Method core framework
- Claude Code sub-agent architecture

## Performance Considerations

Tests are designed to:

- Run efficiently in CI/CD environments
- Use local tools for security and speed
- Provide clear pass/fail results
- Generate detailed debugging information when tests fail

For questions or issues with the test framework, see the implementation plan in `logs/vulnerabilitytech-test-framework-plan.md`.

## Directory Structure

```
tests/                          # Test data and fixtures
├── agents/                     # Agent-specific test configurations
├── fixtures/                   # Test data and sample projects
├── integration/                # Integration test scenarios
└── reports/                    # Generated test reports

tools/testing/                  # Test tooling and scripts (Node.js)
├── lib/                        # Test framework libraries
│   ├── agent_runner.js         # Core test execution engine
│   ├── result_validator.js     # Test result validation
│   ├── task_tool_interface.js  # Sub-agent tool interface
│   └── test_reporter.js        # Report generation
├── run_agent_test.js           # Agent testing script
├── run_integration_test.js     # Integration testing script
├── run_workflow_test.js        # Workflow testing script
└── setup_test_environment.js   # Test environment setup
```
