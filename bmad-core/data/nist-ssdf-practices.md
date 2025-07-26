# NIST Secure Software Development Framework (SSDF) Practices

## Overview

The NIST SSDF (SP 800-218) provides a set of fundamental, sound, and secure software development practices organized into four main practice groups. This document serves as a reference for implementing NIST SSDF practices within the BMad Method security framework.

## PO: Prepare the Organization

Organizations should ensure that their people, processes, and technology are prepared to perform secure software development.

### PO.1: Define Security Requirements for Software Development
**Purpose**: Identify and document security requirements for both development infrastructure and the software being developed.

**Tasks**:
- **PO.1.1**: Identify and document security requirements for software development infrastructures and processes, and maintain the requirements over time
- **PO.1.2**: Identify and document security requirements for organization-developed software, and maintain the requirements over time  
- **PO.1.3**: Communicate requirements to third parties providing commercial software components

**Implementation Guidance**:
- Document security requirements in architecture specifications
- Maintain requirements traceability throughout development
- Establish security baselines for development environments
- Define compliance requirements (OWASP, NIST, ISO 27001)

### PO.2: Implement Roles and Responsibilities
**Purpose**: Ensure that everyone knows what they're responsible for and how to do it throughout the SDLC.

**Tasks**:
- **PO.2.1**: Create new roles and alter responsibilities for existing roles as needed to encompass all parts of the SSDF
- **PO.2.2**: Provide role-specific training for all personnel with responsibilities that contribute to secure development
- **PO.2.3**: Obtain management commitment to secure development

**Implementation Guidance**:
- Define Security Architect, Security Engineer, and Security Analyst roles
- Provide secure coding training for developers
- Establish security review responsibilities for each role
- Obtain executive sponsorship for security initiatives

### PO.3: Implement Supporting Toolchains
**Purpose**: Use tools and processes that support secure software development practices.

**Tasks**:
- **PO.3.1**: Specify which tools or tool types must or should be included in each toolchain and how the tools should be integrated
- **PO.3.2**: Follow recommended security practices when deploying and maintaining tools
- **PO.3.3**: Configure tools to generate artifacts that support secure software development

**Implementation Guidance**:
- Implement SAST/DAST scanning tools
- Deploy dependency scanning tools
- Configure CI/CD pipelines with security gates
- Maintain secure tool configurations

### PO.4: Define and Use Criteria for Software Security Checks
**Purpose**: Establish criteria for determining whether software security checks have been completed successfully.

**Tasks**:
- **PO.4.1**: Define criteria for software security checks throughout the SDLC
- **PO.4.2**: Implement processes to gather and safeguard the necessary information in support of the criteria

**Implementation Guidance**:
- Define security gate criteria for each SDLC phase
- Establish vulnerability severity thresholds
- Create security testing acceptance criteria
- Document security compliance requirements

### PO.5: Implement and Maintain Secure Development Environments
**Purpose**: Ensure that all development environments are secured and maintained.

**Tasks**:
- **PO.5.1**: Separate and protect each development environment based on risk
- **PO.5.2**: Secure development endpoints using a risk-based approach

**Implementation Guidance**:
- Implement network segmentation for development environments
- Use privileged access management for development systems
- Apply security hardening to development endpoints
- Monitor development environment access and activities

## PS: Protect the Software

Organizations should protect all components of their software from tampering and unauthorized access.

### PS.1: Protect All Forms of Code from Unauthorized Access and Tampering
**Purpose**: Help prevent unauthorized changes to code, both inadvertent and intentional.

**Tasks**:
- **PS.1.1**: Store all forms of code (including source code, executable code, and configuration-as-code) based on the principle of least privilege so that only authorized personnel have access

**Implementation Guidance**:
- Implement role-based access controls for code repositories
- Use code signing for executable artifacts
- Protect configuration files with appropriate access controls
- Audit code access and modifications

### PS.2: Provide a Mechanism for Verifying Software Release Integrity
**Purpose**: Help software acquirers ensure that the software they acquire is legitimate and has not been modified through supply chain attacks.

