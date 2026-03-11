import { Calendar, ArrowLeft, Share2, Printer } from "lucide-react";
import { Link, useParams } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { articlesData } from "@/data/mockArticles";

const ArticleDetail = () => {
  const { id } = useParams<{ id: string }>();
  const article = id ? articlesData.find(a => a.id === id) : null;

  if (!article) {
    return (
      <div className="min-h-screen bg-background flex flex-col">
        <Navbar />
        <main className="flex-1 flex items-center justify-center py-20">
          <div className="text-center">
            <h1 className="font-heading text-3xl text-foreground mb-4">
              Article Not Found
            </h1>
            <p className="text-muted-foreground mb-6">
              The article you're looking for doesn't exist.
            </p>
            <Link to="/articles" className="btn-primary">
              Back to Articles
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Navigation */}
      <Navbar />

      {/* Article Header */}
      <section className="bg-primary text-primary-foreground py-12 lg:py-16">
        <div className="container-academic">
          <Link 
            to="/articles"
            className="inline-flex items-center gap-2 text-primary-foreground/70 
                       hover:text-primary-foreground mb-6 transition-colors"
          >
            <ArrowLeft size={18} />
            Back to Articles
          </Link>
          <span className="block text-secondary font-semibold text-sm uppercase tracking-wide mb-3">
            {article.category}
          </span>
          <h1 className="font-heading text-3xl lg:text-4xl mb-4 max-w-4xl">
            {article.title}
          </h1>
          <div className="flex items-center gap-2 text-primary-foreground/70">
            <Calendar size={16} />
            {article.date}
          </div>
        </div>
      </section>

      {/* Article Content */}
      <main className="flex-1 py-12 lg:py-16">
        <div className="container-academic">
          <div className="grid lg:grid-cols-4 gap-12">
            
            {/* Main Content */}
            <article className="lg:col-span-3">
              <div 
                className="prose prose-lg max-w-none text-foreground
                           prose-headings:font-heading prose-headings:text-foreground
                           prose-p:text-muted-foreground prose-p:leading-relaxed
                           prose-li:text-muted-foreground
                           prose-a:text-secondary prose-a:no-underline hover:prose-a:underline"
                dangerouslySetInnerHTML={{ __html: article.content }}
              />
            </article>

            {/* Sidebar */}
            <aside className="lg:col-span-1">
              {/* Share Actions */}
              <div className="card-academic p-6 mb-6">
                <h3 className="font-heading text-lg font-semibold text-foreground mb-4">
                  Share Article
                </h3>
                <div className="flex gap-3">
                  <button className="flex-1 flex items-center justify-center gap-2 
                                     bg-muted hover:bg-muted/80 text-foreground 
                                     py-2 px-4 rounded transition-colors">
                    <Share2 size={16} />
                    Share
                  </button>
                  <button 
                    onClick={() => window.print()}
                    className="flex items-center justify-center gap-2 
                               bg-muted hover:bg-muted/80 text-foreground 
                               py-2 px-4 rounded transition-colors"
                  >
                    <Printer size={16} />
                  </button>
                </div>
              </div>

              {/* Related Articles */}
              <div className="card-academic p-6">
                <h3 className="font-heading text-lg font-semibold text-foreground mb-4">
                  Related Articles
                </h3>
                <div className="space-y-4">
                  {articlesData
                    .filter((a) => a.id !== id)
                    .slice(0, 3)
                    .map((a) => (
                      <Link 
                        key={a.id}
                        to={`/articles/${a.id}`}
                        className="block group"
                      >
                        <p className="text-sm font-medium text-foreground 
                                     group-hover:text-secondary transition-colors">
                          {a.title}
                        </p>
                        <p className="text-xs text-muted-foreground mt-1">
                          {a.date}
                        </p>
                      </Link>
                    ))}
                </div>
              </div>
            </aside>
          </div>
        </div>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default ArticleDetail;
