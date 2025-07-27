#!/usr/bin/env node

/**
 * Agent Test Runner
 * 
 * Executes tests for specific BMAD agents and validates results.
 * 
 * Usage:
 *   node run_agent_test.js vulnerabilityTech
 *   node run_agent_test.js security
 *   node run_agent_test.js vulnerabilityTech --command="*specialized-security-review"
 */

const path = require('path');
const AgentRunner = require('./lib/agent_runner');
const ResultValidator = require('./lib/result_validator');
const TestReporter = require('./lib/test_reporter');

class AgentTestRunner {
    constructor(options = {}) {
        this.options = {
            timeout: options.timeout || 300000,
            verbose: options.verbose || false,
            generateReport: options.generateReport !== false,
            outputDirectory: options.outputDirectory || 'tests/reports',
            ...options
        };
        
        this.agentRunner = new AgentRunner({
            timeout: this.options.timeout,
            logLevel: this.options.verbose ? 'info' : 'warn'
        });
        
        this.resultValidator = new ResultValidator({
            logLevel: this.options.verbose ? 'info' : 'warn'
        });
        
        this.testReporter = new TestReporter({
            outputDirectory: this.options.outputDirectory
        });
    }

    /**
     * Run tests for specific agent
     */
    async runAgentTests(agentName, commands = null) {
        console.log(`🚀 Starting tests for ${agentName} agent...`);
        
        const testSession = {
            name: `${agentName} Agent Test Session`,
            agentName,
            startTime: new Date().toISOString(),
            results: [],
            validations: []
        };

        try {
            // Get commands to test
            const testCommands = commands || this._getDefaultCommands(agentName);
            
            // Execute each command
            for (const command of testCommands) {
                console.log(`\n📋 Testing command: ${command}`);
                
                const result = await this._executeAgentTest(agentName, command);
                testSession.results.push(result);
                
                // Validate results
                const validation = await this._validateResult(agentName, result);
                testSession.validations.push(validation);
                
                this._logTestResult(result, validation);
            }
            
            testSession.endTime = new Date().toISOString();
            
            // Generate report
            const report = await this._generateTestReport(testSession);
            
            // Print summary
            await this._printTestSummary(testSession, report);
            
            return testSession;
            
        } catch (error) {
            console.error(`❌ Test session failed: ${error.message}`);
            testSession.error = error.message;
            testSession.endTime = new Date().toISOString();
            return testSession;
        }
    }

    /**
     * Execute individual agent test
     */
    async _executeAgentTest(agentName, command) {
        try {
            let result;
            
            switch (agentName) {
                case 'vulnerabilityTech':
                    result = await this.agentRunner.executeVulnerabilityTechAgent(command);
                    break;
                    
                case 'security':
                    result = await this.agentRunner.executeSecurityAgent(command);
                    break;
                    
                default:
                    result = await this.agentRunner.executeAgent(agentName, command);
                    break;
            }
            
            return result;
            
        } catch (error) {
            return {
                agentName,
                command,
                success: false,
                error: error.message,
                duration: 0,
                output: '',
                metadata: {}
            };
        }
    }

    /**
     * Validate agent test result
     */
    async _validateResult(agentName, result) {
        try {
            switch (agentName) {
                case 'vulnerabilityTech':
                    return await this.resultValidator.validateVulnerabilityTechResults(result);
                    
                case 'security':
                    return await this.resultValidator.validateSecurityAgentResults(result);
                    
                default:
                    // Generic validation for other agents
                    return {
                        agentName,
                        command: result.command,
                        timestamp: new Date().toISOString(),
                        validations: [
                            {
                                test: 'execution_success',
                                passed: result.success,
                                message: result.success ? 'Execution completed' : `Failed: ${result.error}`
                            }
                        ],
                        overallPassed: result.success,
                        summary: {
                            total: 1,
                            passed: result.success ? 1 : 0,
                            failed: result.success ? 0 : 1,
                            passRate: result.success ? 100 : 0
                        }
                    };
            }
        } catch (error) {
            console.warn(`⚠️ Validation failed: ${error.message}`);
            return {
                agentName,
                command: result.command,
                validations: [],
                overallPassed: false,
                summary: { total: 0, passed: 0, failed: 1, passRate: 0 }
            };
        }
    }

