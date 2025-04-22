"use client";

import { Sun, Moon } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Button } from "./ui/Button";

export default function ThemeToggle() {
  const { setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <Button
      size="icon"
      variant="ghost"
      onClick={() => {
        setTheme(resolvedTheme === "dark" ? "light" : "dark");
      }}
      aria-label="Theme Toggle"
    >
      {resolvedTheme === "dark" ? (
        <Sun className="size-5 text-orange-300" />
      ) : (
        <Moon className="size-5 text-indigo-500" />
      )}
      <span className="sr-only">Theme Toggle</span>
    </Button>
  );
}
