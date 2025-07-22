# review-epic

Performs comprehensive security review of epic specifications to identify security implications, requirements, and potential risks before story breakdown and development begins.

## Prerequisites

- Epic document available in docs/epics/
- Epic contains complete feature specifications and acceptance criteria
- Access to architecture documentation and security standards

## Epic Security Review Process

1. **Epic Analysis**
   - Read complete epic specification including all acceptance criteria
   - Understand the business context and user workflows
   - Identify all system components that will be affected
   - Map data flows and user interactions introduced by the epic

2. **Security Impact Assessment**
   - Analyze how the epic changes the application's attack surface
   - Identify new security boundaries and trust relationships
   - Evaluate impact on existing security controls
   - Assess changes to authentication and authorization requirements

3. **Feature-Specific Security Analysis**
   - Identify security-sensitive functionality within the epic
   - Analyze user input handling and data validation requirements
   - Review data storage and processing security implications
   - Evaluate third-party integration security considerations

4. **Threat Modeling for Epic**
   - Identify potential threats specific to the epic functionality
   - Analyze attack vectors that could exploit new features
   - Assess potential for privilege escalation or unauthorized access
   - Evaluate data exposure risks

5. **Compliance Impact Review**
   - Determine if epic introduces new compliance requirements
   - Assess impact on existing compliance posture
   - Identify audit trail and documentation needs
   - Review data privacy and protection implications

## Epic Security Review Output

Add a "Security Review" section to the epic document:

```markdown
## Security Review

### Review Date: [Date]
### Reviewed By: Chris (Security Agent)

### Epic Security Summary
[Overview of security implications and key security considerations for this epic]

### Security Impact Analysis
**Attack Surface Changes:**
- New entry points: [List new interfaces, APIs, or user interactions]
- Modified components: [List existing components being changed]
- Data flow changes: [Describe new or modified data flows]

**Security Boundary Analysis:**
- Trust boundaries affected: [List affected security boundaries]
- Authentication changes: [Describe auth implications]
- Authorization changes: [Describe access control implications]

### Security Requirements for Epic

**Critical Security Requirements:**
1. [Requirement 1] - Must be implemented before release
2. [Requirement 2] - Must be implemented before release
3. [Requirement 3] - Must be implemented before release

**Important Security Considerations:**
1. [Consideration 1] - Should be addressed during development
2. [Consideration 2] - Should be addressed during development
3. [Consideration 3] - Should be addressed during development

### Threat Analysis
**High-Risk Threats:**
- **[Threat Name]**: [Description] - Mitigation: [Required security control]
- **[Threat Name]**: [Description] - Mitigation: [Required security control]

**Medium-Risk Threats:**
- **[Threat Name]**: [Description] - Mitigation: [Recommended security control]
- **[Threat Name]**: [Description] - Mitigation: [Recommended security control]

### Security Testing Requirements
**Required Security Tests:**
- [ ] Authentication bypass testing
- [ ] Authorization boundary testing  
- [ ] Input validation testing
- [ ] Data exposure testing
- [ ] Session management testing

**Recommended Security Tests:**
- [ ] Penetration testing for new functionality
- [ ] Security regression testing
- [ ] Third-party integration security validation

### Story-Level Security Guidance
**For Story Creation:**
- Each story implementing this epic should include security acceptance criteria
- Stories involving data handling must specify data validation requirements
- Stories with user interfaces must address XSS and CSRF protection
- Stories with API endpoints must include authentication/authorization validation

**Security Considerations for Dev Notes:**
- Input sanitization and validation patterns
- Authentication and authorization checks
- Error handling that doesn't leak sensitive information
- Logging requirements for security events
- Secure configuration requirements

### Compliance Impact
**Regulatory Considerations:**
- [List any new compliance requirements introduced]
- [Impact on existing compliance posture]
- [Required documentation or audit trail changes]

**Data Privacy Impact:**
- Personal data handling changes: [Description]
- Data retention implications: [Description]  
- User consent requirements: [Description]

### Implementation Security Guidelines
**Phase 1 (Foundation):**
- [ ] Implement core authentication/authorization changes
- [ ] Set up security logging and monitoring
- [ ] Establish data validation frameworks

**Phase 2 (Feature Development):**
- [ ] Implement security controls for each story
- [ ] Add security tests for new functionality
- [ ] Conduct security code reviews

**Phase 3 (Validation):**
- [ ] Perform security testing of complete epic
- [ ] Validate compliance requirements
- [ ] Document security implementation

### Risk Assessment
**Overall Security Risk:** [Low / Medium / High]

**Risk Factors:**
- Data sensitivity: [Low / Medium / High]
- External interfaces: [None / Limited / Extensive]  
- Authentication complexity: [Simple / Moderate / Complex]
- Compliance impact: [None / Minor / Significant]

### Recommendations
**Before Story Breakdown:**
1. [Recommendation 1]
2. [Recommendation 2]
3. [Recommendation 3]

**During Development:**
1. [Recommendation 1]
2. [Recommendation 2]
3. [Recommendation 3]

**Before Release:**
1. [Recommendation 1]
2. [Recommendation 2]
3. [Recommendation 3]

### Security Champion Assignment
**Recommended Security Champion:** [Team member to focus on security during epic implementation]
**Security Review Checkpoints:** [Milestone points where security review is needed]
```

## Key Security Domains to Evaluate

### Authentication & Authorization
- New user roles or permissions required
- Changes to existing authentication flows
- Multi-factor authentication considerations
- Session management implications

### Data Security
- New data types being processed or stored
- Data classification and handling requirements
- Encryption requirements for sensitive data
- Data backup and recovery security implications

### API Security
- New API endpoints and their security requirements
- API authentication and rate limiting needs
- Input validation and sanitization requirements
- API documentation security considerations

### User Interface Security
- XSS protection requirements
- CSRF protection needs
- Content Security Policy implications
- User input handling and validation

### Integration Security
- Third-party service security assessments
- Data sharing agreements and security requirements
- Integration authentication and authorization
- Monitoring and logging for integrations

## Blocking Conditions

Stop review and escalate if:
- Epic involves processing highly sensitive data without adequate security design
- Significant compliance risks are identified
- Epic fundamentally conflicts with existing security architecture
- Critical security dependencies are missing or undefined
- Required security expertise is not available on the team

## Completion

After review:
1. Complete Security Review section in epic document
2. Flag any blocking security issues that must be resolved before story creation
3. Coordinate with PM and Architect on security requirement integration
4. Schedule security checkpoints during epic implementation
5. Identify if security specialist involvement is needed during development