0003. Admin Foundation
Spec 0003
Architected
Single-owner Portfolio CMS

Next.js Server Actions · Prisma · PostgreSQL · JWT · Zod · Vercel Blob

The admin dashboard lives inside the same Next.js application as the public portfolio. The public site remains the presentation layer, while the dashboard becomes the content management system.

Summary

Build a secure single-owner CMS that allows Bishop to edit every part of the portfolio without touching code.

The owner should be able to:

Change profile photo

Edit name, headline and bio

Manage frontend/backend/database stacks

Edit featured projects

Upload or replace the resume PDF

Edit contact links

See changes reflected immediately on the public portfolio

Tech stack

Layer

	

Technology




Frontend

	

Next.js 16




Backend

	

Server Actions




Database

	

PostgreSQL




ORM

	

Prisma




Validation

	

Zod




Authentication

	

JWT + HttpOnly Cookies




Password Hashing

	

bcrypt




File Upload

	

Vercel Blob

No Express. No NestJS. Everything lives inside one application.

User flow
Folder architecture
app/
│
├── admin/
│   ├── login/
│   │   └── page.tsx
│   │
│   ├── dashboard/
│   │   ├── layout.tsx
│   │   └── page.tsx
│   │
│   ├── profile/
│   ├── projects/
│   ├── stack/
│   ├── resume/
│   └── contact/
│
├── actions/
│   ├── auth.ts
│   ├── profile.ts
│   ├── projects.ts
│   ├── stack.ts
│   ├── resume.ts
│   └── contact.ts
│
├── api/
│   └── upload/
│       └── route.ts
│
lib/
├── prisma.ts
├── auth.ts
└── validations/
    ├── profile.ts
    ├── project.ts
    ├── stack.ts
    ├── resume.ts
    └── contact.ts
Database schema

We'll have 5 tables only.

Admin
model Admin {
  id           String   @id @default(cuid())
  email        String   @unique
  passwordHash String
  createdAt    DateTime @default(now())
}

Only one record will exist.

Profile
model Profile {
  id            String @id @default(cuid())
  preferredName String
  fullName      String
  headline      String
  bio           String @db.Text
  location      String

  photoUrl      String?
}
TechStack
enum StackCategory {
  FRONTEND
  BACKEND
  DATABASE
  TOOL
}

model TechStack {
  id       String @id @default(cuid())
  name     String
  category StackCategory
}

This allows unlimited technologies.

Project
model Project {
  id        String @id @default(cuid())

  title     String
  role      String

  summary   String @db.Text
  outcome   String @db.Text

  imageUrl  String?

  liveUrl   String?
  repoUrl   String?

  featured  Boolean @default(true)

  order     Int
}

The order field lets you drag projects later.

Resume
model Resume {
  id          String   @id @default(cuid())

  fileName    String
  fileUrl     String

  uploadedAt  DateTime @default(now())
}

The newest resume replaces the previous one.

Authentication

We're using JWT, stored inside an HttpOnly cookie.

Login flow

Enter email/password

Zod validates

Find admin

bcrypt.compare()

Create JWT

Store cookie

Redirect dashboard

No localStorage.

No refresh tokens.

Since it's one owner, a 7-day session is enough.

Zod validation

Every form has its own schema.

Example
export const ProfileSchema = z.object({
  preferredName: z.string().min(2).max(30),

  fullName: z.string().min(3).max(50),

  headline: z.string().min(10).max(80),

  bio: z.string().min(30).max(300),

  location: z.string().max(40),
});

The same schema validates both the form and the server action.

Vercel Blob

We'll upload only two file types.

Asset

	

Storage




Profile Photo

	

Vercel Blob




Resume PDF

	

Vercel Blob

The database stores only the returned URL.

Example:

photoUrl:
"https://...blob.vercel-storage.com/profile.jpg"

fileUrl:
"https://...blob.vercel-storage.com/resume.pdf"
Dashboard pages

Overview

Last updated, quick actions, portfolio status

Profile

Photo, names, headline, bio, location

Tech Stack

Add, edit, remove technologies

Projects

Edit cards, thumbnails, links, featured order

Resume

Upload PDF, preview, replace

Contact

Email, GitHub, LinkedIn, X

Acceptance criteria

ID

	

Requirement




AC-1

	

Only authenticated owner accesses /admin




AC-2

	

Profile edits instantly update portfolio




AC-3

	

Tech stack is fully dynamic




AC-4

	

Projects support images & links




AC-5

	

Resume uploads, previews & downloads




AC-6

	

Contact links are editable and clickable




AC-7

	

Every server action uses Zod validation

Development roadmap

We'll build this exactly like the portfolio:

Phase 1: Prisma + PostgreSQL setup

Phase 2: JWT authentication

Phase 3: Admin dashboard layout

Phase 4: Profile editor

Phase 5: Tech stack manager

Phase 6: Project editor

Phase 7: Resume + Contact editor

This is a production-quality architecture and mirrors how many small commercial Next.js applications are built today.