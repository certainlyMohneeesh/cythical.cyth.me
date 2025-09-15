'use client';

import { ArrowLeftIcon } from "@radix-ui/react-icons";
import LinkWithIcon from "../components/LinkWithIcon";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <article className="mt-8 flex flex-col gap-8 pb-16">
      <div className="min-h-full px-4 sm:px-6 sm:py-24 md:grid md:place-items-center lg:px-8">
        <div className="mx-auto max-w-max">
          <section className="sm:flex">
            <p className="title text-muted-foreground">500</p>
            <div className="sm:ml-6">
              <div className="sm:border-l sm:border-gray-200 sm:pl-6">
                <h1 className="title sm:text-5xl">
                  something went wrong <i>lah</i>...
                </h1>
                <p className="mt-1 text-base text-muted-foreground">
                  The page encountered an error. Please try again <i>lor</i>.
                </p>
              </div>
              <div className="mt-10 flex space-x-3 sm:border-l sm:border-transparent sm:pl-6">
                <button
                  onClick={reset}
                  className="px-4 py-2 bg-primary text-primary-foreground rounded hover:bg-primary/90 transition-colors mr-4"
                >
                  Try again
                </button>
                <LinkWithIcon
                  href="/"
                  text="back to home"
                  icon={<ArrowLeftIcon className="size-5" />}
                  position="left"
                />
              </div>
            </div>
          </section>
        </div>
      </div>
    </article>
  );
}