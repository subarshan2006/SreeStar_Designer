import blogPostsData from '@/data/blog-posts.json'

export interface BlogPostRecord {
  id: string
  title: string
  slug: string
  category: string
  categoryLabel: string
  excerpt: string
  publishDate: string
  readTime: string
  author: string
  featuredImage: string
  relatedDesignCodes: string[]
  tags: string[]
  content: string[]
}

const ALL_POSTS: BlogPostRecord[] = blogPostsData as BlogPostRecord[]

/**
 * Fetch all published blog articles
 */
export async function getAllBlogPosts(): Promise<BlogPostRecord[]> {
  return ALL_POSTS
}

/**
 * Fetch a single blog article by URL slug
 */
export async function getBlogPostBySlug(slug: string): Promise<BlogPostRecord | null> {
  const clean = slug.trim().toLowerCase()
  return ALL_POSTS.find((p) => p.slug.toLowerCase() === clean) || null
}

/**
 * Fetch blog articles filtered by category
 */
export async function getBlogPostsByCategory(category: string): Promise<BlogPostRecord[]> {
  if (!category || category === 'all') return ALL_POSTS
  return ALL_POSTS.filter((p) => p.category === category)
}

/**
 * Fetch featured blog posts for highlights
 */
export async function getFeaturedBlogPosts(limit = 3): Promise<BlogPostRecord[]> {
  return ALL_POSTS.slice(0, limit)
}
