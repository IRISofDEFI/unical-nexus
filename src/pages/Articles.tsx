import { Calendar, ChevronRight, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { articlesData as articles } from "@/data/mockArticles";

const Articles = () => {
  const featuredArticles = articles.filter(a => a.featured);
  const otherArticles = articles.filter(a => !a.featured);

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Navigation */}
      <Navbar />

      {/* Hero Section */}
      <section className="bg-primary text-primary-foreground py-16 lg:py-20">
        <div className="container-academic">
          <span className="text-secondary font-semibold text-sm uppercase tracking-wide">
            News & Updates
          </span>
          <h1 className="font-heading text-4xl lg:text-5xl mt-2 mb-4">
            Latest Articles
          </h1>
          <p className="text-primary-foreground/80 text-lg max-w-2xl">
            Stay informed with the latest news, announcements, and updates from 
            the University of Calabar.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <main className="flex-1 py-12 lg:py-16">
        <div className="container-academic">
          
          {/* Featured Articles */}
          <section className="mb-12">
            <h2 className="font-heading text-2xl text-foreground mb-6">
              Featured Stories
            </h2>
            <div className="grid md:grid-cols-2 gap-8">
              {featuredArticles.map((article) => (
                <Link 
                  key={article.id}
                  to={`/articles/${article.id}`}
                  className="group card-academic overflow-hidden hover:shadow-lg transition-shadow"
                >
                  <div className="aspect-video bg-muted relative overflow-hidden">
                    <img 
                      src={article.image} 
                      alt={article.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <span className="absolute top-4 left-4 bg-secondary text-secondary-foreground 
                                     px-3 py-1 rounded text-xs font-medium">
                      {article.category}
                    </span>
                  </div>
                  <div className="p-6">
                    <div className="flex items-center gap-2 text-muted-foreground text-sm mb-3">
                      <Calendar size={14} />
                      {article.date}
                    </div>
                    <h3 className="font-heading text-xl font-semibold text-foreground mb-3 
                                   group-hover:text-secondary transition-colors">
                      {article.title}
                    </h3>
                    <p className="text-muted-foreground text-sm line-clamp-2">
                      {article.excerpt}
                    </p>
                    <span className="inline-flex items-center gap-2 text-secondary font-medium 
                                     text-sm mt-4 group-hover:gap-3 transition-all">
                      Read More
                      <ArrowRight size={16} />
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </section>

          {/* Other Articles */}
          <section>
            <h2 className="font-heading text-2xl text-foreground mb-6">
              More News
            </h2>
            <div className="space-y-4">
              {otherArticles.map((article) => (
                <Link 
                  key={article.id}
                  to={`/articles/${article.id}`}
                  className="group card-academic p-6 flex flex-col md:flex-row gap-6 
                             hover:shadow-lg transition-shadow"
                >
                  <div className="w-full md:w-48 h-32 bg-muted rounded-lg overflow-hidden flex-shrink-0">
                    <img 
                      src={article.image} 
                      alt={article.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="bg-muted text-foreground px-2 py-1 rounded text-xs font-medium">
                        {article.category}
                      </span>
                      <span className="text-muted-foreground text-sm flex items-center gap-1">
                        <Calendar size={12} />
                        {article.date}
                      </span>
                    </div>
                    <h3 className="font-heading text-lg font-semibold text-foreground mb-2 
                                   group-hover:text-secondary transition-colors">
                      {article.title}
                    </h3>
                    <p className="text-muted-foreground text-sm line-clamp-2">
                      {article.excerpt}
                    </p>
                  </div>
                  <div className="flex items-center">
                    <ChevronRight 
                      size={24} 
                      className="text-muted-foreground group-hover:text-secondary transition-colors" 
                    />
                  </div>
                </Link>
              ))}
            </div>
          </section>

        </div>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Articles;
