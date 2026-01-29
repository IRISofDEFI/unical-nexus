
# Folder Restructuring Plan

## Overview
Reorganize the project into clear, role-based folder structures for **Student**, **Staff**, and **Admin** portals. This will make the codebase more maintainable and scalable as each portal grows.

---

## Current Structure (Before)

```text
src/
├── components/
│   ├── dashboard/          # Mixed - currently used by Student only
│   │   ├── ActivityCard.tsx
│   │   ├── CalendarCard.tsx
│   │   ├── DashboardHeader.tsx
│   │   ├── DashboardSidebar.tsx
│   │   ├── NewsCard.tsx
│   │   ├── ProfileCard.tsx
│   │   ├── StatsRow.tsx
│   │   └── index.ts
│   ├── DashboardCard.tsx   # Used by Staff
│   └── LoginForm.tsx       # Shared
├── pages/
│   ├── Login.tsx           # Student login
│   ├── StaffLogin.tsx      # Staff login
│   ├── StudentDashboard.tsx
│   └── StaffDashboard.tsx
└── routes/
    └── AppRoutes.tsx
```

---

## New Structure (After)

```text
src/
├── components/
│   ├── shared/             # Shared components across all portals
│   │   ├── LoginForm.tsx
│   │   ├── DashboardCard.tsx
│   │   └── index.ts
│   ├── ui/                 # UI primitives (unchanged)
│   └── ... (Navbar, Footer, etc.)
│
├── features/
│   ├── student/            # All student-related code
│   │   ├── components/
│   │   │   ├── ActivityCard.tsx
│   │   │   ├── CalendarCard.tsx
│   │   │   ├── DashboardHeader.tsx
│   │   │   ├── DashboardSidebar.tsx
│   │   │   ├── NewsCard.tsx
│   │   │   ├── ProfileCard.tsx
│   │   │   ├── StatsRow.tsx
│   │   │   └── index.ts
│   │   ├── pages/
│   │   │   ├── StudentLogin.tsx
│   │   │   └── StudentDashboard.tsx
│   │   └── index.ts
│   │
│   ├── staff/              # All staff-related code
│   │   ├── components/
│   │   │   └── index.ts    # Ready for future components
│   │   ├── pages/
│   │   │   ├── StaffLogin.tsx
│   │   │   └── StaffDashboard.tsx
│   │   └── index.ts
│   │
│   └── admin/              # All admin-related code (prepared)
│       ├── components/
│       │   └── index.ts    # Ready for future components
│       ├── pages/
│       │   ├── AdminLogin.tsx     # Placeholder
│       │   └── AdminDashboard.tsx # Placeholder
│       └── index.ts
│
├── pages/                  # Public/general pages only
│   ├── Home.tsx
│   ├── Academics.tsx
│   ├── Articles.tsx
│   ├── ArticleDetail.tsx
│   └── NotFound.tsx
│
└── routes/
    └── AppRoutes.tsx       # Updated imports
```

---

## Implementation Steps

### Step 1: Create Folder Structure
Create the new `features/` directory with subfolders for each role:
- `src/features/student/components/`
- `src/features/student/pages/`
- `src/features/staff/components/`
- `src/features/staff/pages/`
- `src/features/admin/components/`
- `src/features/admin/pages/`

### Step 2: Move Student Files
Move existing student-related files:

| From | To |
|------|-----|
| `src/components/dashboard/ActivityCard.tsx` | `src/features/student/components/ActivityCard.tsx` |
| `src/components/dashboard/CalendarCard.tsx` | `src/features/student/components/CalendarCard.tsx` |
| `src/components/dashboard/DashboardHeader.tsx` | `src/features/student/components/DashboardHeader.tsx` |
| `src/components/dashboard/DashboardSidebar.tsx` | `src/features/student/components/DashboardSidebar.tsx` |
| `src/components/dashboard/NewsCard.tsx` | `src/features/student/components/NewsCard.tsx` |
| `src/components/dashboard/ProfileCard.tsx` | `src/features/student/components/ProfileCard.tsx` |
| `src/components/dashboard/StatsRow.tsx` | `src/features/student/components/StatsRow.tsx` |
| `src/pages/Login.tsx` | `src/features/student/pages/StudentLogin.tsx` |
| `src/pages/StudentDashboard.tsx` | `src/features/student/pages/StudentDashboard.tsx` |

### Step 3: Move Staff Files
Move existing staff-related files:

| From | To |
|------|-----|
| `src/pages/StaffLogin.tsx` | `src/features/staff/pages/StaffLogin.tsx` |
| `src/pages/StaffDashboard.tsx` | `src/features/staff/pages/StaffDashboard.tsx` |

### Step 4: Create Shared Components Folder
Move shared components:

| From | To |
|------|-----|
| `src/components/LoginForm.tsx` | `src/components/shared/LoginForm.tsx` |
| `src/components/DashboardCard.tsx` | `src/components/shared/DashboardCard.tsx` |

