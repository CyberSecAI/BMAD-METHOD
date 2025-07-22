# Compliance Frameworks Reference

This document provides detailed guidance on major compliance frameworks and regulatory requirements relevant to defensive security implementation.

## Privacy and Data Protection Regulations

### GDPR (General Data Protection Regulation)
**European Union comprehensive data protection law**

**Core Principles:**
- **Lawfulness, fairness and transparency**
- **Purpose limitation**
- **Data minimisation**
- **Accuracy**
- **Storage limitation**
- **Integrity and confidentiality (security)**
- **Accountability**

**Key Requirements:**
- **Legal Basis**: Consent, contract, legal obligation, vital interests, public task, legitimate interests
- **Data Subject Rights**: Access, rectification, erasure, portability, restriction, objection, automated decision-making
- **Data Protection by Design and Default**
- **Data Protection Impact Assessment (DPIA)** for high-risk processing
- **Breach Notification**: 72 hours to supervisory authority, 30 days to data subjects
- **Data Protection Officer (DPO)** for certain organizations
- **Cross-border Transfer Safeguards**: Adequacy decisions, Standard Contractual Clauses, Binding Corporate Rules

**Implementation Controls:**
- Privacy policy transparency and accessibility
- Consent management systems with granular controls
- Data subject request handling procedures
- Data inventory and mapping processes
- Privacy by design in system architecture
- Vendor management with data processing agreements
- Staff training and awareness programs
- Regular compliance audits and assessments

### CCPA/CPRA (California Consumer Privacy Act/Rights)
**California's comprehensive consumer privacy legislation**

**Consumer Rights:**
- **Right to Know**: Categories and specific personal information collected
- **Right to Delete**: Request deletion of personal information
- **Right to Opt-Out**: Sale and sharing of personal information
- **Right to Correct**: Inaccurate personal information
- **Right to Limit**: Use and disclosure of sensitive personal information
- **Right to Non-Discrimination**: Equal service regardless of privacy choices

**Business Obligations:**
- **Privacy Policy**: Detailed disclosures about data practices
- **Consumer Request Verification**: Identity verification procedures
- **Do Not Sell**: Prominent opt-out mechanisms
- **Service Provider Contracts**: Restrictions on data use
- **Sensitive Personal Information**: Additional protections and opt-out rights

## Healthcare Data Protection

### HIPAA (Health Insurance Portability and Accountability Act)
**US healthcare data protection regulation**

**HIPAA Rules:**
- **Privacy Rule**: PHI use and disclosure standards
- **Security Rule**: Electronic PHI (ePHI) safeguards
- **Breach Notification Rule**: Breach reporting requirements
- **Enforcement Rule**: Investigation and penalty procedures

**Required Safeguards:**
- **Administrative**: Security officer, training, access management, assigned security responsibilities
- **Physical**: Facility access controls, workstation use restrictions, device and media controls
- **Technical**: Access control, audit controls, integrity, person/entity authentication, transmission security

**Risk Assessment Requirements:**
- **Security Assessment**: Annual comprehensive security evaluation
- **Risk Management**: Ongoing risk assessment and mitigation processes
- **Vulnerability Remediation**: Regular vulnerability scanning and patching
- **Business Associate Agreements**: Contracts with third-party service providers

## Financial Services Compliance

### SOX (Sarbanes-Oxley Act)
**US financial reporting and corporate governance regulation**

**Key Sections:**
- **Section 302**: CEO/CFO certification of financial reports
- **Section 404**: Management assessment of internal controls over financial reporting
- **Section 409**: Real-time disclosure of material changes

**IT General Controls (ITGCs):**
- **Access Controls**: Logical security over financial systems
- **Program Development**: System change management procedures
- **Program and Data Changes**: Change control and testing procedures
- **Computer Operations**: System monitoring and incident management

**SOX Compliance Controls:**
- Segregation of duties for financial processes
- Change management with proper approvals and testing
- Access provisioning and regular access reviews
- System monitoring and logging for audit trails
- Data backup and recovery procedures
- Vendor management and third-party risk assessment

### PCI-DSS (Payment Card Industry Data Security Standard)
**Payment card data protection requirements**

**PCI-DSS Requirements:**
1. **Install and maintain firewalls** to protect cardholder data
2. **Do not use vendor-supplied defaults** for system passwords and security parameters
3. **Protect stored cardholder data** with encryption and truncation
4. **Encrypt transmission** of cardholder data across open networks
5. **Protect systems** against malware with regularly updated anti-virus software
6. **Develop and maintain secure systems** and applications
7. **Restrict access** to cardholder data by business need-to-know
8. **Identify and authenticate access** to system components
9. **Restrict physical access** to cardholder data
10. **Track and monitor access** to network resources and cardholder data
11. **Regularly test security** systems and processes
12. **Maintain information security policy** addressing security for personnel

**Compliance Validation:**
- **Level 1**: Annual Report on Compliance (ROC) by Qualified Security Assessor (QSA)
- **Level 2-4**: Annual Self-Assessment Questionnaire (SAQ)
- **Quarterly Network Scans**: By Approved Scanning Vendor (ASV)

