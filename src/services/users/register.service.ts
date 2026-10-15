import { PrismaMariaDb } from "@prisma/adapter-mariadb";
import { PrismaClient, Prisma } from "@@generated/prisma/client.ts";
import { UserCreateArgs } from "@@generated/prisma/models";

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

export async function createUserService(payload: {
  name: string;
  email: string;
  password: string;
}) {
  try {
    const existingUser = await prisma.user.findUnique({
      where: { email: payload.email },
    });

    if (existingUser) {
      throw new Error("EMAIL_ALREADY_EXISTS");
    }

    const newUser = await prisma.user.create<UserCreateArgs>({
      data: {
        name: payload.name,
        email: payload.email,
        password: payload.password,
      },
    });

    return newUser;
  } catch (err) {
    if (err instanceof Prisma.PrismaClientKnownRequestError) {
      switch (err.code) {
        case "P2002":
          throw new Error("EMAIL_ALREADY_EXISTS");
        case "P2000":
          throw new Error("VALUE_TOO_LONG");
        case "P2011":
        case "P2012":
          throw new Error("REQUIRED_FIELD_MISSING");
        case "P2021":
          throw new Error("TABLE_NOT_FOUND");
        case "P2022":
          throw new Error("COLUMN_NOT_FOUND");
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

    // Argumen query salah
    if (err instanceof Prisma.PrismaClientValidationError) {
      throw new Error("INVALID_QUERY");
    }

    throw err;
  }
}
