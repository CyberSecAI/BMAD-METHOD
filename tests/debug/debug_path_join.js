const path = require('path');

const __dirname = '/home/chris/work/CyberSecAI/BMAD-METHOD/tools/testing/lib';
const testPath = path.join(__dirname, '../../../tests/agents/vulnerabilityTech/fixtures/python/vulnerable_app');

console.log('__dirname:', __dirname);
console.log('path.join result:', testPath);
console.log('path.resolve result:', path.resolve(__dirname, '../../../tests/agents/vulnerabilityTech/fixtures/python/vulnerable_app'));
console.log('absolute path exists:', require('fs').existsSync(testPath));