import { 
  GraduationCap, 
  CreditCard, 
  FileCheck, 
  ClipboardList,
  BookOpen,
  Users,
  Bell,
  ArrowRight
} from "lucide-react";
import AnnouncementBar from "@/components/AnnouncementBar";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import HeroSection from "@/components/HeroSection";
import InfoCard from "@/components/InfoCard";
import NewsCard from "@/components/NewsCard";

/**
 * Home Page
 * Main landing page for UNICAL portal
 * Features: Hero, services, news, announcements
 */

// Quick access services data
const services = [
  {
    icon: GraduationCap,
    title: "Admissions",
    description: "Apply for undergraduate, postgraduate, and diploma programmes. Check admission status and requirements.",
    link: "/admissions",
    linkText: "Start Application"
  },
  {
    icon: CreditCard,
    title: "Fee Payments",
    description: "Pay school fees, acceptance fees, and other charges securely online. Generate payment receipts.",
    link: "/login",
    linkText: "Pay Fees"
  },
  {
    icon: FileCheck,
    title: "Online Screening",
    description: "Complete your post-UTME screening, upload documents, and check your screening status.",
    link: "/screening",
    linkText: "Start Screening"
  },
  {
    icon: ClipboardList,
    title: "Results",
    description: "View your semester results, check your CGPA, and download official transcripts.",
    link: "/login",
    linkText: "View Results"
  },
];

// Mock news data - links to articles page
const newsItems = [
  {
    title: "UNICAL Ranked Among Top 10 Nigerian Universities",
    excerpt: "The University of Calabar has been recognized as one of the top 10 universities in Nigeria according to the latest ranking by the National Universities Commission.",
    date: "January 20, 2025",
    category: "Achievement",
    link: "/articles/unical-ranked-top-10",
  },
  {
    title: "2025/2026 Admission Portal Now Open",
    excerpt: "Prospective students can now apply for admission into various undergraduate and postgraduate programmes for the 2025/2026 academic session.",
    date: "January 15, 2025",
    category: "Admissions",
    link: "/articles/2026-admission-portal",
  },
  {
    title: "New Faculty of Computing and Information Technology",
    excerpt: "The University Senate has approved the establishment of a new Faculty of Computing and Information Technology to meet the growing demand for tech education.",
    date: "January 10, 2025",
    category: "Announcement",
    link: "/articles/new-faculty-computing",
  },
];

// Quick links for easy navigation
const quickLinks = [
  { icon: BookOpen, label: "Academic Calendar", link: "/calendar" },
  { icon: Users, label: "Staff Directory", link: "/staff-directory" },
  { icon: Bell, label: "Announcements", link: "/announcements" },
];

const Home = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Announcement Bar */}
      <AnnouncementBar 
        message="2025/2026 Fee Portal is Now Open!" 
        link="/login"
        linkText="Pay Now"
      />

      {/* Navigation */}
      <Navbar />

      {/* Hero Section */}
      <HeroSection />

      {/* Quick Access Services */}
      <section className="section-padding bg-unical-light-gray">
        <div className="container-academic">
          {/* Section Header */}
          <div className="text-center mb-12">
            <h2 className="font-heading text-foreground mb-4">
              Quick Access
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Access essential university services and portals. Pay fees, check 
              results, and manage your academic journey all in one place.
            </p>
          </div>

          {/* Services Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((service) => (
              <InfoCard key={service.title} {...service} />
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="section-padding">
        <div className="container-academic">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Content */}
            <div>
              <span className="text-secondary font-semibold text-sm uppercase tracking-wide">
                About UNICAL
              </span>
              <h2 className="font-heading text-foreground mt-2 mb-6">
                A Legacy of Academic Excellence
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Established in 1975, the University of Calabar has grown to become 
                one of Nigeria's leading institutions of higher learning. With 16 
                faculties and over 40,000 students, we are committed to producing 
                graduates who excel in their chosen fields.
              </p>
              <p className="text-muted-foreground leading-relaxed mb-6">
                Our motto, "Knowledge for Service," reflects our dedication to 
                academic excellence, research innovation, and community service. 
                We prepare students not just for careers, but for life.
              </p>
              
              {/* Quick Links */}
              <div className="flex flex-wrap gap-4 mb-6">
                {quickLinks.map((link) => (
                  <a
                    key={link.label}
                    href={link.link}
                    className="flex items-center gap-2 text-sm text-muted-foreground 
                               hover:text-secondary transition-colors"
                  >
                    <link.icon size={16} />
                    <span>{link.label}</span>
                  </a>
                ))}
              </div>

              <a 
                href="/about" 
                className="btn-outline inline-flex items-center gap-2"
              >
                Learn More About UNICAL
                <ArrowRight size={18} />
              </a>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 gap-6">
              <div className="card-academic p-8 text-center">
                <p className="text-4xl font-heading font-bold text-secondary">16</p>
                <p className="text-muted-foreground mt-2">Faculties</p>
              </div>
              <div className="card-academic p-8 text-center">
                <p className="text-4xl font-heading font-bold text-secondary">200+</p>
                <p className="text-muted-foreground mt-2">Programmes</p>
              </div>
              <div className="card-academic p-8 text-center">
                <p className="text-4xl font-heading font-bold text-secondary">40K+</p>
                <p className="text-muted-foreground mt-2">Students</p>
              </div>
              <div className="card-academic p-8 text-center">
                <p className="text-4xl font-heading font-bold text-secondary">3K+</p>
                <p className="text-muted-foreground mt-2">Staff</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* News & Announcements */}
      <section className="section-padding bg-unical-light-gray">
        <div className="container-academic">
          {/* Section Header */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-12">
            <div>
              <h2 className="font-heading text-foreground mb-2">
                News & Announcements
              </h2>
              <p className="text-muted-foreground">
                Stay updated with the latest happenings at UNICAL
              </p>
            </div>
            <a 
              href="/articles" 
              className="mt-4 sm:mt-0 text-secondary font-medium inline-flex 
                         items-center gap-1 hover:gap-2 transition-all"
            >
              View All News
              <ArrowRight size={18} />
            </a>
          </div>

          {/* News Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {newsItems.map((news) => (
              <NewsCard key={news.title} {...news} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-hero-gradient text-primary-foreground section-padding">
        <div className="container-academic text-center">
          <h2 className="font-heading text-primary-foreground mb-4">
            Ready to Begin Your Journey?
          </h2>
          <p className="text-primary-foreground/80 max-w-2xl mx-auto mb-8">
            Join thousands of students at the University of Calabar. 
            Apply now for the 2025/2026 academic session.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a href="/admissions" className="btn-secondary">
              Apply for Admission
            </a>
            <a href="/contact" className="btn-outline-light">
              Contact Us
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Home;
