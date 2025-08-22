# 🚀 Quick Start - Upload New Blog Post

## 1. Copy Template
```bash
cd content/posts/
cp blog-post-template.mdx 2025-08-23-your-title.mdx
```

## 2. Edit Your Blog
```mdx
---
title: "Your Blog Title"
date: "2025-08-23"          # MUST be YYYY-MM-DD
tags: ["CNC旋盤", "製造技術"]
excerpt: "Brief description"
published: true
---

# Your Blog Title

Your content here...
```

## 3. Test & Deploy
```bash
# Validate blogs
npm run blog:check

# Test build
npm run build:safe

# Deploy to GitHub
git add .
git commit -m "Add blog: Your Title"  
git push origin main
```

## 🔧 Commands
- `npm run blog:check` - Validate all blogs
- `npm run build:safe` - Validate then build
- `npm run blog:help` - Show help

## ⚠️ Critical Rules
1. **Front matter MUST have `---` delimiters**
2. **Date MUST be "YYYY-MM-DD" format** 
3. **Test build locally first**

Read [BLOG_UPLOAD_GUIDE.md](./BLOG_UPLOAD_GUIDE.md) for detailed instructions.