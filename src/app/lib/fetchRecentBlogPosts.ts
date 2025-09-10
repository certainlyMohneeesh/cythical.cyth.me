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
  const timeout = setTimeout(() => controller.abort(), 3500); // 3.5s budget
  try {
    const res = await fetch(`https://blog.cyth.me/api/posts?limit=${limit}`, {
      // Revalidate periodically to keep fast SSR while staying fresh
      next: { revalidate: 300 },
      // Force no-cookies and avoid slow caches in dev
      cache: process.env.NODE_ENV === 'development' ? 'no-store' : 'force-cache',
      signal: controller.signal,
    });
    if (!res.ok) return [];
    const data = await res.json();
    // Ensure minimal safe shape
    return Array.isArray(data)
      ? data.slice(0, limit).map((p) => ({
          id: p.id ?? p.slug ?? Math.random().toString(36).slice(2),
          title: p.title ?? "Untitled",
          slug: p.slug ?? String(p.id ?? ""),
          image: p.image,
          excerpt: p.excerpt,
          author: p.author,
          createdAt: p.createdAt,
        }))
      : [];
  } catch (e) {
    // AbortError or network failure -> graceful fallback
    return [];
  } finally {
    clearTimeout(timeout);
  }
}
