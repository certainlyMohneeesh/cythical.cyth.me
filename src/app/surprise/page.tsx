"use client";

import { useState } from "react";
import Link from "next/link";
import SpotifyPlayer from "@/components/SpotifyPlayer";
import { Button } from "@/components/ui/Button";
import { motion, AnimatePresence } from "framer-motion";
import { Leaf, Drumstick } from "lucide-react";

const recipes = {
  vegetarian: {
    title: "Paneer Malai Magic",
    description:
      "Welcome to my secret recipe corner! Today I'm sharing my favorite Paneer Malai recipe that's creamy, rich, and absolutely delicious. When I'm not coding, I love experimenting in the kitchen - this dish never fails to impress.",
    ingredients: [
      "500g fresh paneer, cubed",
      "2 cups fresh cream",
      "1/2 cup cashews, soaked",
      "4 green cardamoms",
      "2 tablespoons butter",
      "1 teaspoon ginger paste",
      "Salt to taste",
      "White pepper powder",
    ],
    steps: [
      {
        title: "Prep Work",
        description:
          "Start by blending the soaked cashews with cream until smooth. This creates our signature creamy base.",
      },
      {
        title: "The Main Show",
        description:
          "Heat butter in a pan, add cardamoms, and ginger paste. Once fragrant, add our cashew-cream mixture and let it simmer.",
      },
      {
        title: "The Grand Finale",
        description:
          "Add paneer cubes, season with salt and white pepper. Cook for 5-7 minutes until the gravy thickens perfectly.",
      },
    ],
    tips: [
      "Always use fresh paneer for best results",
      "Let the cream come to room temperature",
      "Don't overcook to maintain the white color",
    ],
    serving:
      "Serve hot with naan or jeera rice. Garnish with fresh cream and crushed cardamom. Perfect for special occasions or when you're craving something luxurious!",
  },
  nonVegetarian: {
    title: "Chicken Bhuna Masala",
    description:
      "Get ready for an explosion of flavors! This Chicken Bhuna Masala is my go-to recipe when I want something hearty and spicy. The slow-cooking process creates deep, rich flavors that'll have everyone asking for seconds.",
    ingredients: [
      "750g chicken, cut into pieces",
      "3 large onions, finely chopped",
      "4 tomatoes, pureed",
      "2 tablespoons ginger-garlic paste",
      "3 tablespoons oil or ghee",
      "2 teaspoons red chili powder",
      "1 teaspoon turmeric powder",
      "2 teaspoons coriander powder",
      "1 teaspoon garam masala",
      "Salt to taste",
      "Fresh coriander for garnish",
    ],
    steps: [
      {
        title: "Building the Base",
        description:
          "Heat oil in a heavy-bottomed pan. Add onions and cook until deep golden brown - this is crucial for the bhuna flavor. Add ginger-garlic paste and cook until raw smell disappears.",
      },
      {
        title: "The Bhuna Process",
        description:
          "Add chicken pieces and cook on high heat, stirring constantly. The chicken will release moisture - keep cooking until it's completely absorbed. Add all dry spices and bhuno (roast) until oil separates.",
      },
      {
        title: "Masala Magic",
        description:
          "Add tomato puree and cook until the masala thickens and oil floats on top. Add water as needed for desired consistency. Simmer for 15-20 minutes until chicken is tender.",
      },
      {
        title: "Finishing Touch",
        description:
          "Sprinkle garam masala and cook for 2 more minutes. Garnish with fresh coriander and serve hot.",
      },
    ],
    tips: [
      "Don't rush the bhuna process - patience is key",
      "Use bone-in chicken for more flavor",
      "The masala should be thick, not watery",
      "Adjust spice levels to your preference",
    ],
    serving:
      "Best enjoyed with hot naan, roti, or steamed rice. The thick, clinging gravy is perfect for mopping up with bread. This dish tastes even better the next day!",
  },
};

export default function SurprisePage() {
  const [preference, setPreference] = useState<"vegetarian" | "nonVegetarian" | null>(null);

  const currentRecipe = preference ? recipes[preference] : null;

  return (
    <article className="mt-8 md:mt-32 flex flex-col gap-16 pb-16">
      <AnimatePresence mode="wait">
        {!preference ? (
          <motion.div
            key="selection"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col items-center justify-center min-h-[60vh] gap-8"
          >
            <div className="text-center max-w-2xl">
              <h1 className="title text-5xl mb-4">Surprise!</h1>
              <p className="text-xl text-muted-foreground">
                Before we unveil the surprise, let me know your food preference.
                I've got something special for everyone!
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-6 mt-8">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  onClick={() => setPreference("vegetarian")}
                  size="lg"
                  className="h-32 w-64 flex flex-col gap-3 text-lg"
                  variant="outline"
                >
                  <Leaf className="w-12 h-12 text-green-600" />
                  <span>Vegetarian</span>
                </Button>
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  onClick={() => setPreference("nonVegetarian")}
                  size="lg"
                  className="h-32 w-64 flex flex-col gap-3 text-lg"
                  variant="outline"
                >
                  <Drumstick className="w-12 h-12 text-orange-600" />
                  <span>Non-Vegetarian</span>
                </Button>
              </motion.div>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="content"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col gap-16"
          >
            <section className="flex flex-col gap-8">
              <div className="flex items-center justify-between">
                <h1 className="title text-5xl">Your Surprise Awaits!</h1>
                <Button
                  onClick={() => setPreference(null)}
                  variant="outline"
                  size="sm"
                >
                  Change Preference
                </Button>
              </div>
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
              <SpotifyPlayer playlistId="5TWsMlMCNgG6zRYikTlzrb" height={352} />
            </section>

            {/* Recipe Section */}
            <section className="flex flex-col gap-8">
              <div className="flex flex-col gap-4">
                <h2 className="title text-3xl">{currentRecipe.title}</h2>
                <p className="text-muted-foreground">{currentRecipe.description}</p>
              </div>

              <div className="flex flex-col gap-8">
                <div>
                  <h3 className="title text-2xl mb-4">Ingredients You'll Need</h3>
                  <ul className="space-y-2 text-muted-foreground">
                    {currentRecipe.ingredients.map((ingredient, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <span className="text-foreground">•</span>
                        <span>{ingredient}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h3 className="title text-2xl mb-6">The Magic Process</h3>
                  <div className="space-y-6">
                    {currentRecipe.steps.map((step, index) => (
                      <div key={index} className="space-y-2">
                        <h4 className="text-lg font-semibold text-foreground">
                          {index + 1}. {step.title}
                        </h4>
                        <p className="text-muted-foreground leading-relaxed pl-6">
                          {step.description}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="title text-2xl mb-4">Pro Tips</h3>
                  <ul className="space-y-2 text-muted-foreground">
                    {currentRecipe.tips.map((tip, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <span className="text-foreground">•</span>
                        <span>{tip}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h3 className="title text-2xl mb-4">Serving Suggestions</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {currentRecipe.serving}
                  </p>
                </div>

                <div>
                  <h3 className="title text-2xl mb-4">Want More Recipes?</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    If you enjoyed this recipe or want to share your cooking experience, reach out at{" "}
                    <Link href="mailto:certainlymohneesh@gmail.com" className="underline text-foreground hover:text-primary">
                      certainlymohneesh@gmail.com
                    </Link>{" "}
                    or through the{" "}
                    <Link href="/contact" className="underline text-foreground hover:text-primary">
                      contact form
                    </Link>
                    . Happy cooking!
                  </p>
                </div>
              </div>
            </section>
          </motion.div>
        )}
      </AnimatePresence>
    </article>
  );
}

