const path = require('path');

console.log('Current working directory:', process.cwd());

// Test path resolution from tools/testing directory
process.chdir('/home/chris/work/CyberSecAI/BMAD-METHOD/tools/testing');
console.log('Changed to tools/testing:', process.cwd());

const testProjectPath = path.resolve('../../tests/agents/vulnerabilityTech/fixtures/python/vulnerable_app');
console.log('Resolved test project path:', testProjectPath);

try {
    process.chdir(testProjectPath);
    console.log('Successfully changed to test project:', process.cwd());
    console.log('Files in directory:', require('fs').readdirSync('.'));
} catch (error) {
    console.log('Error changing directory:', error.message);
}