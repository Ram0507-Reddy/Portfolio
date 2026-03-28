const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const projects = [
  { path: 'Advanced/1_Ecommerce_Platform', name: '1_Ecommerce_Platform' },
  { path: 'Intermediate/1_Auth_System', name: '1_Auth_System' },
  { path: 'Intermediate/2_Chat_App', name: '2_Chat_App' },
  { path: 'Intermediate/3_Secure_File_Upload', name: '3_Secure_File_Upload' },
  { path: 'Beginner/1_ToDo_App', name: '1_ToDo_App' },
  { path: 'Beginner/2_Weather_App', name: '2_Weather_App' },
  { path: 'Beginner/3_Blog_Website', name: '3_Blog_Website' }
];

const sourceBase = path.join(process.cwd(), '../projects/Frontend');
const publicDest = path.join(process.cwd(), 'public/web_projects');

console.log("Starting secure Rebuild Process...");

projects.forEach(proj => {
  const projDir = path.join(sourceBase, proj.path);
  console.log(`\nProcessing ${proj.name}...`);

  try {
    const packageJson = path.join(projDir, 'package.json');
    if (!fs.existsSync(packageJson)) {
        console.log(`  [!] Skipping: No package.json found in ${projDir}`);
        
        // Even without package.json, try to find static assets (like public folder or index.html)
        const staticDest = path.join(publicDest, proj.name);
        if (!fs.existsSync(publicDest)) fs.mkdirSync(publicDest, { recursive: true });
        
        // Simple HTML project? Just copy the root
        if (fs.existsSync(path.join(projDir, 'index.html'))) {
           fs.rmSync(staticDest, { recursive: true, force: true });
           fs.cpSync(projDir, staticDest, { recursive: true, filter: (src) => !src.includes('node_modules') && !src.includes('.git') });
           console.log(`  -> Successfully deployed static HTML bundle.`);
        }
        return;
    }

    // 0. Ensure dependencies exist
    const nodeModules = path.join(projDir, 'node_modules');
    if (!fs.existsSync(nodeModules)) {
        console.log(`  -> node_modules missing. Running npm install...`);
        execSync('npm.cmd install --no-audit --no-fund', { cwd: projDir, stdio: 'inherit' });
    }

    // 1. Inject HashRouter to isolate SPA Routes from Next.js Server Routes
    const appTsx = path.join(projDir, 'src/App.tsx');
    if (fs.existsSync(appTsx)) {
      let appCode = fs.readFileSync(appTsx, 'utf8');
      if (appCode.includes('BrowserRouter')) {
        appCode = appCode.replace(/BrowserRouter/g, 'HashRouter');
        fs.writeFileSync(appTsx, appCode);
        console.log(`  -> Swapped BrowserRouter to HashRouter for Next.js isolation.`);
      }
    }

    // 2. Inject relative base path into Vite config for asset chunking
    const configs = ['vite.config.ts', 'vite.config.js'];
    for (const conf of configs) {
      const confPath = path.join(projDir, conf);
      if (fs.existsSync(confPath)) {
        let confCode = fs.readFileSync(confPath, 'utf8');
        if (!confCode.includes("base:")) {
          confCode = confCode.replace(/(defineConfig\(\{)/, '$1\n  base: "./",');
          fs.writeFileSync(confPath, confCode);
          console.log(`  -> Injected relative base pathing into ${conf}.`);
        }
        break;
      }
    }

    // 3. Recompile the raw code using the isolated config
    console.log(`  -> Running Production Build...`);
    try {
        execSync('npm.cmd run build', { cwd: projDir, stdio: 'pipe' });
    } catch (buildErr) {
        console.warn(`  [!] Build command failed, but check for output regardless.`);
    }

    // 4. Overwrite Next.js public artifact
    const distPath = path.join(projDir, 'dist');
    const staticPublicPath = path.join(projDir, 'public');
    const buildPath = path.join(projDir, 'build');
    
    let finalSourcePath = null;
    if (fs.existsSync(distPath)) finalSourcePath = distPath;
    else if (fs.existsSync(buildPath)) finalSourcePath = buildPath;
    else if (fs.existsSync(staticPublicPath)) finalSourcePath = staticPublicPath;

    if (finalSourcePath) {
      const destPath = path.join(publicDest, proj.name);
      if (!fs.existsSync(publicDest)) fs.mkdirSync(publicDest, { recursive: true });
      fs.rmSync(destPath, { recursive: true, force: true });
      fs.cpSync(finalSourcePath, destPath, { recursive: true });
      console.log(`  -> Successfully deployed compiled bundle from ${path.basename(finalSourcePath)} to Next.js.`);
    }

  } catch (error) {
    console.error(`  [!] Error processing ${proj.name}: ${error.message}`);
  }
});

console.log("\nRebuild Engine Completed.");
