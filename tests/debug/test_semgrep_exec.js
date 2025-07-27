const { exec } = require('child_process');

const cmd = 'semgrep --config=auto --json --severity=ERROR --severity=WARNING .';
console.log('Working directory:', process.cwd());
console.log('Executing:', cmd);

exec(cmd, (error, stdout, stderr) => {
  if (error && error.code !== 1) {
    console.log('Error (non-exit-1):', error.message);
    console.log('Error code:', error.code);
    return;
  }
  
  try {
    const results = JSON.parse(stdout);
    console.log('Findings:', results.results?.length || 0);
    console.log('Errors in JSON:', results.errors?.length || 0);
    if (results.errors?.length > 0) {
      console.log('JSON errors:', JSON.stringify(results.errors, null, 2));
    }
    if (results.results?.length > 0) {
      console.log('First finding:', JSON.stringify(results.results[0], null, 2));
    }
  } catch (parseError) {
    console.log('Parse error:', parseError.message);
    console.log('Stdout length:', stdout.length);
    console.log('First 500 chars:', stdout.substring(0, 500));
    console.log('Stderr:', stderr);
  }
});