/**
 * Test Reporter Library
 * 
 * Generates comprehensive test reports for BMAD agent testing,
 * including execution summaries, validation results, and performance metrics.
 */

const fs = require('fs').promises;
const path = require('path');

class TestReporter {
    constructor(options = {}) {
        this.options = {
            outputDirectory: options.outputDirectory || 'tests/reports',
            includeDetailedResults: options.includeDetailedResults !== false,
            generateHTML: options.generateHTML || true,
            generateJSON: options.generateJSON || true,
            generateMarkdown: options.generateMarkdown || true,
            ...options
        };
        
        this.reports = [];
    }

    /**
     * Generate comprehensive test report
     */
    async generateReport(testSession) {
        const reportData = {
            session: testSession,
            metadata: {
                generatedAt: new Date().toISOString(),
                testFrameworkVersion: '0.1.0',
                reportId: this._generateReportId(testSession)
            },
            summary: this._generateSessionSummary(testSession),
            results: testSession.results || [],
            validations: testSession.validations || [],
            performance: this._generatePerformanceMetrics(testSession),
            recommendations: this._generateRecommendations(testSession)
        };

        // Ensure output directory exists
        await this._ensureOutputDirectory();

        const outputs = [];

        // Generate different report formats
        if (this.options.generateJSON) {
            const jsonPath = await this._generateJSONReport(reportData);
            outputs.push({ format: 'JSON', path: jsonPath });
        }

        if (this.options.generateMarkdown) {
            const markdownPath = await this._generateMarkdownReport(reportData);
            outputs.push({ format: 'Markdown', path: markdownPath });
        }

        if (this.options.generateHTML) {
            const htmlPath = await this._generateHTMLReport(reportData);
            outputs.push({ format: 'HTML', path: htmlPath });
        }

        this.reports.push({
            ...reportData,
            outputs
        });

        return {
            reportId: reportData.metadata.reportId,
            outputs,
            summary: reportData.summary
        };
    }

    /**
     * Generate JSON report
     */
    async _generateJSONReport(reportData) {
        const filename = `test-report-${reportData.metadata.reportId}.json`;
        const filepath = path.join(this.options.outputDirectory, filename);
        
        await fs.writeFile(filepath, JSON.stringify(reportData, null, 2));
        
        // Create latest symlink for easy identification
        await this._createLatestSymlink(filepath, 'test-report-latest.json');
        
        return filepath;
    }

    /**
     * Generate Markdown report
     */
    async _generateMarkdownReport(reportData) {
        const filename = `test-report-${reportData.metadata.reportId}.md`;
        const filepath = path.join(this.options.outputDirectory, filename);
        
        const markdown = this._formatMarkdownReport(reportData);
        await fs.writeFile(filepath, markdown);
        
        // Create latest symlink for easy identification
        await this._createLatestSymlink(filepath, 'test-report-latest.md');
        
        return filepath;
    }

    /**
     * Generate HTML report
     */
    async _generateHTMLReport(reportData) {
        const filename = `test-report-${reportData.metadata.reportId}.html`;
        const filepath = path.join(this.options.outputDirectory, filename);
        
        const html = this._formatHTMLReport(reportData);
        await fs.writeFile(filepath, html);
        return filepath;
    }

    /**
     * Format Markdown report
     */
    _formatMarkdownReport(reportData) {
        const { session, summary, results, validations, performance, recommendations } = reportData;
        
        let markdown = `# BMAD Method Test Report

## Test Session Summary

- **Report ID**: ${reportData.metadata.reportId}
- **Generated**: ${reportData.metadata.generatedAt}
- **Test Session**: ${session.name || 'Unnamed Session'}
- **Duration**: ${this._formatDuration(summary.totalDuration)}
- **Total Tests**: ${summary.totalTests}
- **Success Rate**: ${summary.successRate}%

## Execution Details

### Primary Agent Execution
${results.map(result => this._formatExecutionDetailsMarkdown(result)).join('\n\n')}

### Performance Summary
- **Fastest Test**: ${performance.fastestExecution ? `${performance.fastestExecution.agent} (${this._formatDuration(performance.fastestExecution.duration)})` : 'N/A'}
- **Slowest Test**: ${performance.slowestExecution ? `${performance.slowestExecution.agent} (${this._formatDuration(performance.slowestExecution.duration)})` : 'N/A'}
- **Average Response Time**: ${this._formatDuration(performance.averageResponseTime)}

## Overall Results

### Execution Summary
- ✅ **Successful**: ${summary.successfulExecutions}
- ❌ **Failed**: ${summary.failedExecutions}
- ⏱️ **Average Duration**: ${this._formatDuration(summary.averageDuration)}

### Validation Summary
- ✅ **Passed Validations**: ${summary.passedValidations}
- ❌ **Failed Validations**: ${summary.failedValidations}
- 📊 **Validation Rate**: ${summary.validationPassRate}%

## Agent Test Results

`;

        // Add individual agent results
        results.forEach(result => {
            markdown += this._formatAgentResultMarkdown(result);
        });

        // Add validation details
        if (validations.length > 0) {
            markdown += `## Validation Details

`;
            validations.forEach(validation => {
                markdown += this._formatValidationMarkdown(validation);
            });
        }

        // Add performance metrics
        markdown += `## Performance Metrics

| Metric | Value |
|--------|-------|
| Total Execution Time | ${this._formatDuration(performance.totalExecutionTime)} |
| Average Agent Response Time | ${this._formatDuration(performance.averageResponseTime)} |
| Fastest Execution | ${performance.fastestExecution.agent} (${this._formatDuration(performance.fastestExecution.duration)}) |
| Slowest Execution | ${performance.slowestExecution.agent} (${this._formatDuration(performance.slowestExecution.duration)}) |

`;

        // Add recommendations
        if (recommendations.length > 0) {
            markdown += `## Recommendations

`;
            recommendations.forEach((rec, index) => {
                markdown += `${index + 1}. **${rec.type}**: ${rec.message}\n`;
            });
        }

        markdown += `
---
*Report generated by BMAD Method Test Framework v${reportData.metadata.testFrameworkVersion}*
`;

        return markdown;
    }

