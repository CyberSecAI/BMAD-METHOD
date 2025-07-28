# individual-semgrep-triage

Execute individual LLM-based triage of Semgrep findings to reduce false positives through contextual code analysis. This task performs granular review of each SAST finding to determine true vs false positives with high accuracy.

## Prerequisites

- Semgrep installed and accessible via command line
- Source code access for security analysis
- Claude Code sub-agent access to `semgrep-triage` tool agent
- Write permissions for generating triage reports

## Task Objectives

### Primary Goals
- **Individual Finding Analysis**: Review each Semgrep alert individually with surrounding code context
- **False Positive Reduction**: Eliminate benign findings that were incorrectly flagged by pattern matching
- **True Positive Validation**: Confirm genuine vulnerabilities with business context and impact assessment
- **Actionable Results**: Provide specific remediation guidance for confirmed vulnerabilities

### Quality Targets
- **High Accuracy**: >90% triage accuracy through contextual LLM analysis
- **Comprehensive Coverage**: Analyze 100% of Semgrep findings individually
- **Detailed Documentation**: Each triage decision includes technical reasoning and business context
- **Framework Awareness**: Apply framework-specific security knowledge (Django, Flask, FastAPI)

## Execution Workflow

### Phase 1: Semgrep Analysis Preparation

#### **Environment Setup**
1. Validate Semgrep installation and rule availability
2. Configure analysis scope and exclusions
3. Prepare output directories for triage results
4. Establish framework detection context

#### **Execute Comprehensive Semgrep Scan**
```bash
# Run Semgrep with comprehensive rule sets
semgrep --config=python --config=security-audit --config=owasp-top-ten \
        --json --severity=ERROR --severity=WARNING \
        --exclude=venv/ --exclude=.venv/ --exclude=node_modules/ \
        --exclude=tests/ --exclude=test_* \
        --output=semgrep_results.json .

# Validate execution success
if [ $? -eq 0 ] && [ -f "semgrep_results.json" ]; then
    TOTAL_FINDINGS=$(jq '.results | length' semgrep_results.json)
    echo "Semgrep analysis complete: $TOTAL_FINDINGS findings to triage"
else
    echo "ERROR: Semgrep execution failed"
    exit 1
fi
```

### Phase 2: Individual Finding Triage

#### **Delegate to Semgrep-Triage Sub-Agent**
For each finding in the Semgrep results, execute the specialized triage sub-agent:

```bash
# Execute semgrep-triage sub-agent through Task delegation
*Task("Perform individual triage of Semgrep findings", 
      "Execute semgrep-triage analysis on semgrep_results.json with individual finding review",
      "semgrep-triage")
```

The semgrep-triage sub-agent will:
1. **Parse JSON Results**: Extract individual findings with file, line, rule details
2. **Context Extraction**: Read surrounding code (15 lines) for each finding location
3. **LLM Analysis**: Apply comprehensive triage prompt to each finding
4. **Classification**: Assign TRUE_POSITIVE, FALSE_POSITIVE, NEEDS_VERIFICATION, or MITIGATED
5. **Documentation**: Generate detailed reasoning and remediation guidance

#### **Expected Sub-Agent Deliverables**
- Individual triage reports for each finding (`finding_XXX_triage.md`)
- Consolidated triage summary (`semgrep_triage_summary.md`)
- Statistics on true/false positive distribution
- Remediation priority recommendations

### Phase 3: Results Integration and Validation

#### **Validate Triage Completeness**
```bash
# Verify all findings were analyzed
FINDINGS_COUNT=$(jq '.results | length' semgrep_results.json)
TRIAGE_COUNT=$(ls finding_*_triage.md 2>/dev/null | wc -l)

if [ "$FINDINGS_COUNT" -eq "$TRIAGE_COUNT" ]; then
    echo "Triage complete: $TRIAGE_COUNT findings analyzed"
else
    echo "WARNING: Incomplete triage - $FINDINGS_COUNT findings, $TRIAGE_COUNT triaged"
fi
```

#### **Generate Executive Summary**
```bash
# Create high-level triage summary
{
    echo "# Individual Semgrep Triage Results"
    echo "**Analysis Date**: $(date)"
    echo "**Total Findings**: $FINDINGS_COUNT"
    echo ""
    
    # Count classifications
    TRUE_POS=$(grep -c "CLASSIFICATION: TRUE_POSITIVE" finding_*_triage.md 2>/dev/null || echo 0)
    FALSE_POS=$(grep -c "CLASSIFICATION: FALSE_POSITIVE" finding_*_triage.md 2>/dev/null || echo 0)
    NEEDS_VER=$(grep -c "CLASSIFICATION: NEEDS_VERIFICATION" finding_*_triage.md 2>/dev/null || echo 0)
    MITIGATED=$(grep -c "CLASSIFICATION: MITIGATED" finding_*_triage.md 2>/dev/null || echo 0)
    
    echo "## Triage Results Summary"
    echo "- **True Positives**: $TRUE_POS (require immediate action)"
    echo "- **False Positives**: $FALSE_POS (filtered out)"
    echo "- **Needs Verification**: $NEEDS_VER (manual review required)"
    echo "- **Mitigated**: $MITIGATED (controlled risk)"
    echo ""
    
    # Calculate false positive reduction
    if [ "$FINDINGS_COUNT" -gt 0 ]; then
        FP_REDUCTION=$(echo "scale=1; $FALSE_POS * 100 / $FINDINGS_COUNT" | bc -l 2>/dev/null || echo "N/A")
        echo "**False Positive Reduction**: ${FP_REDUCTION}%"
    fi
    
} > individual_triage_executive_summary.md
```

