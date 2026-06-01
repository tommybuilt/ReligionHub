import { cpSync, existsSync, mkdirSync, rmSync } from 'fs';
import { join } from 'path';

const root = process.cwd();
const openNextDir = join(root, '.open-next');
const assetsDir = join(openNextDir, 'assets');
const workerDir = join(assetsDir, '_worker.js');

if (!existsSync(openNextDir)) {
  throw new Error('.open-next directory not found');
}

rmSync(workerDir, { recursive: true, force: true });
mkdirSync(workerDir, { recursive: true });

cpSync(join(openNextDir, 'worker.js'), join(workerDir, 'index.js'));
cpSync(join(openNextDir, '.build'), join(workerDir, '.build'), { recursive: true });
cpSync(join(openNextDir, 'cloudflare'), join(workerDir, 'cloudflare'), { recursive: true });
cpSync(join(openNextDir, 'middleware'), join(workerDir, 'middleware'), { recursive: true });
cpSync(join(openNextDir, 'server-functions'), join(workerDir, 'server-functions'), { recursive: true });

console.log('Prepared Pages SSR worker at .open-next/assets/_worker.js');
