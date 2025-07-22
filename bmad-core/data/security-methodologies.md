# Security Methodologies Reference

This document provides comprehensive reference material for security methodologies, frameworks, and best practices used in defensive security analysis and implementation.

## Threat Modeling Methodologies

### STRIDE Framework
**Spoofing, Tampering, Repudiation, Information Disclosure, Denial of Service, Elevation of Privilege**

**Application:**
- Systematic threat identification across six categories
- Asset-based threat analysis
- Particularly effective for software applications and services

**Implementation Process:**
1. **System Decomposition** - Identify components, data flows, trust boundaries
2. **Threat Enumeration** - Apply STRIDE categories to each system element
3. **Vulnerability Assessment** - Evaluate system susceptibility to identified threats
4. **Risk Prioritization** - Rank threats by likelihood and impact
5. **Control Recommendation** - Define mitigations for high-priority threats

### PASTA (Process for Attack Simulation and Threat Analysis)
**Seven-stage threat modeling methodology focused on risk and business impact**

**Seven Stages:**
1. **Define Objectives** - Business and security objectives alignment
2. **Define Technical Scope** - System boundaries and components
3. **Application Decomposition** - Detailed system analysis
4. **Threat Analysis** - Threat landscape and attack vectors
5. **Weakness and Vulnerability Analysis** - System vulnerabilities identification
6. **Attack Modeling** - Attack tree and scenario development
7. **Risk Impact Analysis** - Business risk assessment and prioritization

### LINDDUN Framework
**Privacy-focused threat modeling methodology**

**Categories:** Linkability, Identifiability, Non-repudiation, Detectability, Disclosure of Information, Unawareness, Non-compliance

**Application:**
- Privacy-by-design implementation
- GDPR and privacy regulation compliance
- Data protection impact assessments

## Risk Assessment Methodologies

### DREAD Methodology
**Damage, Reproducibility, Exploitability, Affected Users, Discoverability**

**Scoring Scale:** 1-10 for each category
- **Damage Potential**: Impact severity if vulnerability exploited
- **Reproducibility**: Ease of reproducing the attack
- **Exploitability**: Skill/resources required for exploitation
- **Affected Users**: Percentage of user base impacted
- **Discoverability**: Likelihood of threat discovery

**Risk Calculation:** Total Score / 5 = Risk Rating
- **High Risk**: 7.0-10.0
- **Medium Risk**: 4.0-6.9
- **Low Risk**: 1.0-3.9

### CVSS (Common Vulnerability Scoring System)
**Standardized vulnerability assessment framework**

**Base Metrics:**
- **Attack Vector**: Network, Adjacent, Local, Physical
- **Attack Complexity**: Low, High
- **Privileges Required**: None, Low, High
- **User Interaction**: None, Required
- **Scope**: Unchanged, Changed
- **Confidentiality Impact**: None, Low, High
- **Integrity Impact**: None, Low, High
- **Availability Impact**: None, Low, High

### FAIR (Factor Analysis of Information Risk)
**Quantitative risk analysis methodology**

**Core Components:**
- **Risk**: Probability and magnitude of future loss
- **Loss Event Frequency**: Threat Event Frequency × Vulnerability
- **Probable Loss Magnitude**: Primary + Secondary Loss magnitude

## Security Control Frameworks

### NIST Cybersecurity Framework
**Five Core Functions: Identify, Protect, Detect, Respond, Recover**

**Implementation Tiers:**
1. **Partial** - Ad hoc, reactive approach
2. **Risk Informed** - Risk-informed policy and processes
3. **Repeatable** - Consistent, regular practices
4. **Adaptive** - Learning organization, continuous improvement

### ISO 27001/27002 Controls
**Comprehensive information security management system**

**Control Categories:**
- Information security policies
- Organization of information security
- Human resource security
- Asset management
- Access control
- Cryptography
- Physical and environmental security
- Operations security
- Communications security
- System acquisition, development and maintenance
- Supplier relationships
- Information security incident management
- Information security aspects of business continuity management
- Compliance

### CIS Controls (Center for Internet Security)
**20 Critical Security Controls prioritized by effectiveness**

**Basic Controls (1-6):**
1. Inventory and Control of Enterprise Assets
2. Inventory and Control of Software Assets
3. Data Protection
4. Secure Configuration of Enterprise Assets and Software
5. Account Management
6. Access Control Management

**Foundational Controls (7-16):**
7. Continuous Vulnerability Management
8. Audit Log Management
9. Email and Web Browser Protections
10. Malware Defenses
11. Data Recovery
12. Network Infrastructure Management
13. Network Monitoring and Defense
14. Security Awareness and Skills Training
15. Service Provider Management
16. Application Software Security

**Organizational Controls (17-20):**
17. Incident Response Management
18. Penetration Testing
19. Incident Response and Recovery
20. Penetration Testing and Red Team Exercises

## Secure Development Methodologies

### OWASP SAMM (Software Assurance Maturity Model)
**Framework for building security into software development lifecycle**

**Security Practices:**
- **Governance**: Strategy & Metrics, Policy & Compliance, Education & Guidance
- **Design**: Threat Assessment, Security Requirements, Security Architecture
- **Implementation**: Secure Build, Secure Deployment, Defect Management
- **Verification**: Architecture Assessment, Requirements-driven Testing, Security Testing
- **Operations**: Incident Management, Environment Management, Operational Management

### Microsoft SDL (Security Development Lifecycle)
**Security-focused software development process**

**SDL Phases:**
1. **Training** - Security education for development teams
2. **Requirements** - Security and privacy requirements definition
3. **Design** - Attack surface analysis and threat modeling
4. **Implementation** - Secure coding practices and static analysis
5. **Verification** - Dynamic analysis and penetration testing
6. **Release** - Security response planning and final security review
7. **Response** - Security incident response and post-release monitoring

## Defense in Depth Strategy

### Layered Security Model
**Multiple security controls at different system layers**

**Physical Layer:**
- Facility access controls
- Hardware security modules
- Environmental monitoring

**Network Layer:**
- Firewalls and network segmentation
- Intrusion detection/prevention systems
- Network access control

**Host Layer:**
- Endpoint protection platforms
- Host-based intrusion detection
- System hardening and configuration management

**Application Layer:**
- Secure coding practices
- Application firewalls
- Runtime application self-protection

**Data Layer:**
- Encryption at rest and in transit
- Data loss prevention
- Data classification and handling

**User Layer:**
- Identity and access management
- Multi-factor authentication
- Security awareness training

## Compliance and Regulatory Frameworks

### Privacy Regulations
- **GDPR** - EU General Data Protection Regulation
- **CCPA/CPRA** - California Consumer Privacy Act/Rights
- **HIPAA** - Health Insurance Portability and Accountability Act
- **PIPEDA** - Personal Information Protection and Electronic Documents Act

### Financial Regulations
- **SOX** - Sarbanes-Oxley Act
- **PCI-DSS** - Payment Card Industry Data Security Standard
- **GLBA** - Gramm-Leach-Bliley Act
- **FISMA** - Federal Information Security Management Act

### Industry Standards
- **ISO 27001** - Information Security Management Systems
- **SOC 2** - Service Organization Control 2
- **FedRAMP** - Federal Risk and Authorization Management Program
- **COBIT** - Control Objectives for Information Technologies

This reference enables consistent application of proven security methodologies across all security assessment and implementation activities.