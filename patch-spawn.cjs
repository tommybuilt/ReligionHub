// Patch child_process.spawn to fix ENOENT errors on Windows
// 1. 'npx'/'npm' -> 'npx.cmd'/'npm.cmd'
// 2. 'bash' -> Git Bash path
const cp = require('child_process');
const origSpawn = cp.spawn;
cp.spawn = function(cmd, args, opts) {
  if (process.platform === 'win32') {
    if (cmd === 'npx' || cmd === 'npm') {
      cmd = cmd + '.cmd';
    } else if (cmd === 'bash') {
      cmd = 'C:\\Program Files\\Git\\bin\\bash.exe';
    }
  }
  return origSpawn.call(this, cmd, args, opts);
};