    /**
     * Format execution details for Markdown
     */
    _formatExecutionDetailsMarkdown(result) {
        const status = result.success ? '✅' : '❌';
        const startTime = new Date(result.startTime).toISOString();
        const endTime = new Date(result.endTime).toISOString();
        
        return `**${status} ${result.agentName} Agent**
- **Command**: \`${result.command}\`
- **Start Time**: ${startTime}
- **End Time**: ${endTime}
- **Duration**: ${this._formatDuration(result.duration)}
- **Success**: ${result.success ? 'Yes' : 'No'}
- **Exit Code**: ${result.exitCode}${result.error ? `\n- **Error**: ${result.error}` : ''}`;
    }

    /**
     * Format agent result for Markdown
     */
    _formatAgentResultMarkdown(result) {
        const status = result.success ? '✅' : '❌';
        const duration = result.duration || 0;
        
        let markdown = `### ${status} ${result.agentName} Agent

**Command**: \`${result.command}\`  
**Duration**: ${this._formatDuration(duration)}  
**Status**: ${result.success ? 'Success' : 'Failed'}  

`;

        if (result.metadata && result.metadata.totalFindings) {
            markdown += `**Security Findings**:
- Critical: ${result.metadata.criticalFindings || 0}
- Total: ${result.metadata.totalFindings}

`;
        }

        if (result.subAgentExecutions && result.subAgentExecutions.length > 0) {
            markdown += `**Sub-Agents Executed**:
`;
            result.subAgentExecutions.forEach(subAgent => {
                markdown += `- ${subAgent.subAgent} (${subAgent.status})\n`;
            });
            markdown += '\n';
        }

        if (!result.success && result.error) {
            markdown += `**Error**: ${result.error}

`;
        }

        return markdown;
    }

    /**
     * Format validation for Markdown
     */
    _formatValidationMarkdown(validation) {
        const status = validation.overallPassed ? '✅' : '❌';
        
        let markdown = `### ${status} ${validation.agentName} Validation

**Command**: \`${validation.command}\`  
**Overall Status**: ${validation.overallPassed ? 'Passed' : 'Failed'}  
**Pass Rate**: ${validation.summary.passRate}%

**Individual Tests**:
`;

        validation.validations.forEach(test => {
            const testStatus = test.passed ? '✅' : '❌';
            markdown += `- ${testStatus} ${test.test}: ${test.message}\n`;
        });

        markdown += '\n';
        return markdown;
    }

