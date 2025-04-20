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
  const res = await fetch(`https://blog.cyth.me/api/posts?limit=${limit}`, { cache: "no-store" });
  if (!res.ok) return [];
  return res.json();
}
