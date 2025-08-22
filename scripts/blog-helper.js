#!/usr/bin/env node

/**
 * Blog Helper - Simple validation tool for Take Parts Factory blog posts
 * Usage: node scripts/blog-helper.js check
 */

const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');

const POSTS_PATH = path.join(process.cwd(), 'content/posts');

// Colors for console output
const colors = {
  green: '\x1b[32m',
  red: '\x1b[31m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  reset: '\x1b[0m',
  bold: '\x1b[1m'
};

function log(message, color = 'reset') {
  console.log(colors[color] + message + colors.reset);
}

function validateDate(dateString) {
  if (!dateString) return false;
  
  // Check format YYYY-MM-DD
  const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
  if (!dateRegex.test(dateString)) return false;
  
  // Check if date is valid
  const date = new Date(dateString);
  return !isNaN(date.getTime()) && date.toISOString().split('T')[0] === dateString;
}

function validateBlogPost(filePath) {
  const fileName = path.basename(filePath);
  const errors = [];
  const warnings = [];
  
  try {
    const fileContent = fs.readFileSync(filePath, 'utf8');
    
    // Check if file has front matter delimiters
    if (!fileContent.startsWith('---')) {
      errors.push('Missing opening front matter delimiter (---)');
    }
    
    const lines = fileContent.split('\n');
    const closingIndex = lines.findIndex((line, index) => index > 0 && line.trim() === '---');
    if (closingIndex === -1) {
      errors.push('Missing closing front matter delimiter (---)');
    }
    
    // Parse front matter
    let frontmatter = {};
    try {
      const { data } = matter(fileContent);
      frontmatter = data;
    } catch (error) {
      errors.push(`Front matter parsing error: ${error.message}`);
      return { fileName, errors, warnings };
    }
    
    // Validate required fields
    if (!frontmatter.title) {
      errors.push('Missing required field: title');
    } else if (typeof frontmatter.title !== 'string') {
      errors.push('Title must be a string');
    } else if (frontmatter.title.length < 5) {
      warnings.push('Title is very short (less than 5 characters)');
    } else if (frontmatter.title.length > 100) {
      warnings.push('Title is very long (over 100 characters)');
    }
    
    if (!frontmatter.date) {
      errors.push('Missing required field: date');
    } else if (!validateDate(frontmatter.date)) {
      errors.push(`Invalid date format: "${frontmatter.date}" (must be YYYY-MM-DD)`);
    }
    
    // Validate optional fields
    if (frontmatter.excerpt && frontmatter.excerpt.length > 200) {
      warnings.push('Excerpt is very long (over 200 characters)');
    }
    
    if (frontmatter.tags && (!Array.isArray(frontmatter.tags) || frontmatter.tags.length === 0)) {
      warnings.push('Tags should be an array with at least one tag');
    }
    
    if (frontmatter.published === undefined) {
      warnings.push('Consider adding "published" field to control visibility');
    }
    
    // Check file naming convention
    if (fileName !== 'blog-post-template.mdx') {
      const dateMatch = fileName.match(/^(\d{4}-\d{2}-\d{2})-(.+)\.mdx$/);
      if (!dateMatch) {
        warnings.push('File name should follow format: YYYY-MM-DD-title.mdx');
      } else {
        const fileDate = dateMatch[1];
        if (frontmatter.date && frontmatter.date !== fileDate) {
          warnings.push(`File date (${fileDate}) doesn't match front matter date (${frontmatter.date})`);
        }
      }
    }
    
    // Check for content after front matter
    const contentAfterFrontMatter = fileContent.split('---').slice(2).join('---').trim();
    if (!contentAfterFrontMatter) {
      warnings.push('No content found after front matter');
    }
    
  } catch (error) {
    errors.push(`File reading error: ${error.message}`);
  }
  
  return { fileName, errors, warnings };
}

function checkAllBlogs() {
  log('🔍 Checking all blog posts...', 'blue');
  log('');
  
  if (!fs.existsSync(POSTS_PATH)) {
    log('❌ Posts directory not found: ' + POSTS_PATH, 'red');
    process.exit(1);
  }
  
  const files = fs.readdirSync(POSTS_PATH);
  const mdxFiles = files.filter(file => file.endsWith('.mdx'));
  
  if (mdxFiles.length === 0) {
    log('⚠️  No MDX files found in posts directory', 'yellow');
    return;
  }
  
  let totalErrors = 0;
  let totalWarnings = 0;
  const results = [];
  
  for (const file of mdxFiles) {
    const filePath = path.join(POSTS_PATH, file);
    const result = validateBlogPost(filePath);
    results.push(result);
    
    totalErrors += result.errors.length;
    totalWarnings += result.warnings.length;
  }
  
  // Display results
  for (const result of results) {
    if (result.errors.length === 0 && result.warnings.length === 0) {
      log(`✅ ${result.fileName}`, 'green');
    } else {
      log(`📄 ${result.fileName}`, 'bold');
      
      if (result.errors.length > 0) {
        result.errors.forEach(error => {
          log(`   ❌ ${error}`, 'red');
        });
      }
      
      if (result.warnings.length > 0) {
        result.warnings.forEach(warning => {
          log(`   ⚠️  ${warning}`, 'yellow');
        });
      }
      log('');
    }
  }
  
  // Summary
  log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  log(`📊 Summary: ${mdxFiles.length} files checked`, 'blue');
  
  if (totalErrors > 0) {
    log(`❌ ${totalErrors} error(s) found`, 'red');
  }
  
  if (totalWarnings > 0) {
    log(`⚠️  ${totalWarnings} warning(s) found`, 'yellow');
  }
  
  if (totalErrors === 0 && totalWarnings === 0) {
    log('🎉 All blog posts are valid!', 'green');
  } else if (totalErrors === 0) {
    log('✨ No critical errors found', 'green');
  }
  
  // Exit with error code if there are critical errors
  if (totalErrors > 0) {
    log('');
    log('💡 Fix the errors above before deploying to GitHub Pages', 'yellow');
    process.exit(1);
  }
}

function showHelp() {
  log('📝 Blog Helper - Take Parts Factory', 'bold');
  log('');
  log('Usage:', 'blue');
  log('  node scripts/blog-helper.js check    # Validate all blog posts');
  log('  node scripts/blog-helper.js help     # Show this help');
  log('');
  log('Common Issues:', 'yellow');
  log('  • Missing --- delimiters around front matter');
  log('  • Invalid date format (must be YYYY-MM-DD)');
  log('  • Missing required fields (title, date)');
  log('  • File naming doesn\'t match YYYY-MM-DD-title.mdx format');
}

// Main execution
const command = process.argv[2];

switch (command) {
  case 'check':
    checkAllBlogs();
    break;
  case 'help':
  case '--help':
  case '-h':
    showHelp();
    break;
  default:
    if (!command) {
      showHelp();
    } else {
      log(`❌ Unknown command: ${command}`, 'red');
      log('Run "node scripts/blog-helper.js help" for usage information');
      process.exit(1);
    }
}