### Phase 4: Integration with Security Analysis Pipeline

#### **Prepare Filtered Results**
```bash
# Extract only true positive findings for further analysis
jq --argjson triage_results "$(cat semgrep_triage_summary.md)" \
   '.results | map(select(.check_id as $id | 
     ($triage_results.true_positives // [] | map(.id) | contains([$id]))))' \
   semgrep_results.json > true_positive_findings.json

echo "Filtered results: $(jq '.| length' true_positive_findings.json) confirmed vulnerabilities"
```

#### **Generate Remediation Priorities**
```bash
# Create prioritized remediation list from true positives
{
    echo "# Prioritized Remediation List"
    echo "Based on individual Semgrep finding triage analysis"
    echo ""
    
    # Sort by severity and confidence
    for severity in "ERROR" "WARNING"; do
        echo "## $severity Severity Findings"
        grep -l "CLASSIFICATION: TRUE_POSITIVE" finding_*_triage.md | \
        while read file; do
            RULE_ID=$(grep "ID:" "$file" | cut -d' ' -f2-)
            CONFIDENCE=$(grep "CONFIDENCE:" "$file" | cut -d' ' -f2-)
            IMPACT=$(grep "BUSINESS_IMPACT:" "$file" | cut -d' ' -f2-)
            REMEDIATION=$(grep "REMEDIATION:" "$file" | cut -d' ' -f2-)
            
            echo "### $RULE_ID ($CONFIDENCE confidence)"
            echo "**Impact**: $IMPACT"
            echo "**Action**: $REMEDIATION"
            echo ""
        done
    done
} > prioritized_remediation_list.md
```

## Quality Assurance Standards

### **Triage Quality Requirements**
- **Technical Accuracy**: Each classification must be supported by specific code analysis
- **Business Context**: Consider real-world exploitability and business impact
- **Framework Knowledge**: Apply appropriate framework-specific security understanding
- **Documentation Quality**: Provide sufficient detail for independent verification

### **Coverage Standards**
- **100% Finding Coverage**: Every Semgrep finding must receive individual analysis
- **Context Completeness**: Minimum 15 lines of code context for each finding
- **Classification Rationale**: Detailed reasoning required for each triage decision
- **Remediation Specificity**: Actionable guidance for all true positive findings

### **Integration Standards**
- **Consistent Format**: Standardized triage report structure for integration
- **Machine Readable**: JSON-compatible output for automated processing
- **Human Readable**: Clear documentation for security team review
- **Audit Trail**: Complete record of triage decisions and reasoning

## Output Deliverables

### **Primary Outputs**
1. **Individual Triage Reports**: `finding_*_triage.md` - Detailed analysis for each finding
2. **Executive Summary**: `individual_triage_executive_summary.md` - High-level results overview
3. **Filtered Results**: `true_positive_findings.json` - Confirmed vulnerabilities only
4. **Remediation List**: `prioritized_remediation_list.md` - Action items sorted by priority

### **Quality Metrics**
- **False Positive Reduction Rate**: Percentage of findings correctly identified as benign
- **True Positive Confirmation Rate**: Accuracy of vulnerability identification
- **Analysis Completeness**: Coverage of all Semgrep findings
- **Remediation Actionability**: Quality and specificity of fix guidance

### **Integration Points**
- **Security-Reviewer Input**: Triaged findings feed into comprehensive security analysis
- **Specialized-Security-Review**: Results integrate with multi-agent security assessment
- **Report Generation**: Triage data populates consolidated security reports

## Usage Examples

### **Standard Execution**
```bash
# Execute complete individual triage workflow
*individual-semgrep-triage
```

### **Targeted Analysis**
```bash
# Focus on specific file or directory
*individual-semgrep-triage --target=src/authentication/
```

### **High-Severity Only**
```bash
# Triage only critical and high severity findings
*individual-semgrep-triage --severity=ERROR
```

## Error Handling and Recovery

### **Common Issues**
- **Semgrep Execution Failure**: Validate installation and rule availability
- **Incomplete Triage**: Retry failed findings with additional context
- **Classification Uncertainty**: Mark as NEEDS_VERIFICATION for manual review
- **Context Insufficient**: Expand code context window for complex cases

### **Recovery Procedures**
- **Partial Failure**: Resume from last successfully triaged finding
- **Quality Issues**: Re-analyze findings with low confidence scores
- **Integration Errors**: Validate output format compatibility
- **Performance Issues**: Implement batch processing for large codebases

This individual-semgrep-triage task provides precise, contextual analysis of SAST findings through specialized LLM review, significantly improving the accuracy and actionability of security analysis results within the BMad Method framework.