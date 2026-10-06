import { prisma } from "@/lib/auth/prisma"
import ContactManager from "../components/contact-manager"


const ContactPage = async () => {
    const contacts = await prisma.contact.findMany({
        orderBy: {
            createdAt: "asc"
        }
    })
  return (
    <ContactManager contacts={contacts} />
  )
}

export default ContactPage