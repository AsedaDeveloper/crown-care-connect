import { Link, Navigate, useParams } from "react-router-dom";
import { ArrowLeft, Clock } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Seo } from "@/components/Seo";
import { posts } from "@/lib/seed-content";

const renderBody = (body: string) =>
  body.split("\n\n").map((para, i) => {
    if (para.startsWith("**") && para.endsWith("**")) {
      return <h3 key={i} className="font-serif text-foreground text-xl mt-6 mb-2">{para.replace(/\*\*/g, "")}</h3>;
    }
    if (para.startsWith("- ")) {
      return (
        <ul key={i} className="list-disc pl-5 space-y-1 my-3 text-muted-foreground">
          {para.split("\n").map((li, j) => <li key={j}>{li.replace(/^- /, "")}</li>)}
        </ul>
      );
    }
    // bold inline replacement
    const parts = para.split(/(\*\*[^*]+\*\*)/g);
    return (
      <p key={i} className="text-muted-foreground leading-relaxed my-3">
        {parts.map((part, j) =>
          part.startsWith("**") ? <strong key={j} className="text-foreground">{part.replace(/\*\*/g, "")}</strong> : part,
        )}
      </p>
    );
  });

const BlogPostPage = () => {
  const { slug } = useParams();
  const post = posts.find((p) => p.slug === slug);
  if (!post) return <Navigate to="/blog" replace />;

  return (
    <div className="min-h-screen">
      <Seo title={`${post.title} — CrownCare`} description={post.excerpt} path={`/blog/${post.slug}`} />
      <Navbar />
      <main className="pt-24 pb-16 container mx-auto px-4 max-w-3xl">
        <Link to="/blog" className="inline-flex items-center gap-2 text-primary hover:underline text-sm mb-4">
          <ArrowLeft size={14} /> All articles
        </Link>
        <p className="text-xs uppercase tracking-wider text-primary mb-2">{post.category}</p>
        <h1 className="text-3xl md:text-5xl font-serif text-foreground mb-3">{post.title}</h1>
        <p className="text-sm text-muted-foreground inline-flex items-center gap-1 mb-8">
          <Clock size={12} /> {post.readMin} min read · {new Date(post.date).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" })}
        </p>
        <article>{renderBody(post.body)}</article>
      </main>
      <Footer />
    </div>
  );
};

export default BlogPostPage;
