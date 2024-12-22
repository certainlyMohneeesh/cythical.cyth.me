import Experience from "@/components/Experience";
import LinkWithIcon from "@/components/LinkWithIcon";
import Projects from "@/components/Projects";
import Socials from "@/components/Socials";
import { Button } from "@/components/ui/Button";
import {
  ArrowDownRight,
  ArrowRightIcon,
  FileDown
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import path from "path";
import SurpriseButton from "@/components/ui/SurpriseButton";
import LoaderCube from '@/components/ui/LoaderCube';

const blogDirectory = path.join(process.cwd(), "content");
const CYTH_BIRTH_YEAR = 2003;
const LIMIT = 2; // max show 2

export default async function Home() {
  return (
    <article className="mt-8 flex flex-col gap-16 pb-16">
      <section className="flex flex-col items-start gap-8 md:flex-row-reverse md:items-center md:justify-between">
        <Image
          className="rounded-lg"
          src="/mohneesh.jpg"
          alt="Photo of Cyth"
          width={175}
          height={175}
          priority
          loading="eager"
          decoding="async"
        />
        <div className="flex flex-col">
          <h1 className="title text-5xl">Hi, Mohneesh here (you can also call me Cyth)</h1>
          <p className="mt-4 font-light">
            {/* Update my age */}
            {new Date().getFullYear() - CYTH_BIRTH_YEAR}
            -year-old <s>wannabe cook</s> software developer from India 🇮🇳
          </p>
          <p className="mt-2 font-light">
          Building innovative web and mobile (eventually) solutions to bring your ideas to life. 
          Whether it's designing sleek user interfaces or implementing robust backend systems, 
          I transform visions into reality (exaggeration).
          </p>
          {/* <div className="mt-4 flex items-end gap-1">
            <p className="font-semibold">Ask the chatbot anything about me</p>
            <ArrowDownRight className="size-5 animate-bounce" />
          </div> */}
          <section className="mt-8 flex items-center gap-8">
            <Link href="/Mohneesh.pdf" target="_blank">
              <Button variant="outline">
                <span className="font-semibold">Resume</span>
                <FileDown className="ml-2 size-5" />
              </Button>
            </Link>
            <Socials />
          </section>
        </div>
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

      <section className="flex flex-col gap-8">
        <div className="flex justify-between">
          <h2 className="title text-3xl">Recent posts</h2>
          <LinkWithIcon
            href="https://blog.cyth.me"
            position="right"
            icon={<ArrowRightIcon className="size-5" />}
            text="view more"
          />
        </div>

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

      </section>
    </article>
  );
}
