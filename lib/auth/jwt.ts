//We don't need to put the whole Admin record inside the token.
// For this application, the token only needs to identify the owner.

// Something conceptually like:

// {
//   adminId: "clxxxxxxxx"
// }

// That's enough.

// Why?

// Because when we need the admin's information later, we can use the ID to query the database.

import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET;

if(!JWT_SECRET) {
    throw new Error("JWT_SECRET is not defined in the environment variables.");
}

const TOKEN_EXPIRATION = "7d"; // Token expiration time

export type AdminTokenPayload = {
    adminId: string;
}

export function signToken(adminId: string): string {
    return jwt.sign(
        { adminId },
        JWT_SECRET!,
        { expiresIn: TOKEN_EXPIRATION }
    )
}

export function verifyToken(token: string): AdminTokenPayload | null {
    try {
        const payload = jwt.verify(token, JWT_SECRET!) as AdminTokenPayload;

        if (
            typeof payload === "object" && 
            payload !== null &&
            "adminId" in payload &&
            typeof payload.adminId === "string"
        ) {
            return {
                adminId: payload.adminId,
            };
        }
        return null;
    } catch {
        return null;
    }
}