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

    // const isPasswordValid = await bcrypt.compare(
    //   payload.password,
    //   user.password,
    // );

    if (!isPasswordValid) {
      throw new Error("INVALID_PASSWORD");
    }

    return user;
  } catch (err) {
    if (err instanceof Prisma.PrismaClientKnownRequestError) {
      if (err.code === "P2002") {
        throw new Error("EMAIL_NOT_FOUND");
      }
    }

    throw err;
  }
}
