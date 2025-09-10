export const revalidate = 600; // Cache 10m server-side

async function getFeaturedPosts() {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 3000);
  try {
    const response = await fetch('https://blog.cyth.me/api/posts/featured', {
      next: { revalidate: 600 },
      cache: process.env.NODE_ENV === 'development' ? 'no-store' : 'force-cache',
      signal: controller.signal,
    });
    if (!response.ok) return [];
    return response.json();
  } catch {
    return [];
  } finally {
    clearTimeout(timeout);
  }
}