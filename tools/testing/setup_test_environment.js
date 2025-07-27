#!/usr/bin/env node

/**
 * Test Environment Setup Script
 * 
 * Prepares the test environment for BMAD agent testing,
 * including creating necessary directories and validating prerequisites.
 */

const fs = require('fs').promises;
const path = require('path');
const { exec } = require('child_process');
const { promisify } = require('util');

const execAsync = promisify(exec);

class TestEnvironmentSetup {
    constructor(options = {}) {
        this.options = {
            verbose: options.verbose || false,
            skipToolCheck: options.skipToolCheck || false,
            ...options
        };
    }

    /**
     * Setup complete test environment
     */
    async setup() {
        console.log('🚀 Setting up BMAD Method test environment...\n');

        try {
            // 1. Validate directory structure
            await this._validateDirectoryStructure();
            
            // 2. Check security tools availability
            if (!this.options.skipToolCheck) {
                await this._checkSecurityTools();
            }
            
            // 3. Create reports directory
            await this._createReportsDirectory();
            
            // 4. Validate test fixtures
            await this._validateTestFixtures();
            
            // 5. Check Claude Code sub-agents
            await this._validateSubAgents();
            
            console.log('✅ Test environment setup complete!\n');
            this._printUsageInstructions();
            
        } catch (error) {
            console.error(`❌ Setup failed: ${error.message}`);
            process.exit(1);
        }
    }

    /**
     * Validate test directory structure
     */
    async _validateDirectoryStructure() {
        console.log('📁 Validating directory structure...');
        
        const requiredDirectories = [
            'tests',
            'tests/agents',
            'tests/agents/vulnerabilityTech',
            'tests/agents/vulnerabilityTech/fixtures',
            'tests/agents/vulnerabilityTech/fixtures/python',
            'tests/agents/vulnerabilityTech/fixtures/python/vulnerable_app',
            'tests/agents/vulnerabilityTech/integration',
            'tests/agents/vulnerabilityTech/expected_results',
            'tests/lib',
            'tests/scripts',
            'tests/fixtures',
            '.claude',
            '.claude/agents',
            '.claude/agents/tools',
            '.claude/config'
        ];

        for (const dir of requiredDirectories) {
            try {
                await fs.access(dir);
                if (this.options.verbose) {
                    console.log(`  ✅ ${dir}`);
                }
            } catch (error) {
                console.log(`  ⚠️  Creating missing directory: ${dir}`);
                await fs.mkdir(dir, { recursive: true });
            }
        }
        
        console.log('  ✅ Directory structure validated\n');
    }

    /**
     * Check availability of security tools
     */
    async _checkSecurityTools() {
        console.log('🔧 Checking security tools availability...');
        
        const tools = [
            { name: 'semgrep', command: 'semgrep --version', required: true },
            { name: 'safety', command: 'safety --version', required: true },
            { name: 'pip-audit', command: 'pip-audit --version', required: false },
            { name: 'ruff', command: 'ruff --version', required: false },
            { name: 'python', command: 'python3 --version', required: true }
        ];

        const results = [];
        
        for (const tool of tools) {
            try {
                const { stdout } = await execAsync(tool.command);
                const version = stdout.trim().split('\n')[0];
                results.push({ ...tool, available: true, version });
                
                if (this.options.verbose) {
                    console.log(`  ✅ ${tool.name}: ${version}`);
                }
            } catch (error) {
                results.push({ ...tool, available: false, error: error.message });
                
                if (tool.required) {
                    console.log(`  ❌ ${tool.name}: Required tool not found`);
                } else {
                    console.log(`  ⚠️  ${tool.name}: Optional tool not found`);
                }
            }
        }

        // Check if all required tools are available
        const missingRequired = results.filter(r => r.required && !r.available);
        if (missingRequired.length > 0) {
            console.log('\n❌ Missing required tools:');
            missingRequired.forEach(tool => {
                console.log(`  • ${tool.name}: ${this._getInstallInstructions(tool.name)}`);
            });
            throw new Error('Required security tools are missing');
        }
        
        console.log('  ✅ Security tools validated\n');
        return results;
    }

    /**
     * Create reports directory
     */
    async _createReportsDirectory() {
        console.log('📊 Setting up reports directory...');
        
        const reportsDir = 'tests/reports';
        
        try {
            await fs.mkdir(reportsDir, { recursive: true });
            
            // Create .gitignore for reports
            const gitignoreContent = `# Test reports (generated files)
*.json
*.html
*.md
!README.md
`;
            await fs.writeFile(path.join(reportsDir, '.gitignore'), gitignoreContent);
            
            // Create README
            const readmeContent = `# Test Reports

This directory contains generated test reports from BMAD agent testing.

## Report Types

- **JSON Reports**: Machine-readable test results and metrics
- **HTML Reports**: Human-readable test reports with charts and summaries  
- **Markdown Reports**: Text-based reports suitable for documentation

## Viewing Reports

- Open HTML reports in your browser for interactive viewing
- Use JSON reports for automated analysis and CI/CD integration
- Include Markdown reports in documentation and pull requests

Reports are automatically generated when running tests with the \`--report\` flag (enabled by default).
`;
            await fs.writeFile(path.join(reportsDir, 'README.md'), readmeContent);
            
            console.log('  ✅ Reports directory created\n');
        } catch (error) {
            throw new Error(`Failed to create reports directory: ${error.message}`);
        }
    }

