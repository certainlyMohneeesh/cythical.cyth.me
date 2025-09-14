import Link from "next/link";

export default function SurprisePage() {
  return (
    <article className="mt-8 flex flex-col gap-16 pb-16">
      <section className="flex flex-col gap-8">
        <h1 className="title text-5xl">Surprise!</h1>
        <p className="text-xl text-muted-foreground">
          Welcome to my little corner of surprises. Here's some stuff I love.
        </p>
      </section>

      {/* Spotify Section */}
      <section className="flex flex-col gap-8">
        <div className="flex flex-col gap-4">
          <h2 className="title text-3xl">Turn on this playlist in your cooking sessions</h2>
          <p className="text-muted-foreground">
            Or may it be your coding - these beats fuel creativity in the kitchen and behind the keyboard. 
            Perfect for when you're crafting code or crafting recipes. Let the rhythm guide your flow, 
            whether you're debugging functions or perfecting flavors.
          </p>
        </div>
        <iframe 
          data-testid="embed-iframe" 
          style={{borderRadius: '12px'}} 
          src="https://open.spotify.com/embed/playlist/5TWsMlMCNgG6zRYikTlzrb?utm_source=generator" 
          width="100%" 
          height="352" 
          frameBorder="0" 
          allowFullScreen 
          allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" 
          loading="lazy"
        />
      </section>

      {/* Recipe Section */}
      <section className="flex flex-col gap-8">
        <div className="flex flex-col gap-4">
          <h2 className="title text-3xl">Paneer Malai Magic</h2>
          <p className="text-muted-foreground">
            Welcome to my secret recipe corner! Today I'm sharing my favorite 
            <strong> Paneer Malai</strong> recipe that's creamy, rich, and absolutely delicious.
            When I'm not coding, I love experimenting in the kitchen - this dish never fails to impress.
          </p>
        </div>
        
        <div className="prose dark:prose-invert max-w-none">
          <h3 className="title text-xl">Ingredients You'll Need</h3>
          <ul>
            <li>500g fresh paneer, cubed</li>
            <li>2 cups fresh cream</li>
            <li>1/2 cup cashews, soaked</li>
            <li>4 green cardamoms</li>
            <li>2 tablespoons butter</li>
            <li>1 teaspoon ginger paste</li>
            <li>Salt to taste</li>
            <li>White pepper powder</li>
          </ul>

          <h3 className="title text-xl">The Magic Process</h3>
          <h4><strong>1. Prep Work</strong></h4>
          <p>
            Start by blending the soaked cashews with cream until smooth. 
            This creates our signature creamy base.
          </p>

          <h4><strong>2. The Main Show</strong></h4>
          <p>
            Heat butter in a pan, add cardamoms, and ginger paste. 
            Once fragrant, add our cashew-cream mixture and let it simmer.
          </p>

          <h4><strong>3. The Grand Finale</strong></h4>
          <p>
            Add paneer cubes, season with salt and white pepper. 
            Cook for 5-7 minutes until the gravy thickens perfectly.
          </p>

          <h3 className="title text-xl">Pro Tips</h3>
          <ul>
            <li>Always use fresh paneer for best results</li>
            <li>Let the cream come to room temperature</li>
            <li>Don't overcook to maintain the white color</li>
          </ul>

          <h3 className="title text-xl">Serving Suggestions</h3>
          <p>
            Serve hot with naan or jeera rice. Garnish with fresh cream and crushed cardamom.
            Perfect for special occasions or when you're craving something luxurious!
          </p>

          <h3 className="title text-xl">Want More Recipes?</h3>
          <p>
            If you enjoyed this recipe or want to share your cooking experience, reach out at{" "}
            <Link href="mailto:certainlymohneesh@gmail.com" className="underline">
              certainlymohneesh@gmail.com
            </Link>{" "}
            or through the{" "}
            <Link href="/contact" className="underline">contact form</Link>. 
            Happy cooking!
          </p>
        </div>
      </section>
    </article>
  );
}
