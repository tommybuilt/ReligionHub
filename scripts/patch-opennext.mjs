/**
 * postinstall: Patch @opennextjs/cloudflare bundle-server.js to fix esbuild 0.25+ compat.
 *
 * esbuild 0.25.0 added strict alias-name validation that rejects subpath aliases
 * like "next/dist/compiled/node-fetch". This script converts those aliases into an
 * esbuild resolve plugin, which works identically but bypasses the validation.
 *
 * This is a best-effort patch — the npm override pinning esbuild to 0.24.2 for
 * @opennextjs/aws is the primary fix. This patch provides a backup in case the
 * override doesn't take effect.
 */
try {
  const { readFileSync, writeFileSync, existsSync } = await import('fs');
  const { join, dirname } = await import('path');
  const { fileURLToPath } = await import('url');

  const __dirname = dirname(fileURLToPath(import.meta.url));
  const root = join(__dirname, '..');
  const filePath = join(
    root,
    'node_modules',
    '@opennextjs',
    'cloudflare',
    'dist',
    'cli',
    'build',
    'bundle-server.js'
  );

  if (!existsSync(filePath)) {
    console.log('[patch-opennext] bundle-server.js not found, skipping');
    process.exit(0);
  }

  let code = readFileSync(filePath, 'utf8');

  if (code.includes('ALIAS_COMPAT_PATCHED')) {
    console.log('[patch-opennext] Already patched, skipping');
    process.exit(0);
  }

  // --- Step 1: Find the `alias: { ... }` block inside the esbuild build() call ---
  const aliasMarker = 'alias: {';
  const aliasIdx = code.indexOf(aliasMarker);
  if (aliasIdx === -1) {
    console.log('[patch-opennext] No alias block found, skipping');
    process.exit(0);
  }

  // Find the matching closing brace by counting depth
  let depth = 0;
  const braceStart = code.indexOf('{', aliasIdx);
  let braceEnd = braceStart;
  for (let i = braceStart; i < code.length; i++) {
    if (code[i] === '{') depth++;
    if (code[i] === '}') depth--;
    if (depth === 0) {
      braceEnd = i;
      break;
    }
  }

  // Extract the JS code inside the alias braces (preserves path.join() expressions)
  const aliasContent = code.substring(braceStart + 1, braceEnd);

  // --- Step 2: Replace alias block with empty object ---
  const before = code.substring(0, aliasIdx);
  const after = code.substring(braceEnd + 1);
  code = before + 'alias: { /* ALIAS_COMPAT_PATCHED */ }' + after;

  // --- Step 3: Inject a resolve plugin that handles the same aliases ---
  // The plugin runs in the same scope so `path` and `buildOpts` are available.
  // Uses a broad prefix filter (/^(next\/|@next\/)/) and exact-match lookup.
  const pluginCode = `
              { // ALIAS_COMPAT_PATCHED
                name: 'alias-compat',
                setup(pluginBuild) {
                  const _aliasMap = {${aliasContent}};
                  pluginBuild.onResolve({ filter: /^(next\\/|@next\\/)/ }, (args) => {
                    if (_aliasMap[args.path]) return { path: _aliasMap[args.path] };
                  });
                }
              },`;

  // Insert at the beginning of the plugins array
  code = code.replace('plugins: [', 'plugins: [' + pluginCode);

  writeFileSync(filePath, code);
  console.log('[patch-opennext] Patched bundle-server.js: aliases -> resolve plugin (esbuild 0.25+ compat)');
} catch (err) {
  // Never fail npm install — the esbuild override in package.json is the primary fix
  console.log('[patch-opennext] Skipped (non-fatal):', err.message);
}
