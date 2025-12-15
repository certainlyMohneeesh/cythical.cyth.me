import Link from "next/link";

const lastUpdated = "Sep 2024";

export default function page() {
  return (
    <article className="prose mt-8 md:mt-32 pb-16 dark:prose-invert">
      <div className="space-y-4">
        <h1 className="title text-5xl">Privacy Policy 🔒</h1>
        <p>Last refreshed: {lastUpdated}</p>
      </div>
      <div className="space-y-4">
        <h2 className="title text-3xl">👋 Hey there, Internet Friend!</h2>
        <p>
          Welcome to the least exciting (but still important) page on my site! This <b>Privacy Policy</b> is 
          like the terms and conditions that people actually read. My website is my digital playground for 
          showing off my work, and I'm a privacy enthusiast (aka: not creepy).
        </p>
        <h2 className="title">🤔 What I Know About You (Plot Twist: Almost Nothing)</h2>
        <p>
          Real talk - this is just my humble portfolio hanging out on the internet. No sneaky tracking, 
          no cookie monsters, no data hoarding. It's as vanilla as it gets!
        </p>
        <h3>📧 Contact Stuff</h3>
        <p>
          If you decide to drop me a line via email or the contact form, whatever you share is your call.
          I'll only use it to chat back - pinky promise! Think of it like passing notes in class, but more professional.
        </p>
        <h2 className="title">🎯 What Happens to Your Info</h2>
        <p>Here's the scoop on what I do with any bits of info that come my way:</p>
        <ul>
          <li>Keep the website running smooth like butter 🧈</li>
          <li>Make improvements based on your awesome feedback</li>
          <li>Write you back when you reach out</li>
        </ul>
        <h2 className="title">🤝 Sharing Policy (Spoiler Alert: Nope!)</h2>
        <p>
          Your info is like my secret recipe - I don't share it with anyone! Accidentally shared something you shouldn't have? 
          No worries, just give me a shout and we'll take care of it faster than you can say "privacy matters".
        </p>
        <h2 className="title">🔐 Security (Keeping It Real)</h2>
        <p>
          While I treat your info like my grandmother's precious china, the internet isn't perfect. 
          I've got reasonable security measures in place, but let's keep any top-secret stuff for in-person chats, deal?
        </p>
        <h2 className="title">📝 Policy Updates (The Change Log)</h2>
        <p>
          This policy was last spruced up on <b>{lastUpdated}</b>. If anything changes, I'll update it here - 
          no ninja edits, promise! Feel free to check back, but don't lose sleep over it.
        </p>
        <h2 className="title">💭 Questions? Comments? Dad jokes?</h2>
        <p>
          Got something on your mind? Want to share a cool story? Just want to say hi? I'm all ears! 
          Shoot me an email at{" "}
          <Link href="mailto:certainlymohneesh@gmail.com">certainlymohneesh@gmail.com</Link> or use
          the <Link href="/contact">contact form</Link>. Let's chat! 
        </p>
      </div>
    </article>
  );
}