**Tasks**:
- **PS.2.1**: Make software integrity verification information available to software acquirers

**Implementation Guidance**:
- Generate cryptographic hashes for software releases
- Implement code signing certificates
- Provide Software Bill of Materials (SBOM)
- Document supply chain security measures

### PS.3: Archive and Protect Each Software Release
**Purpose**: Preserve software releases in order to help identify, analyze, and eliminate vulnerabilities discovered in the future.

**Tasks**:
- **PS.3.1**: Securely archive the necessary files and supporting data to be retained for each software release
- **PS.3.2**: Collect, safeguard, and share provenance data for all components of each software release

**Implementation Guidance**:
- Maintain secure release archives with version control
- Document component provenance and dependencies
- Implement backup and disaster recovery for archives
- Track third-party component licenses and vulnerabilities

## PW: Produce Well-Secured Software

Organizations should produce well-secured software with minimal security vulnerabilities in its releases.

### PW.1: Design Software to Meet Security Requirements and Mitigate Security Risks
**Purpose**: Translate security requirements into secure software design decisions and risk mitigation strategies.

**Tasks**:
- **PW.1.1**: Design software to meet security requirements and mitigate security risks

**Implementation Guidance**:
- Implement security requirements from planning phase
- Apply threat modeling results to design decisions
- Design security controls and defensive mechanisms
- Validate design against security architecture

### PW.2: Review the Software Design to Verify Compliance with Security Requirements and Risk Information
**Purpose**: Ensure that software design properly addresses security requirements and identified risks.

**Tasks**:
- **PW.2.1**: Review the software design to verify compliance with security requirements and risk information

**Implementation Guidance**:
- Conduct security design reviews
- Verify security control implementation in design
- Validate threat mitigation strategies
- Document design security decisions

### PW.3: Reuse Existing, Well-Secured Software When Feasible Instead of Duplicating Functionality
**Purpose**: Leverage existing secure software components to reduce security risks and development effort.

**Tasks**:
- **PW.3.1**: Reuse existing, well-secured software when feasible instead of duplicating functionality

**Implementation Guidance**:
- Evaluate security of third-party components
- Assess component security track records
- Validate component security configurations
- Monitor components for security updates

### PW.4: Create Source Code Adhering to Secure Coding Practices
**Purpose**: Implement software using secure coding practices to prevent common vulnerabilities.

**Tasks**:
- **PW.4.1**: Create source code adhering to secure coding practices

**Implementation Guidance**:
- Follow secure coding standards (OWASP, CERT)
- Implement input validation and output encoding
- Use secure authentication and session management
- Apply proper error handling and logging
- Implement cryptographic controls correctly

### PW.5: Configure the Compilation, Interpreter, and Build Processes to Improve Executable Security
**Purpose**: Use build-time security enhancements to improve the security of the executable software.

**Tasks**:
- **PW.5.1**: Configure the compilation, interpreter, and build processes to improve executable security

**Implementation Guidance**:
- Enable compiler security flags
- Configure build process security controls
- Implement build-time security scanning
- Secure build environment and processes

### PW.6: Review and/or Analyze Human-Readable Code to Identify Vulnerabilities
**Purpose**: Systematically examine code to identify security vulnerabilities and weaknesses.

**Tasks**:
- **PW.6.1**: Review and/or analyze human-readable code to identify vulnerabilities and verify compliance with security requirements

**Implementation Guidance**:
- Conduct manual code reviews with security focus
- Use static application security testing (SAST) tools
- Implement automated code analysis
- Document and track identified vulnerabilities

### PW.7: Test Executable Code to Identify Vulnerabilities and Verify Compliance with Security Requirements
**Purpose**: Execute software in controlled environments to identify runtime security vulnerabilities.

**Tasks**:
- **PW.7.1**: Test executable code to identify vulnerabilities and verify compliance with security requirements

**Implementation Guidance**:
- Perform dynamic application security testing (DAST)
- Execute security-specific test cases
- Conduct penetration testing
- Validate security control effectiveness

### PW.8: Configure Software to Have Secure Settings by Default
**Purpose**: Ensure that software installations have secure configurations that don't require additional security setup.

