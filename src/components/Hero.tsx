"use client";

import Image from "next/image";
import { 
  Code, 
  MapPin, 
  Mail, 
  Globe, 
  User,
  Briefcase,
  Clock
} from "lucide-react";
import { useState, useEffect } from "react";
import ContricShader from "./ContricShader";
import { SlidingNumber } from "@/components/core/sliding-number";
import { TextLoop } from "@/components/core/text-loop";

const timezones = [
  { code: "IST", timezone: "Asia/Kolkata", offset: "+5:30" },
  { code: "JST", timezone: "Asia/Tokyo", offset: "+9:00" },
  { code: "CST", timezone: "Asia/Shanghai", offset: "+8:00" },
  { code: "EST", timezone: "America/New_York", offset: "-5:00" },
  { code: "PST", timezone: "America/Los_Angeles", offset: "-8:00" },
  { code: "GMT", timezone: "Europe/London", offset: "+0:00" },
  { code: "CET", timezone: "Europe/Paris", offset: "+1:00" },
];

export default function Hero() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const tz = timezones[currentIndex];
      const timeStr = now.toLocaleTimeString("en-US", { 
        hour: "2-digit", 
        minute: "2-digit",
        hour12: false,
        timeZone: tz.timezone 
      });
      const [h, m] = timeStr.split(':').map(Number);
      setHours(h);
      setMinutes(m);
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, [currentIndex]);

  useEffect(() => {
    const rotateTimezone = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % timezones.length);
    }, 3000);
    return () => clearInterval(rotateTimezone);
  }, []);

  const CYTH_BIRTH_YEAR = 2003;
  const age = new Date().getFullYear() - CYTH_BIRTH_YEAR;

  return (
    <div className="w-full border border-border rounded-xl overflow-hidden bg-card shadow-sm">
      {/* Banner Section */}
      <div className="h-48 bg-muted dark:bg-zinc-950 relative flex items-center justify-center overflow-hidden">
        {/* Shader Background */}
        <ContricShader />
        
        {/* Center Logo */}
        <div className="z-10 relative w-40 h-40 opacity-90">
           <Image 
             src="/cythlabs.png" 
             alt="Logo" 
             fill
             className="object-contain invert dark:invert-0"
           />
        </div>
      </div>

      {/* Profile Section */}
      <div className="px-6 pb-6 relative">
        {/* Avatar with Flag */}
        <div className="absolute -top-16 left-6">
          <div className="relative group">
            {/* Flag Badge - Top Left */}
            <div className="absolute -top-2 -left-2 z-20 shadow-md">
               <span className="block w-12 h-8 bg-white rounded-sm overflow-hidden relative border border-border">
                  <span className="flex items-center justify-center w-full h-full text-2xl leading-none">🇮🇳</span>
               </span>
            </div>

            <div className="w-32 h-32 rounded-full border-[6px] border-card overflow-hidden bg-muted shadow-md relative z-10">
              <Image 
                src="/mohneesh.jpg" 
                alt="Mohneesh" 
                fill 
                className="object-cover transition-transform duration-500 group-hover:scale-110" 
              />
            </div>
          </div>
        </div>

        {/* Name and Bio */}
        <div className="pt-20 md:pt-4 md:pl-40 flex flex-col gap-3">
          <div className="flex flex-col md:flex-row md:items-center gap-2">
            <h1 className="text-3xl font-bold text-foreground flex items-center gap-2">
              Mohneesh (Cyth)
            </h1>
            <span className="text-muted-foreground hidden md:inline">•</span>
            <p className="text-muted-foreground font-mono text-sm">
              he/him
            </p>
          </div>
          
          <p className="text-muted-foreground text-base max-w-2xl">
            {age}-year-old <s>wannabe cook</s> software developer. Building innovative web and mobile (eventually) solutions to bring your ideas to life. Whether it's designing sleek user interfaces or implementing robust backend systems, I transform visions into reality (exaggeration).
          </p>
        </div>
      </div>

      {/* Info Grid */}
      <div className="border-t border-border bg-muted/30 p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-8">
          <div className="flex items-center gap-3 text-sm text-muted-foreground hover:text-foreground transition-colors">
            <div className="p-2 bg-background rounded-md border border-border shadow-sm">
              <Code className="w-4 h-4" />
            </div>
            <span>Full Stack Developer</span>
          </div>

          <div className="flex items-center gap-3 text-sm text-muted-foreground hover:text-foreground transition-colors">
            <div className="p-2 bg-background rounded-md border border-border shadow-sm">
              <Briefcase className="w-4 h-4" />
            </div>
            <span>Founder @ Cythical Labs</span>
          </div>

          <div className="flex items-center gap-3 text-sm text-muted-foreground hover:text-foreground transition-colors">
            <div className="p-2 bg-background rounded-md border border-border shadow-sm">
              <MapPin className="w-4 h-4" />
            </div>
            <span>India</span>
          </div>

          <div className="flex items-center gap-3 text-sm text-muted-foreground hover:text-foreground transition-colors">
            <div className="p-2 bg-background rounded-md border border-border shadow-sm">
              <Clock className="w-4 h-4" />
            </div>
            <div className="flex items-center gap-0.5 font-mono tabular-nums">
              <SlidingNumber value={hours} padStart={true} />
              <span>:</span>
              <SlidingNumber value={minutes} padStart={true} />
              <span className="ml-1.5 text-muted-foreground">//</span>
              <TextLoop className="ml-1.5" interval={3}>
                {timezones.map((tz) => (
                  <span key={tz.code}>{tz.code}</span>
                ))}
              </TextLoop>
            </div>
          </div>

          <div className="flex items-center gap-3 text-sm text-muted-foreground hover:text-foreground transition-colors">
            <div className="p-2 bg-background rounded-md border border-border shadow-sm">
              <Mail className="w-4 h-4" />
            </div>
            <a href="mailto:mohneesh@cyth.dev" className="hover:underline">mohneesh@cyth.dev</a>
          </div>

          <div className="flex items-center gap-3 text-sm text-muted-foreground hover:text-foreground transition-colors">
            <div className="p-2 bg-background rounded-md border border-border shadow-sm">
              <Globe className="w-4 h-4" />
            </div>
            <a href="https://cyth.dev" target="_blank" rel="noopener noreferrer" className="hover:underline">cyth.dev</a>
          </div>
        </div>
      </div>
    </div>
  );
}
