import { Skeleton } from '@/components/ui/skeleton';

export const PageSkeleton = () => (
  <div className="min-h-screen bg-background">
    <div className="h-20 border-b border-border/50" />
    <div className="container mx-auto px-4 py-12 space-y-6">
      <Skeleton className="h-8 w-2/3 mx-auto" />
      <Skeleton className="h-4 w-1/2 mx-auto" />
      <Skeleton className="h-64 w-full rounded-xl" />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Skeleton className="h-40 rounded-xl" />
        <Skeleton className="h-40 rounded-xl" />
        <Skeleton className="h-40 rounded-xl" />
      </div>
    </div>
  </div>
);
