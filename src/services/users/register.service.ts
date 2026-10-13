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
      if (err.code === "P2002") {
        throw new Error("EMAIL_ALREADY_EXISTS");
      }
    }

    throw err;
  }
}
