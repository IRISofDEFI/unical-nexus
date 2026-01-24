import { 
  GraduationCap, 
  Building2, 
  Calendar, 
  BookOpen,
  ChevronRight,
  Users,
  Award
} from "lucide-react";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

/**
 * Academics Page
 * Static page displaying academic information
 * Features: Faculties, Departments, Calendar, Programmes
 */

// Mock faculties data
const faculties = [
  { name: "Faculty of Science", departments: 12, students: 3500 },
  { name: "Faculty of Arts", departments: 10, students: 2800 },
  { name: "Faculty of Social Sciences", departments: 8, students: 3200 },
  { name: "Faculty of Law", departments: 3, students: 1200 },
  { name: "Faculty of Education", departments: 15, students: 4000 },
  { name: "Faculty of Medicine", departments: 6, students: 800 },
  { name: "Faculty of Engineering", departments: 5, students: 1500 },
  { name: "Faculty of Agriculture", departments: 4, students: 900 },
];

// Mock academic calendar events
const calendarEvents = [
  { event: "First Semester Begins", date: "September 16, 2024" },
  { event: "Course Registration Deadline", date: "October 15, 2024" },
  { event: "Mid-Semester Break", date: "November 4-8, 2024" },
  { event: "First Semester Examinations", date: "January 13 - February 7, 2025" },
  { event: "Second Semester Begins", date: "February 24, 2025" },
  { event: "Second Semester Examinations", date: "June 2-27, 2025" },
];

// Mock programmes
const programmes = [
  { type: "Undergraduate", count: 85, icon: GraduationCap },
  { type: "Postgraduate Diploma", count: 15, icon: Award },
  { type: "Masters Degrees", count: 45, icon: BookOpen },
  { type: "Doctoral Programmes", count: 30, icon: Users },
];

const Academics = () => {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Navigation */}
      <Navbar />

      {/* Hero Section */}
      <section className="bg-primary text-primary-foreground py-16 lg:py-24">
        <div className="container-academic">
          <div className="max-w-3xl">
            <span className="text-secondary font-semibold text-sm uppercase tracking-wide">
              Academics
            </span>
            <h1 className="font-heading text-4xl lg:text-5xl mt-2 mb-6">
              Academic Excellence
            </h1>
            <p className="text-primary-foreground/80 text-lg leading-relaxed">
              The University of Calabar offers a wide range of undergraduate and 
              postgraduate programmes across multiple faculties, committed to 
              producing graduates who excel in their chosen fields.
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <main className="flex-1 py-12 lg:py-16">
        <div className="container-academic">
          
          {/* Programmes Overview */}
          <section className="mb-16">
            <h2 className="font-heading text-2xl lg:text-3xl text-foreground mb-8">
              Our Programmes
            </h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {programmes.map((prog) => (
                <div key={prog.type} className="card-academic p-6 text-center">
                  <div className="w-14 h-14 bg-secondary/10 rounded-full flex items-center 
                                  justify-center mx-auto mb-4">
                    <prog.icon size={28} className="text-secondary" />
                  </div>
                  <p className="text-3xl font-heading font-bold text-secondary">
                    {prog.count}+
                  </p>
                  <p className="text-muted-foreground mt-2">{prog.type}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Faculties Section */}
          <section className="mb-16">
            <div className="flex items-center justify-between mb-8">
              <h2 className="font-heading text-2xl lg:text-3xl text-foreground">
                Faculties & Schools
              </h2>
              <Link 
                to="/faculties"
                className="text-secondary font-medium text-sm hover:underline 
                           flex items-center gap-1"
              >
                View All
                <ChevronRight size={16} />
              </Link>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
              {faculties.map((faculty) => (
                <div 
                  key={faculty.name}
                  className="card-academic p-5 hover:shadow-lg transition-shadow cursor-pointer"
                >
                  <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center 
                                  justify-center mb-4">
                    <Building2 size={20} className="text-primary" />
                  </div>
                  <h3 className="font-medium text-foreground mb-2">{faculty.name}</h3>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <span>{faculty.departments} Depts</span>
                    <span>{faculty.students.toLocaleString()} Students</span>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Two Column Layout */}
          <div className="grid lg:grid-cols-2 gap-12">
            
            {/* Academic Calendar */}
            <section>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-accent/10 rounded-lg flex items-center 
                                justify-center">
                  <Calendar size={20} className="text-accent" />
                </div>
                <h2 className="font-heading text-xl lg:text-2xl text-foreground">
                  Academic Calendar 2024/2025
                </h2>
              </div>
              <div className="card-academic divide-y divide-border">
                {calendarEvents.map((item, index) => (
                  <div key={index} className="p-4 flex items-center justify-between">
                    <span className="text-foreground">{item.event}</span>
                    <span className="text-muted-foreground text-sm">{item.date}</span>
                  </div>
                ))}
              </div>
              <Link 
                to="/academic-calendar"
                className="inline-flex items-center gap-2 text-secondary font-medium mt-4 
                           hover:gap-3 transition-all"
              >
                Download Full Calendar
                <ChevronRight size={16} />
              </Link>
            </section>

            {/* Departments Highlight */}
            <section>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-secondary/10 rounded-lg flex items-center 
                                justify-center">
                  <BookOpen size={20} className="text-secondary" />
                </div>
                <h2 className="font-heading text-xl lg:text-2xl text-foreground">
                  Featured Departments
                </h2>
              </div>
              <div className="space-y-4">
                <div className="card-academic p-5">
                  <h3 className="font-medium text-foreground mb-2">
                    Department of Computer Science
                  </h3>
                  <p className="text-muted-foreground text-sm mb-3">
                    Offering cutting-edge programmes in software engineering, 
                    artificial intelligence, and data science.
                  </p>
                  <Link to="/departments/computer-science" className="text-secondary text-sm font-medium">
                    Learn More →
                  </Link>
                </div>
                <div className="card-academic p-5">
                  <h3 className="font-medium text-foreground mb-2">
                    Department of Medicine
                  </h3>
                  <p className="text-muted-foreground text-sm mb-3">
                    Training the next generation of healthcare professionals 
                    with state-of-the-art facilities.
                  </p>
                  <Link to="/departments/medicine" className="text-secondary text-sm font-medium">
                    Learn More →
                  </Link>
                </div>
                <div className="card-academic p-5">
                  <h3 className="font-medium text-foreground mb-2">
                    Department of Law
                  </h3>
                  <p className="text-muted-foreground text-sm mb-3">
                    Producing distinguished legal practitioners and scholars 
                    since 1975.
                  </p>
                  <Link to="/departments/law" className="text-secondary text-sm font-medium">
                    Learn More →
                  </Link>
                </div>
              </div>
            </section>
          </div>
        </div>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Academics;
