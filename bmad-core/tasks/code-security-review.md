# Code Security Review Task

## Purpose

Perform comprehensive security review of source code to identify vulnerabilities, security weaknesses, and compliance gaps. This task focuses on implementation-level security analysis using both automated tools and manual inspection techniques.

## Usage Scenarios

### Scenario 1: Post-Development Security Review
For code that has been implemented and needs security validation:
1. **Static Analysis**: Run automated security scanning tools on codebase
2. **Manual Review**: Examine critical code paths and security-sensitive functions
3. **Configuration Review**: Validate security configurations and settings
4. **Dependency Analysis**: Check for vulnerable third-party dependencies

### Scenario 2: Pre-Deployment Security Gate
Before deploying code to production:
1. **Vulnerability Scan**: Comprehensive scan for known vulnerabilities
2. **Compliance Check**: Verify adherence to security standards
3. **Risk Assessment**: Evaluate identified issues for business impact
4. **Remediation Planning**: Prioritize and plan fixes for identified issues

### Scenario 3: Security Incident Response
When investigating potential security issues:
1. **Focused Analysis**: Deep dive into suspected vulnerable code areas
2. **Impact Assessment**: Determine scope and severity of potential vulnerabilities
3. **Patch Validation**: Verify effectiveness of security fixes
4. **Root Cause Analysis**: Understand how vulnerabilities were introduced

## Task Instructions

### 1. Pre-Review Setup

**Environment Preparation:**
- Verify access to complete source code repository
- Ensure security scanning tools are available and configured
- Identify target deployment environment and configurations
- Gather relevant security requirements and compliance standards

**Scope Definition:**
- Define code review boundaries (entire codebase vs specific modules)
- Identify critical security-sensitive components to prioritize
- Determine applicable security standards (OWASP, CWE, etc.)
- Set timeline and resource allocation for review

### 2. Automated Security Analysis

**Static Analysis Security Testing (SAST):**
- Configure and run appropriate SAST tools for the technology stack
- Analyze results for high and medium severity findings
- Filter false positives and validate genuine vulnerabilities
- Document tool configurations and scanning parameters used

**Dependency Vulnerability Scanning:**
- Scan all third-party dependencies for known vulnerabilities
- Check for outdated packages with available security updates
- Validate licenses for compliance requirements
- Generate dependency vulnerability report with remediation priorities

**Configuration Security Analysis:**
- Review application configuration files for security misconfigurations
- Validate security headers, encryption settings, and access controls
- Check environment-specific configurations (dev, staging, prod)
- Identify hardcoded secrets, credentials, or sensitive information

### 3. Manual Code Review

**Security-Critical Code Paths:**
- Review authentication and authorization mechanisms
- Examine input validation and sanitization routines
- Analyze cryptographic implementations and key management
- Validate session management and state handling

**Common Vulnerability Patterns:**
- **Injection Vulnerabilities**: SQL injection, command injection, LDAP injection
- **Cross-Site Scripting (XSS)**: Reflected, stored, and DOM-based XSS
- **Access Control Issues**: Broken authentication, insufficient authorization
- **Cryptographic Failures**: Weak algorithms, poor key management, improper usage
- **Security Misconfigurations**: Default configurations, unnecessary features enabled
- **Vulnerable Components**: Outdated libraries, unpatched dependencies

**Data Flow Analysis:**
- Trace sensitive data from input to output
- Validate proper data sanitization at trust boundaries
- Ensure secure data storage and transmission
- Verify appropriate data access controls

### 4. Risk Assessment and Prioritization

**Vulnerability Scoring:**
- Apply CVSS (Common Vulnerability Scoring System) ratings
- Consider exploitability, impact, and environmental factors
- Account for business context and asset criticality
- Document risk rationale and scoring methodology

**Threat Context Analysis:**
- Evaluate vulnerabilities against current threat landscape
- Consider attacker motivation and capability requirements
- Assess potential attack vectors and exploitation scenarios
- Factor in existing security controls and mitigations

### 5. Documentation and Reporting

**Findings Documentation:**
- Document each vulnerability with clear description and evidence
- Provide proof-of-concept or reproduction steps where applicable
- Include code snippets and line references for identified issues
- Map findings to relevant security standards (OWASP Top 10, CWE)

**Remediation Guidance:**
- Provide specific, actionable remediation recommendations
- Include secure coding examples and best practices
- Estimate effort and complexity for each fix
- Suggest defensive programming patterns to prevent recurrence

**Executive Summary:**
- Highlight critical and high-severity findings
- Provide overall security posture assessment
- Recommend immediate actions and long-term improvements
- Include compliance status and regulatory considerations

### 6. Tool Integration and Automation

**MCP Tool Utilization:**
When available, leverage MCP tools for enhanced analysis:
- **File Analysis Tools**: For comprehensive code examination
- **Security Scanning Tools**: For automated vulnerability detection
- **Git Tools**: For analyzing code history and change patterns
- **Dependency Tools**: For package and library analysis

**Continuous Integration:**
- Recommend integration of security scanning into CI/CD pipelines
- Suggest automated security testing and validation approaches
- Provide guidance on security gates and quality criteria
- Document tool configurations for ongoing use

## Critical Requirements

**Technical Standards:**
- All findings must be technically accurate and verifiable
- Remediation guidance must be specific and implementable
- Risk assessments must be based on established methodologies
- Documentation must be clear and actionable for development teams

**Compliance Considerations:**
- Ensure coverage of applicable regulatory requirements
- Validate adherence to industry security standards
- Document compliance gaps and remediation requirements
- Provide audit trail and evidence collection

**Quality Assurance:**
- Validate automated scan results through manual verification
- Cross-reference findings across multiple analysis methods
- Ensure comprehensive coverage of security-critical code areas
- Document limitations and areas requiring further investigation

## Integration Points

**Development Workflow Integration:**
- Coordinate with development teams on remediation priorities
- Provide guidance on secure coding practices and training needs
- Support integration of security reviews into development processes
- Establish ongoing security consultation and support mechanisms

**Security Program Integration:**
- Feed findings into broader vulnerability management programs
- Coordinate with security architecture and threat modeling activities
- Support security metrics and KPI development
- Contribute to security awareness and training programs

## Success Criteria

- Comprehensive identification of security vulnerabilities and weaknesses
- Clear, actionable remediation guidance for all identified issues
- Accurate risk assessment and prioritization of security findings
- Effective integration with development and security processes
- Measurable improvement in codebase security posture