# dependency-security-scan

Delegates third-party component security assessment to the specialized dependency-scanner Claude Code sub-agent for comprehensive supply chain security analysis. This task focuses on NIST SSDF PW.3 practice compliance and dependency vulnerability management.

## Prerequisites

- Project dependency manifests (package.json, requirements.txt, pom.xml, etc.)
- Access to dependency scanning tools and vulnerability databases
- Dependency-scanner Claude Code sub-agent available
- VulnerabilityTech agent coordination capabilities

## Dependency Security Scanning Workflow

### 1. Pre-Scan Preparation

**Dependency Discovery**:
- Identify all dependency manifest files in the project
- Determine technology stacks and package managers in use
- Catalog direct and transitive dependencies
- Assess dependency management practices and configurations

**Scanning Scope Definition**:
- Define security scanning objectives and compliance requirements
- Identify critical dependencies requiring priority assessment
- Establish risk tolerance and acceptable vulnerability thresholds
- Determine applicable security standards (NIST SSDF, FISMA, etc.)

**Sub-Agent Preparation**:
- Validate dependency-scanner sub-agent availability and capabilities
- Prepare context and guidance for focused dependency analysis
- Establish success criteria and expected deliverables
- Configure access to necessary scanning tools and databases

### 2. Delegate to Dependency-Scanner Sub-Agent

**Delegation Request**:
```markdown
## Dependency Security Scan Request

### Project Context
- **Technology Stack**: [Languages, frameworks, package managers]
- **Dependency Scope**: [Direct dependencies, transitive depth, exclusions]
- **Compliance Requirements**: [NIST SSDF PW.3, industry standards]
- **Risk Tolerance**: [Acceptable CVSS thresholds, business context]

### Analysis Objectives
- Identify vulnerable dependencies with CVE cross-referencing
- Assess supply chain security risks and malicious package threats
- Validate license compliance and usage restrictions
- Evaluate dependency maintenance status and update availability

### Expected Deliverables
- Comprehensive dependency vulnerability report
- Supply chain risk assessment with mitigation recommendations
- License compliance analysis with legal implications
- Prioritized remediation plan with update guidance
```

**Sub-Agent Coordination**:
- Monitor dependency-scanner progress and provide guidance as needed
- Clarify project-specific context and business requirements
- Assist with access to restricted tools or proprietary databases
- Validate intermediate findings and adjust scope if necessary

### 3. Result Processing and Integration

**Sub-Agent Output Analysis**:
- Review dependency-scanner findings for completeness and accuracy
- Validate vulnerability assessments against project usage patterns
- Cross-check critical findings with additional sources
- Assess remediation recommendations for feasibility and impact

**Business Context Integration**:
- Consider dependency usage patterns and exposure in application context
- Assess business criticality of affected components
- Evaluate remediation costs and implementation timelines
- Prioritize fixes based on actual risk to business operations

**Compliance Validation**:
- Map findings to NIST SSDF PW.3 practice requirements
- Assess compliance with organizational security policies
- Validate against industry-specific regulatory requirements
- Document compliance gaps and remediation plans

### 4. Enhanced Analysis and Recommendations

**Supply Chain Risk Assessment**:
- Analyze dependency ecosystem health and sustainability
- Identify single points of failure in critical dependencies
- Assess maintainer reputation and community support
- Evaluate alternative dependencies for high-risk components

**Security Architecture Impact**:
- Assess how dependency vulnerabilities affect overall security posture
- Identify architectural changes needed for risk mitigation
- Evaluate defense-in-depth opportunities for vulnerable dependencies
- Consider runtime protection and monitoring for unpatched vulnerabilities

**Long-term Dependency Strategy**:
- Recommend dependency management best practices
- Suggest tools and processes for continuous dependency monitoring
- Propose vendor assessment criteria for new dependencies
- Design update and patching processes for ongoing maintenance

## Integration with VulnerabilityTech Workflows

### NIST SSDF PW.3 Practice Validation

**PW.3.1 - Well-Secured Software Component Reuse**:
- Validate that dependency selection follows security criteria
- Assess component security documentation and track record
- Verify secure configuration and integration practices
- Document security assessment process for third-party components

**Supply Chain Security Framework Alignment**:
- Map findings to NIST SP 800-161 supply chain risk management
- Align with Executive Order 14028 software supply chain requirements
- Validate Software Bill of Materials (SBOM) completeness
- Assess provenance and integrity verification practices

