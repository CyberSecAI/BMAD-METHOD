/**
 * Code Quality Checker Validation Tests
 * 
 * Validates that the code quality checker produces expected results
 * for different test scenarios.
 */

const fs = require('fs').promises;
const path = require('path');

class QualityCheckerValidator {
    constructor() {
        this.testResults = [];
        this.baseDir = path.join(__dirname, '..');
    }

    /**
     * Validate Python quality issues detection
     */
    async validatePythonQualityIssues(testResult) {
        const validation = {
            test: 'python_quality_issues_detection',
            passed: true,
            details: [],
            errors: []
        };

        try {
            const metadata = testResult.metadata;
            
            // Validate quality score is low (poor quality code)
            if (metadata.qualityScore > 40) {
                validation.passed = false;
                validation.errors.push(`Quality score too high: ${metadata.qualityScore} (expected ≤40)`);
            } else {
                validation.details.push(`Quality score correctly low: ${metadata.qualityScore}`);
            }

            // Validate quality grade is F (failing)
            if (metadata.qualityGrade !== 'F') {
                validation.passed = false;
                validation.errors.push(`Quality grade should be F, got: ${metadata.qualityGrade}`);
            } else {
                validation.details.push(`Quality grade correctly F`);
            }

            // Validate production readiness is false
            if (metadata.productionReady !== false) {
                validation.passed = false;
                validation.errors.push(`Production ready should be false, got: ${metadata.productionReady}`);
            } else {
                validation.details.push(`Production readiness correctly false`);
            }

            // Validate findings are present in all categories
            const findings = metadata.findings;
            const categories = ['critical', 'high', 'medium', 'low'];
            
            for (const category of categories) {
                if (!findings[category] || findings[category] === 0) {
                    validation.passed = false;
                    validation.errors.push(`No ${category} findings detected (expected some)`);
                } else {
                    validation.details.push(`${category} findings: ${findings[category]}`);
                }
            }

            // Validate output contains expected content
            const output = testResult.output;
            const expectedPatterns = [
                /production blockers?/i,
                /debug.*statements?/i,
                /todo.*comments?/i,
                /hardcoded.*secret/i,
                /function.*exceeds.*lines/i,
                /missing.*error.*handling/i,
                /pep.*8.*violation/i,
                /missing.*docstrings/i
            ];

            for (const pattern of expectedPatterns) {
                if (!pattern.test(output)) {
                    validation.passed = false;
                    validation.errors.push(`Missing expected pattern: ${pattern}`);
                } else {
                    validation.details.push(`Found expected pattern: ${pattern}`);
                }
            }

        } catch (error) {
            validation.passed = false;
            validation.errors.push(`Validation error: ${error.message}`);
        }

        return validation;
    }

    /**
     * Validate performance requirements
     */
    async validatePerformance(testResult) {
        const validation = {
            test: 'performance_requirements',
            passed: true,
            details: [],
            errors: []
        };

        try {
            const executionTime = testResult.metadata.executionTime || testResult.duration;
            
            // Should complete within 30 seconds (30000ms)
            if (executionTime > 30000) {
                validation.passed = false;
                validation.errors.push(`Execution time too long: ${executionTime}ms (expected ≤30000ms)`);
            } else {
                validation.details.push(`Execution time acceptable: ${executionTime}ms`);
            }

            // Should be reasonably fast for test fixtures (< 5 seconds)
            if (executionTime > 5000) {
                validation.details.push(`Note: Execution time could be optimized: ${executionTime}ms`);
            } else {
                validation.details.push(`Execution time optimal: ${executionTime}ms`);
            }

        } catch (error) {
            validation.passed = false;
            validation.errors.push(`Performance validation error: ${error.message}`);
        }

        return validation;
    }

