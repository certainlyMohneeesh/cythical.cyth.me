export default function Head() {
  return (
    <>
      {/* Speed up first connection to external services used on initial view */}
      <link rel="preconnect" href="https://blog.cyth.me" crossOrigin="" />
      <link rel="dns-prefetch" href="https://blog.cyth.me" />

      <link rel="preconnect" href="https://lh3.googleusercontent.com" crossOrigin="" />
      <link rel="dns-prefetch" href="https://lh3.googleusercontent.com" />

      <link rel="preconnect" href="https://ui-avatars.com" crossOrigin="" />
      <link rel="dns-prefetch" href="https://ui-avatars.com" />
  {/* Prefetch commonly accessed assets */}
  <link rel="prefetch" as="image" href="/mohneesh.jpg" />
  <link rel="prefetch" as="document" href="/Mohneesh_resume.pdf" />
    </>
  );
}
