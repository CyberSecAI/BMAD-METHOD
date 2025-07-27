# specialized-security-review

Orchestrates comprehensive security analysis using specialized Claude Code sub-agents for enhanced vulnerability detection and security validation. This task coordinates multiple specialized agents to provide complete security coverage.

## Prerequisites

- Source code access for security analysis
- Claude Code sub-agents available in `.claude/agents/` directory
- VulnerabilityTech agent permissions for sub-agent coordination

## Sub-Agent Coordination Workflow

### 1. Security Analysis Planning

**Determine Analysis Scope**:
- Identify code components requiring security analysis
- Assess technology stack and framework usage
- Determine applicable security standards and compliance requirements
- Plan sub-agent delegation strategy based on analysis needs

**Analysis Preparation**:
- Validate access to source code and security scanning tools
- Confirm sub-agent availability and capabilities
- Establish analysis priorities based on risk assessment
- Prepare context and guidance for sub-agent delegation

### 2. Multi-Agent Security Analysis Execution

**Phase 1: Code-Level Security Analysis**
- **Delegate to Security-Reviewer Sub-Agent**:
  - Request comprehensive vulnerability detection analysis
  - Focus on OWASP Top 10 and language-specific vulnerabilities
  - Analyze authentication, authorization, and input validation
  - Generate detailed vulnerability findings with CVSS scoring

**Phase 2: Dependency Security Assessment**
- **Delegate to Dependency-Scanner Sub-Agent**:
  - Request third-party component security analysis
  - Assess supply chain security and license compliance
  - Identify vulnerable dependencies and update recommendations
  - Validate NIST SSDF PW.3 practice compliance

**Phase 3: Secure Coding Pattern Validation**
- **Delegate to Pattern-Analyzer Sub-Agent**:
  - Request secure coding pattern analysis
  - Validate framework-specific security implementations
  - Identify anti-patterns and security weaknesses
  - Assess NIST SSDF PW.4 practice compliance

**Phase 4: Security Test Assessment**
- **Delegate to Test-Validator Sub-Agent**:
  - Request security test coverage and quality analysis
  - Validate security testing effectiveness
  - Assess test coverage for security requirements
  - Evaluate NIST SSDF PW.7 practice compliance

### 3. Findings Integration and Analysis

**Consolidate Sub-Agent Findings**:
- Collect and review all sub-agent analysis results
- Identify overlapping findings and cross-validate results
- Prioritize findings based on combined risk assessment
- Resolve conflicts or inconsistencies between sub-agent findings

**Risk Assessment and Prioritization**:
- Calculate overall security risk score from combined findings
- Prioritize vulnerabilities based on exploitability and business impact
- Assess cumulative security posture across all analysis dimensions
- Identify systemic security issues and architectural concerns

**Gap Analysis**:
- Identify security coverage gaps not addressed by sub-agents
- Assess completeness of security analysis across all components
- Determine need for additional manual security testing
- Validate coverage of all applicable security standards

### 4. Comprehensive Security Report Generation

**Executive Summary**:
- Overall security posture assessment with risk scoring
- Critical findings requiring immediate attention
- Strategic security recommendations for long-term improvement
- Compliance status across applicable security standards

**Detailed Findings by Category**:
- **Code Vulnerabilities**: Security-reviewer findings with remediation guidance
- **Dependency Risks**: Dependency-scanner findings with update recommendations
- **Pattern Issues**: Pattern-analyzer findings with secure alternatives
- **Test Gaps**: Test-validator findings with testing recommendations

**Integrated Recommendations**:
- Prioritized remediation roadmap based on combined analysis
- Architectural security improvements from cross-cutting findings
- Process improvements for preventing similar issues
- Tool and automation recommendations for continuous security

**NIST SSDF Compliance Assessment**:
- PW.3 (Third-party components) compliance validation
- PW.4 (Secure coding) compliance assessment
- PW.6 (Code review) process effectiveness
- PW.7 (Security testing) coverage and quality
- RV.1 (Vulnerability detection) process validation

## Sub-Agent Integration Guidelines

### Effective Delegation Strategies

**Context Provision**:
- Provide clear scope and objectives to each sub-agent
- Share relevant project context and security requirements
- Specify focus areas and priority concerns for analysis
- Establish success criteria and expected deliverables

**Resource Coordination**:
- Ensure sub-agents have access to necessary code and tools
- Coordinate access to shared resources and dependencies
- Manage sub-agent execution sequence for optimal results
- Monitor sub-agent progress and provide guidance as needed

