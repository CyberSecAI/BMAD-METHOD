# Security Standards Reference

## Overview
This reference provides comprehensive information about security standards, frameworks, and best practices relevant to software security assessment and vulnerability management. It serves as a quick reference guide for vulnerability analysts and security professionals.

## OWASP (Open Web Application Security Project)

### OWASP Top 10 Web Application Security Risks (2021)
1. **A01:2021 – Broken Access Control**
   - **Description**: Restrictions on what authenticated users are allowed to do are often not properly enforced
   - **Common Weaknesses**: Violation of principle of least privilege, bypassing access control checks
   - **Prevention**: Implement access control mechanisms, deny by default, log access control failures

2. **A02:2021 – Cryptographic Failures**
   - **Description**: Failures related to cryptography which often leads to sensitive data exposure
   - **Common Weaknesses**: Transmitting data in clear text, using old or weak cryptographic algorithms
   - **Prevention**: Classify data, encrypt sensitive data, use up-to-date algorithms

3. **A03:2021 – Injection**
   - **Description**: User-supplied data is not validated, filtered, or sanitized by the application
   - **Common Types**: SQL injection, NoSQL injection, OS command injection, LDAP injection
   - **Prevention**: Use parameterized queries, validate input, use safe APIs

4. **A04:2021 – Insecure Design**
   - **Description**: Risks related to design flaws and missing or ineffective control design
   - **Focus Areas**: Secure design patterns, threat modeling, secure development lifecycle
   - **Prevention**: Establish secure development lifecycle, use threat modeling, implement security requirements

5. **A05:2021 – Security Misconfiguration**
   - **Description**: Application security depends on secure configuration of the application, frameworks, web server, database, and platform
   - **Common Issues**: Default configurations, incomplete configurations, open cloud storage
   - **Prevention**: Secure installation processes, minimal platform, regular security updates

6. **A06:2021 – Vulnerable and Outdated Components**
   - **Description**: Components such as libraries, frameworks, and software modules run with same privileges as the application
   - **Risks**: Known vulnerabilities, unsupported components, outdated software
   - **Prevention**: Remove unused components, secure component sources, monitor for vulnerabilities

7. **A07:2021 – Identification and Authentication Failures**
   - **Description**: Functions related to user identity, authentication, and session management
   - **Common Issues**: Brute force attacks, weak passwords, session management flaws
   - **Prevention**: Multi-factor authentication, weak password checks, secure session management

8. **A08:2021 – Software and Data Integrity Failures**
   - **Description**: Code and infrastructure that do not protect against integrity violations
   - **Focus Areas**: Unsigned updates, insecure deserialization, CI/CD pipelines
   - **Prevention**: Digital signatures, integrity checks, secure CI/CD pipelines

9. **A09:2021 – Security Logging and Monitoring Failures**
   - **Description**: Insufficient logging and monitoring coupled with missing or ineffective integration with incident response
   - **Risks**: Breach detection delays, insufficient audit trails, inadequate alerting
   - **Prevention**: Log all authentication and access control events, establish effective monitoring

10. **A10:2021 – Server-Side Request Forgery**
    - **Description**: SSRF flaws occur when web application fetches remote resources without validating user-supplied URL
    - **Risks**: Internal service scanning, sensitive data exposure, remote code execution
    - **Prevention**: Validate all client-supplied input data, sanitize and validate URLs, implement network segmentation

### OWASP Mobile Top 10 (2016)
1. **M1: Improper Platform Usage**
2. **M2: Insecure Data Storage**
3. **M3: Insecure Communication**
4. **M4: Insecure Authentication**
5. **M5: Insufficient Cryptography**
6. **M6: Insecure Authorization**
7. **M7: Client Code Quality**
8. **M8: Code Tampering**
9. **M9: Reverse Engineering**
10. **M10: Extraneous Functionality**

