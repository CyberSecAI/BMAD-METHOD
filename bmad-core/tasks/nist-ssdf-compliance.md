# NIST SSDF Compliance Assessment (Legacy)

## Objective
**DEPRECATED**: This task is superseded by `nist-ssdf-planning-assessment.md` which provides enhanced integration with the VulnerabilityTech agent's implementation-phase validation.

Legacy assessment for NIST Secure Software Development Framework (SSDF) practices throughout the project planning and architecture phases, focusing on PO (Prepare Organization) and PS (Protect Software) practices.

**Recommended Usage**: Use `nist-ssdf-planning-assessment.md` for new projects to leverage the integrated framework architecture.

## When to Use
- During security assessment phase of project planning
- When creating security architecture documentation
- For compliance validation and audit preparation
- When establishing secure development standards for a project

## Prerequisites
- Project requirements document (PRD) available
- System architecture document available  
- Understanding of project scope and technology stack
- Access to organizational security policies and standards

## Process

### Phase 1: Organizational Preparedness Assessment (PO Practices)

#### Step 1: Security Requirements Definition (PO.1)
**Assess PO.1.1 - Development Infrastructure Security Requirements**

Review and document:
- [ ] Development environment security requirements
- [ ] CI/CD pipeline security requirements  
- [ ] Development tool security requirements
- [ ] Network segmentation requirements for development
- [ ] Access control requirements for development infrastructure

**Questions to Address:**
1. What security requirements exist for the development infrastructure?
2. Are development environments properly isolated and secured?
3. What tools and processes need security configuration?
4. How will security requirements be maintained over time?

**Assessment PO.1.2 - Software Security Requirements**

Document software-specific security requirements:
- [ ] Authentication and authorization requirements
- [ ] Data protection and encryption requirements
- [ ] Input validation and sanitization requirements  
- [ ] Logging and monitoring requirements
- [ ] Compliance requirements (GDPR, HIPAA, PCI-DSS, etc.)

**Questions to Address:**
1. What are the specific security requirements for this software?
2. What compliance standards must be met?
3. How will security requirements be traced through development?
4. What are the security acceptance criteria?

**Assessment PO.1.3 - Third-Party Component Requirements**

Evaluate third-party component security:
- [ ] Third-party component security evaluation criteria
- [ ] Vendor security assessment requirements
- [ ] Component vulnerability management requirements
- [ ] License compliance requirements
- [ ] Supply chain security requirements

#### Step 2: Roles and Responsibilities (PO.2)
**Assess PO.2.1 - Security Roles Definition**

Define and validate security roles:
- [ ] Security Architect role and responsibilities
- [ ] Security Engineer role and responsibilities  
- [ ] Developer security responsibilities
- [ ] QA security testing responsibilities
- [ ] DevOps security responsibilities

**Assessment PO.2.2 - Security Training Requirements**

Document training needs:
- [ ] Secure coding training requirements
- [ ] Security tool training requirements
- [ ] Threat modeling training requirements
- [ ] Incident response training requirements
- [ ] Compliance training requirements

**Assessment PO.2.3 - Management Commitment**

Validate management support:
- [ ] Security budget allocation
- [ ] Security resource allocation
- [ ] Security timeline considerations
- [ ] Executive sponsorship confirmation
- [ ] Security priority establishment

#### Step 3: Supporting Toolchains (PO.3)
**Assess PO.3.1 - Tool Requirements**

Define required security tools:
- [ ] Static Application Security Testing (SAST) tools
- [ ] Dynamic Application Security Testing (DAST) tools
- [ ] Dependency scanning tools
- [ ] Container security scanning tools
- [ ] Infrastructure as Code (IaC) scanning tools

**Assessment PO.3.2 - Tool Security Practices**

Evaluate tool deployment security:
- [ ] Tool access controls and authentication
- [ ] Tool configuration security
- [ ] Tool update and patch management
- [ ] Tool data protection and privacy
- [ ] Tool integration security

**Assessment PO.3.3 - Artifact Generation**

Configure tools for security artifacts:
- [ ] Security scan reports generation
- [ ] Vulnerability tracking artifacts
- [ ] Compliance evidence generation
- [ ] Security metrics collection
- [ ] Audit trail generation

#### Step 4: Security Check Criteria (PO.4)
**Assess PO.4.1 - Security Criteria Definition**

Define security gates and criteria:
- [ ] Code review security criteria
- [ ] Security testing pass/fail criteria
- [ ] Vulnerability severity thresholds
- [ ] Security compliance checkpoints
- [ ] Release security criteria

