import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
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
    <Card className="flex flex-col">
      <CardHeader>
        {post.image && (
          <Link href={`https://blog.cyth.me/post/${post.slug}`}>
            <Image
              src={post.image}
              alt={post.title}
              width={500}
              height={300}
              className="h-40 w-full object-cover object-top"
            />
          </Link>
        )}
      </CardHeader>
      <CardContent className="flex flex-col gap-2">
        <CardTitle>
          <Link href={`https://blog.cyth.me/post/${post.slug}`}>{post.title}</Link>
        </CardTitle>
        {post.excerpt && (
          <p className="prose max-w-full text-pretty font-sans text-xs text-muted-foreground dark:prose-invert">
            {post.excerpt}
          </p>
        )}
        <div className="flex items-center gap-2 mt-2 text-xs text-muted-foreground">
          {post.author?.image && (
            <Image
              src={post.author.image}
              alt={post.author.name || "Author"}
              width={20}
              height={20}
              className="rounded-full"
            />
          )}
          {post.author?.name && <span>{post.author.name}</span>}
          {post.createdAt && (
            <span>• {new Date(post.createdAt).toLocaleDateString()}</span>
          )}
        </div>
      </CardContent>
    </Card>
  );
}

export default BlogCard;
