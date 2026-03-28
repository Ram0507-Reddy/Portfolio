import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';

const SOURCE_DIR = 'C:\\Users\\Shriram Reddy\\.gemini\\antigravity\\scratch\\portfolio_projects';
const TARGET_PUBLIC = path.join(process.cwd(), 'public', 'web_projects');
const TARGET_CYBER = path.join(process.cwd(), 'src', 'data', 'cyber_projects');

// Ensure target directories exist
if (!fs.existsSync(TARGET_PUBLIC)) fs.mkdirSync(TARGET_PUBLIC, { recursive: true });
if (!fs.existsSync(TARGET_CYBER)) fs.mkdirSync(TARGET_CYBER, { recursive: true });

console.log('--- Starting Project Migration ---');

// 1. Migrate Cybersecurity Projects
console.log('Migrating Cybersecurity Projects...');
const cyberSrc = path.join(SOURCE_DIR, 'Cybersecurity');
if (fs.existsSync(cyberSrc)) {
  fs.cpSync(cyberSrc, TARGET_CYBER, { recursive: true });
  console.log('✓ Copied Cybersecurity projects to src/data/cyber_projects');
}

// 2. Build and Migrate Web Development Projects
const webSrc = path.join(SOURCE_DIR, 'Web_Development');
if (fs.existsSync(webSrc)) {
  const levels = fs.readdirSync(webSrc).filter(f => fs.statSync(path.join(webSrc, f)).isDirectory());
  
  for (const level of levels) {
    const levelPath = path.join(webSrc, level);
    const projects = fs.readdirSync(levelPath).filter(f => fs.statSync(path.join(levelPath, f)).isDirectory());
    
    for (const proj of projects) {
      console.log(`Processing Web Project: [${level}] ${proj}`);
      const projPath = path.join(levelPath, proj);
      const destPath = path.join(TARGET_PUBLIC, proj);
      
      try {
        // If it looks like a Node/React project
        if (fs.existsSync(path.join(projPath, 'package.json'))) {
          console.log(`  Running npm install...`);
          execSync('npm install', { cwd: projPath, stdio: 'inherit' });
          
          console.log(`  Building project...`);
          execSync('npm run build', { cwd: projPath, stdio: 'inherit' });
          
          let buildDir = null;
          if (fs.existsSync(path.join(projPath, 'dist'))) buildDir = 'dist';
          else if (fs.existsSync(path.join(projPath, 'build'))) buildDir = 'build';
          
          if (buildDir) {
            console.log(`  Copying ${buildDir} to public...`);
            fs.cpSync(path.join(projPath, buildDir), destPath, { recursive: true });
          } else {
            console.log(`  WARNING: No dist/build folder found after build for ${proj}`);
          }
        } 
        // If it's pure HTML/JS
        else if (fs.existsSync(path.join(projPath, 'index.html'))) {
          console.log(`  Pure HTML project. Copying contents...`);
          fs.cpSync(projPath, destPath, { recursive: true });
        }
        else {
          console.log(`  WARNING: Unrecognized project type for ${proj}`);
        }
      } catch (err) {
        console.error(`  ERROR mapping ${proj}: ${err.message}`);
      }
    }
  }
}

console.log('--- Migration Completed! ---');
