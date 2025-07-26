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

## Integration with BMad Security Framework

### Security Agent (Planning Phase)
The Security agent should implement PO practices during the planning and architecture phases:
- **PO.1**: Define security requirements in architecture documents
- **PO.2**: Establish security roles and training requirements  
- **PO.3**: Specify security toolchain requirements
- **PO.4**: Define security check criteria for the project
- **PO.5**: Design secure development environment requirements

### VulnerabilityTech Agent (Implementation Phase)
The VulnerabilityTech agent should validate PS practices during code review:
- **PS.1**: Verify code access controls and protection measures
- **PS.2**: Validate software integrity mechanisms
- **PS.3**: Ensure proper archival and provenance tracking

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