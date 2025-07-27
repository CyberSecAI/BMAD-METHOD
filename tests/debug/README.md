# Debug and Test Utilities

This directory contains debug scripts and test utilities used during development of the VulnerabilityTech agent and sub-agent integration.

## Files

### Debug Scripts

- **`debug_path_join.js`** - Path resolution debugging for sub-agent execution
- **`debug_path_test.js`** - File path validation testing
- **`debug_semgrep_parsing.js`** - Semgrep output parsing debugging

### Test Utilities

- **`test_semgrep_exec.js`** - Semgrep tool execution testing
- **`test_vulnerable_app_semgrep.js`** - Vulnerable app analysis testing

## Usage

These scripts were used during the development and debugging of:

- Sub-agent coordination and execution
- Security tool integration (Semgrep, Safety, pip-audit)
- Path resolution for test fixtures
- Vulnerability parsing and consolidation

## Note

These are development utilities and are not part of the production BMAD Method framework. They are preserved for debugging and development reference purposes.
