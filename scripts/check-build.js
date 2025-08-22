#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const OUTPUT_DIR = path.join(process.cwd(), 'out');

// Colors for console output
const colors = {
  green: '\x1b[32m',
  red: '\x1b[31m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  reset: '\x1b[0m'
};

function log(color, message) {
  console.log(`${colors[color]}${message}${colors.reset}`);
}

function checkBuildOutput() {
  log('blue', '🔍 Checking build output...');
  
  if (!fs.existsSync(OUTPUT_DIR)) {
    log('red', '❌ Build output directory "out" does not exist');
    process.exit(1);
  }
  
  // Check for essential files
  const essentialFiles = [
    'index.html',
    'about/index.html',
    'services/index.html',
    'blog/index.html',
    'contact/index.html',
    '_next/static',
    'favicon.ico'
  ];
  
  let missingFiles = [];
  
  essentialFiles.forEach(file => {
    const filePath = path.join(OUTPUT_DIR, file);
    if (!fs.existsSync(filePath)) {
      missingFiles.push(file);
    }
  });
  
  if (missingFiles.length > 0) {
    log('red', '❌ Missing essential files:');
    missingFiles.forEach(file => {
      log('red', `   - ${file}`);
    });
    process.exit(1);
  }
  
  log('green', '✅ All essential files are present');
  
  // Check file sizes
  checkFileSizes();
  
  // Check HTML files for proper structure
  checkHtmlFiles();
  
  log('green', '✅ Build output validation completed successfully');
}

function checkFileSizes() {
  log('blue', '📊 Checking file sizes...');
  
  const staticDir = path.join(OUTPUT_DIR, '_next', 'static');
  if (!fs.existsSync(staticDir)) {
    log('yellow', '⚠️  No static files found');
    return;
  }
  
  // Check JS bundle sizes
  const chunksDir = path.join(staticDir, 'chunks');
  if (fs.existsSync(chunksDir)) {
    const jsFiles = fs.readdirSync(chunksDir, { recursive: true })
      .filter(file => file.endsWith('.js'))
      .map(file => {
        const filePath = path.join(chunksDir, file);
        const stats = fs.statSync(filePath);
        return {
          name: file,
          size: stats.size,
          sizeKB: Math.round(stats.size / 1024)
        };
      })
      .sort((a, b) => b.size - a.size);
    
    log('blue', '📦 JavaScript bundle sizes:');
    jsFiles.forEach(file => {
      const color = file.sizeKB > 100 ? 'red' : file.sizeKB > 50 ? 'yellow' : 'green';
      log(color, `   ${file.name}: ${file.sizeKB}KB`);
    });
    
    const totalJS = jsFiles.reduce((acc, file) => acc + file.size, 0);
    const totalKB = Math.round(totalJS / 1024);
    log('blue', `   Total JS: ${totalKB}KB`);
    
    if (totalKB > 500) {
      log('yellow', '⚠️  Large JavaScript bundle detected. Consider code splitting.');
    }
  }
  
  // Check CSS bundle sizes
  const cssDir = path.join(staticDir, 'css');
  if (fs.existsSync(cssDir)) {
    const cssFiles = fs.readdirSync(cssDir)
      .filter(file => file.endsWith('.css'))
      .map(file => {
        const filePath = path.join(cssDir, file);
        const stats = fs.statSync(filePath);
        return {
          name: file,
          size: stats.size,
          sizeKB: Math.round(stats.size / 1024)
        };
      });
    
    log('blue', '🎨 CSS bundle sizes:');
    cssFiles.forEach(file => {
      const color = file.sizeKB > 50 ? 'yellow' : 'green';
      log(color, `   ${file.name}: ${file.sizeKB}KB`);
    });
  }
}

function checkHtmlFiles() {
  log('blue', '📄 Checking HTML files...');
  
  const htmlFiles = [
    'index.html',
    'about/index.html',
    'services/index.html',
    'blog/index.html',
    'contact/index.html'
  ];
  
  htmlFiles.forEach(file => {
    const filePath = path.join(OUTPUT_DIR, file);
    if (fs.existsSync(filePath)) {
      const content = fs.readFileSync(filePath, 'utf8');
      
      // Check for essential meta tags
      const checks = [
        { test: /<title>/, name: 'title tag' },
        { test: /<meta name="description"/, name: 'description meta' },
        { test: /<meta property="og:/, name: 'Open Graph meta' },
        { test: /<html lang="ja"/, name: 'Japanese language attribute' },
        { test: /_next\/static/, name: 'Next.js static assets' }
      ];
      
      checks.forEach(check => {
        if (!check.test.test(content)) {
          log('yellow', `⚠️  ${file}: Missing ${check.name}`);
        }
      });
      
      // Check for Japanese content
      if (!/[\u3040-\u309F\u30A0-\u30FF\u4E00-\u9FAF]/.test(content)) {
        log('yellow', `⚠️  ${file}: No Japanese characters detected`);
      }
    }
  });
}

// Run the checks
checkBuildOutput();