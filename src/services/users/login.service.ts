import { PrismaMariaDb } from "@prisma/adapter-mariadb";
import { PrismaClient, Prisma } from "@@generated/prisma/client.ts";
import bcrypt from "bcrypt";

const url = new URL(process.env.DATABASE_URL || "");

const adapter = new PrismaMariaDb({
  host: url.hostname,
  port: Number(url.port) || 3306,
  user: decodeURIComponent(url.username),
  password: decodeURIComponent(url.password),
  database: url.pathname.slice(1),
  connectionLimit: 5,
});

const prisma = new PrismaClient({ adapter });

export async function loginUserService(payload: {
  email: string;
  password: string;
}) {
  try {
    const user = await prisma.user.findUnique({
      where: { email: payload.email },
    });

    if (!user) {
      throw new Error("EMAIL_NOT_FOUND");
    }

    const isPasswordValid = payload.password === user.password;

    if (!isPasswordValid) {
      throw new Error("INVALID_PASSWORD");
    }

    return user;
  } catch (err) {
    if (err instanceof Prisma.PrismaClientKnownRequestError) {
      switch (err.code) {
        case "P2021":
          throw new Error("TABLE_NOT_FOUND");
        case "P2022":
          throw new Error("COLUMN_NOT_FOUND");
        case "P2023":
          throw new Error("INCONSISTENT_DATA");
        case "P2024":
          throw new Error("DB_POOL_TIMEOUT");
        default:
          throw err;
      }
    }

    // Database mati, host atau password salah
    if (err instanceof Prisma.PrismaClientInitializationError) {
      throw new Error("DB_UNREACHABLE");
    }

    // Argumen query salah (misalnya email: undefined)
    if (err instanceof Prisma.PrismaClientValidationError) {
      throw new Error("INVALID_QUERY");
    }

    throw err;
  }
}
