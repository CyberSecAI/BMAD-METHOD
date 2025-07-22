# Compliance Validation Checklist

This checklist ensures systems and processes meet applicable regulatory and industry compliance requirements for defensive security frameworks.

[[LLM: INITIALIZATION INSTRUCTIONS - REQUIRED ARTIFACTS

Before proceeding with this checklist, ensure you have access to:

1. List of applicable regulations and standards (GDPR, HIPAA, PCI-DSS, SOX, NIST, etc.)
2. System architecture and data flow documentation
3. Security policies and procedures documentation
4. Risk assessment and security control documentation
5. Privacy impact assessments (if applicable)
6. Vendor and third-party security agreements
7. Previous audit reports and compliance assessments

VALIDATION APPROACH:
For each section, you must:
1. Regulatory Mapping - Map requirements to implemented controls
2. Evidence Collection - Document proof of compliance implementation
3. Gap Analysis - Identify areas of non-compliance or incomplete implementation
4. Risk Assessment - Evaluate compliance risks and their business impact

EXECUTION MODE:
Choose compliance focus area:
- Multi-Regulatory - Comprehensive compliance across multiple frameworks
- Specific Regulation - Deep dive into single regulatory requirement
- Audit Preparation - Pre-audit compliance validation
- Ongoing Compliance - Regular compliance monitoring]]

## 1. DATA PROTECTION & PRIVACY COMPLIANCE

### 1.1 GDPR Compliance (if applicable)
- [ ] Legal basis for data processing documented and justified
- [ ] Data Protection Impact Assessment (DPIA) completed for high-risk processing
- [ ] Privacy by Design principles implemented in system architecture
- [ ] Data subject rights mechanisms implemented (access, rectification, erasure, etc.)
- [ ] Consent management system implemented with granular controls
- [ ] Data breach notification procedures (72-hour requirement) implemented
- [ ] Data Protection Officer (DPO) appointed and accessible
- [ ] Cross-border data transfer safeguards implemented (adequacy decisions, SCCs)
- [ ] Record of processing activities maintained and current
- [ ] Privacy policy updated and prominently displayed

### 1.2 CCPA/CPRA Compliance (if applicable)
- [ ] Consumer rights request system implemented
- [ ] "Do Not Sell My Personal Information" opt-out mechanism implemented
- [ ] Personal information categories disclosure documented
- [ ] Third-party data sharing disclosure documented
- [ ] Consumer request verification procedures implemented
- [ ] Data retention and deletion procedures documented
- [ ] Service provider agreements include CCPA compliance requirements
- [ ] Privacy policy includes required CCPA disclosures

### 1.3 HIPAA Compliance (if applicable)
- [ ] Business Associate Agreements (BAAs) signed with all relevant parties
- [ ] Physical safeguards implemented for PHI access and storage
- [ ] Administrative safeguards implemented (security officer, training, etc.)
- [ ] Technical safeguards implemented (access control, audit logs, encryption)
- [ ] Risk assessment and management procedures documented
- [ ] Breach notification procedures implemented (60-day requirement)
- [ ] Employee training on HIPAA requirements completed and documented
- [ ] Minimum necessary standard implemented for PHI access
- [ ] Patient rights procedures implemented (access, amendment, restriction)
- [ ] Sanctions policy for HIPAA violations documented and enforced

## 2. FINANCIAL & PAYMENT COMPLIANCE

### 2.1 PCI-DSS Compliance (if applicable)
- [ ] Cardholder Data Environment (CDE) properly segmented and secured
- [ ] Network security controls implemented (firewalls, network segmentation)
- [ ] Cardholder data protection implemented (encryption, tokenization)
- [ ] Strong access control measures implemented
- [ ] Regular monitoring and testing procedures implemented
- [ ] Information security policy maintained and distributed
- [ ] Vulnerability management program implemented
- [ ] Secure system development procedures implemented
- [ ] Physical access restrictions to cardholder data implemented
- [ ] Regular security awareness training completed
- [ ] Incident response and forensics procedures documented
- [ ] Annual PCI-DSS compliance assessment completed

### 2.2 SOX Compliance (if applicable)
- [ ] IT General Controls (ITGCs) implemented and tested
- [ ] Change management procedures documented and enforced
- [ ] Segregation of duties implemented for financial systems
- [ ] Access management procedures for financial systems documented
- [ ] Data backup and recovery procedures tested
- [ ] System monitoring and incident response procedures implemented
- [ ] Management assessment of internal controls completed
- [ ] Independent testing of financial reporting controls completed
- [ ] Deficiencies remediation tracking documented
- [ ] Executive certifications completed and documented

## 3. INDUSTRY & SECTOR-SPECIFIC COMPLIANCE

### 3.1 NIST Cybersecurity Framework Compliance
- [ ] Framework implementation tier identified and documented
- [ ] Current state profile assessment completed
- [ ] Target state profile defined based on risk tolerance
- [ ] Gap analysis between current and target state completed
- [ ] Implementation plan with priorities and timelines developed
- [ ] Identify function controls implemented (asset management, governance, risk)
- [ ] Protect function controls implemented (access control, data security, training)
- [ ] Detect function controls implemented (monitoring, detection processes)
- [ ] Respond function controls implemented (response planning, communications)
- [ ] Recover function controls implemented (recovery planning, improvements)

