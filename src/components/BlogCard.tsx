import { Card, CardContent, CardTitle } from "@/components/ui/Card";
import Image from "next/image";
import Link from "next/link";

interface BlogCardProps {
  post: {
    id: string | number;
    title: string;
    slug: string;
    image?: string;
    excerpt?: string;
    author?: {
      name?: string;
      image?: string;
    };
    createdAt?: string;
  };
}

export function BlogCard({ post }: BlogCardProps) {
  return (
    <Card className="flex flex-col border border-border/40 bg-background/80 shadow-lg rounded-xl overflow-hidden transition-transform hover:-translate-y-1 hover:shadow-2xl duration-200">
      {post.image && (
        <Link href={`https://blog.cyth.me/blog/${post.id}`}>
          <Image
            src={post.image}
            alt={post.title}
            width={500}
            height={300}
            className="h-40 w-full object-cover object-top"
            priority
          />
        </Link>
      )}
      <CardContent className="flex flex-col gap-3 p-5">
        <CardTitle className="text-lg font-semibold leading-tight mb-2 line-clamp-2">
          <Link href={`https://blog.cyth.me/blog/${post.id}`} className="hover:underline">
            {post.title}
          </Link>
        </CardTitle>
        {post.excerpt && (
          <p className="text-sm text-muted-foreground line-clamp-3 mb-2">
            {post.excerpt}
          </p>
        )}
        <div className="flex items-center gap-2 mt-auto text-xs text-muted-foreground">
          {post.author?.image && (
            <Image
              src={post.author.image}
              alt={post.author.name || "Author"}
              width={20}
              height={20}
              className="rounded-full border"
            />
          )}
          {post.author?.name && (
            <span className="font-medium mr-1">{post.author.name}</span>
          )}
          {post.createdAt && (
            <span className="ml-auto whitespace-nowrap opacity-80">
              {new Date(post.createdAt).toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' })}
            </span>
          )}
        </div>
      </CardContent>
    </Card>
  );
}

export default BlogCard;
