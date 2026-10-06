import { prisma } from "@/lib/auth/prisma";
import ProjectManagerPage from "../components/project-manager";


const ProjectsPage = async () => {
    const projects = await prisma.project.findMany({
        orderBy: [
            {
                order: "asc",
            },
            {
                createdAt: "asc",
            },
        ],
    });
    return (
        <div className="mx-auto w-full max-w-6xl">
      <div className="mb-8">
        <p className="text-sm font-medium uppercase tracking-[0.08em] text-accent">
          Portfolio
        </p>

        <h1 className="mt-2 text-3xl font-bold text-foreground">
          Projects
        </h1>

        <p className="mt-2 max-w-2xl text-text-muted">
          Manage the projects displayed on your portfolio.
        </p>
      </div>

      <ProjectManagerPage projects={projects} />
    </div>
    )
}

export default ProjectsPage