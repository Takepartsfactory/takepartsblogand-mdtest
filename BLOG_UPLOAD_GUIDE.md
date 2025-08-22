# 📝 Blog Upload Guide - Take Parts Factory

## Quick Start - Upload New Blog Post

### Step 1: Create New Blog File

```bash
# Navigate to your project
cd /path/to/take-parts-factory

# Go to posts directory  
cd content/posts/

# Copy template with today's date
cp blog-post-template.mdx 2025-08-23-your-blog-title.mdx
```

**File naming format:** `YYYY-MM-DD-blog-title.mdx`

### Step 2: Edit Your Blog Post

Open your new file and edit:

```mdx
---
title: "Your Amazing Blog Title"
date: "2025-08-23"
tags: ["CNC旋盤", "製造技術", "品質管理"]  
excerpt: "Brief description that appears in blog listings (100 chars max)"
thumbnail: "/images/your-photo.jpg"
author: "Your Name"
published: true
---

# Your Amazing Blog Title

## Introduction

Your content starts here...

### Technical Details

Add your technical content with:

- Bullet points
- **Bold text**
- Tables

| Specification | Value |
|---------------|--------|
| Precision | ±0.01mm |
| Surface | Ra 0.8μm |

### Images

![Description](/images/your-image.jpg)

### Call to Action

<div className="text-center my-8">
  <a href="/contact/" className="inline-block bg-red-600 text-white px-8 py-4 rounded-full font-bold hover:bg-red-700 transition-colors">
    お問い合わせ・見積依頼
  </a>
</div>
```

### Step 3: Add Images (If Needed)

```bash
# Copy your images to public folder
cp your-image.jpg public/images/
```

### Step 4: Test Locally

```bash
# Test build (IMPORTANT - always do this first!)
npm run build

# If successful, preview locally
npm run dev
# Visit: http://localhost:3000/blog/your-blog-title
```

### Step 5: Deploy to GitHub

```bash
# Stage all changes
git add .

# Commit with clear message
git commit -m "Add blog: Your Amazing Blog Title"

# Push to GitHub (triggers auto-deployment)
git push origin main
```

## ⚠️ Critical Requirements

### Front Matter MUST Have Delimiters

**CORRECT:**
```mdx
---
title: "Blog Title"
date: "2025-08-23"
---
```

**WRONG (will break build):**
```mdx
title: "Blog Title"
date: "2025-08-23"
```

### Date Format MUST Be Valid

**CORRECT:**
- `"2025-08-23"`
- `"2024-12-31"`

**WRONG:**
- `"2025-13-45"` (invalid month/day)
- `"invalid-date"`
- `"Aug 23, 2025"`

### Required Fields

- `title` - Blog post title
- `date` - Publication date (YYYY-MM-DD)
- All other fields are optional

## 🚀 Publishing Control

### Draft Posts
```mdx
---
title: "My Draft"
date: "2025-08-23"
published: false  # Hide from website
---
```

### Published Posts
```mdx
---
title: "My Published Post" 
date: "2025-08-23"
published: true   # Show on website (default)
---
```

## 📋 Pre-Upload Checklist

Before pushing to GitHub, check:

- [ ] Front matter has `---` at start and end
- [ ] Date format is "YYYY-MM-DD" 
- [ ] All images uploaded to `/public/images/`
- [ ] Local build succeeds (`npm run build`)
- [ ] Blog preview looks correct (`npm run dev`)

## 🔧 Common Issues & Solutions

### "Invalid time value" Error
**Problem:** Date format is wrong
**Solution:** Use exact format "YYYY-MM-DD"

### Blog Not Showing Up
**Problem:** Missing front matter delimiters or `published: false`
**Solution:** 
1. Add `---` at start/end of front matter
2. Set `published: true`
3. Check file is `.mdx` not `.md`

### Build Fails on GitHub
**Problem:** Error in blog post format
**Solution:**
1. Run `npm run build` locally first
2. Fix any errors shown
3. Check GitHub Actions tab for details

### Images Not Loading
**Problem:** Image path incorrect
**Solution:**
1. Upload image to `/public/images/`
2. Reference as `/images/filename.jpg`
3. Use forward slashes, not backslashes

## 🎯 Quick Commands Reference

```bash
# Local Development
npm run build         # Test build
npm run dev          # Preview at localhost:3000
npm run blog:check   # Validate all blogs (if available)

# Deployment
git add .
git commit -m "Add blog: title"
git push origin main

# Check Status
# Visit: https://github.com/YOUR-USERNAME/YOUR-REPO/actions
```

## 📄 Adding Non-Blog Pages

For new static pages (not blog posts):

```bash
# Create in pages directory
cd content/pages/
cp ../posts/blog-post-template.mdx new-page.mdx
```

Page structure:
```mdx
---
title: "Page Title"
description: "Page description for SEO"
---

# Page Title

Your page content...
```

Access at: `https://your-site.com/new-page`

## 🆘 Need Help?

1. **Build failing?** Check the exact error message
2. **GitHub deployment failing?** Check Actions tab
3. **Blog not appearing?** Verify `published: true` and proper front matter
4. **Images broken?** Check file paths and ensure images are in `/public/images/`

## 📝 Content Tips

### For CNC/Manufacturing Blogs:
- Include technical specifications in tables
- Add process images and diagrams  
- Use bullet points for tool lists
- Include customer testimonials with quotes
- Add call-to-action buttons for inquiries
- Reference related blog posts at the end

### SEO Best Practices:
- Write descriptive titles (50-60 characters)
- Create compelling excerpts (100-150 characters)
- Use relevant tags for your industry
- Add alt text to all images
- Include internal links to other pages/blogs

Remember: The system now has built-in error handling, so minor mistakes won't break your entire site!