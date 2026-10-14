import { PrismaMariaDb } from "@prisma/adapter-mariadb";
import { PrismaClient, Prisma } from "@@generated/prisma/client.ts";

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

export async function ordersService() {
  try {
    const data = await prisma.order.findMany({
      orderBy: {
        id: "asc",
      },
      include: {
        customer: {
          select: {
            name: true,
          },
        },
        orderItems: {
          include: {
            product: true,
          },
        },
      },
    });

    return data;
  } catch (err) {
    if (err instanceof Prisma.PrismaClientKnownRequestError) {
      if (err.code === "P2002") {
        throw new Error("USER_TOKEN_NOT_FOUND");
      }
    }

    throw err;
  }
}
