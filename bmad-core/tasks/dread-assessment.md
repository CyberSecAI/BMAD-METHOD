# dread-assessment

Performs enhanced quantitative risk assessment using the DREAD methodology, integrated with current threat intelligence and sophisticated risk analysis models to prioritize security threats with evidence-based numerical scoring.

**Enhanced DREAD Framework:**
- **Risk Analysis Models**: Uses `{root}/utils/security-analysis.md` for quantitative risk assessment methodologies
- **Threat Intelligence**: Leverages `{root}/data/threat-intelligence.md` for current attack feasibility and actor capabilities
- **Industry Context**: References `{root}/data/security-methodologies.md` for DREAD best practices and sector-specific scoring

## Prerequisites

- Completed threat model with identified threats
- Understanding of system architecture and business impact
- Access to technical documentation and threat scenarios
- Current threat intelligence context for your industry/technology stack

## DREAD Assessment Process

DREAD is a quantitative risk assessment framework that scores threats on five criteria using a 1-10 scale:

### Enhanced DREAD Scoring Criteria

Before scoring, establish **threat actor context** using `{root}/data/threat-intelligence.md`:
- **Relevant threat actors** for your industry (APTs, cybercriminals, insiders, hacktivists)
- **Current attack campaigns** targeting your technology stack
- **Known exploits** for your system components

**Damage Potential (1-10):**
How much damage could this threat cause if successfully exploited?

*Enhanced Scoring Guidance:*
- **1-3: Minimal damage** - Limited functionality impact, no sensitive data exposure, minimal business disruption
- **4-6: Moderate damage** - Service degradation, some confidential data exposure, short-term business impact
- **7-8: Major damage** - Significant service disruption, substantial data breach, major business/reputation impact
- **9-10: Catastrophic damage** - Complete system compromise, massive data breach, existential business threat

*Damage Assessment Framework* (Reference: `{root}/utils/security-analysis.md`):
- **Confidentiality Impact**: None/Partial/Complete data exposure
- **Integrity Impact**: None/Partial/Complete data modification capabilities  
- **Availability Impact**: None/Partial/Complete service disruption
- **Business Impact**: Operational, financial, regulatory, reputational consequences

**Reproducibility (1-10):**
How easy is it for an attacker to reproduce this exploit?

*Enhanced Scoring with Threat Intelligence:*
- **1-3: Very difficult** - Requires nation-state capabilities, zero-day exploits, insider access
- **4-6: Moderate difficulty** - Requires skilled cybercriminal capabilities, some specialized tools/knowledge
- **7-8: Easy to reproduce** - Script kiddie level, publicly available exploits, common attack tools
- **9-10: Always reproducible** - Automated exploits, widely available tools, minimal skill required

*Reproducibility Factors* (Reference current threat intelligence):
- **Exploit availability**: Are exploits publicly available or being used in active campaigns?
- **Tool accessibility**: Are attack tools readily available to threat actors?
- **Technical barriers**: What level of expertise is required for successful exploitation?

**Exploitability (1-10):**
- How much effort and skill is required to exploit this threat?
- 1-3: Very difficult (expert knowledge, custom tools, significant time)
- 4-6: Moderate difficulty (intermediate skills, some tools, moderate time)
- 7-8: Easy to exploit (basic skills, available tools, little time)
- 9-10: Trivial to exploit (no special skills, automated tools)

**Affected Users (1-10):**
- How many users or systems are affected by successful exploitation?
- 1-3: Very few users (single user, isolated system)
- 4-6: Some users (small group, single department)
- 7-8: Many users (large group, multiple departments)
- 9-10: All users (entire user base, all systems)

**Discoverability (1-10):**
- How easy is it for an attacker to discover this vulnerability?
- 1-3: Very hard to discover (hidden, requires insider knowledge)
- 4-6: Moderate to discover (requires investigation, some knowledge)
- 7-8: Easy to discover (visible, documented, well-known)
- 9-10: Obvious to discover (publicly visible, widely known)

