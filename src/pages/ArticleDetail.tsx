import { Calendar, ArrowLeft, Share2, Printer } from "lucide-react";
import { Link, useParams } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

/**
 * Article Detail Page
 * Displays full article content
 * Features: Article title, date, content, related articles
 */

// Mock articles data (same as Articles.tsx for consistency)
const articlesData: Record<string, {
  title: string;
  excerpt: string;
  date: string;
  category: string;
  content: string;
}> = {
  "2026-admission-portal": {
    title: "2026 Admission Portal Now Open",
    excerpt: "The University of Calabar is pleased to announce that the 2026/2027 admission portal is now open for prospective students.",
    date: "January 15, 2025",
    category: "Admissions",
    content: `
      <p>The University of Calabar is pleased to announce that the 2026/2027 admission portal is now open for prospective students. Applications are invited for various undergraduate and postgraduate programmes across all faculties.</p>
      
      <h2>How to Apply</h2>
      <p>Prospective students are advised to visit the official UNICAL admission portal at admissions.unical.edu.ng to begin their application process. The application fee is ₦2,500 for undergraduate programmes and ₦5,000 for postgraduate programmes.</p>
      
      <h2>Requirements</h2>
      <p>Applicants must have completed the JAMB UTME examination with a minimum score of 180. Additionally, candidates must possess at least five O'Level credits including English Language and Mathematics.</p>
      
      <h2>Important Dates</h2>
      <ul>
        <li>Portal Opening: January 15, 2025</li>
        <li>Application Deadline: March 31, 2025</li>
        <li>Screening Exercise: April 15-30, 2025</li>
        <li>Admission List Release: May 15, 2025</li>
      </ul>
      
      <p>For more information, contact the Admissions Office at admissions@unical.edu.ng or call +234 801 234 5678.</p>
    `,
  },
  "unical-ranked-top-10": {
    title: "UNICAL Ranked Top 10 Universities in Nigeria",
    excerpt: "The University of Calabar has been ranked among the top 10 universities in Nigeria by the National Universities Commission.",
    date: "January 10, 2025",
    category: "Rankings",
    content: `
      <p>The University of Calabar has been ranked among the top 10 universities in Nigeria by the National Universities Commission (NUC) in their latest annual assessment report. This achievement reflects the university's commitment to academic excellence and research innovation.</p>
      
      <h2>Key Achievements</h2>
      <p>The ranking was based on several key performance indicators including teaching quality, research output, international collaboration, and student satisfaction. UNICAL scored particularly high in research publications and community engagement.</p>
      
      <h2>Vice Chancellor's Statement</h2>
      <p>"This ranking is a testament to the hard work of our faculty, staff, and students. We remain committed to our motto 'Knowledge for Service' and will continue to strive for excellence in all areas," said the Vice Chancellor.</p>
      
      <h2>Future Goals</h2>
      <p>The university administration has outlined plans to further improve the institution's ranking by investing in research facilities, increasing international partnerships, and enhancing student welfare services.</p>
    `,
  },
  "new-faculty-computing": {
    title: "New Faculty of Computing Launched",
    excerpt: "The University of Calabar has established a new Faculty of Computing to meet the growing demand for technology professionals.",
    date: "January 5, 2025",
    category: "Academics",
    content: `
      <p>In a groundbreaking development, the University of Calabar has established a new Faculty of Computing to meet the growing demand for technology professionals in Nigeria. The faculty was officially inaugurated by the Honorable Minister of Education.</p>
      
      <h2>New Programmes</h2>
      <p>The Faculty of Computing will offer degree programmes in:</p>
      <ul>
        <li>Computer Science</li>
        <li>Software Engineering</li>
        <li>Cybersecurity</li>
        <li>Data Science and Artificial Intelligence</li>
        <li>Information Technology</li>
      </ul>
      
      <h2>State-of-the-Art Facilities</h2>
      <p>The new faculty building features modern computer laboratories, a dedicated data center, innovation hub, and collaboration spaces designed to foster creativity and practical learning.</p>
      
      <h2>Industry Partnerships</h2>
      <p>The university has signed memoranda of understanding with leading technology companies including Google, Microsoft, and several Nigerian tech startups to provide internship opportunities and industry exposure for students.</p>
    `,
  },
  "academic-calendar-update": {
    title: "Academic Calendar Update for 2024/2025 Session",
    excerpt: "The University management has released an updated academic calendar for the 2024/2025 academic session.",
    date: "December 28, 2024",
    category: "Announcements",
    content: `
      <p>The University management has released an updated academic calendar for the 2024/2025 academic session. Students are advised to note the revised dates for examinations and registration.</p>
      
      <h2>First Semester</h2>
      <ul>
        <li>Resumption: September 16, 2024</li>
        <li>Registration Deadline: October 15, 2024</li>
        <li>Mid-Semester Break: November 4-8, 2024</li>
        <li>Examinations: January 13 - February 7, 2025</li>
      </ul>
      
      <h2>Second Semester</h2>
      <ul>
        <li>Resumption: February 24, 2025</li>
        <li>Registration Deadline: March 15, 2025</li>
        <li>Mid-Semester Break: April 14-18, 2025</li>
        <li>Examinations: June 2 - June 27, 2025</li>
      </ul>
      
      <h2>Important Notes</h2>
      <p>Students who fail to register before the deadline will be required to pay a late registration fee. All outstanding fees must be cleared before examination registration.</p>
    `,
  },
};

const ArticleDetail = () => {
  const { id } = useParams<{ id: string }>();
  const article = id ? articlesData[id] : null;

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
                  {Object.entries(articlesData)
                    .filter(([key]) => key !== id)
                    .slice(0, 3)
                    .map(([key, a]) => (
                      <Link 
                        key={key}
                        to={`/articles/${key}`}
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
