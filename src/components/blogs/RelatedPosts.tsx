import { BlogCard } from "./BlogCard";
import type { BlogPost } from "@/data/blogs";

export const RelatedPosts = ({ posts }: { posts: BlogPost[] }) => (
  <div>
    <h2 className="text-display-4 font-display">More articles</h2>
    <div className="mt-10 grid gap-8 md:grid-cols-3">
      {posts.map((p, i) => (
        <BlogCard key={p.slug} post={p} index={i} />
      ))}
    </div>
  </div>
);
