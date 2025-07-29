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
# Test VulnerabilityTech agent
npm run test:agent -- vulnerabilityTech

# Test Code Quality Checker agent
npm run test:agent -- code-quality-checker

# Test Security agent
npm run test:agent -- security
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
- **Python security analysis**: Uses intentionally vulnerable Flask application
- **SAST + LLM hybrid analysis**: Tests Semgrep-Enhanced sub-agent integration
- **Business logic analysis**: Tests Custom-Analysis sub-agent capabilities
- **Dependency scanning**: Tests Safety-Scanner sub-agent functionality
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
# Test VulnerabilityTech agent
npm run test:vulnerabilitytech

# Test Code Quality Checker agent
npm run test:code-quality-checker
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

## Test Results Example

When you run `npm run test:vulnerabilitytech` or `npm run test:code-quality-checker`, you'll see output like:

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
  │  └─ Safety-Scanner complete: 12 dependency vulnerabilities
  └─ Correlating findings across sub-agents...

📊 Specialized Security Review Complete
   • Critical: 8 issues
   • High: 12 issues
   • Medium: 10 issues

  ✅ Execution: *specialized-security-review (2850ms)
  ✅ Validation: 100% passed

📊 Test Summary for vulnerabilityTech Agent
════════════════════════════════════════
Tests Executed: 1
Successful Executions: 1/1 (100%)
Passed Validations: 1/1 (100%)

🎉 All tests passed!
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

Each test run creates multiple report formats:

- **JSON Report** (`tests/reports/test-report-latest.json`): Complete structured data including findings with file:line:column
- **Markdown Report** (`tests/reports/test-report-latest.md`): Human-readable summary
- **HTML Report** (`tests/reports/test-report-*.html`): Interactive web view

The JSON report contains the structured findings in `metadata.findings` that agents can directly use to make code fixes.

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
