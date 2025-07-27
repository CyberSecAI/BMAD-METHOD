# pattern-security-analysis

Delegates secure coding pattern detection and validation to the specialized pattern-analyzer Claude Code sub-agent for comprehensive security pattern assessment. This task supports NIST SSDF PW.4 practice compliance through language-specific secure coding validation.

## Prerequisites

- Source code access for pattern analysis
- Language-specific security pattern databases from expansion packs
- Pattern-analyzer Claude Code sub-agent available
- VulnerabilityTech agent coordination capabilities

## Security Pattern Analysis Workflow

### 1. Pre-Analysis Preparation

**Codebase Assessment**:
- Identify programming languages and frameworks in use
- Catalog security-sensitive code components and entry points
- Assess application architecture and security boundary definitions
- Determine applicable security standards and coding guidelines

**Pattern Analysis Scope**:
- Define security pattern categories for analysis (authentication, encryption, etc.)
- Identify framework-specific security patterns relevant to the project
- Establish secure coding standard compliance requirements
- Determine anti-pattern detection priorities based on threat model

**Sub-Agent Preparation**:
- Validate pattern-analyzer sub-agent availability and capabilities
- Load relevant language-specific security pattern data from expansion packs
- Prepare context about application security requirements and constraints
- Configure access to codebase and security pattern databases

### 2. Delegate to Pattern-Analyzer Sub-Agent

**Delegation Request**:
```markdown
## Security Pattern Analysis Request

### Project Context
- **Languages/Frameworks**: [Technology stack details]
- **Security Requirements**: [Authentication, authorization, encryption needs]
- **Compliance Standards**: [NIST SSDF PW.4, OWASP, industry standards]
- **Analysis Priorities**: [Critical security patterns to validate]

### Pattern Analysis Objectives
- Detect secure coding pattern implementation and compliance
- Identify anti-patterns and security weaknesses in code structure
- Validate framework-specific security feature usage
- Assess overall secure coding practice adherence

### Expected Deliverables
- Comprehensive secure pattern compliance report
- Anti-pattern detection with security impact assessment
- Framework-specific security implementation analysis
- Recommendations for secure coding improvements
```

**Sub-Agent Coordination**:
- Monitor pattern-analyzer progress and provide domain-specific guidance
- Clarify application-specific security requirements and constraints
- Assist with complex pattern interpretation in business context
- Validate intermediate findings against known application behaviors

### 3. Result Processing and Integration

**Pattern Analysis Review**:
- Analyze pattern-analyzer findings for accuracy and relevance
- Validate secure pattern detections against actual implementations
- Cross-check anti-pattern findings with vulnerability assessments
- Assess pattern compliance scores against security requirements

**Context-Aware Validation**:
- Consider business logic context for pattern implementations
- Assess whether detected anti-patterns represent actual security risks
- Validate framework-specific patterns against recommended practices
- Evaluate pattern compliance within application security architecture

**Security Impact Assessment**:
- Determine security implications of identified anti-patterns
- Assess risk levels for non-compliant security pattern usage
- Prioritize pattern improvements based on threat model and exposure
- Correlate pattern analysis with known vulnerability patterns

### 4. Enhanced Pattern Assessment

**Architectural Pattern Analysis**:
- Assess security pattern consistency across application components
- Identify systemic security pattern issues and architectural concerns
- Evaluate defense-in-depth implementation through pattern analysis
- Assess security boundary enforcement through coding patterns

**Framework Security Integration**:
- Validate proper integration with framework security features
- Assess security middleware and protection mechanism usage
- Evaluate custom security implementation quality vs. framework defaults
- Identify opportunities for improved framework security feature adoption

**Pattern Evolution and Maintenance**:
- Assess pattern implementation sustainability and maintainability
- Identify opportunities for security pattern standardization
- Recommend secure coding guidelines and developer training needs
- Suggest tooling and automation for pattern compliance enforcement

## Integration with VulnerabilityTech Workflows

### NIST SSDF PW.4 Practice Validation

**PW.4.1 - Secure Coding Practices Implementation**:
- Validate secure coding standard compliance across codebase
- Assess implementation of security controls through coding patterns
- Verify secure development lifecycle integration
- Document secure coding practice adherence and gaps

**Code Quality and Security Integration**:
- Correlate secure pattern usage with overall code quality metrics
- Assess security pattern implementation consistency
- Validate secure coding training effectiveness through pattern analysis
- Identify areas requiring enhanced secure coding education

### Development Process Enhancement

**Code Review Integration**:
- Provide pattern-based security review guidelines
- Enhance code review checklists with pattern-specific validation
- Support automated pattern checking in development workflows
- Improve security-focused code review training and processes

**Developer Education and Training**:
- Identify secure coding pattern knowledge gaps
- Recommend targeted training based on anti-pattern frequency
- Provide concrete examples of secure vs. insecure pattern usage
- Support secure coding best practice documentation and standards

## Output Format

### Security Pattern Analysis Report

