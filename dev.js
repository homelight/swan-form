/**
 * @todo  Fix this up to run both rollup and cra in one command or install something like `nps` or
 * `concurrently` to do it.
 */

const { spawn } = require('child_process');
const rollup = spawn('yarn', ['start']);
const cra = spawn('yarn', ['start'], { cwd: 'example' });

rollup.stdout.on('data', data => {
  rollup.stdin.write(data);
});

rollup.stderr.on('data', data => {
  console.log(`rollup stderr: ${data}`);
});

rollup.on('close', code => {
  if (code !== 0) {
    console.log(`rollup process exited with code ${code}`);
  }
  rollup.stdin.end();
});

cra.stdout.on('data', data => {
  console.log(data.toString());
});

cra.stderr.on('data', data => {
  console.log(`cra stderr: ${data}`);
});

cra.on('close', code => {
  if (code !== 0) {
    console.log(`cra process exited with code ${code}`);
  }
});