    /**
     * Format HTML report
     */
    _formatHTMLReport(reportData) {
        const { session, summary, results, validations, performance } = reportData;
        
        return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>BMAD Method Test Report</title>
    <style>
        body { font-family: Arial, sans-serif; margin: 20px; line-height: 1.6; }
        .header { background: #f4f4f4; padding: 20px; border-radius: 5px; }
        .summary { display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 20px; margin: 20px 0; }
        .metric { background: #fff; border: 1px solid #ddd; padding: 15px; border-radius: 5px; text-align: center; }
        .metric h3 { margin: 0 0 10px 0; color: #333; }
        .metric .value { font-size: 2em; font-weight: bold; color: #007cba; }
        .success { color: #28a745; }
        .failure { color: #dc3545; }
        .agent-result { border: 1px solid #ddd; margin: 10px 0; padding: 15px; border-radius: 5px; }
        .agent-result.success { border-left: 5px solid #28a745; }
        .agent-result.failure { border-left: 5px solid #dc3545; }
        table { width: 100%; border-collapse: collapse; margin: 20px 0; }
        th, td { padding: 10px; text-align: left; border-bottom: 1px solid #ddd; }
        th { background-color: #f4f4f4; }
    </style>
</head>
<body>
    <div class="header">
        <h1>BMAD Method Test Report</h1>
        <p><strong>Report ID:</strong> ${reportData.metadata.reportId}</p>
        <p><strong>Generated:</strong> ${reportData.metadata.generatedAt}</p>
        <p><strong>Test Session:</strong> ${session.name || 'Unnamed Session'}</p>
    </div>

    <div class="summary">
        <div class="metric">
            <h3>Total Tests</h3>
            <div class="value">${summary.totalTests}</div>
        </div>
        <div class="metric">
            <h3>Success Rate</h3>
            <div class="value ${summary.successRate >= 80 ? 'success' : 'failure'}">${summary.successRate}%</div>
        </div>
        <div class="metric">
            <h3>Average Duration</h3>
            <div class="value">${this._formatDuration(summary.averageDuration)}</div>
        </div>
        <div class="metric">
            <h3>Validation Rate</h3>
            <div class="value ${summary.validationPassRate >= 80 ? 'success' : 'failure'}">${summary.validationPassRate}%</div>
        </div>
    </div>

    <h2>Agent Test Results</h2>
    ${results.map(result => this._formatAgentResultHTML(result)).join('')}

    <h2>Performance Metrics</h2>
    <table>
        <tr>
            <th>Metric</th>
            <th>Value</th>
        </tr>
        <tr>
            <td>Total Execution Time</td>
            <td>${this._formatDuration(performance.totalExecutionTime)}</td>
        </tr>
        <tr>
            <td>Average Response Time</td>
            <td>${this._formatDuration(performance.averageResponseTime)}</td>
        </tr>
        <tr>
            <td>Fastest Execution</td>
            <td>${performance.fastestExecution.agent} (${this._formatDuration(performance.fastestExecution.duration)})</td>
        </tr>
        <tr>
            <td>Slowest Execution</td>
            <td>${performance.slowestExecution.agent} (${this._formatDuration(performance.slowestExecution.duration)})</td>
        </tr>
    </table>

    <footer style="margin-top: 40px; padding-top: 20px; border-top: 1px solid #ddd; color: #666;">
        <p>Report generated by BMAD Method Test Framework v${reportData.metadata.testFrameworkVersion}</p>
    </footer>
</body>
</html>`;
    }

    /**
     * Format agent result for HTML
     */
    _formatAgentResultHTML(result) {
        const statusClass = result.success ? 'success' : 'failure';
        const statusIcon = result.success ? '✅' : '❌';
        
        return `
    <div class="agent-result ${statusClass}">
        <h3>${statusIcon} ${result.agentName} Agent</h3>
        <p><strong>Command:</strong> <code>${result.command}</code></p>
        <p><strong>Duration:</strong> ${this._formatDuration(result.duration || 0)}</p>
        <p><strong>Status:</strong> ${result.success ? 'Success' : 'Failed'}</p>
        
        ${result.metadata && result.metadata.totalFindings ? `
        <p><strong>Security Findings:</strong> ${result.metadata.totalFindings} total (${result.metadata.criticalFindings || 0} critical)</p>
        ` : ''}
        
        ${result.subAgentExecutions && result.subAgentExecutions.length > 0 ? `
        <p><strong>Sub-Agents:</strong> ${result.subAgentExecutions.map(sa => sa.subAgent).join(', ')}</p>
        ` : ''}
        
        ${!result.success && result.error ? `
        <p><strong>Error:</strong> <code>${result.error}</code></p>
        ` : ''}
    </div>`;
    }

    /**
     * Generate session summary
     */
    _generateSessionSummary(testSession) {
        const results = testSession.results || [];
        const validations = testSession.validations || [];
        
        const totalTests = results.length;
        const successfulExecutions = results.filter(r => r.success).length;
        const failedExecutions = totalTests - successfulExecutions;
        const totalDuration = results.reduce((sum, r) => sum + (r.duration || 0), 0);
        const averageDuration = totalTests > 0 ? Math.round(totalDuration / totalTests) : 0;
        const successRate = totalTests > 0 ? ((successfulExecutions / totalTests) * 100).toFixed(1) : 0;
        
        const totalValidations = validations.reduce((sum, v) => sum + v.validations.length, 0);
        const passedValidations = validations.reduce((sum, v) => sum + v.validations.filter(val => val.passed).length, 0);
        const failedValidations = totalValidations - passedValidations;
        const validationPassRate = totalValidations > 0 ? ((passedValidations / totalValidations) * 100).toFixed(1) : 0;

        return {
            totalTests,
            successfulExecutions,
            failedExecutions,
            totalDuration,
            averageDuration,
            successRate: parseFloat(successRate),
            totalValidations,
            passedValidations,
            failedValidations,
            validationPassRate: parseFloat(validationPassRate)
        };
    }

    /**
     * Generate performance metrics
     */
    _generatePerformanceMetrics(testSession) {
        const results = testSession.results || [];
        
        if (results.length === 0) {
            return {
                totalExecutionTime: 0,
                averageResponseTime: 0,
                fastestExecution: null,
                slowestExecution: null
            };
        }

        const durations = results.map(r => r.duration || 0);
        const totalExecutionTime = durations.reduce((sum, d) => sum + d, 0);
        const averageResponseTime = Math.round(totalExecutionTime / results.length);
        
        const fastestIndex = durations.indexOf(Math.min(...durations));
        const slowestIndex = durations.indexOf(Math.max(...durations));

        return {
            totalExecutionTime,
            averageResponseTime,
            fastestExecution: {
                agent: results[fastestIndex].agentName,
                command: results[fastestIndex].command,
                duration: durations[fastestIndex]
            },
            slowestExecution: {
                agent: results[slowestIndex].agentName,
                command: results[slowestIndex].command,
                duration: durations[slowestIndex]
            }
        };
    }

    /**
     * Generate recommendations based on test results
     */
    _generateRecommendations(testSession) {
        const recommendations = [];
        const results = testSession.results || [];
        const validations = testSession.validations || [];
        
        // Performance recommendations
        const slowExecutions = results.filter(r => (r.duration || 0) > 30000); // > 30 seconds
        if (slowExecutions.length > 0) {
            recommendations.push({
                type: 'Performance',
                message: `${slowExecutions.length} executions took longer than 30 seconds. Consider optimizing agent performance.`
            });
        }

        // Failure rate recommendations
        const failureRate = results.length > 0 ? ((results.filter(r => !r.success).length / results.length) * 100) : 0;
        if (failureRate > 20) {
            recommendations.push({
                type: 'Reliability',
                message: `High failure rate (${failureRate.toFixed(1)}%). Review agent implementations and error handling.`
            });
        }

        // Validation recommendations
        const validationFailures = validations.filter(v => !v.overallPassed);
        if (validationFailures.length > 0) {
            recommendations.push({
                type: 'Quality',
                message: `${validationFailures.length} validation test(s) failed. Review expected vs actual results.`
            });
        }

        return recommendations;
    }

    /**
     * Ensure output directory exists
     */
    async _ensureOutputDirectory() {
        try {
            await fs.mkdir(this.options.outputDirectory, { recursive: true });
        } catch (error) {
            // Directory already exists or other error
        }
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
     * Generate agent-based report ID for consistent naming
     */
    _generateReportId(testSession) {
        // Extract primary agent name from the session
        const agentName = testSession.agentName || 
                         (testSession.results && testSession.results[0] && testSession.results[0].agentName) ||
                         'unknown-agent';
        
        // Clean agent name for filename use
        const cleanAgentName = agentName.toLowerCase().replace(/[^a-z0-9]/g, '-');
        
        // Check if multiple commands were tested
        const commands = testSession.results ? 
            [...new Set(testSession.results.map(r => r.command))].filter(Boolean) : [];
        
        if (commands.length > 1) {
            // Multiple commands - use comprehensive naming
            return `${cleanAgentName}-comprehensive`;
        } else if (commands.length === 1) {
            // Single command - include command name
            const command = commands[0].replace(/^\*/, '').replace(/[^a-z0-9]/gi, '-').toLowerCase();
            return `${cleanAgentName}-${command}`;
        } else {
            // Fallback to agent name only
            return cleanAgentName;
        }
    }

    /**
     * Get all generated reports
     */
    getReports() {
        return this.reports;
    }

    /**
     * Clear report history
     */
    clearReports() {
        this.reports = [];
    }

    /**
     * Create symlink to latest report for easy identification
     */
    async _createLatestSymlink(targetPath, linkName) {
        try {
            const linkPath = path.join(this.options.outputDirectory, linkName);
            const targetFilename = path.basename(targetPath);
            
            // Remove existing symlink if it exists
            try {
                await fs.unlink(linkPath);
            } catch (error) {
                // Ignore if symlink doesn't exist
            }
            
            // Create new symlink (relative path for portability)
            await fs.symlink(targetFilename, linkPath);
        } catch (error) {
            // Log error but don't fail the report generation
            console.warn(`Failed to create latest symlink: ${error.message}`);
        }
    }
}

module.exports = TestReporter;