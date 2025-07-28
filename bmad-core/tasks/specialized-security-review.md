# specialized-security-review

Orchestrates comprehensive security analysis using specialized Claude Code sub-agents for enhanced vulnerability detection and security validation. This task coordinates multiple specialized agents to provide complete security coverage.

## Prerequisites

- Source code access for security analysis
- Claude Code sub-agents available in `.claude/agents/` directory
- VulnerabilityTech agent permissions for sub-agent coordination

## Sub-Agent Coordination Workflow

### 1. Security Analysis Planning

**Determine Analysis Scope**:
- Identify code components requiring security analysis
- Assess technology stack and framework usage
- Determine applicable security standards and compliance requirements
- Plan sub-agent delegation strategy based on analysis needs

**Analysis Preparation**:
- Validate access to source code and security scanning tools
- Confirm sub-agent availability and capabilities
- Establish analysis priorities based on risk assessment
- Prepare context and guidance for sub-agent delegation

### 2. Multi-Agent Security Analysis Execution

**Phase 1: Enhanced Code-Level Security Analysis with Individual Triage**
- **Delegate to Security-Reviewer Sub-Agent**:
  - **NEW**: Execute individual Semgrep finding triage for precise false positive reduction
  - Request comprehensive vulnerability detection analysis with triage-enhanced accuracy
  - Focus on OWASP Top 10 and language-specific vulnerabilities
  - Analyze authentication, authorization, and input validation with contextual LLM review
  - Generate detailed vulnerability findings with CVSS scoring and individual finding validation

**Phase 2: Dependency Security Assessment**
- **Delegate to Dependency-Scanner Sub-Agent**:
  - Request third-party component security analysis
  - Assess supply chain security and license compliance
  - Identify vulnerable dependencies and update recommendations
  - Validate NIST SSDF PW.3 practice compliance

**Phase 3: Secure Coding Pattern Validation**
- **Delegate to Pattern-Analyzer Sub-Agent**:
  - Request secure coding pattern analysis
  - Validate framework-specific security implementations
  - Identify anti-patterns and security weaknesses
  - Assess NIST SSDF PW.4 practice compliance

**Phase 4: Security Test Assessment**
- **Delegate to Test-Validator Sub-Agent**:
  - Request security test coverage and quality analysis
  - Validate security testing effectiveness
  - Assess test coverage for security requirements
  - Evaluate NIST SSDF PW.7 practice compliance

### 3. Findings Integration and Analysis (DETAILED CONSOLIDATION WORKFLOW)

**Step 3.1: Sub-Agent Results Collection**
1. **Gather All Sub-Agent Outputs**: Collect the complete analysis results from each sub-agent execution:
   - Security-Reviewer results (SAST findings + LLM business logic analysis)
   - Dependency-Scanner results (vulnerability databases + CVE mappings)
   - Pattern-Analyzer results (secure coding pattern violations)
   - Test-Validator results (security testing coverage gaps)

2. **Document Execution Status**: For each sub-agent, record:
   - Execution completion status (success/partial/failed)
   - Analysis scope covered (files, components, dependencies analyzed)
   - Duration and performance metrics
   - Any limitations or errors encountered

**Step 3.2: Vulnerability Normalization Process**
Transform each sub-agent's findings into this standardized vulnerability format:

```yaml
vulnerability:
  id: "[Generate unique identifier: SAST-001, BIZ-002, DEP-003, PATTERN-004, TEST-005]"
  type: "[sql-injection, auth-bypass, vulnerable-dependency, insecure-pattern, test-gap]"
  severity: "[critical/high/medium/low - use CVSS for dependencies, business impact for logic flaws]"
  source: "[semgrep-sast, llm-analysis, dependency-scan, pattern-analysis, test-analysis]"
  source_sub_agent: "[Security-Reviewer, Dependency-Scanner, Pattern-Analyzer, Test-Validator]"
  location: "[file:line for code issues, package==version for dependencies]"
  description: "[Clear, actionable vulnerability description in business terms]"
  technical_details: "[Technical specifics: attack vectors, prerequisites, exploitation methods]"
  cve: "[CVE number if from dependency scan, null for code/logic vulnerabilities]"
  cvss_score: "[CVSS score if available, or calculated business impact score]"
  business_impact: "[Specific business consequences if exploited]"
  attack_vector: "[How this vulnerability can be exploited]"
  remediation: "[Specific, actionable fix guidance with code examples if applicable]"
  remediation_timeline: "[immediate/short-term/medium-term based on severity and complexity]"
  responsible_team: "[development/security/devops team responsible for fix]"
```

