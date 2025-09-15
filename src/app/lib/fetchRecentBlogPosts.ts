// Fetches recent posts from the blog API endpoint
export interface BlogPostPreview {
  id: string;
  title: string;
  slug: string;
  image?: string;
  excerpt?: string;
  author?: {
    name?: string;
    image?: string;
  };
  createdAt?: string;
}

export async function fetchRecentBlogPosts(limit = 3): Promise<BlogPostPreview[]> {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 8000); // Increased to 8s for slower networks
  
  try {
    const url = `https://blog.cyth.me/api/posts?limit=${limit}`;
    
    const res = await fetch(url, {
      // Better production caching strategy
      next: { revalidate: 600 }, // 10 minutes
      cache: 'force-cache',
      signal: controller.signal,
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'User-Agent': 'Portfolio-Site/1.0',
      },
    });
    
    if (!res.ok) {
      return [];
    }
    
    const data = await res.json();
    
    // Handle different response formats
    const posts = Array.isArray(data) ? data : (data.posts || data.data || []);
    
    if (!Array.isArray(posts)) {
      return [];
    }
    
    // Ensure minimal safe shape with better fallbacks
    const normalizedPosts = posts.slice(0, limit).map((p, index) => ({
      id: p.id ?? p.slug ?? `post-${Date.now()}-${index}`,
      title: p.title ?? "Untitled Post",
      slug: p.slug ?? p.id ?? `post-${Date.now()}-${index}`,
      image: p.image || p.cover || p.thumbnail,
      excerpt: p.excerpt || p.description || p.summary || "Read more...",
      author: {
        name: p.author?.name || p.authorName || "Mohneesh",
        image: p.author?.image || p.author?.avatar || p.authorImage,
      },
      createdAt: p.createdAt || p.publishedAt || p.date || new Date().toISOString(),
    }));
    
    console.log(`Successfully fetched ${normalizedPosts.length} blog posts`);
    
    return normalizedPosts;
    
  } catch (e) {
    // Return empty array for graceful fallback
    return [];
  } finally {
    clearTimeout(timeout);
  }
}