    /**
     * Generate test report
     */
    async _generateTestReport(testSession) {
        if (!this.options.generateReport) {
            return null;
        }

        try {
            return await this.testReporter.generateReport(testSession);
        } catch (error) {
            console.warn(`⚠️ Report generation failed: ${error.message}`);
            return null;
        }
    }

    /**
     * Get default commands for agent
     */
    _getDefaultCommands(agentName) {
        const defaultCommands = {
            vulnerabilityTech: [
                '*specialized-security-review',
                '*dependency-security-scan'
            ],
            security: [
                '*nist-ssdf-planning-assessment',
                '*security-requirements-validation'
            ],
            dev: [
                '*create-next-story',
                '*review-story'
            ],
            qa: [
                '*execute-checklist',
                '*security-validation'
            ],
            sm: [
                '*validate-next-story',
                '*assess-plan'
            ]
        };

        return defaultCommands[agentName] || ['*help'];
    }

    /**
     * Format duration in a human-readable way
     */
    _formatDuration(ms) {
        if (ms < 1000) {
            return `${ms}ms`;
        } else if (ms < 60000) {
            return `${(ms / 1000).toFixed(1)}s`;
        } else {
            const minutes = Math.floor(ms / 60000);
            const seconds = ((ms % 60000) / 1000).toFixed(1);
            return `${minutes}m ${seconds}s`;
        }
    }

    /**
     * Log test result
     */
    _logTestResult(result, validation) {
        const status = result.success ? '✅' : '❌';
        const validationStatus = validation.overallPassed ? '✅' : '❌';
        
        console.log(`  ${status} Execution: ${result.command} (${this._formatDuration(result.duration)})`);
        console.log(`  ${validationStatus} Validation: ${validation.summary.passRate}% passed`);
        
        if (this.options.verbose) {
            if (result.metadata.totalFindings) {
                console.log(`    📊 Findings: ${result.metadata.totalFindings} total, ${result.metadata.criticalFindings || 0} critical`);
            }
            
            if (result.subAgentExecutions) {
                console.log(`    🤖 Sub-agents: ${result.subAgentExecutions.map(sa => sa.subAgent).join(', ')}`);
            }
        }
    }

