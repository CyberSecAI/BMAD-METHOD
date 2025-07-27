const { exec } = require('child_process');
const path = require('path');

const vulnerableAppPath = '/home/chris/work/CyberSecAI/BMAD-METHOD/tests/agents/vulnerabilityTech/fixtures/python/vulnerable_app';
const originalCwd = process.cwd();

console.log('Original working directory:', originalCwd);
console.log('Changing to vulnerable app directory:', vulnerableAppPath);

try {
    process.chdir(vulnerableAppPath);
    console.log('New working directory:', process.cwd());
    
    const cmd = 'semgrep --config=auto --json --severity=ERROR --severity=WARNING --no-git-ignore .';
    console.log('Executing:', cmd);
    
    exec(cmd, (error, stdout, stderr) => {
        console.log('Error:', error?.message);
        console.log('Error code:', error?.code);
        
        if (error && error.code !== 1) {
            console.log('Command failed with non-finding error');
            return;
        }
        
        try {
            const results = JSON.parse(stdout);
            console.log('Findings:', results.results?.length || 0);
            console.log('Paths scanned:', results.paths?.scanned?.length || 0);
            console.log('Paths skipped:', results.paths?.skipped?.length || 0);
            if (results.results?.length > 0) {
                console.log('First finding:', JSON.stringify(results.results[0], null, 2));
            }
        } catch (parseError) {
            console.log('Parse error:', parseError.message);
            console.log('Stdout sample:', stdout.substring(0, 500));
        }
        
        // Restore directory
        process.chdir(originalCwd);
    });
} catch (dirError) {
    console.log('Directory change error:', dirError.message);
    process.chdir(originalCwd);
}