### OWASP API Security Top 10 (2023)
1. **API1:2023 – Broken Object Level Authorization**
2. **API2:2023 – Broken Authentication**
3. **API3:2023 – Broken Object Property Level Authorization**
4. **API4:2023 – Unrestricted Resource Consumption**
5. **API5:2023 – Broken Function Level Authorization**
6. **API6:2023 – Unrestricted Access to Sensitive Business Flows**
7. **API7:2023 – Server Side Request Forgery**
8. **API8:2023 – Security Misconfiguration**
9. **API9:2023 – Improper Inventory Management**
10. **API10:2023 – Unsafe Consumption of APIs**

## CWE (Common Weakness Enumeration)

### CWE Top 25 Most Dangerous Software Weaknesses (2023)
1. **CWE-787**: Out-of-bounds Write
2. **CWE-79**: Improper Neutralization of Input During Web Page Generation ('Cross-site Scripting')
3. **CWE-89**: Improper Neutralization of Special Elements used in an SQL Command ('SQL Injection')
4. **CWE-416**: Use After Free
5. **CWE-78**: Improper Neutralization of Special Elements used in an OS Command ('OS Command Injection')
6. **CWE-20**: Improper Input Validation
7. **CWE-125**: Out-of-bounds Read
8. **CWE-22**: Improper Limitation of a Pathname to a Restricted Directory ('Path Traversal')
9. **CWE-352**: Cross-Site Request Forgery (CSRF)
10. **CWE-434**: Unrestricted Upload of File with Dangerous Type

### Key CWE Categories
- **CWE-664**: Improper Control of a Resource Through its Lifetime
- **CWE-691**: Insufficient Control Flow Management
- **CWE-693**: Protection Mechanism Failure
- **CWE-707**: Improper Neutralization
- **CWE-710**: Improper Adherence to Coding Standards

## NIST (National Institute of Standards and Technology)

### NIST Cybersecurity Framework
1. **Identify (ID)**: Develop understanding to manage cybersecurity risk
   - Asset Management (ID.AM)
   - Business Environment (ID.BE)
   - Governance (ID.GV)
   - Risk Assessment (ID.RA)
   - Risk Management Strategy (ID.RM)
   - Supply Chain Risk Management (ID.SC)

2. **Protect (PR)**: Develop and implement safeguards
   - Identity Management and Access Control (PR.AC)
   - Awareness and Training (PR.AT)
   - Data Security (PR.DS)
   - Information Protection Processes and Procedures (PR.IP)
   - Maintenance (PR.MA)
   - Protective Technology (PR.PT)

3. **Detect (DE)**: Develop and implement activities to identify cybersecurity events
   - Anomalies and Events (DE.AE)
   - Security Continuous Monitoring (DE.CM)
   - Detection Processes (DE.DP)

4. **Respond (RS)**: Develop and implement activities to take action regarding detected cybersecurity incident
   - Response Planning (RS.RP)
   - Communications (RS.CO)
   - Analysis (RS.AN)
   - Mitigation (RS.MI)
   - Improvements (RS.IM)

5. **Recover (RC)**: Develop and implement activities to maintain resilience plans
   - Recovery Planning (RC.RP)
   - Improvements (RC.IM)
   - Communications (RC.CO)

### NIST SP 800-53 Security Controls
- **Access Control (AC)**: 25 controls
- **Awareness and Training (AT)**: 6 controls
- **Audit and Accountability (AU)**: 16 controls
- **Security Assessment and Authorization (CA)**: 9 controls
- **Configuration Management (CM)**: 14 controls
- **Contingency Planning (CP)**: 13 controls
- **Identification and Authentication (IA)**: 12 controls
- **Incident Response (IR)**: 10 controls
- **Maintenance (MA)**: 7 controls
- **Media Protection (MP)**: 8 controls
- **Physical and Environmental Protection (PE)**: 20 controls
- **Planning (PL)**: 11 controls
- **Program Management (PM)**: 32 controls
- **Personnel Security (PS)**: 8 controls
- **Risk Assessment (RA)**: 10 controls
- **System and Services Acquisition (SA)**: 23 controls
- **System and Communications Protection (SC)**: 51 controls
- **System and Information Integrity (SI)**: 23 controls

