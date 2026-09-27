export type PortfolioAudience = "recruiters" | "clients" | "peers";

export type PortfolioActionKind = "viewWork" | "resume" | "contact" | "external";

export type PortfolioActionPriority = "primary" | "secondary";

export type ProjectCategory = "featured" | "priorWork";

export type ContactKind = "email" | "github" | "linkedin" | "x" | "other";

export type LinkStatus = "ready" | "pending";

export type ResumeStatus = "ready" | "pendingAsset";

export type PortfolioProfile = {
  preferredName: string;
  fullName: string;
  headline: string;
  shortBio: string;
  location: string;
  primaryAudience: PortfolioAudience;
  availability?: string;
  portraitAsset?: string;
  contentStatus: "draft" | "launchReady";
};

export type PortfolioAction = {
  label: string;
  href: string;
  kind: PortfolioActionKind;
  priority: PortfolioActionPriority;
  download?: boolean;
  external?: boolean;
};

export type FeaturedProject = {
  title: string;
  summary: string;
  role: string;
  stack: string[];
  outcome: string;
  featured: boolean;
  category: ProjectCategory;
  imageAsset?: string;
  liveUrl?: string;
  repoUrl?: string;
  caseStudyUrl?: string;
  year?: string;
  tags?: string[];
  isDraft?: boolean;
};

export type ResumeAsset =
  | {
      label: string;
      status: "ready";
      viewHref: string;
      downloadHref: string;
      fileName: string;
      updatedAt?: string;
    }
  | {
      label: string;
      status: "pendingAsset";
      viewHref: null;
      downloadHref: null;
      pendingMessage: string;
    };

export type ContactLink =
  | {
      label: string;
      href: string;
      kind: ContactKind;
      status: "ready";
      external?: boolean;
    }
  | {
      label: string;
      href: null;
      kind: ContactKind;
      status: "pending";
      pendingMessage: string;
      external?: boolean;
    };

export type SkillGroup = {
  label: string;
  items: string[];
  summary?: string;
};

export type PortfolioContent = {
  profile: PortfolioProfile;
  actions: PortfolioAction[];
  projects: FeaturedProject[];
  resume: ResumeAsset;
  contactLinks: ContactLink[];
  skillGroups: SkillGroup[];
};

const portfolioContent = {
  profile: {
    preferredName: "Bishop",
    fullName: "Victor Osayame",
    headline: "Frontend focused software engineer crafting polished web experiences.",
    shortBio:
      "Bishop builds refined, recruiter friendly interfaces with a strong eye for motion, structure, and product clarity.",
    location: "Nigeria",
    primaryAudience: "recruiters",
    availability: "Open to frontend and full stack opportunities.",
    contentStatus: "draft",
  },
  actions: [
    {
      label: "View work",
      href: "#work",
      kind: "viewWork",
      priority: "primary",
    },
    {
      label: "View resume",
      href: "#resume",
      kind: "resume",
      priority: "secondary",
    },
    {
      label: "Contact Bishop",
      href: "#contact",
      kind: "contact",
      priority: "secondary",
    },
  ],
  projects: [
    {
      title: "Banking dashboard experience",
      summary:
        "A polished financial product interface focused on clarity, trust, and fast account scanning.",
      role: "Frontend engineering and interface design",
      stack: ["Next.js", "React", "TypeScript"],
      outcome:
        "Created a structured product surface that can communicate balances, account activity, and core actions clearly.",
      featured: true,
      category: "featured",
      tags: ["Finance", "Dashboard", "Product UI"],
      isDraft: true,
    },
    {
      title: "Developer portfolio system",
      summary:
        "A personal brand portfolio rebuilt around a simpler content model and a polished visitor journey.",
      role: "Product direction and frontend engineering",
      stack: ["Next.js", "React", "TypeScript", "Tailwind CSS"],
      outcome:
        "Defined a reusable content foundation for profile, projects, resume, contact, and skills.",
      featured: true,
      category: "featured",
      tags: ["Portfolio", "Content model", "Frontend"],
      isDraft: true,
    },
    {
      title: "Interactive product interface",
      summary:
        "A high craft web interface designed around responsive structure, visual hierarchy, and smooth interaction states.",
      role: "Frontend engineering",
      stack: ["React", "TypeScript", "CSS"],
      outcome:
        "Established a strong interface foundation ready for case study details once final project assets are supplied.",
      featured: true,
      category: "featured",
      tags: ["Interaction", "Responsive UI", "Frontend"],
      isDraft: true,
    },
    {
      title: "macOS portfolio",
      summary:
        "An earlier animated portfolio inspired by a macOS desktop environment, included here as prior work only.",
      role: "Frontend engineering and animation",
      stack: ["React", "GSAP", "Zustand"],
      outcome:
        "Showed animation range and interaction ambition, while the new portfolio moves in a cleaner cinematic direction.",
      featured: false,
      category: "priorWork",
      tags: ["Prior work", "Animation", "GSAP"],
      isDraft: true,
    },
  ],
  resume: {
    label: "Resume",
    status: "pendingAsset",
    viewHref: null,
    downloadHref: null,
    pendingMessage:
      "Resume PDF is coming soon. Contact Bishop directly for the latest version.",
  },
  contactLinks: [
    {
      label: "Email",
      href: null,
      kind: "email",
      status: "pending",
      pendingMessage: "Email address pending before launch.",
    },
    {
      label: "GitHub",
      href: null,
      kind: "github",
      status: "pending",
      pendingMessage: "GitHub URL pending before launch.",
      external: true,
    },
    {
      label: "LinkedIn",
      href: null,
      kind: "linkedin",
      status: "pending",
      pendingMessage: "LinkedIn URL pending before launch.",
      external: true,
    },
  ],
  skillGroups: [
    {
      label: "Frontend",
      items: ["React", "Next.js", "TypeScript", "Responsive UI"],
      summary: "Interface engineering, component structure, and polished product surfaces.",
    },
    {
      label: "Motion and polish",
      items: ["GSAP", "Interaction states", "Micro motion", "Visual refinement"],
      summary: "Subtle animation and interaction details that make a page feel considered.",
    },
    {
      label: "Product systems",
      items: ["Content modeling", "Design systems", "Accessibility", "Developer experience"],
      summary: "Structure and standards that keep product interfaces maintainable.",
    },
  ],
} satisfies PortfolioContent;

