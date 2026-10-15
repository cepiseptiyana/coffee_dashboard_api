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

export async function salesPointService() {
  try {
    const data = await prisma.salesTrend.findMany({
      orderBy: {
        id: "asc",
      },
    });

    return data;
  } catch (err) {
    if (err instanceof Prisma.PrismaClientKnownRequestError) {
      switch (err.code) {
        case "P2021":
          return new Error("TABLE_NOT_FOUND");
        case "P2022":
          return new Error("COLUMN_NOT_FOUND");
        case "P2023":
          return new Error("INCONSISTENT_DATA");
        case "P2024":
          return new Error("DB_POOL_TIMEOUT");
      }
    }

    throw err;
  }
}
