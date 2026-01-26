import { CheckCircle, Mail, Phone, BookOpen, GraduationCap, IdCard } from "lucide-react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";

/**
 * Profile Card Component
 * Displays student profile with photo, details, quote, and academic progress
 * Matches UNICAL portal design
 */

interface ProfileCardProps {
  name: string;
  matricNo: string;
  email: string;
  phone: string;
  level: string;
  studentType: string;
  quote?: string;
  academicProgress: number;
  profileImage?: string;
  verified?: boolean;
}

const ProfileCard = ({
  name,
  matricNo,
  email,
  phone,
  level,
  studentType,
  quote = "Education is the passport to the future, for tomorrow belongs to those who prepare for it today.",
  academicProgress,
  profileImage,
  verified = true,
}: ProfileCardProps) => {
  const initials = name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2);

  const infoItems = [
    { icon: IdCard, label: "Matric No", value: matricNo },
    { icon: Mail, label: "Email", value: email },
    { icon: Phone, label: "Phone", value: phone },
    { icon: BookOpen, label: "Level", value: level },
    { icon: GraduationCap, label: "Type", value: studentType },
  ];

  return (
    <div className="bg-background border border-border rounded-xl p-6">
      <div className="flex flex-col lg:flex-row lg:items-start gap-6">
        {/* Profile Image */}
        <Avatar className="w-24 h-24 lg:w-28 lg:h-28 mx-auto lg:mx-0 flex-shrink-0">
          <AvatarImage
            src={profileImage}
            alt={`${name}'s profile`}
            className="object-cover"
          />
          <AvatarFallback className="bg-secondary text-secondary-foreground text-2xl font-semibold">
            {initials}
          </AvatarFallback>
        </Avatar>

        {/* Profile Details */}
        <div className="flex-1 text-center lg:text-left">
          {/* Name with Verification Badge */}
          <div className="flex items-center justify-center lg:justify-start gap-2 mb-4">
            <h2 className="font-heading text-xl font-semibold text-foreground">
              {name}
            </h2>
            {verified && (
              <CheckCircle size={20} className="text-accent fill-accent/20" />
            )}
          </div>

          {/* Info Grid */}
          <div className="flex flex-wrap justify-center lg:justify-start gap-4 mb-4">
            {infoItems.map((item) => (
              <div
                key={item.label}
                className="flex items-center gap-2 text-sm text-muted-foreground"
              >
                <item.icon size={14} className="text-secondary" />
                <span className="hidden sm:inline text-xs">{item.label}:</span>
                <span className="font-medium text-foreground">{item.value}</span>
              </div>
            ))}
          </div>

          {/* Quote */}
          <blockquote className="italic text-muted-foreground text-sm mb-4 border-l-2 border-secondary pl-4">
            "{quote}"
          </blockquote>

          {/* Academic Progress */}
          <div className="max-w-md">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-foreground">
                Academic Progress
              </span>
              <span className="text-sm font-semibold text-secondary">
                {academicProgress}%
              </span>
            </div>
            <Progress value={academicProgress} className="h-2" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;
