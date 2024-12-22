import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Providers from "@/components/Providers";
import { cn } from "@/lib/utils";
import type { Metadata } from "next";
import { Inika, Inter } from "next/font/google";
import "./globals.css";
import TrailingCurves from "@/components/TrailingCurves";

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
    <html lang="en" className="scroll-smooth">
      <body
        className={cn(
          "mx-auto flex min-h-screen max-w-3xl flex-col px-8 font-sans antialiased",
          inter.variable,
          inika.variable,
        )}
      >
      <TrailingCurves />
        <Providers>
          <Header />
          <main className="grow">{children}</main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
