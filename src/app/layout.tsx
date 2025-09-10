import Footer from "@/components/Footer";
import Sidebar from "@/components/Sidebar";
import { cn } from "@/lib/utils";
import type { Metadata } from "next";
import { Inika, Inter } from "next/font/google";
// import Image from "next/image";
import Link from "next/link";
import "./globals.css";
// import TrailingCurves from "@/components/TrailingCurves";
import ThemeToggle from "@/components/ThemeToggle";
import { ThemeProvider } from "next-themes";
import ContricReaction from "@/components/ContricReaction";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });
const inika = Inika({
  subsets: ["latin"],
  variable: "--font-serif",
  weight: ["400"],
});

export const metadata: Metadata = {
  title: "Cythical Labs",
  description: "My personal site to present my work with everybody",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        suppressHydrationWarning
        className={cn(
          "relative flex min-h-screen flex-col font-sans antialiased bg-background px-4 md:px-8 mx-auto max-w-4xl",
          inter.variable,
          inika.variable,
        )}
      >
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          {/* Mobile: Logo top-left, ThemeToggle top-right */}
          <div className="flex w-full items-center justify-between fixed top-4 left-0 z-50 px-4 md:hidden">
            <Link href="/" className="flex items-center gap-2 font-bold text-lg">
              {/* <Image src="/logo.png" alt="Logo" width={32} height={32} /> */}
            </Link>
            <ThemeToggle />
          </div>
          {/* Tablet: Logo top-left, ThemeToggle top-right, slightly larger spacing */}
          <div className="hidden md:flex lg:hidden w-full items-center justify-between fixed top-6 left-0 z-50 px-8">
            <Link href="/" className="flex items-center gap-2 font-bold text-xl">
              {/* <Image src="/logo.png" alt="Logo" width={38} height={38} /> */}
            </Link>
            <ThemeToggle />
          </div>
          {/* Desktop: Logo + ThemeToggle fixed left column */}
          <div className="fixed left-0 top-6 z-50 flex-col items-center gap-4 w-full px-4 lg:w-56 lg:px-0 hidden lg:flex">
            <Link href="/" className="flex items-center gap-2 font-bold text-lg">
              {/* <Image src="/logo.png" alt="Logo" width={32} height={32} /> */}
            </Link>
            <ThemeToggle />
          </div>
          {/* <TrailingCurves /> */}
                <ContricReaction 
                  circleCount={5}
                  maxSize={50}
                  color="rgba(255, 255, 255, 1)"
                  rotationSpeed={500}
                  enablePulse={true}
                />
          <div className="flex flex-1 flex-row w-full">
            <Sidebar />
            <main className="grow flex flex-col items-center justify-center w-full">{children}</main>
          </div>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
