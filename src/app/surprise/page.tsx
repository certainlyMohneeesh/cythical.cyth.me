import Link from "next/link";

const lastUpdated = "Feb 2024";

export default function page() {
  return (
    <article className="prose mt-8 pb-16 dark:prose-invert">
      <div className="space-y-4">
        <h1 className="title text-5xl">Paneer Malai Magic</h1>
        <p>Last Updated: {lastUpdated}</p>
      </div>
      <div className="space-y-4">
        <h2 className="title text-3xl">Hey, Food Enthusiast!</h2>
        <p>
          Welcome to my secret recipe corner! Today I'm sharing my favorite 
          <b> Paneer Malai</b> recipe that's creamy, rich, and absolutely delicious.
        </p>

        <h2 className="title">Ingredients You'll Need</h2>
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

        <h2 className="title">The Magic Process</h2>
        <h3>1. Prep Work</h3>
        <p>
          Start by blending the soaked cashews with cream until smooth. 
          This creates our signature creamy base.
        </p>

        <h3>2. The Main Show</h3>
        <p>
          Heat butter in a pan, add cardamoms, and ginger paste. 
          Once fragrant, add our cashew-cream mixture and let it simmer.
        </p>

        <h3>3. The Grand Finale</h3>
        <p>
          Add paneer cubes, season with salt and white pepper. 
          Cook for 5-7 minutes until the gravy thickens perfectly.
        </p>

        <h2 className="title">Pro Tips</h2>
        <ul>
          <li>Always use fresh paneer for best results</li>
          <li>Let the cream come to room temperature</li>
          <li>Don't overcook to maintain the white color</li>
        </ul>

        <h2 className="title">Serving Suggestions</h2>
        <p>
          Serve hot with naan or jeera rice. Garnish with fresh cream and crushed cardamom.
          Perfect for special occasions or when you're craving something luxurious!
        </p>

        <h2 className="title">Want More Recipes?</h2>
        <p>
          If you enjoyed this recipe or want to share your cooking experience, reach out at{" "}
          <Link href="mailto:certainlymohneesh@gmail.com">certainlymohneesh@gmail.com</Link> or through the{" "}
          <Link href="/contact">contact form</Link>. Happy cooking!
        </p>
      </div>
    </article>
  );
}
