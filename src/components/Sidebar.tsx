"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Home, BarChart, BookText, Mail } from "lucide-react";

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
    href: "https://blog.cyth.me",
    icon: <BookText size={24} strokeWidth={1.7} />,
  },
  {
    name: "Contact",
    href: "/contact",
    icon: <Mail size={24} strokeWidth={1.7} />,
  },
];

export default function Sidebar() {
  return (
    <aside
      className={`
        z-50 bg-[rgba(20,20,30,0.55)] shadow-2xl transition-all duration-300 ease-in-out backdrop-blur-2xl
        fixed
        flex-row left-1/2 bottom-2 -translate-x-1/2 w-[95vw] max-w-xs rounded-xl px-2 py-2
        md:flex md:flex-col md:left-4 md:top-auto md:bottom-4 md:-translate-x-0 md:-translate-y-0 md:w-20 md:max-w-[4.5rem] md:rounded-2xl md:px-0 md:py-2
        lg:left-0 lg:top-1/2 lg:bottom-auto lg:-translate-x-0 lg:-translate-y-1/2 lg:w-16 lg:hover:w-56 lg:max-w-none lg:rounded-2xl lg:px-0 lg:py-0
      `}
    >
      <nav className="flex flex-row md:flex-col justify-center py-2 md:py-4 w-full">
        <ul className="flex flex-row md:flex-col gap-2 items-center w-full justify-center">
          {navLinks.map((nav, id) => (
            <li key={id} className="w-full">
              <Link
                href={nav.href}
                className="flex items-center justify-center md:justify-start gap-4 px-3 py-3 rounded-xl hover:bg-accent/40 transition-all duration-200 text-base font-medium group/sidebar-item w-full"
                target={nav.href.startsWith("http") ? "_blank" : undefined}
                rel={nav.href.startsWith("http") ? "noopener noreferrer" : undefined}
              >
                <span className="text-xl flex-shrink-0 transition-transform duration-200 group-hover/sidebar-item:scale-110 text-white">
                  {nav.icon}
                </span>
                <span className="whitespace-nowrap opacity-0 group-hover/sidebar-item:opacity-100 group-hover/sidebar-item:ml-2 transition-all duration-300 hidden md:inline-block text-white">
                  {nav.name}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
}
