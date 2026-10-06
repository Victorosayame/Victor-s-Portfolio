import { prisma } from "@/lib/auth/prisma"
import ResumeManagerPage from "../components/resume-manager";


const ResumePage = async () => {
    const resumeId = process.env.RESUME_ID;

    const resume = resumeId ?  await prisma.resume.findUnique({
        where: {
            id: resumeId
        },
    }) : null; 
  return (
    <ResumeManagerPage resume={resume} />
  )
}

export default ResumePage