    /**
     * Validate test fixtures
     */
    async _validateTestFixtures() {
        console.log('🧪 Validating test fixtures...');
        
        const fixtures = [
            {
                path: 'tests/agents/vulnerabilityTech/fixtures/python/vulnerable_app/main.py',
                description: 'Vulnerable Flask application'
            },
            {
                path: 'tests/agents/vulnerabilityTech/fixtures/python/vulnerable_app/requirements.txt',
                description: 'Vulnerable dependencies file'
            },
            {
                path: 'tests/agents/vulnerabilityTech/fixtures/python/vulnerable_app/models.py',
                description: 'Vulnerable models file'
            },
            {
                path: 'tests/agents/vulnerabilityTech/fixtures/python/vulnerable_app/auth.py',
                description: 'Vulnerable authentication module'
            },
            {
                path: 'tests/agents/vulnerabilityTech/fixtures/python/vulnerable_app/payments.py',
                description: 'Vulnerable payment processing module'
            }
        ];

        for (const fixture of fixtures) {
            try {
                await fs.access(fixture.path);
                if (this.options.verbose) {
                    console.log(`  ✅ ${fixture.description}`);
                }
            } catch (error) {
                console.log(`  ❌ Missing fixture: ${fixture.description} (${fixture.path})`);
                throw new Error(`Required test fixture missing: ${fixture.path}`);
            }
        }
        
        console.log('  ✅ Test fixtures validated\n');
    }

    /**
     * Validate Claude Code sub-agents
     */
    async _validateSubAgents() {
        console.log('🤖 Validating Claude Code sub-agents...');
        
        const subAgents = [
            {
                path: '.claude/agents/security-reviewer.md',
                description: 'Security-Reviewer sub-agent'
            },
            {
                path: '.claude/agents/tools/semgrep-enhanced.md',
                description: 'Semgrep-Enhanced tool sub-agent'
            },
            {
                path: '.claude/agents/tools/custom-analysis.md',
                description: 'Custom-Analysis tool sub-agent'
            },
            {
                path: '.claude/agents/tools/safety-scanner.md',
                description: 'Safety-Scanner tool sub-agent'
            },
            {
                path: '.claude/config/python-security-tools.yaml',
                description: 'Python security tools configuration'
            }
        ];

        for (const subAgent of subAgents) {
            try {
                await fs.access(subAgent.path);
                if (this.options.verbose) {
                    console.log(`  ✅ ${subAgent.description}`);
                }
            } catch (error) {
                console.log(`  ❌ Missing sub-agent: ${subAgent.description} (${subAgent.path})`);
                throw new Error(`Required sub-agent missing: ${subAgent.path}`);
            }
        }
        
        console.log('  ✅ Claude Code sub-agents validated\n');
    }

    /**
     * Get installation instructions for tools
     */
    _getInstallInstructions(toolName) {
        const instructions = {
            semgrep: 'pip install semgrep',
            safety: 'pip install safety',
            'pip-audit': 'pip install pip-audit',
            ruff: 'pip install ruff',
            python: 'Install Python 3.8+ from python.org'
        };

        return instructions[toolName] || 'Check tool documentation for installation';
    }

    /**
     * Print usage instructions
     */
    _printUsageInstructions() {
        console.log('📋 Test Framework Usage Instructions:');
        console.log('════════════════════════════════════════\n');
        
        console.log('🧪 Run Individual Agent Tests:');
        console.log('  npm run test:vulnerabilitytech     # Test VulnerabilityTech agent');
        console.log('  npm run test:security              # Test Security agent');
        console.log('  npm run test:subagents             # Test sub-agent coordination\n');
        
        console.log('🔍 Run Specific Commands:');
        console.log('  npm run test:agent -- vulnerabilityTech --command="*specialized-security-review"');
        console.log('  npm run test:agent -- security --verbose\n');
        
        console.log('📊 Generate Reports:');
        console.log('  npm run test:agent -- vulnerabilityTech --verbose');
        console.log('  # Reports generated in tests/reports/\n');
        
        console.log('🚀 Run All Tests:');
        console.log('  npm run test:all                   # Run complete test suite\n');
        
        console.log('For more options, see tests/README.md or run:');
        console.log('  node tests/scripts/run_agent_test.js --help');
    }
}

// Command line interface
async function main() {
    const args = process.argv.slice(2);
    
    if (args.includes('--help')) {
        console.log(`
BMAD Test Environment Setup

Usage:
  node setup_test_environment.js [options]

Options:
  --verbose              Show detailed output
  --skip-tool-check     Skip security tools validation
  --help                Show this help message

This script prepares the test environment for BMAD agent testing by:
- Validating directory structure
- Checking security tool availability  
- Creating reports directories
- Validating test fixtures and sub-agents
        `);
        process.exit(0);
    }
    
    const options = {
        verbose: args.includes('--verbose'),
        skipToolCheck: args.includes('--skip-tool-check')
    };
    
    const setup = new TestEnvironmentSetup(options);
    await setup.setup();
}

// Run if called directly
if (require.main === module) {
    main().catch(error => {
        console.error(`💥 Setup failed: ${error.message}`);
        process.exit(1);
    });
}

module.exports = TestEnvironmentSetup;