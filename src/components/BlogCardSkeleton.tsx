export function BlogCardSkeleton() {
  return (
    <div className="flex flex-col border border-border/40 bg-background/80 shadow-lg rounded-xl overflow-hidden">
      {/* Image skeleton */}
      <div className="h-40 w-full bg-muted/50 animate-pulse" />
      
      {/* Content skeleton */}
      <div className="flex flex-col gap-3 p-5">
        {/* Title skeleton */}
        <div className="space-y-2">
          <div className="h-4 bg-muted/50 rounded animate-pulse w-3/4" />
          <div className="h-4 bg-muted/50 rounded animate-pulse w-1/2" />
        </div>
        
        {/* Excerpt skeleton */}
        <div className="space-y-2 mb-2">
          <div className="h-3 bg-muted/30 rounded animate-pulse w-full" />
          <div className="h-3 bg-muted/30 rounded animate-pulse w-4/5" />
          <div className="h-3 bg-muted/30 rounded animate-pulse w-2/3" />
        </div>
        
        {/* Author and date skeleton */}
        <div className="flex items-center gap-2 mt-auto min-h-[32px]">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-muted/50 rounded-full animate-pulse" />
            <div className="h-3 bg-muted/30 rounded animate-pulse w-16" />
          </div>
          <div className="flex-1" />
          <div className="h-5 bg-muted/30 rounded animate-pulse w-12" />
        </div>
      </div>
    </div>
  );
}