**Assessment PO.4.2 - Information Gathering**

Establish processes for security information:
- [ ] Security metrics collection processes
- [ ] Vulnerability data gathering
- [ ] Security incident tracking
- [ ] Compliance evidence collection
- [ ] Security audit trail maintenance

#### Step 5: Secure Development Environments (PO.5)
**Assess PO.5.1 - Environment Separation**

Evaluate environment security:
- [ ] Development environment isolation
- [ ] Testing environment security
- [ ] Staging environment protection
- [ ] Production environment separation
- [ ] Environment access controls

**Assessment PO.5.2 - Endpoint Security**

Assess development endpoint security:
- [ ] Developer workstation security requirements
- [ ] Network access controls
- [ ] Endpoint monitoring and logging
- [ ] Data loss prevention measures
- [ ] Remote access security

### Phase 2: Software Protection Assessment (PS Practices)

#### Step 6: Code Protection (PS.1)
**Assess PS.1.1 - Code Access Controls**

Evaluate code protection measures:
- [ ] Source code repository access controls
- [ ] Code branching and merging controls
- [ ] Code review access permissions
- [ ] Configuration-as-code protection
- [ ] Secrets management in code

**Questions to Address:**
1. Who has access to source code repositories?
2. How are code changes tracked and audited?
3. What controls prevent unauthorized code modifications?
4. How are secrets and credentials protected in code?

#### Step 7: Software Integrity (PS.2)
**Assess PS.2.1 - Integrity Verification**

Plan software integrity measures:
- [ ] Code signing implementation
- [ ] Software checksums and hashes
- [ ] Digital signatures for releases
- [ ] Supply chain integrity verification
- [ ] Software Bill of Materials (SBOM) generation

**Questions to Address:**
1. How will software integrity be verified?
2. What mechanisms will detect tampering?
3. How will supply chain integrity be assured?
4. What information will be provided to software acquirers?

#### Step 8: Software Archival (PS.3)
**Assess PS.3.1 - Release Archival**

Plan release archival strategy:
- [ ] Release artifact retention requirements
- [ ] Source code archival strategy
- [ ] Dependency archival requirements
- [ ] Documentation archival plan
- [ ] Configuration archival strategy

**Assessment PS.3.2 - Provenance Data**

Plan provenance tracking:
- [ ] Component origin tracking
- [ ] Dependency provenance documentation
- [ ] Build environment documentation
- [ ] Third-party component tracking
- [ ] License and compliance tracking

## Deliverables

### 1. NIST SSDF Compliance Assessment Report
Create a comprehensive report documenting:
- Compliance status for each NIST SSDF practice
- Gap analysis and recommendations
- Implementation timeline and priorities
- Resource requirements for compliance
- Risk assessment for non-compliance areas

### 2. Security Architecture Updates
Update security architecture documentation to include:
- NIST SSDF practice implementation details
- Security requirements derived from SSDF practices
- Security controls mapped to SSDF requirements
- Compliance monitoring and validation procedures

### 3. Security Implementation Plan
Develop an implementation plan covering:
- Priority order for SSDF practice implementation
- Resource allocation and timeline
- Training and skills development requirements
- Tool and process implementation steps
- Compliance validation and monitoring procedures

## Templates

Use the following templates for documentation:
- `nist-ssdf-assessment-tmpl.yaml` - Compliance assessment report
- `security-architecture-tmpl.yaml` - Updated security architecture
- `security-implementation-plan-tmpl.yaml` - Implementation planning

## Integration Points

### With Other BMad Tasks
- **assess-plan**: Incorporate SSDF compliance into overall security assessment
- **create-doc**: Use for generating SSDF compliance documentation
- **threat-modeling**: Align threat models with SSDF security requirements

### With Story Templates
- Security requirements sections should reflect SSDF requirements
- Security testing requirements should validate SSDF compliance
- Threat considerations should align with SSDF practices

## Success Criteria

- [ ] All applicable NIST SSDF practices have been assessed
- [ ] Gap analysis identifies specific compliance issues
- [ ] Implementation plan addresses all identified gaps
- [ ] Security architecture incorporates SSDF requirements
- [ ] Teams understand their SSDF compliance responsibilities
- [ ] Compliance monitoring processes are established

## References

- NIST SP 800-218: Secure Software Development Framework (SSDF) Version 1.1
- `nist-ssdf-practices.md` - BMad SSDF practice reference
- OWASP Secure Software Development Lifecycle guidelines
- ISO/IEC 27034: Application Security standards