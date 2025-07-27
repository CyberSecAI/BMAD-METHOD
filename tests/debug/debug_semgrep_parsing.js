const { exec } = require('child_process');

const cmd = 'semgrep --config=auto --json --severity=ERROR --severity=WARNING .';

console.log('Testing exact agent_runner Semgrep execution...');

const startTime = Date.now();
exec(cmd, (error, stdout, stderr) => {
    const duration = Date.now() - startTime;
    
    console.log('Error:', error?.message);
    console.log('Error code:', error?.code);
    console.log('Duration:', duration);
    
    if (error && error.code !== 1) {
        console.log('Would resolve with findings: 0 due to error condition');
        console.log('Actual error code:', error.code);
        return;
    }
    
    try {
        const results = JSON.parse(stdout);
        const findings = results.results?.length || 0;
        const critical = results.results?.filter(r => r.severity === 'ERROR').length || 0;
        
        console.log('Parsed findings:', findings);
        console.log('Critical findings:', critical);
        console.log('Results object keys:', Object.keys(results));
        console.log('Results.results length:', results.results?.length);
        
        console.log('\nWould resolve with:');
        console.log('{ findings:', findings, ', critical:', critical, ', raw: [results object] }');
        
    } catch (parseError) {
        console.log('Parse error:', parseError.message);
        console.log('Would resolve with findings: 0 due to parse error');
        console.log('Stdout sample:', stdout.substring(0, 200));
    }
});