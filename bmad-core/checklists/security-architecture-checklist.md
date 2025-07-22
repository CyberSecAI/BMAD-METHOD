# Security Architecture Validation Checklist

This checklist provides comprehensive security validation for system architecture documents, ensuring defensive security measures are properly designed and documented.

[[LLM: INITIALIZATION INSTRUCTIONS - REQUIRED ARTIFACTS

Before proceeding with this checklist, ensure you have access to:

1. architecture.md - The primary architecture document
2. prd.md - Product Requirements Document for context
3. threat-model.md - If available from security assessment
4. Any system/network diagrams
5. API documentation
6. Database schema documentation

VALIDATION APPROACH:
For each section, you must:
1. Evidence-Based Validation - Cite specific sections from architecture documents
2. Gap Analysis - Identify missing security controls
3. Risk Assessment - Evaluate potential security weaknesses
4. Actionable Recommendations - Provide specific implementation guidance

EXECUTION MODE:
Ask the user if they prefer:
- Interactive mode - Section by section review with feedback
- Comprehensive mode - Complete analysis with final report]]

## 1. AUTHENTICATION & AUTHORIZATION ARCHITECTURE

### 1.1 Authentication Design
- [ ] Authentication method clearly defined (OAuth2, JWT, SAML, etc.)
- [ ] Multi-factor authentication requirements specified
- [ ] Password policy and complexity requirements documented
- [ ] Session management strategy defined
- [ ] Authentication failure handling procedures specified
- [ ] Account lockout and rate limiting mechanisms described

### 1.2 Authorization Model
- [ ] Role-Based Access Control (RBAC) or Attribute-Based Access Control (ABAC) model defined
- [ ] Permission inheritance and delegation rules specified
- [ ] Principle of least privilege applied to role definitions
- [ ] Resource access controls clearly mapped
- [ ] Authorization decision points identified in system flow

## 2. DATA PROTECTION ARCHITECTURE

### 2.1 Data Classification & Handling
- [ ] Data classification scheme defined (public, internal, confidential, restricted)
- [ ] Data flow diagrams include security boundaries
- [ ] Sensitive data identification and labeling approach
- [ ] Data retention and disposal policies specified
- [ ] Cross-border data transfer compliance addressed

### 2.2 Encryption Strategy
- [ ] Data encryption at rest specified with appropriate algorithms
- [ ] Data encryption in transit specified with TLS/SSL versions
- [ ] Key management system architecture defined
- [ ] Encryption key rotation procedures documented
- [ ] Hardware Security Module (HSM) or key vault integration specified

## 3. NETWORK SECURITY ARCHITECTURE

### 3.1 Network Segmentation
- [ ] Network zones and trust boundaries clearly defined
- [ ] DMZ architecture properly designed for public-facing services
- [ ] Internal network segmentation strategy documented
- [ ] Network access control mechanisms specified
- [ ] VPN or secure remote access architecture defined

### 3.2 Traffic Protection
- [ ] Web Application Firewall (WAF) placement and rules defined
- [ ] DDoS protection mechanisms specified
- [ ] Network intrusion detection/prevention systems positioned
- [ ] API gateway security controls documented
- [ ] Load balancer security configurations specified

## 4. APPLICATION SECURITY ARCHITECTURE

### 4.1 Input Validation & Output Encoding
- [ ] Input validation strategy documented for all data entry points
- [ ] Output encoding/escaping mechanisms specified
- [ ] SQL injection prevention measures defined
- [ ] Cross-Site Scripting (XSS) protection mechanisms documented
- [ ] Command injection prevention measures specified

### 4.2 API Security
- [ ] API authentication and authorization mechanisms defined
- [ ] API rate limiting and throttling controls specified
- [ ] API input validation and sanitization documented
- [ ] API versioning security implications addressed
- [ ] API documentation security (avoiding information disclosure)

## 5. INFRASTRUCTURE SECURITY ARCHITECTURE

### 5.1 Server & Container Security
- [ ] Operating system hardening standards specified
- [ ] Container security baseline configurations documented
- [ ] Patch management procedures defined
- [ ] Antivirus/anti-malware protection specified
- [ ] Host-based intrusion detection systems documented

### 5.2 Cloud Security Architecture
- [ ] Cloud security shared responsibility model documented
- [ ] Identity and Access Management (IAM) roles and policies defined
- [ ] Cloud storage security configurations specified
- [ ] Cloud network security groups and NACLs documented
- [ ] Cloud monitoring and logging architecture defined

## 6. LOGGING & MONITORING ARCHITECTURE

### 6.1 Security Event Logging
- [ ] Security event categories to be logged defined
- [ ] Log retention periods specified for compliance
- [ ] Log integrity protection mechanisms documented
- [ ] Centralized logging architecture defined
- [ ] Log correlation and analysis capabilities specified

### 6.2 Security Monitoring
- [ ] Security Information and Event Management (SIEM) integration defined
- [ ] Real-time alerting mechanisms for security events
- [ ] Incident detection and response procedures documented
- [ ] Security metrics and KPIs defined
- [ ] Automated response mechanisms specified

## 7. COMPLIANCE & REGULATORY REQUIREMENTS

### 7.1 Regulatory Compliance
- [ ] Applicable regulations identified (GDPR, HIPAA, PCI-DSS, SOX, etc.)
- [ ] Compliance controls mapped to architecture components
- [ ] Data privacy requirements integrated into design
- [ ] Audit trail requirements specified
- [ ] Compliance reporting mechanisms documented

### 7.2 Security Standards Alignment
- [ ] Industry security frameworks referenced (NIST, ISO 27001, CIS Controls)
- [ ] Security control mappings documented
- [ ] Risk assessment methodology specified
- [ ] Security governance structure defined
- [ ] Third-party security assessment requirements specified

## 8. INCIDENT RESPONSE & BUSINESS CONTINUITY

### 8.1 Incident Response Architecture
- [ ] Security incident detection mechanisms defined
- [ ] Incident response workflow and escalation procedures
- [ ] Forensic data collection and preservation capabilities
- [ ] Communication channels for security incidents specified
- [ ] Post-incident recovery and lessons learned processes

### 8.2 Business Continuity & Disaster Recovery
- [ ] Backup and recovery procedures documented
- [ ] Disaster recovery site architecture specified
- [ ] Recovery Time Objective (RTO) and Recovery Point Objective (RPO) defined
- [ ] Business continuity testing procedures documented
- [ ] Alternate processing site security controls specified

## FINAL VALIDATION SUMMARY

[[LLM: After completing all sections, provide a comprehensive summary that includes:

1. **Security Posture Assessment**: Overall security maturity level
2. **Critical Gaps Identified**: High-priority missing security controls
3. **Risk Assessment**: Top security risks based on gaps found
4. **Prioritized Recommendations**: Action items ranked by risk reduction impact
5. **Compliance Status**: Assessment of regulatory compliance readiness
6. **Implementation Roadmap**: Suggested phases for implementing missing controls

Format this as a professional security assessment report suitable for technical leadership and security stakeholders.]]