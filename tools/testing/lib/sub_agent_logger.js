/**
 * Sub-Agent Logger
 * 
 * Comprehensive logging system for Claude Code sub-agent executions,
 * tool outputs, and debugging information.
 */

const fs = require('fs').promises;
const path = require('path');

class SubAgentLogger {
    constructor(options = {}) {
        this.options = {
            logDirectory: options.logDirectory || 'logs/sub-agents',
            enableConsole: options.enableConsole !== false,
            enableFileLogging: options.enableFileLogging !== false,
            logLevel: options.logLevel || 'info', // error, warn, info, debug, trace
            maxLogFiles: options.maxLogFiles || 50,
            sessionId: options.sessionId || this._generateSessionId(),
            ...options
        };
        
        this.logLevels = {
            error: 0,
            warn: 1,
            info: 2,
            debug: 3,
            trace: 4
        };
        
        this.currentLogLevel = this.logLevels[this.options.logLevel] || 2;
        this.logEntries = [];
        this.subAgentLogs = new Map();
        
        this._initializeLogging();
    }

    /**
     * Initialize logging directories and session
     */
    async _initializeLogging() {
        if (this.options.enableFileLogging) {
            try {
                await fs.mkdir(this.options.logDirectory, { recursive: true });
                await this._cleanupOldLogs();
                
                // Create session log file
                this.sessionLogFile = path.join(
                    this.options.logDirectory, 
                    `session-${this.options.sessionId}.log`
                );
                
                await this._writeSessionHeader();
            } catch (error) {
                console.error(`Failed to initialize logging: ${error.message}`);
            }
        }
    }

    /**
     * Log sub-agent execution start
     */
    async logSubAgentStart(subAgentName, command, context = {}) {
        const logEntry = {
            timestamp: new Date().toISOString(),
            level: 'info',
            type: 'sub_agent_start',
            subAgent: subAgentName,
            command,
            context,
            executionId: this._generateExecutionId()
        };

        await this._writeLog(logEntry);
        
        // Initialize sub-agent specific logging
        this.subAgentLogs.set(subAgentName, {
            startTime: Date.now(),
            executionId: logEntry.executionId,
            logs: [],
            toolOutputs: [],
            errors: []
        });

        return logEntry.executionId;
    }

    /**
     * Log tool execution within sub-agent
     */
    async logToolExecution(subAgentName, toolName, command, output, error = null, exitCode = 0) {
        const subAgentLog = this.subAgentLogs.get(subAgentName);
        if (!subAgentLog) {
            await this.logSubAgentStart(subAgentName, 'unknown');
        }

        const toolLog = {
            timestamp: new Date().toISOString(),
            tool: toolName,
            command,
            output: output || '',
            error: error || '',
            exitCode,
            duration: Date.now() - (subAgentLog?.startTime || Date.now())
        };

        // Add to sub-agent specific logs
        if (subAgentLog) {
            subAgentLog.toolOutputs.push(toolLog);
            if (error && exitCode !== 0) {
                subAgentLog.errors.push({
                    timestamp: toolLog.timestamp,
                    tool: toolName,
                    error,
                    command
                });
            }
        }

        // Write to main log
        await this._writeLog({
            timestamp: toolLog.timestamp,
            level: (error && exitCode !== 0) ? 'error' : 'info',
            type: 'tool_execution',
            subAgent: subAgentName,
            tool: toolName,
            command,
            output: this._truncateOutput(output),
            error,
            exitCode,
            duration: toolLog.duration
        });

        // Write detailed tool output to separate file
        if (this.options.enableFileLogging) {
            await this._writeToolOutputFile(subAgentName, toolName, toolLog);
        }

        return toolLog;
    }

    /**
     * Log sub-agent completion
     */
    async logSubAgentComplete(subAgentName, result = {}) {
        const subAgentLog = this.subAgentLogs.get(subAgentName);
        if (!subAgentLog) {
            this.logWarn(`No start log found for sub-agent: ${subAgentName}`);
            return;
        }

        const duration = Date.now() - subAgentLog.startTime;
        const logEntry = {
            timestamp: new Date().toISOString(),
            level: 'info',
            type: 'sub_agent_complete',
            subAgent: subAgentName,
            executionId: subAgentLog.executionId,
            duration,
            toolExecutions: subAgentLog.toolOutputs.length,
            errorCount: subAgentLog.errors.length,
            result,
            summary: {
                totalTools: subAgentLog.toolOutputs.length,
                successfulTools: subAgentLog.toolOutputs.filter(t => t.exitCode === 0).length,
                failedTools: subAgentLog.toolOutputs.filter(t => t.exitCode !== 0).length,
                totalOutput: subAgentLog.toolOutputs.reduce((sum, t) => sum + (t.output?.length || 0), 0)
            }
        };

        await this._writeLog(logEntry);

        // Write comprehensive sub-agent summary file
        if (this.options.enableFileLogging) {
            await this._writeSubAgentSummary(subAgentName, subAgentLog, logEntry);
        }

        return logEntry;
    }