**Step 3.3: Enhanced Cross-Validation with Individual Triage Integration**
1. **Identify Related Findings**: For each normalized vulnerability, check if similar issues were found by other sub-agents:
   - Same vulnerability type in same file/location
   - Related security patterns across different sub-agents
   - Dependency vulnerabilities affecting same components
   - **NEW**: Individual Semgrep triage classification (TRUE_POSITIVE/FALSE_POSITIVE)

2. **Enhanced Confidence Scoring**: Apply confidence levels based on sub-agent agreement and individual triage:
   - **High Confidence**: Same/similar finding detected by 2+ sub-agents AND confirmed by individual triage
   - **Medium Confidence**: Single sub-agent detection but critical severity OR individual triage TRUE_POSITIVE confirmation
   - **Low Confidence**: Single sub-agent detection with low/medium severity AND no triage confirmation (candidate for filtering)
   - **Triage-Validated**: Individual LLM analysis confirms Semgrep finding as true positive (elevated confidence)

3. **Merge Duplicate Findings**: When multiple sub-agents identify the same issue:
   - Combine descriptions to provide comprehensive context
   - Use highest severity rating among sub-agents
   - Merge remediation guidance from all sources
   - Update source field to reflect multiple sub-agents

**Step 3.4: Risk Assessment and Prioritization Calculation**
1. **Calculate Overall Risk Score**: Use this enhanced weighted scoring methodology:
   - Critical vulnerabilities: 4 points each
   - High vulnerabilities: 3 points each
   - Medium vulnerabilities: 2 points each
   - Low vulnerabilities: 1 point each
   - Cross-validated findings: +1 bonus point each
   - Business logic vulnerabilities: +1 bonus point each (higher business risk)
   - **NEW**: Individual triage TRUE_POSITIVE confirmation: +0.5 bonus point each (LLM-validated accuracy)
   - Public CVE vulnerabilities: +0.5 bonus point each (known attack methods)

2. **Business Impact Prioritization**: Rank vulnerabilities considering:
   - **Financial Risk**: Payment, billing, financial data exposure
   - **Data Protection**: PII, PHI, sensitive customer data
   - **Operational Risk**: System availability, performance impact
   - **Compliance Risk**: Regulatory violations, audit failures
   - **Reputation Risk**: Public disclosure, customer trust impact

3. **Exploit Likelihood Assessment**: Evaluate exploitability factors:
   - **Attack Complexity**: Simple/Complex (affects timeline priority)
   - **Access Requirements**: No auth/User auth/Admin auth required
   - **Public Exploits Available**: Known exploitation techniques or tools
   - **Environmental Factors**: Network accessibility, system exposure

**Step 3.5: Gap Analysis and Coverage Assessment**
1. **Security Coverage Mapping**: Identify areas analyzed by each sub-agent:
   - Code security coverage (files, functions, modules analyzed)
   - Dependency coverage (package ecosystems, direct vs transitive)
   - Pattern coverage (frameworks, security controls validated)
   - Test coverage (security test types, coverage percentage)

2. **Identify Analysis Gaps**: Look for components not covered by any sub-agent:
   - Infrastructure configuration (if not covered by pattern analysis)
   - Third-party integrations and APIs
   - Data flow and business process security
   - Runtime and deployment security

3. **Coverage Quality Assessment**: Evaluate completeness and depth:
   - Are all critical code paths analyzed?
   - Are all major dependencies included in scans?
   - Do patterns cover the specific frameworks and libraries used?
   - Are security tests comprehensive for the identified vulnerabilities?

### 4. Comprehensive Security Report Generation (TEMPLATE-DRIVEN WORKFLOW)

**Step 4.1: Prepare Consolidated Report Data**
Using the normalized vulnerability data from Step 3, prepare the template variables for the consolidated security report:

1. **Execution Metadata Variables** (essential for tracking and audit):
   - `command`: The command executed (e.g., "*specialized-security-review")
   - `start_time`: Execution start timestamp (Unix epoch milliseconds)
   - `end_time`: Execution end timestamp (Unix epoch milliseconds) 
   - `start_time_formatted`: Human-readable start time (ISO 8601)
   - `end_time_formatted`: Human-readable end time (ISO 8601)
   - `duration_ms`: Total execution duration in milliseconds
   - `duration_formatted`: Human-readable duration (e.g., "28.1s", "2m 30s")
   - `success`: Boolean indicating successful completion
   - `session_id`: Unique session identifier for tracking
   - `sub_agents_count`: Number of sub-agents executed
   - `total_tool_executions`: Total tool operations performed
   - `error_count`: Number of errors encountered

