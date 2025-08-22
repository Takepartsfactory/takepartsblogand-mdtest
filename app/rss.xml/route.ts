import { NextRequest, NextResponse } from 'next/server';
import { getAllPosts, getSiteConfig } from '@/lib/mdx';

// Generate RSS feed with Japanese metadata and proper encoding
export async function GET(request: NextRequest) {
  try {
    const [posts, siteConfig] = await Promise.all([
      getAllPosts(),
      getSiteConfig()
    ]);

    const siteUrl = siteConfig.url || 'https://take-parts-factory.pages.dev';
    const currentDate = new Date().toISOString();

    // Create RSS XML with proper Japanese encoding
    const rssXml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" 
     xmlns:content="http://purl.org/rss/1.0/modules/content/"
     xmlns:dc="http://purl.org/dc/elements/1.1/"
     xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title><![CDATA[${siteConfig.siteName || 'Take Parts Factory'} - 技術情報・ブログ]]></title>
    <description><![CDATA[${siteConfig.siteDescription || 'CNC旋盤加工、精密部品製造に関する技術情報や最新のノウハウをお届けします。'}]]></description>
    <link>${siteUrl}</link>
    <language>ja</language>
    <managingEditor><![CDATA[${siteConfig.contact?.email || 'info@take-parts-factory.com'} (Take Parts Factory)]]></managingEditor>
    <webMaster><![CDATA[${siteConfig.contact?.email || 'info@take-parts-factory.com'} (Take Parts Factory)]]></webMaster>
    <lastBuildDate>${currentDate}</lastBuildDate>
    <pubDate>${currentDate}</pubDate>
    <generator>Next.js Blog RSS Generator</generator>
    <docs>https://www.rssboard.org/rss-specification</docs>
    <ttl>1440</ttl>
    <atom:link href="${siteUrl}/rss.xml" rel="self" type="application/rss+xml" />
    
    <!-- Channel Image -->
    <image>
      <url>${siteUrl}/images/og-image.jpg</url>
      <title><![CDATA[${siteConfig.siteName || 'Take Parts Factory'}]]></title>
      <link>${siteUrl}</link>
      <width>1200</width>
      <height>630</height>
      <description><![CDATA[CNC旋盤加工・精密部品製造の技術情報]]></description>
    </image>

    <!-- Copyright -->
    <copyright><![CDATA[© ${new Date().getFullYear()} ${siteConfig.company?.name || 'Take Parts Factory'}. All rights reserved.]]></copyright>
    
    <!-- Category -->
    <category><![CDATA[製造業]]></category>
    <category><![CDATA[技術情報]]></category>
    <category><![CDATA[CNC加工]]></category>
    <category><![CDATA[精密部品]]></category>

${posts.map((post) => {
  const postUrl = `${siteUrl}/blog/${post.slug}`;
  
  // Safely parse the date, fallback to current date if invalid
  let postDate: string
  try {
    const parsedDate = new Date(post.frontmatter.date)
    if (isNaN(parsedDate.getTime())) {
      console.warn(`Invalid date for RSS post ${post.slug}: ${post.frontmatter.date}`)
      postDate = new Date().toISOString()
    } else {
      postDate = parsedDate.toISOString()
    }
  } catch (error) {
    console.warn(`Error parsing date for RSS post ${post.slug}: ${post.frontmatter.date}`)
    postDate = new Date().toISOString()
  }
  
  // Clean and prepare content for RSS
  const cleanContent = post.content
    .replace(/---[\s\S]*?---/, '') // Remove frontmatter
    .replace(/<[^>]*>/g, '') // Remove HTML tags
    .replace(/\n\s*\n/g, '\n') // Remove extra newlines
    .trim();

  // Create excerpt if not provided
  const excerpt = post.frontmatter.excerpt || 
    cleanContent.split('\n').slice(0, 3).join(' ').substring(0, 200) + '...';

  // Generate content with proper CDATA wrapping
  const fullContent = `
    <div style="font-family: 'Noto Sans JP', 'Yu Gothic', 'Hiragino Sans', sans-serif; line-height: 1.7; color: #333;">
      ${post.frontmatter.excerpt ? `<p style="font-size: 1.1em; color: #666; margin-bottom: 1.5em;"><strong>概要：</strong>${post.frontmatter.excerpt}</p>` : ''}
      
      ${post.frontmatter.thumbnail ? `<img src="${post.frontmatter.thumbnail}" alt="${post.frontmatter.title}" style="width: 100%; height: auto; margin-bottom: 1.5em; border-radius: 8px;" />` : ''}
      
      <div style="white-space: pre-line;">${cleanContent}</div>
      
      <hr style="margin: 2em 0; border: none; border-top: 1px solid #e5e5e5;" />
      
      <div style="background-color: #f8f9fa; padding: 1.5em; border-radius: 8px; margin-top: 2em;">
        <h3 style="margin: 0 0 1em 0; color: #333;">記事情報</h3>
        <ul style="list-style: none; padding: 0; margin: 0;">
          <li style="margin-bottom: 0.5em;"><strong>投稿日：</strong>${(() => {
            try {
              const date = new Date(post.frontmatter.date)
              return isNaN(date.getTime()) ? '日付不明' : date.toLocaleDateString('ja-JP', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
                weekday: 'long'
              })
            } catch {
              return '日付不明'
            }
          })()}</li>
          ${post.frontmatter.author ? `<li style="margin-bottom: 0.5em;"><strong>著者：</strong>${post.frontmatter.author}</li>` : ''}
          <li style="margin-bottom: 0.5em;"><strong>読了時間：</strong>約${post.readingTime}分</li>
          ${post.frontmatter.tags ? `<li style="margin-bottom: 0.5em;"><strong>タグ：</strong>${post.frontmatter.tags.join(', ')}</li>` : ''}
        </ul>
      </div>
      
      <div style="text-align: center; margin-top: 2em; padding: 1.5em; background-color: #e3f2fd; border-radius: 8px;">
        <p style="margin: 0 0 1em 0; font-weight: bold;">この記事の続きを読む</p>
        <a href="${postUrl}" style="display: inline-block; background-color: #1976d2; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; font-weight: bold;">記事の詳細を見る →</a>
      </div>
    </div>
  `;

  return `    <item>
      <title><![CDATA[${post.frontmatter.title}]]></title>
      <description><![CDATA[${excerpt}]]></description>
      <content:encoded><![CDATA[${fullContent}]]></content:encoded>
      <link>${postUrl}</link>
      <guid isPermaLink="true">${postUrl}</guid>
      <pubDate>${postDate}</pubDate>
      ${post.frontmatter.author ? `<dc:creator><![CDATA[${post.frontmatter.author}]]></dc:creator>` : ''}
      ${post.frontmatter.author ? `<author><![CDATA[${siteConfig.contact?.email || 'info@take-parts-factory.com'} (${post.frontmatter.author})]]></author>` : ''}
      
      <!-- Categories/Tags -->
      ${post.frontmatter.tags ? post.frontmatter.tags.map(tag => 
        `<category><![CDATA[${tag}]]></category>`
      ).join('\n      ') : ''}
      
      <!-- Custom fields for Japanese content -->
      <readingTime>${post.readingTime}</readingTime>
      ${post.frontmatter.thumbnail ? `<enclosure url="${post.frontmatter.thumbnail}" type="image/jpeg" />` : ''}
      
      <!-- Source attribution -->
      <source url="${siteUrl}/rss.xml">Take Parts Factory 技術ブログ</source>
    </item>`;
}).join('\n\n')}

  </channel>
</rss>`;

    // Return RSS XML with proper headers
    return new NextResponse(rssXml, {
      status: 200,
      headers: {
        'Content-Type': 'application/rss+xml; charset=utf-8',
        'Cache-Control': 'public, max-age=3600, s-maxage=3600', // Cache for 1 hour
        'CDN-Cache-Control': 'public, max-age=86400', // Cache on CDN for 24 hours
        'Vary': 'Accept-Encoding',
      },
    });

  } catch (error) {
    console.error('RSS生成エラー:', error);
    
    // Return error RSS feed
    const errorRss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
  <channel>
    <title><![CDATA[Take Parts Factory - エラー]]></title>
    <description><![CDATA[RSS フィードの生成中にエラーが発生しました。]]></description>
    <link>https://take-parts-factory.pages.dev</link>
    <language>ja</language>
    <lastBuildDate>${new Date().toISOString()}</lastBuildDate>
    
    <item>
      <title><![CDATA[RSS フィード生成エラー]]></title>
      <description><![CDATA[RSS フィードの生成中に問題が発生しました。しばらく時間をおいてから再度お試しください。]]></description>
      <link>https://take-parts-factory.pages.dev/blog</link>
      <guid>https://take-parts-factory.pages.dev/rss-error</guid>
      <pubDate>${new Date().toISOString()}</pubDate>
    </item>
  </channel>
</rss>`;

    return new NextResponse(errorRss, {
      status: 500,
      headers: {
        'Content-Type': 'application/rss+xml; charset=utf-8',
        'Cache-Control': 'no-cache, no-store, must-revalidate',
      },
    });
  }
}