    /**
     * Validate report structure
     */
    async validateReportStructure(testResult) {
        const validation = {
            test: 'report_structure',
            passed: true,
            details: [],
            errors: []
        };

        try {
            const output = testResult.output;
            const metadata = testResult.metadata;

            // Check required sections in output
            const requiredSections = [
                /quality.*analysis.*results/i,
                /files.*analyzed/i,
                /quality.*score/i,
                /production.*readiness/i,
                /findings.*summary/i,
                /recommendations/i
            ];

            for (const section of requiredSections) {
                if (!section.test(output)) {
                    validation.passed = false;
                    validation.errors.push(`Missing required section: ${section}`);
                } else {
                    validation.details.push(`Found required section: ${section}`);
                }
            }

            // Check metadata structure
            const requiredMetadata = [
                'qualityScore',
                'qualityGrade', 
                'findings',
                'productionReady',
                'agentType'
            ];

            for (const field of requiredMetadata) {
                if (!(field in metadata)) {
                    validation.passed = false;
                    validation.errors.push(`Missing metadata field: ${field}`);
                } else {
                    validation.details.push(`Found metadata field: ${field}`);
                }
            }

            // Validate findings structure
            if (metadata.findings) {
                const findingCategories = ['critical', 'high', 'medium', 'low'];
                for (const category of findingCategories) {
                    if (!(category in metadata.findings)) {
                        validation.passed = false;
                        validation.errors.push(`Missing findings category: ${category}`);
                    } else {
                        validation.details.push(`Found findings category: ${category}`);
                    }
                }
            }

        } catch (error) {
            validation.passed = false;
            validation.errors.push(`Report structure validation error: ${error.message}`);
        }

        return validation;
    }

    /**
     * Validate integration with test framework
     */
    async validateIntegration(testResult) {
        const validation = {
            test: 'framework_integration',
            passed: true,
            details: [],
            errors: []
        };

        try {
            // Check that execution was successful
            if (!testResult.success) {
                validation.passed = false;
                validation.errors.push(`Execution failed: ${testResult.error}`);
            } else {
                validation.details.push('Execution successful');
            }

            // Check exit code
            if (testResult.exitCode !== 0) {
                validation.passed = false;
                validation.errors.push(`Non-zero exit code: ${testResult.exitCode}`);
            } else {
                validation.details.push('Exit code correct (0)');
            }

            // Check agent type
            if (testResult.metadata && testResult.metadata.agentType !== 'code-quality-checker') {
                validation.passed = false;
                validation.errors.push(`Wrong agent type: ${testResult.metadata.agentType}`);
            } else {
                validation.details.push('Agent type correct');
            }

            // Check that output is not empty
            if (!testResult.output || testResult.output.trim().length === 0) {
                validation.passed = false;
                validation.errors.push('Empty output');
            } else {
                validation.details.push(`Output length: ${testResult.output.length} characters`);
            }

        } catch (error) {
            validation.passed = false;
            validation.errors.push(`Integration validation error: ${error.message}`);
        }

        return validation;
    }

    /**
     * Run all validations on a test result
     */
    async validateTestResult(testResult, testType = 'python_quality_issues') {
        const validations = [];

        // Run specific validations based on test type
        if (testType === 'python_quality_issues' || testType === 'comprehensive') {
            validations.push(await this.validatePythonQualityIssues(testResult));
        }

        // Run common validations for all test types
        validations.push(await this.validatePerformance(testResult));
        validations.push(await this.validateReportStructure(testResult));
        validations.push(await this.validateIntegration(testResult));

        return validations;
    }

    /**
     * Generate validation summary
     */
    generateValidationSummary(validations) {
        const summary = {
            total: validations.length,
            passed: validations.filter(v => v.passed).length,
            failed: validations.filter(v => v.passed === false).length,
            details: validations,
            overallPassed: validations.every(v => v.passed)
        };

        summary.passRate = summary.total > 0 ? (summary.passed / summary.total * 100).toFixed(1) : 0;

        return summary;
    }
}

module.exports = QualityCheckerValidator;