2. **Calculate Summary Statistics**:
   - `total_findings`: Total count of consolidated vulnerabilities
   - `critical_count`, `high_count`, `medium_count`, `low_count`: Count by severity
   - `cross_validated_count`: Vulnerabilities confirmed by multiple sub-agents
   - `false_positives_filtered`: Low-confidence findings excluded
   - `overall_risk_score`: Weighted risk score (0-100 scale)

3. **Sub-Agent Contribution Metrics**:
   - `code_vulnerabilities_count`: From Security-Reviewer (SAST + LLM)
   - `business_logic_count`: From LLM business logic analysis
   - `dependency_vulnerabilities_count`: From Dependency-Scanner
   - `pattern_issues_count`: From Pattern-Analyzer
   - `test_gaps_count**: From Test-Validator

4. **Cross-Validation Analysis Data**:
   - `cross_validated_findings`: Array of high-confidence vulnerabilities
   - `confidence_level`: High/Medium/Low for each finding
   - `validating_sources`: List of sub-agents that found each issue
   - `agreement_percentage`: Consensus level across sub-agents

**Step 4.2: Generate Consolidated Report Using Template**
Execute the `create-doc` task with the `security-consolidated-report-tmpl.yaml` template:

1. **Template Invocation**:
   ```
   *create-doc security-consolidated-report-tmpl
   ```

2. **Template Variable Population**: Fill in the template placeholders with your consolidated data:
   - Executive summary metrics (total findings, risk scores, sub-agent contributions)
   - Individual vulnerability details organized by severity
   - Cross-validation analysis results
   - Remediation roadmap with prioritized timelines
   - NIST SSDF compliance assessment based on sub-agent findings

**Step 4.3: Executive Summary Generation Guidelines**
When filling the executive summary section, ensure you:

1. **Business Impact Focus**: Translate technical vulnerabilities into business terms:
   - "SQL injection in login system" → "Critical authentication bypass risk affecting customer accounts"
   - "Vulnerable Flask dependency" → "Web framework security issue requiring immediate update"
   - "Missing security tests" → "Insufficient validation of security controls increases deployment risk"

2. **Strategic Recommendations**: Provide actionable guidance:
   - **Immediate (0-7 days)**: Critical vulnerabilities requiring hotfixes
   - **Short-term (1-4 weeks)**: High-priority remediation with development cycles
   - **Medium-term (1-3 months)**: Process improvements and architectural changes
   - **Resource Requirements**: Realistic estimates for development, security, and testing effort

**Step 4.4: Detailed Vulnerability Breakdown Guidelines**
For each vulnerability in the detailed findings section:

1. **Vulnerability Card Format**: Use the standardized format from Step 3.2
2. **Technical Context**: Include sufficient detail for developers to understand and fix
3. **Business Context**: Explain why this vulnerability matters to the organization
4. **Cross-Validation Indicators**: Show confidence level and which sub-agents confirmed
5. **Remediation Specificity**: Provide actionable fixes, not generic advice

**Step 4.5: Cross-Validation Analysis Documentation**
Document the consolidation process for transparency:

1. **High-Confidence Findings**: List vulnerabilities confirmed by multiple sub-agents
2. **Methodology Documentation**: Explain how cross-validation was performed
3. **False Positive Analysis**: Document findings filtered out and reasoning
4. **Sub-Agent Agreement Levels**: Show consensus percentages for validation

**Step 4.6: Remediation Roadmap Development**
Create actionable remediation plans:

1. **Priority-Based Grouping**:
   - **Immediate Actions**: Critical vulnerabilities, especially cross-validated ones
   - **Short-term Improvements**: High-priority issues and systemic problems
   - **Medium-term Enhancements**: Remaining vulnerabilities and process improvements

2. **Resource Planning**:
   - Development effort estimates (hours/days per vulnerability)
   - Security team oversight requirements
   - Testing and validation effort needed
   - Dependencies between fixes (order of implementation)

3. **Success Metrics**:
   - Target vulnerability reduction percentages
   - Risk score improvement goals
   - Timeline milestones for remediation progress

**Step 4.7: NIST SSDF Compliance Assessment Integration**
Map consolidated findings to NIST SSDF practices:

1. **Practice-by-Practice Assessment**: For each relevant practice (PW.3, PW.4, PW.6, PW.7, RV.1):
   - Current compliance status based on sub-agent findings
   - Specific gaps identified through multi-agent analysis
   - Recommendations for achieving compliance

2. **Sub-Agent Insights Integration**:
   - Dependency-Scanner findings → PW.3 (Third-party components)
   - Pattern-Analyzer results → PW.4 (Secure coding practices)
   - Security-Reviewer coverage → PW.6 (Code review effectiveness)
   - Test-Validator assessment → PW.7 (Security testing)
   - Overall detection capability → RV.1 (Vulnerability detection)

## Sub-Agent Integration Guidelines

### Effective Delegation Strategies

**Context Provision**:
- Provide clear scope and objectives to each sub-agent
- Share relevant project context and security requirements
- Specify focus areas and priority concerns for analysis
- Establish success criteria and expected deliverables

**Resource Coordination**:
- Ensure sub-agents have access to necessary code and tools
- Coordinate access to shared resources and dependencies
- Manage sub-agent execution sequence for optimal results
- Monitor sub-agent progress and provide guidance as needed

**Quality Assurance**:
- Validate sub-agent findings for accuracy and relevance
- Cross-check critical findings across multiple sub-agents
- Ensure consistent analysis standards and methodologies
- Review sub-agent outputs for completeness and clarity

### Result Integration Best Practices

**Finding Consolidation**:
- Merge related findings from different sub-agents
- Eliminate duplicate issues identified by multiple agents
- Enhance findings with cross-referenced insights
- Maintain traceability to original sub-agent analysis

**Risk Harmonization**:
- Normalize risk scoring across different sub-agent methodologies
- Consider cumulative risk from multiple security dimensions
- Adjust priorities based on business context and threat landscape
- Validate risk assessments through expert judgment

**Recommendation Synthesis**:
- Combine technical recommendations into cohesive remediation plans
- Identify dependencies and sequencing for remediation activities
- Consider resource constraints and implementation feasibility
- Provide both immediate fixes and long-term strategic improvements

## Output Format

### Consolidated Security Analysis Report

The specialized security review generates a comprehensive consolidated report using the `security-consolidated-report-tmpl.yaml` template. This report integrates findings from all sub-agents into a unified, actionable security assessment.

**Template Reference**: `bmad-core/templates/security-consolidated-report-tmpl.yaml`

**Report Generation Command**:
```
*create-doc security-consolidated-report-tmpl
```

### Report Structure Overview

The consolidated report includes the following key sections:

#### 1. Executive Summary
- **📊 Consolidated Security Analysis Results**: Aggregated metrics from all sub-agents
- **Sub-Agent Contributions**: Individual sub-agent analysis summaries
- **Business Impact Assessment**: Risk exposure and strategic recommendations
- **Priority Actions**: Time-based remediation priorities (immediate/short/medium-term)

#### 2. Sub-Agent Analysis Summary  
- **Security-Reviewer Analysis**: SAST + LLM findings with OWASP coverage
- **Dependency-Scanner Analysis**: Vulnerable dependencies with CVE mappings
- **Pattern-Analyzer Analysis**: Secure coding pattern compliance assessment
- **Test-Validator Analysis**: Security testing coverage and effectiveness

#### 3. Detailed Vulnerability Breakdown
- **🚨 Critical Severity**: High-priority vulnerabilities requiring immediate action
- **🔴 High Severity**: Important security issues for short-term remediation
- **🟡 Medium Severity**: Moderate risk vulnerabilities for planned fixes
- **🔵 Low Severity**: Minor issues for long-term improvement

Each vulnerability includes:
- Unique ID (SAST-001, BIZ-002, DEP-003, etc.)
- Source sub-agent and confidence level
- Location, CVE references, and business impact
- Specific remediation guidance and timelines

#### 4. Cross-Validation Analysis
- **🔄 High-Confidence Findings**: Vulnerabilities confirmed by multiple sub-agents
- **False Positive Analysis**: Low-confidence findings filtered out
- **Confidence Scoring Methodology**: Validation approach and criteria

#### 5. Prioritized Remediation Roadmap
- **⚡ Immediate Actions (0-7 days)**: Critical vulnerabilities and security hotfixes
- **🔧 Short-term Improvements (1-4 weeks)**: High-priority remediation within development cycles
- **📈 Medium-term Enhancements (1-3 months)**: Process improvements and architectural changes
- **Resource Planning**: Development effort estimates and team assignments

#### 6. NIST SSDF Compliance Assessment
- **Practice-by-Practice Compliance**: PW.3, PW.4, PW.6, PW.7, RV.1 assessments
- **Sub-Agent Integration**: Mapping findings to specific SSDF practices
- **Compliance Gap Analysis**: Recommendations for achieving full compliance

#### 7. Appendices
- **Sub-Agent Raw Outputs**: Original analysis results for reference
- **Consolidation Methodology**: Cross-validation and risk scoring details
- **Tool Configurations**: Sub-agent settings and parameters used
- **References and Standards**: OWASP, CWE, CVE, and NIST references

### Quality Indicators

The consolidated report provides several quality indicators:
- **📊 Overall Risk Score**: 0-100 weighted risk assessment
- **🎯 Cross-Validation Rate**: Percentage of findings confirmed by multiple sub-agents
- **📈 Coverage Metrics**: Analysis completeness across code, dependencies, patterns, and tests
- **⚡ Confidence Levels**: High/Medium/Low confidence for each vulnerability

### NIST SSDF Compliance Summary
- **PW.3**: [Third-party component security compliance]
- **PW.4**: [Secure coding practices compliance]
- **PW.6**: [Code review process compliance]
- **PW.7**: [Security testing compliance]
- **RV.1**: [Vulnerability detection compliance]
```