    /**
     * Log error with sub-agent context
     */
    async logError(message, subAgentName = null, context = {}) {
        const logEntry = {
            timestamp: new Date().toISOString(),
            level: 'error',
            type: 'error',
            message,
            subAgent: subAgentName,
            context
        };

        await this._writeLog(logEntry);

        if (subAgentName && this.subAgentLogs.has(subAgentName)) {
            this.subAgentLogs.get(subAgentName).errors.push({
                timestamp: logEntry.timestamp,
                message,
                context
            });
        }
    }

    /**
     * Log warning
     */
    async logWarn(message, subAgentName = null, context = {}) {
        const logEntry = {
            timestamp: new Date().toISOString(),
            level: 'warn',
            type: 'warning',
            message,
            subAgent: subAgentName,
            context
        };

        await this._writeLog(logEntry);
    }

    /**
     * Log info
     */
    async logInfo(message, subAgentName = null, context = {}) {
        const logEntry = {
            timestamp: new Date().toISOString(),
            level: 'info',
            type: 'info',
            message,
            subAgent: subAgentName,
            context
        };

        await this._writeLog(logEntry);
    }

    /**
     * Log debug information
     */
    async logDebug(message, subAgentName = null, context = {}) {
        if (this.currentLogLevel >= this.logLevels.debug) {
            const logEntry = {
                timestamp: new Date().toISOString(),
                level: 'debug',
                type: 'debug',
                message,
                subAgent: subAgentName,
                context
            };

            await this._writeLog(logEntry);
        }
    }

    /**
     * Get all logs for a specific sub-agent
     */
    getSubAgentLogs(subAgentName) {
        return this.subAgentLogs.get(subAgentName) || null;
    }

    /**
     * Get session summary
     */
    getSessionSummary() {
        const subAgents = Array.from(this.subAgentLogs.keys());
        const summary = {
            sessionId: this.options.sessionId,
            subAgentsExecuted: subAgents.length,
            totalToolExecutions: 0,
            totalErrors: 0,
            subAgentSummaries: {}
        };

        for (const [name, log] of this.subAgentLogs) {
            summary.totalToolExecutions += log.toolOutputs.length;
            summary.totalErrors += log.errors.length;
            summary.subAgentSummaries[name] = {
                toolExecutions: log.toolOutputs.length,
                errors: log.errors.length,
                duration: log.startTime ? Date.now() - log.startTime : 0
            };
        }

        return summary;
    }

    /**
     * Export logs in various formats
     */
    async exportLogs(format = 'json') {
        const summary = this.getSessionSummary();
        const exportData = {
            session: summary,
            logs: this.logEntries,
            subAgentDetails: Object.fromEntries(this.subAgentLogs)
        };

        const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
        const filename = `sub-agent-logs-${this.options.sessionId}-${timestamp}`;

        if (format === 'json') {
            const filepath = path.join(this.options.logDirectory, `${filename}.json`);
            await fs.writeFile(filepath, JSON.stringify(exportData, null, 2));
            return filepath;
        } else if (format === 'markdown') {
            const markdown = this._generateMarkdownReport(exportData);
            const filepath = path.join(this.options.logDirectory, `${filename}.md`);
            await fs.writeFile(filepath, markdown);
            return filepath;
        }

        throw new Error(`Unsupported export format: ${format}`);
    }

    /**
     * Write log entry
     */
    async _writeLog(logEntry) {
        this.logEntries.push(logEntry);

        // Console output
        if (this.options.enableConsole && this.logLevels[logEntry.level] <= this.currentLogLevel) {
            const levelSymbols = {
                error: '❌',
                warn: '⚠️',
                info: 'ℹ️',
                debug: '🐛',
                trace: '🔍'
            };

            const symbol = levelSymbols[logEntry.level] || 'ℹ️';
            const subAgentPrefix = logEntry.subAgent ? `[${logEntry.subAgent}] ` : '';
            console.log(`${symbol} ${logEntry.timestamp} ${subAgentPrefix}${logEntry.message || logEntry.type}`);
        }

        // File output
        if (this.options.enableFileLogging && this.sessionLogFile) {
            try {
                const logLine = `${logEntry.timestamp} [${logEntry.level.toUpperCase()}] [${logEntry.type}] ${JSON.stringify(logEntry)}\n`;
                await fs.appendFile(this.sessionLogFile, logLine);
            } catch (error) {
                console.error(`Failed to write log file: ${error.message}`);
            }
        }
    }

