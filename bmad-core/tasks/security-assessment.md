# Security Assessment Task

## Purpose

Conduct a comprehensive security assessment of the system, application, or infrastructure to identify security gaps, vulnerabilities, and risks. This task provides a holistic evaluation that informs threat modeling, risk assessment, and mitigation planning activities.

## Usage Scenarios

### Scenario 1: Initial Security Assessment
For new systems or applications requiring baseline security evaluation:
1. **System Analysis**: Evaluate architecture, design, and implementation
2. **Risk Identification**: Identify potential security risks and vulnerabilities  
3. **Gap Analysis**: Compare current state against security best practices
4. **Recommendations**: Provide prioritized recommendations for improvement

### Scenario 2: Periodic Security Review
For existing systems requiring regular security evaluation:
1. **Change Assessment**: Evaluate security impact of recent changes
2. **Control Effectiveness**: Assess current security control effectiveness
3. **Emerging Threats**: Consider new threats and attack vectors
4. **Compliance Check**: Validate ongoing compliance with requirements

### Scenario 3: Pre-Deployment Assessment
For systems preparing for production deployment:
1. **Production Readiness**: Assess security readiness for production
2. **Risk Validation**: Validate that identified risks have been addressed
3. **Control Verification**: Verify security controls are properly implemented
4. **Sign-off Preparation**: Prepare security sign-off documentation

## Task Instructions

### 1. Assessment Preparation

**Context Gathering:**
- Review existing documentation (architecture, PRD, previous assessments)
- Identify system boundaries, components, and data flows
- Understand business context, regulatory requirements, and risk appetite
- Determine assessment scope and objectives

**Stakeholder Engagement:**
- Identify key stakeholders and their security concerns
- Schedule interviews with architects, developers, and operations teams
- Coordinate with compliance and risk management teams
- Establish communication plan for findings and recommendations

### 2. Technical Security Assessment

**Architecture Review:**
- Analyze system architecture for security design patterns
- Evaluate trust boundaries and security zones
- Review authentication and authorization mechanisms
- Assess data protection and encryption implementations
- Examine network security and segmentation

**Code and Configuration Review:**
- Review critical code components for security vulnerabilities
- Assess configuration security and hardening
- Evaluate security testing integration and coverage
- Review dependency management and third-party components
- Analyze logging and monitoring implementations

**Infrastructure Assessment:**
- Evaluate server and endpoint security configurations
- Assess cloud security controls and configurations
- Review container and orchestration security
- Analyze network infrastructure and controls
- Evaluate backup and disaster recovery security

### 3. Risk and Threat Assessment

**Threat Landscape Analysis:**
- Identify relevant threat actors and attack vectors
- Analyze industry-specific and emerging threats
- Evaluate attack surface and exposure points
- Consider insider threats and supply chain risks
- Review threat intelligence and indicators

**Vulnerability Assessment:**
- Conduct automated vulnerability scanning where appropriate
- Perform manual security testing of critical components
- Analyze security test results and penetration test findings
- Review security incident history and lessons learned
- Evaluate patch management and vulnerability remediation processes

### 4. Compliance and Governance Review

**Regulatory Compliance:**
- Assess compliance with applicable regulations (GDPR, HIPAA, PCI-DSS)
- Review audit findings and remediation status
- Evaluate data protection and privacy controls
- Assess compliance monitoring and reporting capabilities
- Review legal and contractual security obligations

**Policy and Procedure Review:**
- Evaluate security policies and their implementation
- Review security procedures and their effectiveness
- Assess security awareness and training programs
- Evaluate incident response and business continuity plans
- Review vendor and third-party security management

### 5. Assessment Documentation and Reporting

**Findings Documentation:**
- Document all security findings with clear descriptions
- Provide evidence and supporting information for each finding
- Categorize findings by severity and risk level
- Map findings to relevant security frameworks and standards
- Include screenshots, logs, or other supporting evidence

**Risk Assessment and Prioritization:**
- Assess risk level for each finding using consistent criteria
- Consider likelihood, impact, and current mitigations
- Prioritize findings based on business risk and remediation effort
- Provide clear rationale for risk ratings and priorities
- Account for interdependencies between findings

**Recommendations and Roadmap:**
- Provide specific, actionable recommendations for each finding
- Include implementation guidance and best practices
- Estimate effort and resources required for remediation
- Suggest implementation timeline and phasing
- Identify quick wins and high-impact improvements

### 6. Stakeholder Communication

**Executive Summary:**
- Create concise executive summary highlighting key risks
- Focus on business impact and risk exposure
- Provide clear recommendations and resource requirements
- Include compliance status and regulatory implications
- Present risk metrics and key performance indicators

**Technical Details:**
- Provide detailed technical findings for implementation teams
- Include specific configuration changes and code modifications
- Provide references to security standards and best practices
- Include testing and validation procedures
- Document assumptions and limitations of the assessment

### 7. Follow-up and Validation

**Remediation Support:**
- Support implementation teams with remediation guidance
- Review proposed solutions and mitigations
- Validate that remediation efforts address identified risks
- Update risk assessments based on implemented changes
- Provide ongoing security consultation as needed

**Re-assessment Planning:**
- Define criteria for re-assessment and validation testing
- Establish timeline for follow-up assessments
- Plan ongoing security monitoring and evaluation
- Update assessment procedures based on lessons learned
- Schedule regular security review cycles

## Critical Requirements

**Documentation Standards:**
- All findings must be documented with sufficient detail for remediation
- Evidence must be provided to support all security findings
- Risk ratings must be consistent and based on defined criteria
- Recommendations must be specific and actionable

**Quality Assurance:**
- Assessment findings must be validated through multiple sources
- Technical findings should be confirmed through testing where possible
- Risk assessments should be reviewed by multiple stakeholders
- Final report must be reviewed and approved before distribution

**Confidentiality and Security:**
- Assessment findings and documentation must be handled securely
- Access to assessment results should be limited to authorized personnel
- Sensitive findings should be communicated through secure channels
- Assessment methodology should not introduce additional security risks

## Integration Points

**Threat Modeling Integration:**
- Assessment findings should inform threat modeling activities
- Identified threats should be validated through assessment results
- Assessment scope should align with threat model boundaries

**Risk Management Integration:**
- Assessment findings should be integrated into risk registers
- Risk ratings should align with organizational risk frameworks
- Remediation activities should be tracked through risk management processes

**Compliance Integration:**
- Assessment results should support compliance reporting requirements
- Findings should be mapped to relevant regulatory requirements
- Remediation timeline should consider compliance deadlines

## Success Criteria

- Comprehensive coverage of all systems and components in scope
- Clear identification and documentation of all significant security risks
- Actionable recommendations with realistic implementation guidance
- Stakeholder acceptance and commitment to remediation activities
- Integration with broader security and risk management processes