### Continuous Monitoring Integration

**CI/CD Pipeline Enhancement**:
- Integrate dependency scanning into build and deployment processes
- Establish security gates for new dependency introductions
- Automate vulnerability detection and alerting workflows
- Implement dependency update testing and validation procedures

**Governance and Policy Enforcement**:
- Enforce organizational dependency security policies
- Implement approval workflows for high-risk dependencies
- Establish exception processes for legacy or required vulnerable components
- Maintain audit trails for dependency security decisions

## Output Format

### Dependency Security Scan Report

```markdown
## Dependency Security Assessment Report

### Executive Summary
- **Dependencies Analyzed**: [Total count: direct, transitive]
- **Vulnerabilities Found**: [Critical: X, High: Y, Medium: Z, Low: W]
- **Supply Chain Risk Level**: [Overall risk assessment]
- **Compliance Status**: [NIST SSDF PW.3 compliance level]
- **Immediate Actions Required**: [Critical fixes needed]

### Vulnerability Analysis
#### Critical Vulnerabilities (CVSS 9.0-10.0)
- **Dependency**: [Package name and version]
  - **CVE**: [CVE-YYYY-NNNN, CVSS Score]
  - **Vulnerability**: [Description and impact]
  - **Usage Context**: [How dependency is used in application]
  - **Exploitability**: [Known exploits, proof-of-concept availability]
  - **Remediation**: [Update version, alternative, workaround]
  - **Business Impact**: [Potential impact on operations]

#### [Similar sections for High, Medium vulnerabilities]

### Supply Chain Security Assessment
- **Unmaintained Dependencies**: [Packages without recent updates]
- **High-Risk Dependencies**: [Single maintainer, suspicious patterns]
- **Ecosystem Health**: [Assessment of dependency ecosystem]
- **Alternative Recommendations**: [Safer alternatives for high-risk components]

### License Compliance Analysis
- **License Conflicts**: [Incompatible licenses and implications]
- **Commercial Usage Restrictions**: [Limitations on commercial use]
- **Attribution Requirements**: [Required acknowledgments]
- **Export Control Considerations**: [International trade restrictions]

### Remediation Roadmap
#### Immediate (0-7 days)
- [Critical vulnerability patches and workarounds]

#### Short-term (1-4 weeks)
- [High-priority updates and dependency replacements]

#### Medium-term (1-3 months)
- [Architectural changes and dependency consolidation]

#### Long-term (3-12 months)
- [Strategic dependency management improvements]

### NIST SSDF PW.3 Compliance Assessment
- **Component Selection Process**: [Security criteria compliance]
- **Supply Chain Risk Management**: [Risk assessment and mitigation]
- **Third-party Security Validation**: [Vendor assessment practices]
- **Continuous Monitoring**: [Ongoing security monitoring processes]

### Sub-Agent Performance Analysis
- **Scanning Coverage**: [Percentage of dependencies analyzed]
- **Database Accuracy**: [Vulnerability database completeness]
- **False Positive Rate**: [Analysis accuracy assessment]
- **Recommendation Quality**: [Actionability of recommendations]
```

## Quality Assurance and Validation

### Sub-Agent Output Verification

**Accuracy Validation**:
- Cross-check critical vulnerabilities with multiple sources
- Validate CVSS scores and severity assessments
- Verify remediation guidance against official advisories
- Confirm license compliance analysis accuracy

**Completeness Assessment**:
- Ensure all project dependencies are analyzed
- Verify transitive dependency coverage
- Check for missing vulnerability sources
- Validate supply chain risk assessment completeness

**Actionability Review**:
- Assess feasibility of remediation recommendations
- Validate update paths and compatibility considerations
- Review alternative dependency suggestions for viability
- Confirm business impact assessments are realistic

### Continuous Improvement

**Sub-Agent Performance Monitoring**:
- Track accuracy of vulnerability detection over time
- Monitor false positive and false negative rates
- Assess recommendation effectiveness and adoption
- Collect feedback on report quality and usefulness

**Process Enhancement**:
- Refine delegation strategies based on results
- Improve context provision for better sub-agent performance
- Enhance integration with existing security workflows
- Update scanning scope and priorities based on lessons learned

This dependency security scanning task leverages the specialized expertise of the dependency-scanner Claude Code sub-agent while maintaining integration with the broader VulnerabilityTech workflows and NIST SSDF compliance requirements.