import Link from "next/link";
// import ChatToggle from "./ChatToggle";
import ThemeToggle from "./ThemeToggle";

const navLinks = [
  {
    name: "Home",
    href: "/",
  },
  {
    name: "Projects",
    href: "/projects",
  },
  {
    name: "Blog",
    href: "https://blog.cyth.me",
  },
  {
    name: "Contact",
    href: "/contact",
  },
];

export default function Header() {
  return (
    <header className="sticky top-0 z-50 bg-background/75 py-4 md:py-6 backdrop-blur-sm will-change-transform">
      <nav className="flex items-center justify-between px-4 md:px-0">
        <ul className="flex gap-2 text-sm md:text-base md:gap-8">
          {navLinks.map((nav, id) => (
            <li key={id} className="link hover:text-primary transition-colors">
              <Link href={nav.href}>{nav.name}</Link>
            </li>
          ))}
        </ul>
        <div className="flex gap-2 md:gap-4">
          <ThemeToggle />
        </div>
      </nav>
    </header>
  );
}