export function getPortfolioContent(): PortfolioContent {
  return portfolioContent;
}

export function getPrimaryAction(content: PortfolioContent = portfolioContent): PortfolioAction {
  const primaryAction = content.actions.find(
    (action) => action.kind === "viewWork" && action.priority === "primary",
  );

  if (!primaryAction) {
    throw new Error("Portfolio content must include one primary View work action.");
  }

  return primaryAction;
}

export function getFeaturedProjects(
  content: PortfolioContent = portfolioContent,
): FeaturedProject[] {
  return content.projects.filter(
    (project) => project.category === "featured" && project.featured,
  );
}

export function getPriorWork(
  content: PortfolioContent = portfolioContent,
): FeaturedProject[] {
  return content.projects.filter((project) => project.category === "priorWork");
}

export function getReadyProjectLinks(project: FeaturedProject) {
  return [
    project.liveUrl && { label: "Live", href: project.liveUrl },
    project.repoUrl && { label: "Code", href: project.repoUrl },
    project.caseStudyUrl && { label: "Case study", href: project.caseStudyUrl },
  ].filter((link): link is { label: string; href: string } => Boolean(link));
}

export function getReadyContactLinks(
  content: PortfolioContent = portfolioContent,
): Extract<ContactLink, { status: "ready" }>[] {
  return content.contactLinks.filter(
    (link): link is Extract<ContactLink, { status: "ready" }> =>
      link.status === "ready",
  );
}

export function getPendingContactLinks(
  content: PortfolioContent = portfolioContent,
): Extract<ContactLink, { status: "pending" }>[] {
  return content.contactLinks.filter(
    (link): link is Extract<ContactLink, { status: "pending" }> =>
      link.status === "pending",
  );
}


// resume: {
//   status: "pendingAsset",
//   viewHref: null,
//   downloadHref: null,
//   fileName: null,
// }

// contactLinks: [
//   {
//     label: "Email",
//     href: "mailto:osayamevictor@gmail.com",
//     status: "ready",
//   },
//   {
//     label: "GitHub",
//     href: "https://github.com/yourusername",
//     status: "ready",
//   },
//   {
//     label: "LinkedIn",
//     href: "https://linkedin.com/in/yourprofile",
//     status: "ready",
//   },
// ];