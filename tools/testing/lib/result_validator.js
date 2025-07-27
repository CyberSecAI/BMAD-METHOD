/**
 * Result Validator Library
 * 
 * Validates agent execution results against expected outcomes
 * for automated testing and quality assurance.
 */

const fs = require('fs').promises;
const path = require('path');

class ResultValidator {
    constructor(options = {}) {
        this.options = {
            strictMode: options.strictMode || false,
            tolerancePercent: options.tolerancePercent || 10,
            logLevel: options.logLevel || 'info',
            ...options
        };
        
        this.validationRules = new Map();
        this.validationResults = [];
    }

    /**
     * Add validation rule for specific agent/command combination
     */
    addValidationRule(agentName, command, rule) {
        const key = `${agentName}:${command}`;
        if (!this.validationRules.has(key)) {
            this.validationRules.set(key, []);
        }
        this.validationRules.get(key).push(rule);
    }

    /**
     * Validate VulnerabilityTech agent results
     */
    async validateVulnerabilityTechResults(executionResult, expectedResults = null) {
        const validations = [];

        // Load expected results if not provided - use the actual command being tested
        if (!expectedResults) {
            expectedResults = await this._loadExpectedResults('vulnerabilityTech', executionResult.command);
        }

        // Validate execution success
        validations.push({
            test: 'execution_success',
            passed: executionResult.success,
            message: executionResult.success ? 'Execution completed successfully' : `Execution failed: ${executionResult.error}`
        });

        // Only validate sub-agent coordination for commands that involve sub-agents
        const subAgentCommands = ['*specialized-security-review', '*dependency-security-scan', '*pattern-security-analysis', '*test-security-validation'];
        if (subAgentCommands.includes(executionResult.command)) {
            if (executionResult.subAgentExecutions && expectedResults.subAgents) {
                validations.push(this._validateSubAgentCoordination(executionResult.subAgentExecutions, expectedResults.subAgents));
            }

            // Validate security findings for security analysis commands
            if (executionResult.metadata.totalFindings && expectedResults.findings) {
                validations.push(this._validateSecurityFindings(executionResult.metadata, expectedResults.findings));
            }
        }

        // Validate output format
        validations.push(this._validateOutputFormat(executionResult.output, 'vulnerabilityTech', executionResult.command));

        // Validate execution time
        validations.push(this._validateExecutionTime(executionResult.duration, expectedResults.performanceExpectations));

        const validationResult = {
            agentName: 'vulnerabilityTech',
            command: executionResult.command,
            timestamp: new Date().toISOString(),
            validations,
            overallPassed: validations.every(v => v.passed),
            summary: this._generateValidationSummary(validations)
        };

        this.validationResults.push(validationResult);
        return validationResult;
    }

    /**
     * Validate Security agent results
     */
    async validateSecurityAgentResults(executionResult, expectedResults = null) {
        const validations = [];

        if (!expectedResults) {
            expectedResults = await this._loadExpectedResults('security', executionResult.command);
        }

        // Validate NIST SSDF compliance assessment
        if (executionResult.metadata.nistSsdfCompliance) {
            validations.push(this._validateNistSsdfCompliance(
                executionResult.metadata.nistSsdfCompliance,
                expectedResults.nistSsdfExpected
            ));
        }

        // Validate planning phase outputs
        validations.push(this._validatePlanningPhaseOutputs(executionResult.output, expectedResults.planningOutputs));

        const validationResult = {
            agentName: 'security',
            command: executionResult.command,
            timestamp: new Date().toISOString(),
            validations,
            overallPassed: validations.every(v => v.passed),
            summary: this._generateValidationSummary(validations)
        };

        this.validationResults.push(validationResult);
        return validationResult;
    }

    /**
     * Validate sub-agent coordination
     */
    _validateSubAgentCoordination(actualSubAgents, expectedSubAgents) {
        const expectedAgents = expectedSubAgents.map(sa => sa.name);
        const actualAgents = actualSubAgents.map(sa => sa.subAgent);

        const missingAgents = expectedAgents.filter(name => !actualAgents.includes(name));
        const unexpectedAgents = actualAgents.filter(name => !expectedAgents.includes(name));

        const passed = missingAgents.length === 0 && unexpectedAgents.length === 0;

        return {
            test: 'sub_agent_coordination',
            passed,
            message: passed ? 
                'All expected sub-agents executed' : 
                `Missing: [${missingAgents.join(', ')}], Unexpected: [${unexpectedAgents.join(', ')}]`,
            details: {
                expected: expectedAgents,
                actual: actualAgents,
                missing: missingAgents,
                unexpected: unexpectedAgents
            }
        };
    }

