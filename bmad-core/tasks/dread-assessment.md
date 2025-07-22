# dread-assessment

Performs quantitative risk assessment using the DREAD methodology to prioritize security threats with numerical scoring.

## Prerequisites

- Completed threat model with identified threats
- Understanding of system architecture and business impact
- Access to technical documentation and threat scenarios

## DREAD Assessment Process

DREAD is a quantitative risk assessment framework that scores threats on five criteria using a 1-10 scale:

### DREAD Scoring Criteria

**Damage Potential (1-10):**
- How much damage could this threat cause if successfully exploited?
- 1-3: Minimal damage (minor inconvenience, limited data exposure)
- 4-6: Moderate damage (service degradation, some data loss)
- 7-8: Major damage (significant service disruption, substantial data breach)
- 9-10: Catastrophic damage (complete system compromise, massive data breach)

**Reproducibility (1-10):**
- How easy is it for an attacker to reproduce this exploit?
- 1-3: Very difficult (requires sophisticated tools, rare conditions)
- 4-6: Moderate difficulty (requires some technical knowledge, specific conditions)
- 7-8: Easy to reproduce (straightforward steps, common conditions)
- 9-10: Always reproducible (simple steps, any conditions)

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

### Risk Score Calculation

**Risk Score = (Damage + Reproducibility + Exploitability + Affected Users + Discoverability) / 5**

### Risk Score Interpretation

- **8.0-10.0**: Critical Risk - Immediate action required
- **6.0-7.9**: High Risk - Address as high priority
- **4.0-5.9**: Medium Risk - Address in planned timeline
- **1.0-3.9**: Low Risk - Address as resources permit

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