    /**
     * Print test summary
     */
    async _printTestSummary(testSession, report) {
        console.log(`\n📊 Test Summary for ${testSession.agentName} Agent`);
        console.log(`════════════════════════════════════════`);
        
        const totalTests = testSession.results.length;
        const successfulTests = testSession.results.filter(r => r.success).length;
        const passedValidations = testSession.validations.filter(v => v.overallPassed).length;
        
        console.log(`Tests Executed: ${totalTests}`);
        console.log(`Successful Executions: ${successfulTests}/${totalTests} (${totalTests > 0 ? (successfulTests/totalTests*100).toFixed(1) : 0}%)`);
        console.log(`Passed Validations: ${passedValidations}/${totalTests} (${totalTests > 0 ? (passedValidations/totalTests*100).toFixed(1) : 0}%)`);
        
        const totalDuration = testSession.results.reduce((sum, r) => sum + (r.duration || 0), 0);
        console.log(`Total Duration: ${this._formatDuration(totalDuration)}`);
        
        if (report) {
            console.log(`\n📄 Reports Generated:`);
            report.outputs.forEach(output => {
                console.log(`  ${output.format}: ${output.path}`);
            });
        }

        // Export and show sub-agent logs
        try {
            const logSummary = this.agentRunner.getLoggingSummary();
            if (logSummary.subAgentsExecuted > 0) {
                console.log(`\n🔍 Sub-Agent Execution Summary:`);
                console.log(`  Sub-Agents Executed: ${logSummary.subAgentsExecuted}`);
                console.log(`  Total Tool Executions: ${logSummary.totalToolExecutions}`);
                console.log(`  Total Errors: ${logSummary.totalErrors}`);
                
                // Export detailed logs
                const jsonLogPath = await this.agentRunner.exportSubAgentLogs('json');
                const markdownLogPath = await this.agentRunner.exportSubAgentLogs('markdown');
                
                if (jsonLogPath || markdownLogPath) {
                    console.log(`\n📋 Sub-Agent Logs Exported:`);
                    if (jsonLogPath) console.log(`  JSON: ${jsonLogPath}`);
                    if (markdownLogPath) console.log(`  Markdown: ${markdownLogPath}`);
                }
            }
        } catch (error) {
            console.warn(`⚠️ Failed to export sub-agent logs: ${error.message}`);
        }
        
        // Show failed tests
        const failedTests = testSession.results.filter(r => !r.success);
        if (failedTests.length > 0) {
            console.log(`\n❌ Failed Tests:`);
            failedTests.forEach(test => {
                console.log(`  • ${test.command}: ${test.error}`);
            });
        }
        
        // Show failed validations
        const failedValidations = testSession.validations.filter(v => !v.overallPassed);
        if (failedValidations.length > 0) {
            console.log(`\n⚠️ Failed Validations:`);
            failedValidations.forEach(validation => {
                const failedTests = validation.validations.filter(v => !v.passed);
                console.log(`  • ${validation.command}: ${failedTests.map(t => t.test).join(', ')}`);
            });
        }
        
        console.log(`\n${successfulTests === totalTests && passedValidations === totalTests ? '🎉 All tests passed!' : '⚠️ Some tests failed - review results above'}`);
    }
}

// Command line interface
async function main() {
    const args = process.argv.slice(2);
    
    if (args.length === 0 || args.includes('--help')) {
        console.log(`
BMAD Agent Test Runner

Usage:
  node run_agent_test.js <agent-name> [options]

Examples:
  node run_agent_test.js vulnerabilityTech
  node run_agent_test.js security --verbose
  node run_agent_test.js vulnerabilityTech --command="*specialized-security-review"

Options:
  --command=<cmd>     Test specific command only
  --verbose           Enable verbose output
  --timeout=<ms>      Set timeout in milliseconds (default: 300000)
  --no-report         Skip report generation

Available Agents:
  vulnerabilityTech   Security vulnerability analysis
  security           Security planning and requirements
  dev                Development agent
  qa                 Quality assurance agent
  sm                 Scrum master agent
        `);
        process.exit(0);
    }
    
    const agentName = args[0];
    const options = {
        verbose: args.includes('--verbose'),
        generateReport: !args.includes('--no-report'),
        timeout: parseInt(args.find(arg => arg.startsWith('--timeout='))?.split('=')[1]) || 300000
    };
    
    // Extract specific command if provided
    let commands = null;
    const commandArg = args.find(arg => arg.startsWith('--command='));
    if (commandArg) {
        commands = [commandArg.split('=')[1]];
    }
    
    const runner = new AgentTestRunner(options);
    
    try {
        const results = await runner.runAgentTests(agentName, commands);
        
        // Exit with appropriate code
        const allPassed = results.results.every(r => r.success) && 
                         results.validations.every(v => v.overallPassed);
        process.exit(allPassed ? 0 : 1);
        
    } catch (error) {
        console.error(`💥 Test runner failed: ${error.message}`);
        process.exit(1);
    }
}

// Run if called directly
if (require.main === module) {
    main().catch(error => {
        console.error(`💥 Unhandled error: ${error.message}`);
        process.exit(1);
    });
}

module.exports = AgentTestRunner;