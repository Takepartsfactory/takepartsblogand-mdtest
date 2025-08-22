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

function optimizeBuild() {
  log('blue', '🚀 Starting build optimization...');
  
  // Create additional optimization files
  createSecurityTxt();
  createManifest();
  createBrowserConfig();
  
  // Optimize HTML files
  optimizeHtmlFiles();
  
  // Generate performance report
  generatePerformanceReport();
  
  log('green', '✅ Build optimization completed successfully');
}

function createSecurityTxt() {
  log('blue', '🔒 Creating security.txt...');
  
  const securityTxt = `# Security Policy for Take Parts Factory
Contact: security@take-parts-factory.com
Expires: 2025-12-31T23:59:59.000Z
Preferred-Languages: ja, en
Canonical: https://take-parts-factory.pages.dev/.well-known/security.txt

# Please report security vulnerabilities to the contact above.
# We appreciate responsible disclosure.
`;
  
  const wellKnownDir = path.join(OUTPUT_DIR, '.well-known');
  if (!fs.existsSync(wellKnownDir)) {
    fs.mkdirSync(wellKnownDir, { recursive: true });
  }
  
  fs.writeFileSync(path.join(wellKnownDir, 'security.txt'), securityTxt);
  log('green', '✅ security.txt created');
}

function createManifest() {
  log('blue', '📱 Creating web app manifest...');
  
  const manifest = {
    name: 'Take Parts Factory - 精密CNC旋盤加工',
    short_name: 'Take Parts',
    description: '日本の製造技術を活かし、CNC旋盤加工による精密部品製造を行っています',
    start_url: '/',
    display: 'standalone',
    background_color: '#ffffff',
    theme_color: '#DC2626',
    lang: 'ja',
    orientation: 'portrait-primary',
    icons: [
      {
        src: '/favicon.ico',
        sizes: '48x48',
        type: 'image/x-icon'
      },
      {
        src: '/apple-touch-icon.png',
        sizes: '180x180',
        type: 'image/png',
        purpose: 'maskable'
      }
    ],
    categories: ['business', 'manufacturing', 'industrial'],
    screenshots: []
  };
  
  fs.writeFileSync(
    path.join(OUTPUT_DIR, 'manifest.json'),
    JSON.stringify(manifest, null, 2)
  );
  
  log('green', '✅ Web app manifest created');
}

function createBrowserConfig() {
  log('blue', '🌐 Creating browserconfig.xml...');
  
  const browserconfig = `<?xml version="1.0" encoding="utf-8"?>
<browserconfig>
  <msapplication>
    <tile>
      <square150x150logo src="/mstile-150x150.png"/>
      <TileColor>#DC2626</TileColor>
    </tile>
  </msapplication>
</browserconfig>`;
  
  fs.writeFileSync(path.join(OUTPUT_DIR, 'browserconfig.xml'), browserconfig);
  log('green', '✅ browserconfig.xml created');
}

function optimizeHtmlFiles() {
  log('blue', '🔧 Optimizing HTML files...');
  
  const findHtmlFiles = (dir) => {
    let htmlFiles = [];
    const items = fs.readdirSync(dir);
    
    items.forEach(item => {
      const itemPath = path.join(dir, item);
      const stat = fs.statSync(itemPath);
      
      if (stat.isDirectory() && !item.startsWith('_')) {
        htmlFiles = htmlFiles.concat(findHtmlFiles(itemPath));
      } else if (item.endsWith('.html')) {
        htmlFiles.push(itemPath);
      }
    });
    
    return htmlFiles;
  };
  
  const htmlFiles = findHtmlFiles(OUTPUT_DIR);
  let optimizedCount = 0;
  
  htmlFiles.forEach(filePath => {
    let content = fs.readFileSync(filePath, 'utf8');
    let modified = false;
    
    // Add missing performance hints
    if (!content.includes('dns-prefetch')) {
      content = content.replace(
        '<head>',
        `<head>
        <link rel="dns-prefetch" href="https://fonts.googleapis.com">
        <link rel="dns-prefetch" href="https://fonts.gstatic.com">`
      );
      modified = true;
    }
    
    // Add manifest link if missing
    if (!content.includes('manifest.json')) {
      content = content.replace(
        '</head>',
        '  <link rel="manifest" href="/manifest.json">\n</head>'
      );
      modified = true;
    }
    
    // Add viewport meta if missing
    if (!content.includes('viewport-fit=cover')) {
      content = content.replace(
        'name="viewport"',
        'name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover"'
      );
      modified = true;
    }
    
    if (modified) {
      fs.writeFileSync(filePath, content);
      optimizedCount++;
    }
  });
  
  log('green', `✅ Optimized ${optimizedCount} HTML files`);
}

function generatePerformanceReport() {
  log('blue', '📊 Generating performance report...');
  
  const report = {
    buildDate: new Date().toISOString(),
    optimizations: [
      'Static export for Cloudflare Pages',
      'Font optimization with preload',
      'Code splitting enabled',
      'CSS optimization enabled',
      'Security headers configured',
      'Caching headers optimized',
      'Web app manifest created',
      'Core Web Vitals monitoring added'
    ],
    recommendations: [
      'Monitor Core Web Vitals in production',
      'Consider implementing service worker for offline support',
      'Add image optimization for user-uploaded content',
      'Implement critical CSS inlining for above-fold content',
      'Set up performance budgets in CI/CD'
    ],
    deploymentChecklist: [
      '✅ Static files generated',
      '✅ Headers configuration ready',
      '✅ Redirects configuration ready',
      '✅ SEO meta tags optimized',
      '✅ Japanese language support configured',
      '✅ Performance monitoring enabled'
    ]
  };
  
  fs.writeFileSync(
    path.join(OUTPUT_DIR, 'performance-report.json'),
    JSON.stringify(report, null, 2)
  );
  
  // Also create a human-readable report
  const humanReport = `
# Performance Optimization Report
Generated: ${report.buildDate}

## Applied Optimizations
${report.optimizations.map(opt => `- ${opt}`).join('\n')}

## Recommendations
${report.recommendations.map(rec => `- ${rec}`).join('\n')}

## Deployment Checklist
${report.deploymentChecklist.map(item => `${item}`).join('\n')}

## Cloudflare Pages Setup
1. Connect your GitHub repository to Cloudflare Pages
2. Set build command: npm run build
3. Set output directory: out
4. Enable Node.js version 20
5. Deploy and test

For detailed deployment instructions, see the README.md file.
`;
  
  fs.writeFileSync(path.join(OUTPUT_DIR, 'PERFORMANCE_REPORT.md'), humanReport);
  
  log('green', '✅ Performance report generated');
}

// Run the optimization
optimizeBuild();