**Quality Assurance**:
- Validate sub-agent findings for accuracy and relevance
- Cross-check critical findings across multiple sub-agents
- Ensure consistent analysis standards and methodologies
- Review sub-agent outputs for completeness and clarity

### Result Integration Best Practices

**Finding Consolidation**:
- Merge related findings from different sub-agents
- Eliminate duplicate issues identified by multiple agents
- Enhance findings with cross-referenced insights
- Maintain traceability to original sub-agent analysis

**Risk Harmonization**:
- Normalize risk scoring across different sub-agent methodologies
- Consider cumulative risk from multiple security dimensions
- Adjust priorities based on business context and threat landscape
- Validate risk assessments through expert judgment

**Recommendation Synthesis**:
- Combine technical recommendations into cohesive remediation plans
- Identify dependencies and sequencing for remediation activities
- Consider resource constraints and implementation feasibility
- Provide both immediate fixes and long-term strategic improvements

## Output Format

### Comprehensive Security Analysis Report

```markdown
## Specialized Security Analysis Report

### Executive Summary
- **Overall Security Score**: [0-100 composite score from all sub-agents]
- **Critical Issues**: [Count and summary of critical findings]
- **Sub-Agent Analysis Coverage**: [Coverage across security dimensions]
- **Recommended Priority Actions**: [Top 3-5 immediate actions needed]

### Sub-Agent Analysis Results

#### Code Security Analysis (Security-Reviewer)
- **Vulnerabilities Found**: [Count by severity]
- **Key Findings**: [Top critical issues]
- **OWASP Top 10 Coverage**: [Compliance assessment]
- **Detailed Report Reference**: [Link to detailed findings]

#### Dependency Security Assessment (Dependency-Scanner)
- **Vulnerable Dependencies**: [Count and severity]
- **Supply Chain Risks**: [High-level risk assessment]
- **License Compliance**: [Compliance status]
- **Detailed Report Reference**: [Link to detailed findings]

#### Secure Coding Patterns (Pattern-Analyzer)
- **Pattern Compliance**: [Secure pattern percentage]
- **Anti-Patterns Found**: [Count and categories]
- **Framework Security**: [Framework-specific compliance]
- **Detailed Report Reference**: [Link to detailed findings]

#### Security Testing Assessment (Test-Validator)
- **Test Coverage Score**: [Security test coverage percentage]
- **Test Quality Assessment**: [Quality metrics]
- **Testing Gaps**: [Missing test scenarios]
- **Detailed Report Reference**: [Link to detailed findings]

### Integrated Findings Analysis
- **Cross-Cutting Issues**: [Issues identified by multiple sub-agents]
- **Systemic Vulnerabilities**: [Architectural or process-level issues]
- **Compliance Gaps**: [Standards compliance deficiencies]
- **Security Architecture Assessment**: [High-level architecture review]

### Prioritized Remediation Plan
1. **Immediate Actions (0-7 days)**
2. **Short-term Improvements (1-4 weeks)**
3. **Medium-term Enhancements (1-3 months)**
4. **Long-term Strategic Initiatives (3-12 months)**

### NIST SSDF Compliance Summary
- **PW.3**: [Third-party component security compliance]
- **PW.4**: [Secure coding practices compliance]
- **PW.6**: [Code review process compliance]
- **PW.7**: [Security testing compliance]
- **RV.1**: [Vulnerability detection compliance]
```

## Quality Assurance

### Sub-Agent Output Validation
- Verify completeness of analysis across all requested dimensions
- Validate accuracy of findings through spot-checks and cross-validation
- Ensure consistency of risk scoring and prioritization methodologies
- Confirm actionability and feasibility of recommendations

### Integration Quality Control
- Check for gaps in security coverage not addressed by any sub-agent
- Validate that integrated findings provide coherent security assessment
- Ensure recommendations are practical and implementable
- Confirm that executive summary accurately reflects detailed findings

### Continuous Improvement
- Collect feedback on sub-agent effectiveness and accuracy
- Refine delegation strategies based on results and outcomes
- Update integration methodologies for improved analysis quality
- Enhance sub-agent coordination for better coverage and efficiency

This specialized security review leverages the focused expertise of Claude Code sub-agents while maintaining the comprehensive oversight and integration capabilities of the VulnerabilityTech agent within the BMad Method framework.