### 3.2 ISO 27001/27002 Compliance (if applicable)
- [ ] Information Security Management System (ISMS) implemented
- [ ] Security policy documented and approved by management
- [ ] Risk assessment methodology implemented
- [ ] Statement of Applicability (SoA) documented
- [ ] Security controls from Annex A implemented as applicable
- [ ] Management review process implemented
- [ ] Internal audit program implemented
- [ ] Corrective action procedures implemented
- [ ] Continual improvement process documented
- [ ] Employee security awareness training program implemented

### 3.3 FedRAMP Compliance (if applicable)
- [ ] System Security Plan (SSP) developed and approved
- [ ] Security control implementation documented
- [ ] Continuous monitoring program implemented
- [ ] Plan of Action and Milestones (POA&M) maintained
- [ ] Third Party Assessment Organization (3PAO) assessment completed
- [ ] Security authorization granted and current
- [ ] Incident reporting procedures to US-CERT implemented
- [ ] Supply chain risk management implemented
- [ ] Personnel security requirements met
- [ ] Configuration management procedures implemented

## 4. OPERATIONAL COMPLIANCE

### 4.1 Audit & Documentation Requirements
- [ ] Compliance documentation organized and accessible
- [ ] Evidence collection procedures documented and implemented
- [ ] Document retention policies meet regulatory requirements
- [ ] Version control for compliance documentation implemented
- [ ] Regular compliance self-assessments conducted
- [ ] Management reporting on compliance status implemented
- [ ] Third-party audit coordination procedures documented
- [ ] Audit findings tracking and remediation process implemented
- [ ] Compliance training records maintained and current
- [ ] Compliance measurement and metrics program implemented

### 4.2 Incident Response & Reporting Compliance
- [ ] Incident classification procedures align with regulatory requirements
- [ ] Regulatory notification timelines documented and tested
- [ ] Incident response team includes compliance expertise
- [ ] Forensic data collection procedures preserve compliance evidence
- [ ] Customer notification procedures meet regulatory requirements
- [ ] Regulatory reporting templates prepared and tested
- [ ] Legal counsel involvement procedures documented
- [ ] Post-incident compliance review procedures implemented
- [ ] Lessons learned integration into compliance program documented
- [ ] Compliance incident metrics tracked and reported

## 5. VENDOR & THIRD-PARTY COMPLIANCE

### 5.1 Supply Chain Compliance
- [ ] Vendor security assessment procedures include compliance requirements
- [ ] Third-party compliance certifications verified and current
- [ ] Data processing agreements include compliance requirements
- [ ] Vendor compliance monitoring procedures implemented
- [ ] Supply chain risk assessment includes compliance risks
- [ ] Vendor incident notification requirements documented
- [ ] Right to audit clauses included in vendor agreements
- [ ] Vendor compliance training requirements documented
- [ ] Subcontractor compliance requirements flowed down
- [ ] Vendor compliance performance metrics tracked

### 5.2 Data Sharing Compliance
- [ ] Data sharing agreements include compliance requirements
- [ ] Cross-border data transfer compliance mechanisms implemented
- [ ] Data minimization principles applied to third-party sharing
- [ ] Purpose limitation documented for all data sharing
- [ ] Third-party data retention and deletion requirements enforced
- [ ] Data sharing audit trails maintained
- [ ] Consent requirements for data sharing implemented
- [ ] Data sharing risk assessments completed
- [ ] Data sharing breach notification procedures documented
- [ ] Regular review of data sharing arrangements implemented

## 6. TRAINING & AWARENESS COMPLIANCE

### 6.1 Employee Compliance Training
- [ ] Role-based compliance training programs implemented
- [ ] Annual compliance training completion tracked
- [ ] New employee compliance orientation implemented
- [ ] Compliance training effectiveness measured
- [ ] Specialized training for high-risk roles provided
- [ ] Compliance training updates reflect regulatory changes
- [ ] Training completion reporting to management implemented
- [ ] Remedial training procedures for non-compliance documented
- [ ] Compliance training records retention meets requirements
- [ ] Multi-language training provided where required

### 6.2 Compliance Awareness Program
- [ ] Regular compliance communications distributed
- [ ] Compliance metrics shared with employees
- [ ] Compliance success stories and lessons learned shared
- [ ] Compliance reporting mechanisms easily accessible
- [ ] Anonymous compliance reporting available
- [ ] Compliance recognition and incentive programs implemented
- [ ] Compliance culture assessment conducted regularly
- [ ] Management compliance leadership demonstrated
- [ ] Compliance resource library maintained and accessible
- [ ] Compliance feedback mechanisms implemented

## COMPLIANCE VALIDATION SUMMARY

[[LLM: After completing all sections, provide a comprehensive compliance assessment that includes:

1. **Compliance Maturity Assessment**: Overall compliance program effectiveness
2. **Regulatory Compliance Status**: Status for each applicable regulation/standard
3. **Critical Compliance Gaps**: High-priority compliance deficiencies requiring immediate attention
4. **Compliance Risk Assessment**: Potential regulatory, financial, and reputational risks
5. **Remediation Priority Matrix**: Action items ranked by risk and regulatory timeline requirements
6. **Compliance Roadmap**: Strategic plan for achieving and maintaining compliance
7. **Cost-Benefit Analysis**: Compliance investment versus risk mitigation value
8. **Executive Summary**: High-level compliance status for senior management and board reporting

Format this as a formal compliance assessment report suitable for legal, compliance officers, and executive leadership.]]