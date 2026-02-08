# UNICAL University Portal

The University of Calabar online portal — a role-based academic management system built with React, TypeScript, Tailwind CSS, and Lovable Cloud.

---

## Demo Login Credentials

Use the following credentials to test each portal:

| Role    | Identifier           | Password      | Login URL      |
|---------|----------------------|---------------|----------------|
| Student | `22/071145217`       | `Demo@1234`   | `/login`       |
| Staff   | `STF/2015/001234`    | `Staff@1234`  | `/staff-login` |
| Admin   | `admin@unical.demo`  | `Admin@1234`  | `/admin-login` |

---

## Authentication

Authentication is powered by Lovable Cloud (Supabase Auth) with a custom login flow:

1. **User enters credentials** — Students use their Matric Number, Staff use their Staff ID (or email for admins).
2. **Identifier resolution** — A secure backend function maps non-email identifiers (Matric No / Staff ID) to the corresponding user email using service-role permissions. This keeps email addresses hidden from the client.
3. **Authentication** — The backend function authenticates the user against the auth system and returns a session token.
4. **Session persistence** — The session is set in the client and managed via `AuthProvider`, which listens for auth state changes and loads the user's profile and roles.
5. **Role-based access** — Roles (`student`, `staff`, `admin`) are stored in a dedicated `user_roles` table. Route guards (`ProtectedRoute`) ensure users can only access dashboards matching their role.

### Role-Based Redirects

After successful login, users are seamlessly redirected to their role-specific dashboard:

| Role    | Dashboard Route       |
|---------|-----------------------|
| Student | `/student/dashboard`  |
| Staff   | `/staff/dashboard`    |
| Admin   | `/admin/dashboard`    |

- If a logged-in user visits `/`, `/login`, `/staff-login`, or `/admin-login`, they are automatically redirected to their dashboard.
- If an unauthenticated user tries to access a protected dashboard route, they are redirected to the appropriate login page.
- Legacy routes (`/student-dashboard`, `/staff-dashboard`, `/admin-dashboard`) automatically redirect to the new paths.

### Error Handling

The login form provides clean, user-friendly error messages:

| Scenario | User-Facing Message |
|----------|---------------------|
| Wrong credentials (401/403) | "Invalid login credentials. Please check your details and try again." |
| Missing fields (400) | "Please fill in all required fields." |
| Server error (500) | "Something went wrong on our end. Please try again shortly." |
| Network failure | "Unable to reach the server. Please check your internet connection and try again." |

Raw backend errors and stack traces are only logged to the browser developer console — they are never shown in the UI.

---


## Project Structure

```
src/
├── components/         # Shared UI components (Navbar, Footer, LoginForm, etc.)
├── contexts/           # AuthContext for global auth state
├── features/
│   ├── student/        # Student login page, dashboard, and components
│   ├── staff/          # Staff login page, dashboard, and components
│   └── admin/          # Admin login page, dashboard, and components
├── pages/              # Public pages (Home, Academics, Articles)
└── routes/             # Centralized routing with role guards
```

---

## Getting Started

This project is built and deployed via [Lovable](https://lovable.dev). To run locally, clone the repo and install dependencies:

```bash
npm install
npm run dev
```
