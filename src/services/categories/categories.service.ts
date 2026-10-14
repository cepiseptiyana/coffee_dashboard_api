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

export async function categoriesService() {
  try {
    if (!prisma) {
      throw new Error("DATABASE_CLIENT_NOT_INITIALIZED");
    }

    const data = await prisma.productCategorySales.findMany({
      orderBy: {
        category: "asc",
      },
    });

    return data;
  } catch (err) {
    if (err instanceof Prisma.PrismaClientKnownRequestError) {
      if (err.code === "P2021") {
        throw new Error("TABLE_NOT_FOUND_OR_INVALID_NAME");
      }

      if (err.code === "P2002") {
        throw new Error("DATA_PRODUCT_CATEGORY_NOT_FOUND");
      }
    }

    throw err;
  }
}
