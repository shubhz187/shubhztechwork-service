import { motion } from "framer-motion";
import { Clock } from "lucide-react";
import { Link } from "react-router-dom";
import type { BlogPost } from "@/data/blogs";
import { ArrowUpRight } from "@/components/awake/decorative/OrbitStars";

const tints = [
  "bg-violet/15",
  "bg-orange/25",
  "bg-green/20",
  "bg-pink/20",
  "bg-purple/20",
  "bg-yellow/30",
];

interface Props { post: BlogPost; index: number; }

export const BlogCard = ({ post, index }: Props) => (
  <motion.article
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-80px" }}
    transition={{ duration: 0.7, delay: (index % 3) * 0.1, ease: [0.22, 1, 0.36, 1] }}
  >
    <Link to={`/blogs/${post.slug}`} className="group block">
      <div className={`aspect-[4/3] relative overflow-hidden rounded-[28px] ${tints[index % tints.length]}`}>
        <div className="absolute inset-0 flex items-center justify-center p-8">
          <span className="font-serif text-5xl md:text-6xl italic text-foreground/40 text-center leading-[1.05] line-clamp-4">
            {post.title}
          </span>
        </div>
        <div className="absolute top-5 left-5">
          <span className="pill !bg-card !text-foreground">{post.tag}</span>
        </div>
        <div className="absolute bottom-5 right-5 opacity-0 translate-y-2 transition-all duration-500 group-hover:opacity-100 group-hover:translate-y-0">
          <span className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-foreground text-background">
            <ArrowUpRight size={16} />
          </span>
        </div>
      </div>
      <div className="mt-5 flex items-center justify-between text-sm text-foreground/60">
        <span className="flex items-center gap-2">
          <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-foreground/10 text-xs font-semibold text-foreground">
            {post.author.initials}
          </span>
          {post.author.name}
        </span>
        <span className="flex items-center gap-1.5">
          <Clock className="h-3.5 w-3.5" />
          {post.readTime}
        </span>
      </div>
      <h3 className="mt-3 text-xl md:text-2xl font-display leading-[1.15] transition-colors group-hover:text-foreground/80 line-clamp-3">
        {post.title}
      </h3>
    </Link>
  </motion.article>
);
