import { MetadataRoute } from 'next'
import { getAllPosts } from '@/lib/mdx'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://take-parts-factory.pages.dev'
  
  // Static pages
  const staticPages = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 1,
    },
    {
      url: `${baseUrl}/about/`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/services/`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/blog/`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/contact/`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    },
  ]

  // Dynamic blog posts
  const posts = await getAllPosts()
  const blogPages = posts.map((post) => {
    // Safely parse the date, fallback to current date if invalid
    let postDate: Date
    try {
      postDate = new Date(post.frontmatter.date)
      // Check if date is valid
      if (isNaN(postDate.getTime())) {
        console.warn(`Invalid date for post ${post.slug}: ${post.frontmatter.date}`)
        postDate = new Date()
      }
    } catch (error) {
      console.warn(`Error parsing date for post ${post.slug}: ${post.frontmatter.date}`)
      postDate = new Date()
    }

    return {
      url: `${baseUrl}/blog/${post.slug}/`,
      lastModified: postDate,
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    }
  })

  return [...staticPages, ...blogPages]
}