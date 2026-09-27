import 'dotenv/config';
import { PrismaClient } from "@prisma/client";
import { PrismaPg } from '@prisma/adapter-pg';
import { hashPassword } from "../lib/auth/bcrypt";

const connectionString = process.env.NODE_ENV === "production"
  ? process.env.DATABASE_URL
  : process.env.DIRECT_URL;

  if (!connectionString) {
    throw new Error("DATABASE_URL or DIRECT_URL is not defined in the environment variables.");
  }

const adminEmail = process.env.ADMIN_EMAIL;
const adminPassword = process.env.ADMIN_PASSWORD;

if (!adminEmail) {
  throw new Error("ADMIN_EMAIL is not defined");
}

if (!adminPassword) {
  throw new Error("ADMIN_PASSWORD is not defined");
}

const adapter = new PrismaPg({
    connectionString,
});

const prisma = new PrismaClient({
    adapter
});

async function main() {
    const passwordHash = await hashPassword(adminPassword!);

    const admin = await prisma.admin.upsert({
        where: { email: adminEmail },
        update: { passwordHash },
        create: {
            email: adminEmail!,
            passwordHash
        }
    });

    console.log(`Admin account ready: ${admin.email}`);
}

main().catch((error) => {
    console.error("Error seeding the database:", error);
    process.exit(1);
}).finally(async () => {
    await prisma.$disconnect();
});