    /**
     * Write detailed tool output to separate file
     */
    async _writeToolOutputFile(subAgentName, toolName, toolLog) {
        const toolLogDir = path.join(this.options.logDirectory, 'tools', subAgentName);
        await fs.mkdir(toolLogDir, { recursive: true });

        const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
        const filename = `${toolName}-${timestamp}.log`;
        const filepath = path.join(toolLogDir, filename);

        const content = [
            `Tool: ${toolName}`,
            `Command: ${toolLog.command}`,
            `Timestamp: ${toolLog.timestamp}`,
            `Duration: ${toolLog.duration}ms`,
            `Exit Code: ${toolLog.exitCode}`,
            '',
            '=== STDOUT ===',
            toolLog.output || '(no output)',
            '',
            '=== STDERR ===',
            toolLog.error || '(no errors)',
            ''
        ].join('\n');

        await fs.writeFile(filepath, content);
        return filepath;
    }

    /**
     * Write comprehensive sub-agent summary
     */
    async _writeSubAgentSummary(subAgentName, subAgentLog, completionEntry) {
        const summaryDir = path.join(this.options.logDirectory, 'summaries');
        await fs.mkdir(summaryDir, { recursive: true });

        const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
        const filename = `${subAgentName}-${timestamp}.json`;
        const filepath = path.join(summaryDir, filename);

        const summary = {
            subAgent: subAgentName,
            executionId: subAgentLog.executionId,
            session: this.options.sessionId,
            startTime: new Date(subAgentLog.startTime).toISOString(),
            endTime: completionEntry.timestamp,
            duration: completionEntry.duration,
            toolExecutions: subAgentLog.toolOutputs,
            errors: subAgentLog.errors,
            summary: completionEntry.summary,
            result: completionEntry.result
        };

        await fs.writeFile(filepath, JSON.stringify(summary, null, 2));
        return filepath;
    }

    /**
     * Generate markdown report
     */
    _generateMarkdownReport(exportData) {
        const { session, logs, subAgentDetails } = exportData;
        
        let markdown = [
            `# Sub-Agent Execution Report`,
            ``,
            `**Session ID**: ${session.sessionId}`,
            `**Generated**: ${new Date().toISOString()}`,
            `**Sub-Agents Executed**: ${session.subAgentsExecuted}`,
            `**Total Tool Executions**: ${session.totalToolExecutions}`,
            `**Total Errors**: ${session.totalErrors}`,
            ``,
            `## Sub-Agent Summary`,
            ``
        ];

        for (const [name, details] of Object.entries(session.subAgentSummaries)) {
            markdown.push(`### ${name}`);
            markdown.push(`- Tool Executions: ${details.toolExecutions}`);
            markdown.push(`- Errors: ${details.errors}`);
            markdown.push(`- Duration: ${details.duration}ms`);
            markdown.push('');
        }

        markdown.push(`## Detailed Logs`);
        markdown.push('');
        
        for (const logEntry of logs) {
            const level = logEntry.level.toUpperCase();
            const subAgent = logEntry.subAgent ? ` [${logEntry.subAgent}]` : '';
            markdown.push(`**${logEntry.timestamp}** ${level}${subAgent}: ${logEntry.message || logEntry.type}`);
        }

        return markdown.join('\n');
    }

    /**
     * Helper methods
     */
    _generateSessionId() {
        return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    }

    _generateExecutionId() {
        return `exec_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    }

    _truncateOutput(output, maxLength = 500) {
        if (!output || output.length <= maxLength) {
            return output;
        }
        return output.substring(0, maxLength) + '... (truncated)';
    }

    async _writeSessionHeader() {
        const header = [
            `=== Sub-Agent Logging Session ===`,
            `Session ID: ${this.options.sessionId}`,
            `Started: ${new Date().toISOString()}`,
            `Log Level: ${this.options.logLevel}`,
            `==========================================`,
            ''
        ].join('\n');

        await fs.writeFile(this.sessionLogFile, header);
    }

    async _cleanupOldLogs() {
        try {
            const files = await fs.readdir(this.options.logDirectory);
            const logFiles = files.filter(f => f.startsWith('session-') && f.endsWith('.log'));
            
            if (logFiles.length > this.options.maxLogFiles) {
                // Sort by creation time and remove oldest
                const filePaths = logFiles.map(f => path.join(this.options.logDirectory, f));
                const fileStats = await Promise.all(
                    filePaths.map(async f => ({ path: f, stat: await fs.stat(f) }))
                );
                
                fileStats.sort((a, b) => a.stat.mtime - b.stat.mtime);
                const toDelete = fileStats.slice(0, logFiles.length - this.options.maxLogFiles);
                
                await Promise.all(toDelete.map(f => fs.unlink(f.path)));
            }
        } catch (error) {
            // Ignore cleanup errors
        }
    }
}

module.exports = SubAgentLogger;