## Federal and Government Compliance

### FedRAMP (Federal Risk and Authorization Management Program)
**US government cloud security assessment and authorization**

**FedRAMP Controls:**
- **NIST 800-53 Controls**: Based on NIST Special Publication 800-53
- **Low Impact**: 125 controls for low-risk systems
- **Moderate Impact**: 325 controls for moderate-risk systems  
- **High Impact**: 421 controls for high-risk systems

**Authorization Process:**
1. **Preparation**: System Security Plan (SSP) development
2. **Assessment**: Third Party Assessment Organization (3PAO) security assessment
3. **Authorization**: Authority to Operate (ATO) from authorizing agency
4. **Continuous Monitoring**: Ongoing security monitoring and reporting

**Key Documentation:**
- System Security Plan (SSP)
- Security Assessment Report (SAR)
- Plan of Action and Milestones (POA&M)
- Continuous Monitoring Strategy

### FISMA (Federal Information Security Management Act)
**US federal information security framework**

**FISMA Requirements:**
- **Risk-based approach** to information security
- **Continuous monitoring** of security controls
- **Integration with enterprise architecture** and capital planning
- **Annual security training** for all personnel
- **Incident response** and reporting procedures

**NIST RMF Integration:**
1. **Categorize** information systems and information
2. **Select** appropriate security controls
3. **Implement** security controls in information systems
4. **Assess** security controls using appropriate procedures
5. **Authorize** information system operation based on risk determination
6. **Monitor** security controls on continuous basis

## Industry Security Standards

### ISO 27001 (Information Security Management Systems)
**International standard for information security management**

**ISMS Requirements:**
- **Information Security Policy**: Management commitment and direction
- **Risk Assessment**: Systematic identification and evaluation of information security risks
- **Risk Treatment**: Selection and implementation of appropriate controls
- **Management Review**: Regular evaluation of ISMS effectiveness
- **Continual Improvement**: Ongoing enhancement of information security

**Annex A Controls (ISO 27002):**
- 14 security control categories
- 35 main security categories
- 114 security controls

### SOC 2 (Service Organization Control 2)
**Security, availability, and confidentiality assurance for service organizations**

**Trust Services Criteria:**
- **Security**: Protection against unauthorized access
- **Availability**: System accessibility for operation and use
- **Processing Integrity**: Complete, accurate, timely, and valid system processing
- **Confidentiality**: Protection of confidential information
- **Privacy**: Collection, use, retention, disclosure, and disposal of personal information

**SOC 2 Types:**
- **Type I**: Design effectiveness of controls at a specific point in time
- **Type II**: Operating effectiveness of controls over a period of time (typically 6-12 months)

## Sector-Specific Frameworks

### NERC CIP (North American Electric Reliability Corporation Critical Infrastructure Protection)
**Electric utility cybersecurity standards**

**CIP Standards:**
- **CIP-002**: BES Cyber System Categorization
- **CIP-003**: Security Management Controls
- **CIP-004**: Personnel & Training
- **CIP-005**: Electronic Security Perimeters
- **CIP-006**: Physical Security of BES Cyber Systems
- **CIP-007**: System Security Management
- **CIP-008**: Incident Reporting and Response Planning
- **CIP-009**: Recovery Plans for BES Cyber Systems
- **CIP-010**: Configuration Change Management and Vulnerability Assessments
- **CIP-011**: Information Protection
- **CIP-013**: Supply Chain Risk Management

### SWIFT CSP (Customer Security Programme)
**Banking and financial messaging security framework**

**Mandatory Controls:**
- **Secure Network**: Network segmentation and protection
- **Secure Environment**: Hardening and monitoring of local SWIFT infrastructure
- **Reduce Attack Vectors**: Restriction of internet access and email usage

**Advisory Controls:**
- Enhanced monitoring and logging
- Advanced threat protection
- Vulnerability and patch management
- Physical and environmental security

## Implementation Guidance

### Compliance Program Elements
- **Governance Structure**: Clear roles, responsibilities, and accountability
- **Risk Assessment**: Regular evaluation of compliance risks
- **Policy Framework**: Comprehensive policies and procedures
- **Training Program**: Regular compliance education and awareness
- **Monitoring and Auditing**: Continuous compliance assessment
- **Incident Response**: Compliance breach detection and response
- **Vendor Management**: Third-party compliance verification
- **Documentation Management**: Evidence collection and retention

### Multi-Framework Approach
- **Framework Mapping**: Identify overlapping requirements across regulations
- **Unified Controls**: Implement controls that satisfy multiple frameworks
- **Risk-Based Prioritization**: Focus on highest-risk compliance requirements
- **Continuous Monitoring**: Ongoing compliance posture assessment
- **Regular Updates**: Stay current with regulatory changes and updates

This reference enables comprehensive compliance planning and implementation across multiple regulatory frameworks and industry standards.