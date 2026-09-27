import { prisma } from "@/lib/auth/prisma"
import TechStackManager from "../components/tech-stack-manager"

const TechStackPage = async () => {
    const techStacks = await prisma.techStack.findMany({
        orderBy: {
            order: "asc",
        }
    })
  return (
     <div className="mx-auto w-full max-w-5xl">
      <div className="mb-8">
        <p className="text-sm font-medium uppercase tracking-[0.08em] text-accent">
          Portfolio
        </p>

        <h1 className="mt-2 text-3xl font-bold text-foreground">
          Tech Stack
        </h1>

        <p className="mt-2 max-w-2xl text-text-muted">
          Manage the technologies displayed on your portfolio.
        </p>
      </div>

      <TechStackManager techStacks={techStacks} />
    </div>
  )
}

export default TechStackPage