    /**
     * Validate security findings against expected results
     */
    _validateSecurityFindings(actualMetadata, expectedFindings) {
        const actualTotal = actualMetadata.totalFindings || 0;
        const actualCritical = actualMetadata.criticalFindings || 0;
        
        const expectedTotal = expectedFindings.total;
        const expectedCritical = expectedFindings.critical;

        // Allow for some tolerance in findings count
        const totalTolerance = Math.ceil(expectedTotal * this.options.tolerancePercent / 100);
        const criticalTolerance = Math.ceil(expectedCritical * this.options.tolerancePercent / 100);

        const totalInRange = Math.abs(actualTotal - expectedTotal) <= totalTolerance;
        const criticalInRange = Math.abs(actualCritical - expectedCritical) <= criticalTolerance;

        const passed = totalInRange && criticalInRange;

        return {
            test: 'security_findings_count',
            passed,
            message: passed ? 
                `Findings within expected range (±${this.options.tolerancePercent}%)` :
                `Findings outside expected range: Total ${actualTotal} (expected ~${expectedTotal}), Critical ${actualCritical} (expected ~${expectedCritical})`,
            details: {
                actual: { total: actualTotal, critical: actualCritical },
                expected: { total: expectedTotal, critical: expectedCritical },
                tolerance: { total: totalTolerance, critical: criticalTolerance }
            }
        };
    }

    /**
     * Validate output format compliance
     */
    _validateOutputFormat(output, agentName, command = null) {
        const formatValidations = {
            vulnerabilityTech: {
                '*specialized-security-review': [
                    { pattern: /🔍 VulnerabilityTech Agent Activated/, description: 'Agent activation header' },
                    { pattern: /📋 Initiating specialized security review/, description: 'Review initiation' },
                    { pattern: /🤖 Coordinating sub-agents/, description: 'Sub-agent coordination' },
                    { pattern: /📊 Specialized Security Review Complete/, description: 'Completion summary' },
                    { pattern: /Critical: \d+ issues/, description: 'Critical issues count' }
                ],
                '*dependency-security-scan': [
                    { pattern: /🔍 VulnerabilityTech Agent Activated/, description: 'Agent activation header' },
                    { pattern: /📋 Initiating dependency security scan/, description: 'Scan initiation' },
                    { pattern: /📊 Dependency Security Scan Complete/, description: 'Completion summary' }
                ],
                '*help': [
                    { pattern: /VulnerabilityTech.*Agent|Commands|help/i, description: 'Help content or agent identification' }
                ],
                'default': [
                    { pattern: /VulnerabilityTech|vulnerabilityTech/i, description: 'Agent identification' }
                ]
            },
            security: [
                { pattern: /🛡️ Security Agent Activated/, description: 'Agent activation header' },
                { pattern: /Phase: Planning/, description: 'Phase identification' },
                { pattern: /NIST SSDF/, description: 'NIST SSDF reference' }
            ]
        };

        let agentValidations = [];
        if (agentName === 'vulnerabilityTech') {
            agentValidations = formatValidations.vulnerabilityTech[command] || 
                             formatValidations.vulnerabilityTech['default'] || [];
        } else {
            agentValidations = formatValidations[agentName] || [];
        }

        const results = agentValidations.map(validation => ({
            pattern: validation.pattern.toString(),
            description: validation.description,
            found: validation.pattern.test(output)
        }));

        const passed = results.every(r => r.found);

        return {
            test: 'output_format',
            passed,
            message: passed ? 
                'Output format matches expected structure' :
                `Missing format elements: ${results.filter(r => !r.found).map(r => r.description).join(', ')}`,
            details: results
        };
    }

    /**
     * Validate execution time against performance expectations
     */
    _validateExecutionTime(actualDuration, performanceExpectations) {
        if (!performanceExpectations || !performanceExpectations.maxDuration) {
            return {
                test: 'execution_time',
                passed: true,
                message: 'No performance expectations defined',
                details: { actualDuration }
            };
        }

        const passed = actualDuration <= performanceExpectations.maxDuration;

        return {
            test: 'execution_time',
            passed,
            message: passed ?
                `Execution completed in ${actualDuration}ms (within ${performanceExpectations.maxDuration}ms limit)` :
                `Execution took ${actualDuration}ms (exceeds ${performanceExpectations.maxDuration}ms limit)`,
            details: {
                actualDuration,
                maxExpected: performanceExpectations.maxDuration,
                withinLimit: passed
            }
        };
    }

