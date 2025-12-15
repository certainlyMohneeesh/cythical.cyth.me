"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { Home, BarChart, BookText, Mail } from "lucide-react";
import { motion, LayoutGroup } from "framer-motion";

const navLinks = [
  {
    name: "Home",
    href: "/",
    icon: <Home size={24} strokeWidth={1.7} />,
  },
  {
    name: "Projects",
    href: "/projects",
    icon: <BarChart size={24} strokeWidth={1.7} />,
  },
  {
    name: "Blog",
    href: "/#recent-posts",
    icon: <BookText size={24} strokeWidth={1.7} />,
  },
  {
    name: "Contact",
    href: "/contact",
    icon: <Mail size={24} strokeWidth={1.7} />,
  },
];

export default function Sidebar() {
  const pathname = usePathname();
  const [activeHash, setActiveHash] = useState("");

  useEffect(() => {
    setActiveHash(window.location.hash);
    const handleHashChange = () => setActiveHash(window.location.hash);
    window.addEventListener("hashchange", handleHashChange);
    return () => window.removeEventListener("hashchange", handleHashChange);
  }, []);

  useEffect(() => {
    setActiveHash(window.location.hash);
  }, [pathname]);

  return (
    <>
      {/* Mobile Navigation */}
      <aside
        className={`
          md:hidden
          z-50 bg-background/80 shadow-2xl transition-all duration-300 ease-in-out backdrop-blur-2xl border border-border/50
          fixed
          flex-row left-1/2 bottom-2 -translate-x-1/2 w-[95vw] max-w-xs rounded-xl px-2 py-2
        `}
      >
        <nav className="flex flex-row justify-center py-2 w-full">
          <ul className="flex flex-row gap-2 items-center w-full justify-center">
            {navLinks.map((nav, id) => (
              <li key={id} className="w-full">
                <Link
                  href={nav.href}
                  className="flex items-center justify-center gap-4 px-3 py-3 rounded-xl hover:bg-accent hover:text-accent-foreground transition-all duration-200 text-base font-medium w-full"
                  target={nav.href.startsWith("http") ? "_blank" : undefined}
                  rel={nav.href.startsWith("http") ? "noopener noreferrer" : undefined}
                >
                  <span className="text-xl flex-shrink-0 text-foreground">
                    {nav.icon}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </aside>

      {/* Desktop Navigation */}
      <header className="hidden md:flex fixed top-6 left-1/2 -translate-x-1/2 z-50">
        <nav className="bg-background/60 backdrop-blur-md border border-border/40 rounded-full px-1 py-1 shadow-sm">
          <LayoutGroup>
            <ul className="flex items-center gap-1">
              {navLinks.map((nav) => {
                let isActive = pathname === nav.href;
                
                if (pathname === "/") {
                  if (nav.href === "/") {
                    isActive = activeHash !== "#recent-posts";
                  } else if (nav.href === "/#recent-posts") {
                    isActive = activeHash === "#recent-posts";
                  }
                }
                
                return (
                  <li key={nav.name} className="relative">
                    <Link
                      href={nav.href}
                      onClick={() => {
                        if (nav.href.includes("#")) {
                          setActiveHash(nav.href.substring(nav.href.indexOf("#")));
                        } else {
                          setActiveHash("");
                        }
                      }}
                      className={`
                        relative z-10 px-6 py-2 block text-sm font-medium transition-colors duration-200
                        ${isActive ? "text-foreground" : "text-muted-foreground hover:text-foreground"}
                      `}
                      target={nav.href.startsWith("http") ? "_blank" : undefined}
                      rel={nav.href.startsWith("http") ? "noopener noreferrer" : undefined}
                    >
                      {nav.name}
                      {isActive && (
                        <motion.div
                          layoutId="activeTab"
                          className="absolute inset-x-0 bottom-0 h-[2px] bg-foreground w-1/2 mx-auto"
                          transition={{ type: "spring", stiffness: 300, damping: 30 }}
                          initial={false}
                        />
                      )}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </LayoutGroup>
        </nav>
      </header>
    </>
  );
}