## Quality Assurance

### Sub-Agent Output Validation
- Verify completeness of analysis across all requested dimensions
- Validate accuracy of findings through spot-checks and cross-validation
- Ensure consistency of risk scoring and prioritization methodologies
- Confirm actionability and feasibility of recommendations

### Integration Quality Control
- Check for gaps in security coverage not addressed by any sub-agent
- Validate that integrated findings provide coherent security assessment
- Ensure recommendations are practical and implementable
- Confirm that executive summary accurately reflects detailed findings

### Continuous Improvement
- Collect feedback on sub-agent effectiveness and accuracy
- Refine delegation strategies based on results and outcomes
- Update integration methodologies for improved analysis quality
- Enhance sub-agent coordination for better coverage and efficiency

## Execution Instructions

### Step 1: Execute Individual Semgrep Triage (NEW)
Execute the individual triage task as the first phase for enhanced accuracy:

```
*Task("Execute individual Semgrep triage analysis", 
      "Perform individual LLM-based triage of each Semgrep finding with 15 lines of code context, framework-specific knowledge, and business impact assessment. Generate triage classifications, false positive filtering, and detailed reasoning for each finding.",
      "semgrep-triage")
```

Store triage results for integration with subsequent analysis phases.

### Step 2: Execute Multi-Agent Security Analysis
Coordinate specialized sub-agents with triage-enhanced workflow:

```
*Task("Execute Security-Reviewer with triage integration", 
      "Coordinate comprehensive security analysis using Security-Reviewer sub-agent with individual triage results integration. Focus on OWASP Top 10, language-specific vulnerabilities, and triage-validated findings correlation.",
      "security-reviewer")
```

```
*Task("Execute dependency security assessment", 
      "Perform third-party component security analysis using Dependency-Scanner sub-agent for supply chain security and license compliance validation.",
      "dependency-scanner")
```

```
*Task("Execute secure coding pattern validation", 
      "Validate secure coding patterns using Pattern-Analyzer sub-agent for framework-specific security implementations and anti-pattern detection.",
      "pattern-analyzer")
```

```
*Task("Execute security test assessment", 
      "Assess security test coverage and effectiveness using Test-Validator sub-agent for security testing quality validation.",
      "test-validator")
```

### Step 3: Integrate and Correlate Results
Combine all sub-agent results with triage data:

1. Collect results from all sub-agents and individual triage
2. Apply enhanced cross-validation with triage confidence data
3. Generate consolidated vulnerability assessment
4. Calculate risk scores with triage accuracy bonuses

### Step 4: Generate Enhanced Consolidated Report
Create the final security report with triage integration:

```
*create-doc security-consolidated-report-tmpl
```

Populate template variables with:
- `triage_executed`: true
- `triage_findings_analyzed`: [count from triage results]
- `true_positive_count`: [TRUE_POSITIVE findings]
- `false_positive_count`: [FALSE_POSITIVE findings]
- `false_positive_reduction_rate`: [percentage reduction]
- Triage examples and detailed metrics

This specialized security review leverages the focused expertise of Claude Code sub-agents while maintaining the comprehensive oversight and integration capabilities of the VulnerabilityTech agent within the BMad Method framework, enhanced with individual Semgrep triage for maximum accuracy.