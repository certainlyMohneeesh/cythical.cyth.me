"use client";

// import { ChatProvider } from "@/contexts/ChatContext";
// import { ThemeProvider, useTheme } from "next-themes";
import React from "react";
import { Toaster } from "sonner";
// import Chat from "./Chat";

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <>
      {children}
    </>
  );
}

function ToastProvider() {
  return (
    <Toaster className="mt-12" position="top-right" />
  );
}
