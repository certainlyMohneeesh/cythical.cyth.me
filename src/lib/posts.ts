export const revalidate = 3600; // At the top of the file

async function getFeaturedPosts() {
  const response = await fetch('https://blog.cyth.me/api/posts/featured', {
    cache: 'no-store' // For dynamic data
  });
  return response.json();
}