import { Card, CardContent, CardTitle } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
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
  // Fallback avatar in case the image is missing
  const avatarFallback =
    "https://ui-avatars.com/api/?name=" + encodeURIComponent(post.author?.name || "U") + "&background=1e293b&color=fff&size=48";

  return (
    <Card className="flex flex-col border border-border/40 bg-background/80 shadow-lg rounded-xl overflow-hidden transition-transform hover:-translate-y-1 hover:shadow-2xl duration-200">
      {post.image && (
        <Link href={`https://blog.cyth.me/blog/${post.id}`}
          className="block bg-muted/50">
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
        <CardTitle className="text-lg font-semibold leading-tight mb-2 break-words whitespace-normal">
          <Link href={`https://blog.cyth.me/blog/${post.id}`} className="hover:underline">
            <span className="whitespace-normal">{post.title}</span>
          </Link>
        </CardTitle>
        {post.excerpt && (
          <p className="text-sm text-muted-foreground line-clamp-3 mb-2">
            {post.excerpt}
          </p>
        )}
        <div className="flex items-center gap-2 mt-auto text-xs text-muted-foreground min-h-[32px]">
          <div className="flex items-center gap-2 min-w-0">
            <Image
              src={post.author?.image ? post.author.image : avatarFallback}
              alt={post.author?.name || "Author"}
              width={24}
              height={24}
              className="rounded-full border aspect-square object-cover bg-muted"
            />
            {post.author?.name && (
              <span className="font-medium truncate max-w-[100px]">{post.author.name}</span>
            )}
          </div>
          <div className="flex-1" />
          {post.createdAt && (
            <Badge variant="secondary" className="whitespace-nowrap px-2 py-1 text-xs font-normal">
              {new Date(post.createdAt).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}
            </Badge>
          )}
        </div>
      </CardContent>
    </Card>
  );
}

export default BlogCard;