### Enhanced Risk Score Calculation

**Primary DREAD Score = (Damage + Reproducibility + Exploitability + Affected Users + Discoverability) / 5**

**Advanced Risk Analysis** (Reference: `{root}/utils/security-analysis.md`):

**Risk Adjustment Factors:**
- **Threat Actor Capability Multiplier**: 
  - Nation-state (1.2×), Organized cybercrime (1.1×), Insider threat (1.15×), Opportunistic (1.0×)
- **Industry Risk Factor**: 
  - Critical infrastructure (1.2×), Financial (1.15×), Healthcare (1.1×), Technology (1.05×), General (1.0×)
- **Current Campaign Activity**: 
  - Active targeting (+1.0), Recent campaign activity (+0.5), Historical activity (0.0)

**Final Risk Score = Primary DREAD Score × Capability Multiplier × Industry Factor + Campaign Activity**

### Enhanced Risk Score Interpretation

**Quantitative Risk Matrix:**
- **9.0-12.0**: **CRITICAL** - Emergency response required, executive notification
- **7.0-8.9**: **HIGH** - Immediate priority, deploy resources within 48-72 hours  
- **5.0-6.9**: **MEDIUM** - Planned remediation, address within current sprint/quarter
- **3.0-4.9**: **LOW** - Long-term planning, address as resources permit
- **1.0-2.9**: **NEGLIGIBLE** - Monitor, accept risk, or implement low-cost controls

**Business Risk Translation:**
- **Critical/High**: Board-level risk, potential regulatory action, major business impact
- **Medium**: Department-level risk, moderate business impact, compliance concerns  
- **Low/Negligible**: Operational risk, minimal business impact, best practice implementation

## Assessment Process

1. **Threat Inventory**
   - List all identified threats from threat modeling
   - Group related threats if appropriate
   - Ensure threats are specific and actionable

2. **Scoring Session**
   - Involve security experts, architects, and business stakeholders
   - Score each threat on all five DREAD criteria
   - Document rationale for each score
   - Reach consensus on scoring disputes

3. **Risk Calculation**
   - Calculate risk score for each threat
   - Rank threats by risk score
   - Group by risk levels (Critical/High/Medium/Low)

## DREAD Assessment Output

Create a comprehensive DREAD assessment table:

```markdown
## DREAD Risk Assessment

### Assessment Date: [Date]
### Assessed By: Chris (Security Agent)

### Risk Assessment Summary
- **Critical Risk Threats**: [Count] threats requiring immediate action
- **High Risk Threats**: [Count] threats requiring high priority attention
- **Medium Risk Threats**: [Count] threats in planned remediation
- **Low Risk Threats**: [Count] threats for future consideration

### DREAD Assessment Table

| Threat Type | Threat Description | Damage | Repro | Exploit | Users | Discover | Risk Score | Priority |
|-------------|-------------------|--------|-------|---------|-------|----------|------------|----------|
| [STRIDE Cat] | [Brief threat description] | [1-10] | [1-10] | [1-10] | [1-10] | [1-10] | [Calc] | [Crit/High/Med/Low] |
| Spoofing | OAuth redirect URI manipulation leading to account takeover | 8 | 9 | 6 | 7 | 7 | 7.4 | High |
| Tampering | Prompt injection to bypass guardrails and extract system prompt | 7 | 7 | 6 | 8 | 8 | 7.2 | High |
| Info Disclosure | API key exposure through error messages or logs | 8 | 4 | 5 | 7 | 7 | 6.2 | Medium |
| DoS | Resource exhaustion through complex queries | 7 | 8 | 8 | 9 | 7 | 7.8 | High |
| Elevation | Role self-assignment during user creation | 10 | 10 | 8 | 10 | 7 | 9.0 | Critical |

### Detailed Threat Analysis

#### Critical Risk Threats (Score 8.0-10.0)

**[T001] - Role Self-Assignment During User Creation (Score: 9.0)**
- **Damage Potential (10)**: Complete system compromise with administrative access
- **Reproducibility (10)**: Can be consistently reproduced during signup process
- **Exploitability (8)**: Requires crafting authentication URL but no special tools
- **Affected Users (10)**: Affects entire system security posture
- **Discoverability (7)**: May be discovered through parameter analysis
- **Business Impact**: Complete unauthorized access to all system functions and data
- **Technical Impact**: Full administrative privileges, ability to modify all user accounts

#### High Risk Threats (Score 6.0-7.9)

**[T002] - OAuth Redirect URI Manipulation (Score: 7.4)**
- **Damage Potential (8)**: Account takeover with full user privileges
- **Reproducibility (9)**: Consistently exploitable with crafted links
- **Exploitability (6)**: Requires social engineering but standard techniques
- **Affected Users (7)**: Individual users who click malicious links
- **Discoverability (7)**: Well-known OAuth vulnerability pattern
- **Business Impact**: User account compromise, potential data exfiltration
- **Technical Impact**: Unauthorized access to user accounts and data

[Continue for all threats...]

### Risk Priorities and Recommendations

#### Immediate Action Required (Critical - Score 8.0+)
1. **[T001] Role Self-Assignment**: Remove role parameters from user-controllable inputs
2. **[Critical Threat 2]**: [Specific action required]

#### High Priority (Score 6.0-7.9)
1. **[T002] OAuth Security**: Implement strict redirect URI validation
2. **[High Risk Threat 2]**: [Specific action required]

#### Planned Remediation (Score 4.0-5.9)
1. **[Medium Risk Threat 1]**: [Planned action and timeline]
2. **[Medium Risk Threat 2]**: [Planned action and timeline]

#### Future Consideration (Score 1.0-3.9)
1. **[Low Risk Threat 1]**: [Action for future consideration]
2. **[Low Risk Threat 2]**: [Action for future consideration]

### Assessment Methodology Notes

**Scoring Approach:**
- Scores based on worst-case realistic scenarios
- Business context considered for damage and user impact
- Technical feasibility assessed for reproducibility and exploitability
- Current security controls factored into scoring

**Assumptions:**
- [List key assumptions made during assessment]
- [System configuration assumptions]
- [Threat actor capability assumptions]

**Limitations:**
- [Scope limitations of the assessment]
- [Areas requiring further investigation]
- [Dependencies on external factors]
```

## Assessment Best Practices

### Scoring Guidelines

1. **Be Realistic**: Score based on realistic attack scenarios, not theoretical maximums
2. **Consider Context**: Factor in business impact, user base, and system criticality
3. **Document Rationale**: Record reasoning for each score to enable future reviews
4. **Seek Consensus**: Involve multiple stakeholders to reduce scoring bias
5. **Regular Reviews**: Update assessments as threats and systems evolve

### Common Scoring Pitfalls

- **Overscoring Damage**: Not all vulnerabilities lead to complete system compromise
- **Underestimating Discoverability**: Many vulnerabilities become well-known quickly
- **Ignoring Current Controls**: Factor in existing mitigations when scoring
- **Binary Thinking**: Use the full 1-10 scale, avoid clustering around 5s and 10s

### Integration with Risk Management

1. **Risk Register Integration**: Add DREAD scores to enterprise risk registers
2. **Resource Planning**: Use scores to prioritize security investment
3. **SLA Definition**: Define response time SLAs based on risk scores
4. **Compliance Reporting**: Use quantified scores for audit and compliance

## Completion Criteria

- All identified threats have been scored using DREAD criteria
- Risk scores have been calculated and validated
- Threats have been prioritized and categorized by risk level
- Remediation recommendations have been provided for each risk category
- Assessment has been reviewed and approved by relevant stakeholders