```markdown
## Secure Coding Pattern Analysis Report

### Executive Summary
- **Pattern Compliance Score**: [Overall percentage of secure patterns implemented]
- **Anti-Patterns Detected**: [Count by severity and category]
- **Framework Security Integration**: [Usage of framework security features]
- **NIST SSDF PW.4 Compliance**: [Secure coding practice compliance level]
- **Priority Recommendations**: [Top pattern improvements needed]

### Secure Pattern Validation Results
#### Authentication Patterns
- **Pattern Compliance**: [Percentage of secure authentication patterns]
- **Secure Implementations Found**: [Count and examples]
- **Areas of Excellence**: [Well-implemented authentication patterns]
- **Improvement Opportunities**: [Authentication pattern enhancements needed]

#### Authorization Patterns
- **Pattern Compliance**: [Percentage of secure authorization patterns]
- **Access Control Implementation**: [RBAC, ABAC pattern usage]
- **Privilege Management**: [Least privilege principle adherence]
- **Authorization Gaps**: [Missing or weak authorization patterns]

#### Input Validation Patterns
- **Validation Coverage**: [Percentage of inputs properly validated]
- **Sanitization Patterns**: [Input sanitization pattern compliance]
- **Encoding Patterns**: [Output encoding pattern implementation]
- **Validation Gaps**: [Areas lacking proper input validation]

#### Cryptographic Patterns
- **Encryption Implementation**: [Strong encryption pattern usage]
- **Key Management**: [Secure key handling pattern compliance]
- **Random Generation**: [Cryptographically secure random usage]
- **Cryptographic Weaknesses**: [Weak crypto patterns detected]

### Anti-Pattern Detection Results
#### Critical Anti-Patterns
- **Pattern Type**: [e.g., SQL Injection Vulnerable Patterns]
  - **Instances Found**: [Count and locations]
  - **Security Impact**: [Risk assessment and CVSS correlation]
  - **CWE Mapping**: [Common Weakness Enumeration classification]
  - **Remediation Guidance**: [Secure pattern alternatives]

#### [Similar sections for High, Medium anti-patterns]

### Framework-Specific Security Analysis
- **Security Feature Adoption**: [Framework security feature usage percentage]
- **Security Middleware**: [Security middleware implementation patterns]
- **Configuration Patterns**: [Secure configuration pattern compliance]
- **Custom vs. Framework Security**: [Balance of custom and framework security]

### Language-Specific Pattern Assessment
- **Language Security Features**: [Language-specific security pattern usage]
- **Library Security Patterns**: [Security library integration patterns]
- **Memory Safety**: [Memory safety pattern compliance (for applicable languages)]
- **Concurrency Security**: [Thread safety and concurrency pattern analysis]

### Remediation Recommendations
#### Immediate Pattern Fixes (0-7 days)
- [Critical anti-pattern remediation]

#### Short-term Improvements (1-4 weeks)
- [Security pattern enhancement opportunities]

#### Medium-term Standardization (1-3 months)
- [Pattern consistency and standardization initiatives]

#### Long-term Security Architecture (3-12 months)
- [Architectural pattern improvements and framework adoption]

### Development Process Integration
- **Code Review Enhancement**: [Pattern-based review checklist updates]
- **Automated Checking**: [Tools and linting rules for pattern enforcement]
- **Developer Training**: [Secure coding pattern education recommendations]
- **Standards Documentation**: [Secure coding guideline updates needed]

### Sub-Agent Performance Analysis
- **Pattern Detection Accuracy**: [True positive rate for pattern detection]
- **False Positive Management**: [Accuracy of anti-pattern identification]
- **Coverage Completeness**: [Percentage of codebase analyzed]
- **Recommendation Quality**: [Actionability of pattern improvement suggestions]
```

## Quality Assurance and Validation

### Pattern Analysis Verification

**Accuracy Assessment**:
- Validate secure pattern detections against manual code review
- Cross-check anti-pattern findings with static analysis tools
- Verify framework-specific pattern assessments with documentation
- Confirm pattern compliance scoring methodology accuracy

**Completeness Validation**:
- Ensure comprehensive coverage of all security-relevant code
- Verify analysis includes all applicable security pattern categories
- Check for missing pattern analysis in critical security components
- Validate coverage of all relevant programming languages and frameworks

**Contextual Relevance**:
- Assess pattern findings relevance to actual application security needs
- Validate business logic considerations in pattern analysis
- Confirm framework-specific recommendations align with project constraints
- Verify pattern improvement suggestions are practically implementable

### Continuous Improvement

**Sub-Agent Enhancement**:
- Refine pattern detection rules based on analysis results
- Update pattern databases with new secure coding patterns
- Improve false positive reduction through better context awareness
- Enhance integration with expansion pack pattern data

**Process Optimization**:
- Streamline delegation workflows for improved efficiency
- Enhance result integration with other security analysis tools
- Improve developer feedback mechanisms for pattern compliance
- Optimize pattern analysis scope and prioritization strategies

This security pattern analysis task leverages the specialized expertise of the pattern-analyzer Claude Code sub-agent while maintaining integration with the broader security assessment workflows and NIST SSDF compliance requirements within the BMad Method framework.