**Tasks**:
- **PW.8.1**: Configure software to have secure settings by default

**Implementation Guidance**:
- Implement secure default configurations
- Disable unnecessary features and services
- Configure security headers and settings
- Provide secure installation documentation

## RV: Respond to Vulnerabilities

Organizations should identify residual vulnerabilities in software releases and respond appropriately to address those vulnerabilities.

### RV.1: Identify and Confirm Vulnerabilities on an Ongoing Basis
**Purpose**: Continuously discover and validate security vulnerabilities in software.

**Tasks**:
- **RV.1.1**: Gather information from software acquirers, users, and public sources on potential vulnerabilities
- **RV.1.2**: Review, analyze, and/or test software to identify vulnerabilities
- **RV.1.3**: Determine the exploitability, potential impact, and other characteristics of each vulnerability

**Implementation Guidance**:
- Implement vulnerability disclosure processes
- Monitor public vulnerability databases
- Perform regular security assessments
- Validate vulnerability reports and findings

### RV.2: Assess, Prioritize, and Remediate Vulnerabilities
**Purpose**: Systematically address identified vulnerabilities based on risk and impact.

**Tasks**:
- **RV.2.1**: Analyze each vulnerability to gather sufficient information for remediation
- **RV.2.2**: Plan and implement risk-based responses to vulnerabilities
- **RV.2.3**: Analyze vulnerabilities to identify their root causes

**Implementation Guidance**:
- Implement CVSS scoring for vulnerability assessment
- Establish risk-based remediation priorities
- Develop remediation timelines and processes
- Track remediation progress and validation

### RV.3: Analyze Vulnerabilities to Identify Their Root Causes
**Purpose**: Understand why vulnerabilities occurred to prevent similar issues in the future.

**Tasks**:
- **RV.3.1**: Analyze vulnerabilities to identify their root causes
- **RV.3.2**: Analyze the root causes over time to identify patterns
- **RV.3.3**: Review the software for similar vulnerabilities

**Implementation Guidance**:
- Conduct systematic root cause analysis
- Identify process and training improvements
- Update secure development practices
- Implement preventive controls and measures

## Integration with BMad Security Framework

### Security Agent (Planning Phase)
The Security agent should implement PO and PS practices during the planning and architecture phases:
- **PO.1**: Define security requirements in architecture documents
- **PO.2**: Establish security roles and training requirements  
- **PO.3**: Specify security toolchain requirements
- **PO.4**: Define security check criteria for the project
- **PO.5**: Design secure development environment requirements
- **PS.1**: Plan code access controls and protection measures
- **PS.2**: Plan software integrity mechanisms
- **PS.3**: Plan archival and provenance tracking

### VulnerabilityTech Agent (Implementation Phase)
The VulnerabilityTech agent should validate PW and RV practices during code review:
- **PW.1**: Validate security requirements implementation
- **PW.2**: Verify software design compliance
- **PW.3**: Assess third-party component security
- **PW.4**: Review secure coding practice implementation
- **PW.5**: Validate build process security
- **PW.6**: Conduct code review and analysis
- **PW.7**: Perform security testing validation
- **PW.8**: Verify secure default configurations
- **RV.1**: Validate vulnerability identification processes
- **RV.2**: Assess vulnerability response procedures
- **RV.3**: Conduct root cause analysis

## Compliance Mapping

### Story-Level Implementation
Each story should consider applicable NIST SSDF practices:
- Security requirements (PO.1) → Story Security Requirements section
- Role responsibilities (PO.2) → Story task assignments  
- Tool usage (PO.3) → Story testing requirements
- Security criteria (PO.4) → Story acceptance criteria
- Environment security (PO.5) → Story deployment requirements
- Code protection (PS.1) → Story access control requirements
- Integrity verification (PS.2) → Story release requirements
- Archival (PS.3) → Story documentation requirements

## References

- NIST SP 800-218: Secure Software Development Framework (SSDF) Version 1.1
- NIST SP 800-218A: Secure Software Development Practices for Generative AI and Dual-Use Foundation Models