### Step 5: Create Admin Placeholder Files
Create placeholder files for the admin portal:
- `src/features/admin/pages/AdminLogin.tsx` - Basic login page
- `src/features/admin/pages/AdminDashboard.tsx` - Placeholder dashboard
- `src/features/admin/components/index.ts` - Empty export file

### Step 6: Create Index Files
Create barrel export files for clean imports:
- `src/features/student/components/index.ts`
- `src/features/student/index.ts`
- `src/features/staff/components/index.ts`
- `src/features/staff/index.ts`
- `src/features/admin/components/index.ts`
- `src/features/admin/index.ts`
- `src/components/shared/index.ts`

### Step 7: Update Routes
Update `AppRoutes.tsx` with new import paths:

```typescript
// Student imports
import StudentLogin from "@/features/student/pages/StudentLogin";
import StudentDashboard from "@/features/student/pages/StudentDashboard";

// Staff imports  
import StaffLogin from "@/features/staff/pages/StaffLogin";
import StaffDashboard from "@/features/staff/pages/StaffDashboard";

// Admin imports
import AdminLogin from "@/features/admin/pages/AdminLogin";
import AdminDashboard from "@/features/admin/pages/AdminDashboard";
```

Add admin routes:
```typescript
{/* Admin Routes */}
<Route path="/admin-login" element={<AdminLogin />} />
<Route path="/admin-dashboard" element={<AdminDashboard />} />
```

### Step 8: Update Internal Imports
Fix all internal imports in moved files:
- Student components: Update imports from `@/components/dashboard/...` to relative imports
- Login pages: Update imports from `@/components/LoginForm` to `@/components/shared/LoginForm`
- Staff Dashboard: Update import for `DashboardCard`

### Step 9: Clean Up Old Folders
Remove the now-empty `src/components/dashboard/` folder after migration.

---

## Files Summary

### Files to Create (New)
| File | Purpose |
|------|---------|
| `src/features/student/components/index.ts` | Student component exports |
| `src/features/student/index.ts` | Student feature exports |
| `src/features/staff/components/index.ts` | Staff component exports |
| `src/features/staff/index.ts` | Staff feature exports |
| `src/features/admin/components/index.ts` | Admin component exports |
| `src/features/admin/pages/AdminLogin.tsx` | Admin login placeholder |
| `src/features/admin/pages/AdminDashboard.tsx` | Admin dashboard placeholder |
| `src/features/admin/index.ts` | Admin feature exports |
| `src/components/shared/index.ts` | Shared component exports |

### Files to Move and Update
| Original Location | New Location |
|-------------------|--------------|
| `src/components/dashboard/*` (7 files) | `src/features/student/components/` |
| `src/pages/Login.tsx` | `src/features/student/pages/StudentLogin.tsx` |
| `src/pages/StudentDashboard.tsx` | `src/features/student/pages/StudentDashboard.tsx` |
| `src/pages/StaffLogin.tsx` | `src/features/staff/pages/StaffLogin.tsx` |
| `src/pages/StaffDashboard.tsx` | `src/features/staff/pages/StaffDashboard.tsx` |
| `src/components/LoginForm.tsx` | `src/components/shared/LoginForm.tsx` |
| `src/components/DashboardCard.tsx` | `src/components/shared/DashboardCard.tsx` |

### Files to Update
| File | Changes |
|------|---------|
| `src/routes/AppRoutes.tsx` | Update all imports, add admin routes |
| All moved component files | Update internal import paths |

---

## Route Structure After Changes

| Route | Page | Location |
|-------|------|----------|
| `/` | Home | `src/pages/Home.tsx` |
| `/login` | Student Login | `src/features/student/pages/StudentLogin.tsx` |
| `/student-dashboard` | Student Dashboard | `src/features/student/pages/StudentDashboard.tsx` |
| `/staff-login` | Staff Login | `src/features/staff/pages/StaffLogin.tsx` |
| `/staff-dashboard` | Staff Dashboard | `src/features/staff/pages/StaffDashboard.tsx` |
| `/admin-login` | Admin Login | `src/features/admin/pages/AdminLogin.tsx` |
| `/admin-dashboard` | Admin Dashboard | `src/features/admin/pages/AdminDashboard.tsx` |
| `/academics` | Academics | `src/pages/Academics.tsx` |
| `/articles` | Articles | `src/pages/Articles.tsx` |
| `/articles/:id` | Article Detail | `src/pages/ArticleDetail.tsx` |

---

## Technical Notes

- All existing functionality will be preserved
- Import paths will use the `@/` alias consistently
- Index files enable cleaner imports like `import { ProfileCard } from "@/features/student/components"`
- The admin folder is prepared with placeholder content, ready for your instructions
- No changes to styling or component logic, only file organization and imports