## ISO/IEC 27001:2022

### Information Security Controls (Annex A)
1. **Organizational Controls** (37 controls)
   - Information security policies
   - Information security roles and responsibilities
   - Segregation of duties
   - Management responsibilities
   - Contact with authorities and special interest groups

2. **People Controls** (8 controls)
   - Screening
   - Terms and conditions of employment
   - Information security awareness, education and training
   - Disciplinary process

3. **Physical Controls** (14 controls)
   - Secure areas
   - Physical entry
   - Protection against environmental threats
   - Equipment maintenance
   - Secure disposal or reuse of equipment

4. **Technological Controls** (34 controls)
   - Access control management
   - System security
   - Application security
   - Cryptography
   - Systems security
   - Network security controls

## SANS Top 25 Software Errors

### Insecure Interaction Between Components
1. **CWE-89**: SQL Injection
2. **CWE-78**: OS Command Injection
3. **CWE-79**: Cross-site Scripting
4. **CWE-434**: Unrestricted Upload of File with Dangerous Type
5. **CWE-352**: Cross-Site Request Forgery
6. **CWE-601**: URL Redirection to Untrusted Site
7. **CWE-22**: Path Traversal
8. **CWE-94**: Code Injection

### Risky Resource Management
9. **CWE-119**: Buffer Overflow
10. **CWE-120**: Classic Buffer Overflow
11. **CWE-131**: Incorrect Buffer Size Calculation
12. **CWE-134**: Uncontrolled Format String
13. **CWE-190**: Integer Overflow
14. **CWE-680**: Integer Overflow to Buffer Overflow
15. **CWE-426**: Untrusted Search Path
16. **CWE-494**: Download of Code Without Integrity Check

### Porous Defenses
17. **CWE-862**: Missing Authorization
18. **CWE-863**: Incorrect Authorization
19. **CWE-798**: Use of Hard-coded Credentials
20. **CWE-259**: Use of Hard-coded Password
21. **CWE-522**: Insufficiently Protected Credentials
22. **CWE-732**: Incorrect Permission Assignment for Critical Resource
23. **CWE-676**: Use of Potentially Dangerous Function
24. **CWE-327**: Use of a Broken or Risky Cryptographic Algorithm
25. **CWE-330**: Use of Insufficiently Random Values

## CVSS (Common Vulnerability Scoring System)

### CVSS v3.1 Metrics

#### Base Score Metrics
- **Attack Vector (AV)**: Network (N), Adjacent (A), Local (L), Physical (P)
- **Attack Complexity (AC)**: Low (L), High (H)
- **Privileges Required (PR)**: None (N), Low (L), High (H)
- **User Interaction (UI)**: None (N), Required (R)
- **Scope (S)**: Unchanged (U), Changed (C)
- **Confidentiality Impact (C)**: High (H), Low (L), None (N)
- **Integrity Impact (I)**: High (H), Low (L), None (N)
- **Availability Impact (A)**: High (H), Low (L), None (N)

#### Temporal Score Metrics
- **Exploit Code Maturity (E)**: Not Defined (X), High (H), Functional (F), Proof-of-Concept (P), Unproven (U)
- **Remediation Level (RL)**: Not Defined (X), Unavailable (U), Workaround (W), Temporary Fix (T), Official Fix (O)
- **Report Confidence (RC)**: Not Defined (X), Confirmed (C), Reasonable (R), Unknown (U)

#### Environmental Score Metrics
- **Confidentiality Requirement (CR)**: Not Defined (X), High (H), Medium (M), Low (L)
- **Integrity Requirement (IR)**: Not Defined (X), High (H), Medium (M), Low (L)
- **Availability Requirement (AR)**: Not Defined (X), High (H), Medium (M), Low (L)

