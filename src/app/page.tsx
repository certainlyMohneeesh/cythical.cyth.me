import nextDynamic from "next/dynamic";
import LinkWithIcon from "@/components/LinkWithIcon";
import Socials from "@/components/Socials"; // simple component, render directly on server
import Hero from "@/components/Hero";
// Dynamic chunks to shrink initial graph (server-rendered with skeletons)
const Experience = nextDynamic(() => import("@/components/Experience"), { loading: () => <div className="h-40 w-full animate-pulse rounded-md bg-muted/20" /> });
const Projects = nextDynamic(() => import("@/components/Projects"), { loading: () => <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">{Array.from({length:2}).map((_,i)=><div key={i} className="h-40 rounded-lg bg-muted/20 animate-pulse" />)}</div> });
import { Button } from "@/components/ui/Button";
import {
  ArrowDownRight,
  ArrowRightIcon,
  FileDown
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
// Removed unused heavy path usage; keep build lean
import SurpriseButton from "@/components/ui/SurpriseButton";
import LoaderCube from '@/components/ui/LoaderCube';
import BlogCard from "@/components/BlogCard";
import { BlogCardSkeleton } from "@/components/BlogCardSkeleton";
import { fetchRecentBlogPosts } from "./lib/fetchRecentBlogPosts";
import { Suspense } from "react";

const CYTH_BIRTH_YEAR = 2003;
const LIMIT = 4; // max show 2

async function RecentPosts() {
  try {
    const recentPosts = await fetchRecentBlogPosts(3);
    
    if (recentPosts.length === 0) {
      return (
        <div className="flex flex-col items-center justify-center p-8 text-center">
          <p className="text-muted-foreground">
            Blog posts are temporarily unavailable.
          </p>
          <p className="text-sm text-muted-foreground mt-2">
            Visit{" "}
            <a 
              href="https://blog.cyth.me" 
              target="_blank" 
              rel="noopener noreferrer"
              className="underline hover:text-foreground"
            >
              blog.cyth.me
            </a>{" "}
            directly for the latest posts.
          </p>
        </div>
      );
    }
    
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {recentPosts.map((post) => (
          <BlogCard key={post.id} post={post} />
        ))}
      </div>
    );
  } catch (error) {
    console.error('Error in RecentPosts component:', error);
    return (
      <div className="flex flex-col items-center justify-center p-8 text-center">
        <p className="text-muted-foreground">
          Unable to load recent blog posts.
        </p>
        <p className="text-sm text-muted-foreground mt-2">
          Please try refreshing the page or visit{" "}
          <a 
            href="https://blog.cyth.me" 
            target="_blank" 
            rel="noopener noreferrer"
            className="underline hover:text-foreground"
          >
            blog.cyth.me
          </a>
        </p>
      </div>
    );
  }
}

export default async function Home() {
  return (
    <article className="mt-8 md:mt-32 flex flex-col gap-16 pb-16">
      <Hero />
      
      <section className="flex items-center justify-end gap-4 -mt-8">
        <Link href="/Mohneesh_resume.pdf" target="_blank">
          <Button variant="outline">
            <span className="font-semibold">Resume</span>
            <FileDown className="ml-2 size-5" />
          </Button>
        </Link>
        <Socials />
      </section>

      <Experience />

      <section className="flex flex-col gap-8">
        <div className="flex justify-between">
          <h2 className="title text-2xl sm:text-3xl">Featured projects</h2>
          <LinkWithIcon
            href="/projects"
            position="right"
            icon={<ArrowRightIcon className="size-5" />}
            text="view more"
          />
        </div>
        <Projects limit={LIMIT} />
      </section>

      <section id="recent-posts" className="flex flex-col gap-8">
        <div className="flex justify-between">
          <h2 className="title text-3xl">Recent posts</h2>
          <LinkWithIcon
            href="https://blog.cyth.dev"
            position="right"
            icon={<ArrowRightIcon className="size-5" />}
            text="view more"
          />
        </div>
        <Suspense
          fallback={
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {Array.from({ length: 3 }).map((_, i) => (
                <BlogCardSkeleton key={i} />
              ))}
            </div>
          }
        >
          {/* Server component streaming */}
          <RecentPosts />
        </Suspense>
      </section>

      <section>
        <div className="fixed bottom-8 left-8">
            <LoaderCube />
            </div>
        </section>

            <section>
            <div className="flex flex-col gap-8">
                <h2 className="title text-3xl">
                Congrats! you've scrolled to the bottom. There's a surprise waiting for you.
                </h2>
                <div className="flex justify-center">
                <SurpriseButton />
                </div>
            </div>
            </section>

    </article>
  );
}
