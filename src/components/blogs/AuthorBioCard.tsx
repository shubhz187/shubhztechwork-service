import type { BlogAuthor } from "@/data/blogs";

export const AuthorBioCard = ({ author }: { author: BlogAuthor }) => (
  <div className="rounded-[28px] border border-foreground/10 bg-card p-8 flex items-start gap-5">
    <span className="inline-flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-violet/20 text-foreground font-semibold text-lg">
      {author.initials}
    </span>
    <div>
      <p className="font-display text-lg">{author.name}</p>
      <p className="serif-italic text-violet text-lg">{author.role}</p>
      <p className="mt-3 text-foreground/70 leading-relaxed text-[15px]">{author.bio}</p>
    </div>
  </div>
);