### CVSS Score Ranges
- **Critical**: 9.0-10.0
- **High**: 7.0-8.9
- **Medium**: 4.0-6.9
- **Low**: 0.1-3.9
- **None**: 0.0

## PCI DSS (Payment Card Industry Data Security Standard)

### 12 PCI DSS Requirements
1. **Install and maintain a firewall configuration** to protect cardholder data
2. **Do not use vendor-supplied defaults** for system passwords and other security parameters
3. **Protect stored cardholder data**
4. **Encrypt transmission of cardholder data** across open, public networks
5. **Protect all systems against malware** and regularly update anti-virus software
6. **Develop and maintain secure systems** and applications
7. **Restrict access to cardholder data** by business need to know
8. **Identify and authenticate access** to system components
9. **Restrict physical access** to cardholder data
10. **Track and monitor all access** to network resources and cardholder data
11. **Regularly test security systems** and processes
12. **Maintain a policy** that addresses information security for all personnel

## Security Testing Standards

### OWASP Testing Guide v4
1. **Information Gathering**
2. **Configuration and Deployment Management Testing**
3. **Identity Management Testing**
4. **Authentication Testing**
5. **Authorization Testing**
6. **Session Management Testing**
7. **Input Validation Testing**
8. **Error Handling**
9. **Cryptography**
10. **Business Logic Testing**
11. **Client Side Testing**

### NIST SP 800-115: Technical Guide to Information Security Testing
1. **Planning Phase**
2. **Discovery Phase**
3. **Attack Phase**
4. **Reporting Phase**

## Secure Coding Standards

### CERT Secure Coding Standards
- **CERT C Coding Standard**
- **CERT C++ Coding Standard**
- **CERT Java Coding Standard**
- **CERT Perl Secure Coding Standard**

### Language-Specific Security Guidelines
- **Java**: Oracle Secure Coding Guidelines for Java SE
- **C/C++**: MISRA C/C++ Guidelines
- **Python**: Python Security Best Practices
- **JavaScript**: JavaScript Security Best Practices
- **.NET**: Microsoft .NET Security Guidelines

## Compliance Frameworks

### SOX (Sarbanes-Oxley Act)
- Section 302: Corporate Responsibility for Financial Reports
- Section 404: Management Assessment of Internal Controls
- Section 409: Real Time Issuer Disclosures

### HIPAA (Health Insurance Portability and Accountability Act)
- Administrative Safeguards
- Physical Safeguards
- Technical Safeguards

### GDPR (General Data Protection Regulation)
- Lawful Basis for Processing
- Data Subject Rights
- Privacy by Design
- Data Protection Impact Assessment

## Industry-Specific Standards

### Automotive: ISO/SAE 21434
- Cybersecurity engineering lifecycle
- Risk assessment methods
- Cybersecurity validation and verification

### Industrial Control Systems: NIST SP 800-82
- ICS security architecture
- Security controls for ICS
- ICS security assessments

### Cloud Security: ISO/IEC 27017
- Cloud-specific security controls
- Cloud service provider responsibilities
- Cloud service customer responsibilities

## Reference Usage Guidelines

### Selecting Appropriate Standards
1. **Identify applicable regulations** and industry requirements
2. **Determine technology stack** and platform-specific considerations
3. **Consider organizational maturity** and resource constraints
4. **Align with business objectives** and risk tolerance
5. **Integrate with existing** security frameworks and processes

### Implementation Approach
1. **Gap Analysis**: Compare current state against standard requirements
2. **Risk Assessment**: Prioritize implementation based on risk and business impact
3. **Phased Implementation**: Implement controls in logical phases
4. **Continuous Monitoring**: Establish ongoing compliance monitoring
5. **Regular Updates**: Keep current with standard updates and revisions