# NIST SSDF Integration Guide

## Architecture Overview

This document defines how NIST SSDF compliance validation integrates with language-specific expansion packs to avoid duplication and ensure comprehensive coverage.

## Layered Architecture

### Layer 1: NIST SSDF Framework (bmad-core)
**Location**: `bmad-core/tasks/nist-ssdf-code-validation.md`
**Purpose**: High-level compliance framework and process validation

**Responsibilities**:
- NIST SSDF practice compliance scoring (PW.1 - PW.8, RV.1 - RV.3)
- Process and governance validation
- Compliance reporting and documentation
- Gap analysis and remediation planning
- Integration with BMad workflows

**What it DOES NOT do**:
- Language-specific vulnerability detection
- Detailed technical code analysis
- Technology-specific security patterns
- Deep security implementation details

### Layer 2: Language-Specific Implementation (expansion-packs)
**Location**: `expansion-packs/software-assurance/`
**Purpose**: Detailed technical security expertise for specific languages

**Responsibilities**:
- Language-specific vulnerability patterns (e.g., Python SQL injection patterns)
- Technology-specific secure coding practices
- Framework-specific security configurations
- Detailed security implementation guidance
- Language-specific security testing approaches

**What it DOES NOT do**:
- NIST SSDF compliance scoring
- High-level process validation
- Cross-language governance frameworks
- Compliance reporting

## Integration Points

### 1. Reference Relationships
```yaml
# bmad-core NIST SSDF task references expansion pack data
nist-ssdf-code-validation.md:
  references:
    - expansion-packs/software-assurance/data/python-secure-coding.md
    - expansion-packs/software-assurance/data/python-common-vulns.md
    - expansion-packs/software-assurance/templates/python-vuln-scan-tmpl.yaml
```

### 2. Validation Flow
```
NIST SSDF Validation Process:
1. NIST SSDF task identifies applicable practices (PW.4 - Secure Coding)
2. Task delegates to expansion pack for language-specific validation
3. Expansion pack performs detailed technical analysis
4. Results flow back to NIST SSDF compliance scoring
5. NIST SSDF task generates compliance report
```

### 3. Data Flow Integration
```
PW.4 Secure Coding Practices Validation:
├── NIST SSDF Framework (bmad-core)
│   ├── Identifies PW.4 compliance requirements
│   ├── Determines applicable language (Python)
│   └── Delegates to appropriate expansion pack
├── Software Assurance Expansion Pack
│   ├── Applies Python-specific secure coding rules
│   ├── Uses python-secure-coding.md guidelines
│   ├── Checks against python-common-vulns.md patterns
│   └── Returns technical findings
└── NIST SSDF Framework (bmad-core)
    ├── Scores PW.4 compliance (0-100)
    ├── Maps findings to NIST practices
    └── Generates compliance report
```

## Implementation Guidelines

### For NIST SSDF Task Enhancement
1. **Remove duplicated technical content** from `nist-ssdf-code-validation.md`
2. **Add expansion pack integration points** for language-specific validation
3. **Focus on compliance scoring and process validation**
4. **Reference expansion pack data** instead of duplicating

### For Expansion Pack Enhancement
1. **Map technical content to NIST SSDF practices**
2. **Add NIST practice identifiers** to vulnerability patterns
3. **Ensure compliance scoring compatibility**
4. **Provide technical validation APIs** for NIST framework

## Recommended Changes

### 1. Modify NIST SSDF Task
Remove detailed Python-specific content like:
```python
# Remove this from NIST SSDF task
- Password hashing with appropriate algorithms (bcrypt, Argon2)
- Parameterized queries for database operations
- Strong encryption algorithms and key management
```

Replace with expansion pack references:
```python
# Add this to NIST SSDF task
- Delegate to language-specific secure coding validation
- Reference: expansion-packs/software-assurance/data/{language}-secure-coding.md
- Apply scoring criteria to technical findings
```

### 2. Enhance Expansion Pack
Add NIST SSDF practice mappings:
```python
# In python-secure-coding.md
## Password Hashing (Maps to PW.4.1)
**NIST SSDF Practice**: PW.4 - Create Source Code Adhering to Secure Coding Practices
**Compliance Criteria**: Secure password hashing implementation
**Validation**: bcrypt/Argon2 usage, proper salt generation
```

### 3. Create Integration Interface
```yaml
# expansion-packs/software-assurance/nist-ssdf-mapping.yaml
practice_mappings:
  PW.4:
    secure_coding_checks:
      - python_password_hashing
      - python_input_validation
      - python_sql_injection_prevention
      - python_xss_prevention
    data_sources:
      - data/python-secure-coding.md
      - data/python-common-vulns.md
```

## Benefits of This Architecture

### 1. Eliminates Duplication
- Technical details only in expansion packs
- Compliance framework only in bmad-core
- Clear separation of concerns

### 2. Enables Scalability
- Easy to add new languages to expansion packs
- NIST SSDF framework remains language-agnostic
- Modular architecture supports growth

### 3. Improves Maintainability
- Single source of truth for language-specific security
- Centralized compliance framework
- Clear integration boundaries

### 4. Enhances Flexibility
- Organizations can choose relevant expansion packs
- NIST SSDF compliance works with any language
- Expansion packs can evolve independently

## Next Steps

1. **Refactor NIST SSDF task** to remove language-specific content
2. **Enhance expansion pack** with NIST practice mappings
3. **Create integration interface** for seamless operation
4. **Update VulnerabilityTech agent** to use layered approach
5. **Test integrated validation workflow**

This architecture ensures that we have both comprehensive NIST SSDF compliance AND deep technical security expertise without duplication.