    /**
     * Validate NIST SSDF compliance results
     */
    _validateNistSsdfCompliance(actualCompliance, expectedCompliance) {
        const practices = Object.keys(expectedCompliance);
        const validations = practices.map(practice => {
            const expected = expectedCompliance[practice];
            const actual = actualCompliance[practice];
            return {
                practice,
                expected,
                actual,
                matches: expected === actual
            };
        });

        const passed = validations.every(v => v.matches);

        return {
            test: 'nist_ssdf_compliance',
            passed,
            message: passed ?
                'NIST SSDF compliance matches expectations' :
                `Compliance mismatches: ${validations.filter(v => !v.matches).map(v => `${v.practice} (expected ${v.expected}, got ${v.actual})`).join(', ')}`,
            details: validations
        };
    }

    /**
     * Validate planning phase outputs
     */
    _validatePlanningPhaseOutputs(output, expectedOutputs) {
        const requiredElements = expectedOutputs || [
            'Security Requirements',
            'Architecture',
            'Roles and Responsibilities'
        ];

        const foundElements = requiredElements.filter(element => 
            output.toLowerCase().includes(element.toLowerCase())
        );

        const passed = foundElements.length === requiredElements.length;

        return {
            test: 'planning_phase_outputs',
            passed,
            message: passed ?
                'All required planning phase elements present' :
                `Missing elements: ${requiredElements.filter(e => !foundElements.includes(e)).join(', ')}`,
            details: {
                required: requiredElements,
                found: foundElements,
                missing: requiredElements.filter(e => !foundElements.includes(e))
            }
        };
    }

    /**
     * Load expected results from JSON files
     */
    async _loadExpectedResults(agentName, command) {
        try {
            const resultsPath = path.join(
                'tests/agents',
                agentName,
                'expected_results',
                `${command.replace('*', '')}.json`
            );
            
            const content = await fs.readFile(resultsPath, 'utf8');
            return JSON.parse(content);
        } catch (error) {
            this._log('warn', `Could not load expected results for ${agentName}:${command}: ${error.message}`);
            return this._getDefaultExpectedResults(agentName, command);
        }
    }

    /**
     * Get default expected results when files are not available
     */
    _getDefaultExpectedResults(agentName, command) {
        if (agentName === 'vulnerabilityTech') {
            // For help command, no sub-agents or findings expected
            if (command === '*help') {
                return {
                    performanceExpectations: {
                        maxDuration: 5000 // 5 seconds for help
                    }
                };
            }
            
            // For security analysis commands
            return {
                subAgents: [
                    { name: 'Security-Reviewer' },
                    { name: 'Safety-Scanner' }
                ],
                findings: {
                    total: 25,
                    critical: 6,
                    high: 10,
                    medium: 7,
                    low: 2
                },
                performanceExpectations: {
                    maxDuration: 60000 // 1 minute
                }
            };
        }

        if (agentName === 'security') {
            return {
                nistSsdfExpected: {
                    'PO.1': 'implemented',
                    'PO.2': 'implemented',
                    'PS.1': 'implemented',
                    'PS.2': 'implemented'
                },
                planningOutputs: [
                    'Security Requirements',
                    'Architecture',
                    'Roles and Responsibilities'
                ]
            };
        }

        return {};
    }

    /**
     * Generate validation summary
     */
    _generateValidationSummary(validations) {
        const total = validations.length;
        const passed = validations.filter(v => v.passed).length;
        const failed = total - passed;

        return {
            total,
            passed,
            failed,
            passRate: total > 0 ? (passed / total * 100).toFixed(1) : 0,
            failedTests: validations.filter(v => !v.passed).map(v => v.test)
        };
    }

    /**
     * Log messages
     */
    _log(level, message) {
        if (this.options.logLevel === 'silent') return;
        
        const timestamp = new Date().toISOString();
        console.log(`[${timestamp}] [VALIDATOR-${level.toUpperCase()}] ${message}`);
    }

    /**
     * Get all validation results
     */
    getValidationResults() {
        return this.validationResults;
    }

    /**
     * Get validation summary across all tests
     */
    getOverallSummary() {
        const total = this.validationResults.length;
        const passed = this.validationResults.filter(r => r.overallPassed).length;
        
        const allValidations = this.validationResults.flatMap(r => r.validations);
        const totalValidations = allValidations.length;
        const passedValidations = allValidations.filter(v => v.passed).length;

        return {
            totalTests: total,
            passedTests: passed,
            failedTests: total - passed,
            testPassRate: total > 0 ? (passed / total * 100).toFixed(1) : 0,
            totalValidations,
            passedValidations,
            failedValidations: totalValidations - passedValidations,
            validationPassRate: totalValidations > 0 ? (passedValidations / totalValidations * 100).toFixed(1) : 0
        };
    }

    /**
     * Clear validation results
     */
    clearResults() {
        this.validationResults = [];
    }
}

module.exports = ResultValidator;