import Link from "next/link";
import ThemeToggle from "./ThemeToggle";
import { useState } from "react";

const navLinks = [
  {
    name: "Home",
    href: "/",
    icon: (
      <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 12l9-9 9 9"/><path d="M9 21V9h6v12"/></svg>
    ),
  },
  {
    name: "Projects",
    href: "/projects",
    icon: (
      <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="13" width="7" height="8"/><rect x="14" y="3" width="7" height="18"/></svg>
    ),
  },
  {
    name: "Blog",
    href: "https://blog.cyth.me",
    icon: (
      <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/><polyline points="17 21 12 16 7 21"/></svg>
    ),
  },
  {
    name: "Contact",
    href: "/contact",
    icon: (
      <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10V7a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v3"/><path d="M21 10v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-7"/><path d="M7 10v4h10v-4"/></svg>
    ),
  },
];

export default function Sidebar() {
  const [open, setOpen] = useState(true);
  return (
    <aside
      className={`fixed top-0 left-0 z-50 h-full w-64 bg-background/90 border-r border-border shadow-lg flex flex-col transition-transform duration-300 ${open ? "translate-x-0" : "-translate-x-full"}`}
      style={{ backdropFilter: "blur(8px)" }}
    >
      {/* Logo and toggle */}
      <div className="flex items-center justify-between h-16 px-6 border-b border-border">
        <Link href="/" className="flex items-center gap-2 font-bold text-lg">
          {/* Replace with your logo as needed */}
          <span className="text-primary">Cythical</span>
          <span className="hidden md:inline text-muted-foreground">Labs</span>
        </Link>
        <button
          className="md:hidden p-2 rounded hover:bg-accent"
          onClick={() => setOpen((o) => !o)}
          aria-label="Toggle sidebar"
        >
          <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 6h16M4 12h16M4 18h16"/></svg>
        </button>
      </div>
      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto py-6">
        <ul className="flex flex-col gap-2 px-4">
          {navLinks.map((nav, id) => (
            <li key={id}>
              <Link
                href={nav.href}
                className="flex items-center gap-4 px-3 py-2 rounded-lg hover:bg-accent transition-colors text-base font-medium"
                target={nav.href.startsWith("http") ? "_blank" : undefined}
                rel={nav.href.startsWith("http") ? "noopener noreferrer" : undefined}
              >
                <span className="text-xl">{nav.icon}</span>
                <span>{nav.name}</span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
      {/* Theme toggle at the bottom */}
      <div className="p-4 border-t border-border">
        <ThemeToggle />
      </div>
    </aside>
  );
}
