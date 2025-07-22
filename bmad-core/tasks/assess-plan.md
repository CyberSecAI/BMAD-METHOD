# assess-plan

Reviews a completed PRD (Product Requirements Document) and architecture documentation to determine if additional security considerations are needed and provides comprehensive security assessment.

## Prerequisites

- Completed PRD document available in docs/
- Architecture documentation available in docs/ 
- Access to existing security standards and frameworks

## Assessment Process

1. **Document Review**
   - Read the complete PRD including all requirements and specifications
   - Review architecture diagrams, data flows, and system components
   - Identify all stakeholders, data types, and integration points
   - Note any existing security requirements or considerations mentioned

2. **Threat Surface Analysis**
   - Map all potential attack vectors and entry points
   - Identify sensitive data flows and storage locations
   - Analyze external interfaces and third-party integrations
   - Evaluate user access patterns and privilege requirements
   - Assess network communications and protocols

3. **Risk Assessment Matrix**
   - Categorize identified threats by likelihood and impact
   - Prioritize security concerns based on business risk
   - Identify critical security gaps requiring immediate attention
   - Evaluate regulatory and compliance requirements

4. **Security Architecture Review**
   - Assess proposed authentication and authorization mechanisms
   - Review data protection and encryption strategies
   - Evaluate logging, monitoring, and incident response capabilities
   - Analyze security controls and defensive measures
   - Check for adherence to security best practices and patterns

5. **Compliance and Standards Check**
   - Verify alignment with relevant security frameworks (OWASP, NIST, etc.)
   - Check compliance requirements (GDPR, HIPAA, PCI-DSS, etc.)
   - Validate security standards implementation
   - Assess audit trail and documentation requirements

## Security Assessment Output

Create or update a "Security Assessment" section in the reviewed document:

```markdown
## Security Assessment

### Assessment Date: [Date]
### Assessed By: Chris (Security Agent)

### Executive Summary
[High-level security posture assessment and key findings]

### Threat Model Summary
**Critical Threats Identified:**
- [Threat 1] - Risk Level: [High/Medium/Low]
- [Threat 2] - Risk Level: [High/Medium/Low]
- [Threat 3] - Risk Level: [High/Medium/Low]

### Security Architecture Analysis
**Current Security Posture:**
- Authentication: [Assessment]
- Authorization: [Assessment]
- Data Protection: [Assessment]
- Network Security: [Assessment]
- Monitoring & Logging: [Assessment]

### Gap Analysis
**Critical Gaps Requiring Immediate Attention:**
- [ ] [Gap 1 - High Priority]
- [ ] [Gap 2 - High Priority]

**Important Improvements Recommended:**
- [ ] [Improvement 1 - Medium Priority]
- [ ] [Improvement 2 - Medium Priority]

**Nice-to-Have Enhancements:**
- [ ] [Enhancement 1 - Low Priority]
- [ ] [Enhancement 2 - Low Priority]

### Compliance Assessment
- **OWASP Top 10**: [✓ Addressed / ⚠ Partial / ✗ Not Addressed]
- **Data Privacy (GDPR/CCPA)**: [✓ Compliant / ⚠ Needs Review / ✗ Non-Compliant]
- **Industry Standards**: [List relevant standards and compliance status]

### Security Requirements
**Additional Security Requirements Needed:**
1. [Specific security requirement 1]
2. [Specific security requirement 2]
3. [Specific security requirement 3]

### Implementation Recommendations
**Phase 1 (Critical - Immediate):**
- [Action item 1 with timeline]
- [Action item 2 with timeline]

**Phase 2 (Important - Near-term):**
- [Action item 1 with timeline]
- [Action item 2 with timeline]

**Phase 3 (Enhancement - Future):**
- [Action item 1 with timeline]
- [Action item 2 with timeline]

### Security Testing Strategy
- **Penetration Testing**: [Recommended approach and timeline]
- **Security Code Review**: [Requirements and methodology]
- **Vulnerability Scanning**: [Tools and frequency]
- **Security Monitoring**: [Logging and alerting requirements]

### Conclusion
**Overall Security Readiness:** [Ready to Proceed / Needs Minor Updates / Requires Major Security Work]

**Next Steps:**
1. [Next step 1]
2. [Next step 2]
3. [Next step 3]
```

## Key Focus Areas

### Data Security
- Data classification and handling procedures
- Encryption requirements (at rest, in transit, in processing)
- Data retention and disposal policies
- Privacy protection mechanisms

### Access Control
- Authentication mechanisms and strength requirements
- Authorization models and role-based access control
- Multi-factor authentication requirements
- Session management and timeout policies

### Infrastructure Security
- Network segmentation and firewalling
- Secure configuration management
- Patch management procedures
- Infrastructure monitoring and alerting

### Application Security
- Secure coding practices and standards
- Input validation and sanitization
- Output encoding and XSS protection
- SQL injection prevention
- CSRF protection mechanisms

### Operational Security
- Security incident response procedures
- Backup and disaster recovery planning
- Security awareness and training requirements
- Vendor and third-party security assessments

## Escalation Criteria

Flag for immediate escalation if:
- Critical security vulnerabilities are identified that could lead to data breach
- Regulatory compliance violations are discovered
- Insufficient security controls for high-risk data processing
- Missing fundamental security architecture components
- Third-party integrations lack proper security validation

## Completion

After assessment:
1. Document all findings in the Security Assessment section
2. Prioritize recommendations by risk level and business impact  
3. Provide clear actionable next steps
4. Schedule follow-up reviews as needed
5. Coordinate with other team members (architect, PM, dev) on implementation planning