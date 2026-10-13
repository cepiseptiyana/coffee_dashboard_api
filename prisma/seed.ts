import "dotenv/config";
import { PrismaMariaDb } from "@prisma/adapter-mariadb";
import { PrismaClient } from "@@generated/prisma/client";

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

import {
  STAT_SUMMARIES,
  SALES_TREND,
  PRODUCT_CATEGORY_SALES,
  HOURLY_TRAFFIC,
  PRODUCTS,
  CUSTOMERS,
} from "./dummy.seed";

async function main() {
  console.log("Memulai proses seeding data massal...");

  // 1. KOSONGKAN DATABASE
  await prisma.orderItem.deleteMany({});
  await prisma.order.deleteMany({});
  await prisma.product.deleteMany({});
  await prisma.customer.deleteMany({});
  await prisma.statSummary.deleteMany({});
  await prisma.productCategorySales.deleteMany({});
  await prisma.hourlyTraffic.deleteMany({});
  await prisma.salesTrend.deleteMany({});
  console.log("Facing_up 🧹 Database berhasil dikosongkan.");

  for (const prod of PRODUCTS) {
    await prisma.product.upsert({
      where: { id: prod.id },
      update: { name: prod.name },
      create: {
        id: prod.id,
        name: prod.name,
        category: prod.category,
        price: prod.price,
        sold: prod.sold,
        stock: prod.stock,
        status: prod.status,
      },
    });
  }

  for (const cus of CUSTOMERS) {
    await prisma.customer.upsert({
      where: { email: cus.email },
      update: { name: cus.name },
      create: {
        id: cus.id,
        name: cus.name,
        email: cus.email,
        totalOrders: cus.totalOrders,
        totalSpent: cus.totalSpent,
        memberSince: new Date(cus.memberSince),
        tier: cus.tier,
      },
    });
  }

  await prisma.order.upsert({
    where: { id: "ORD-1042" },
    update: { channel: "dine-in" },
    create: {
      id: "ORD-1042",
      customerId: "CUS-01", // Rangga Pratama
      total: 78000,
      channel: "dine-in",
      status: "selesai",
      createdAt: new Date("2026-07-07T09:12:00"),
      orderItems: {
        create: [
          { productId: "P-001", quantity: 2, price: 28000 },
          { productId: "P-005", quantity: 1, price: 22000 },
        ],
      },
    },
  });

  await prisma.order.upsert({
    where: { id: "ORD-1043" },
    update: { channel: "online" },
    create: {
      id: "ORD-1043",
      customerId: "CUS-02", // Nadia Salsabila
      total: 30000,
      channel: "online",
      status: "diproses",
      createdAt: new Date("2026-07-07T09:20:00"),
      orderItems: {
        create: [{ productId: "P-004", quantity: 1, price: 30000 }],
      },
    },
  });

  await prisma.order.upsert({
    where: { id: "ORD-1044" },
    update: { channel: "take-away" },
    create: {
      id: "ORD-1044",
      customerId: "CUS-03", // Farhan Hidayat
      total: 62000,
      channel: "take-away",
      status: "selesai",
      createdAt: new Date("2026-07-07T09:35:00"),
      orderItems: {
        create: [
          { productId: "P-003", quantity: 1, price: 35000 },
          { productId: "P-006", quantity: 1, price: 27000 },
        ],
      },
    },
  });

  await prisma.order.upsert({
    where: { id: "ORD-1045" },
    update: { channel: "dine-in" },
    create: {
      id: "ORD-1045",
      customerId: "CUS-04", // Citra Ayu
      total: 96000,
      channel: "dine-in",
      status: "selesai",
      createdAt: new Date("2026-07-07T09:50:00"),
      orderItems: {
        create: [{ productId: "P-002", quantity: 3, price: 32000 }],
      },
    },
  });

  await prisma.order.upsert({
    where: { id: "ORD-1046" },
    update: { channel: "online" },
    create: {
      id: "ORD-1046",
      customerId: "CUS-05", // Bagas Wirawan
      total: 24000,
      channel: "online",
      status: "dibatalkan",
      createdAt: new Date("2026-07-07T10:02:00"),
      orderItems: {
        create: [{ productId: "P-007", quantity: 1, price: 24000 }],
      },
    },
  });

  await prisma.order.upsert({
    where: { id: "ORD-1047" },
    update: { channel: "take-away" },
    create: {
      id: "ORD-1047",
      customerId: null, // Intan Permata tidak ada di daftar CUSTOMERS master Anda
      total: 50000,
      channel: "take-away",
      status: "diproses",
      createdAt: new Date("2026-07-07T10:15:00"),
      orderItems: {
        create: [{ productId: "P-008", quantity: 2, price: 25000 }],
      },
    },
  });

  for (const stat of STAT_SUMMARIES) {
    await prisma.statSummary.upsert({
      where: { id: stat.id },
      update: { title: stat.title },
      create: {
        id: stat.id,
        title: stat.title,
        value: stat.value,
        prefix: stat.prefix || "",
        trend: stat.trend,
        trendValue: stat.trendValue,
        description: stat.description,
      },
    });
  }

  for (const [index, trend] of SALES_TREND.entries()) {
    await prisma.salesTrend.upsert({
      where: { id: index + 1 },
      update: { date: trend.date },
      create: {
        id: index + 1,
        date: trend.date,
        revenue: trend.revenue,
        cupsSold: trend.cupsSold,
      },
    });
  }

  for (const [index, traffic] of HOURLY_TRAFFIC.entries()) {
    await prisma.hourlyTraffic.upsert({
      where: { id: index + 1 },
      update: { hour: traffic.hour },
      create: {
        id: index + 1,
        hour: traffic.hour,
        customers: traffic.customers,
      },
    });
  }

  for (const pcs of PRODUCT_CATEGORY_SALES) {
    await prisma.productCategorySales.upsert({
      where: { category: pcs.category },
      update: { value: pcs.value },
      create: {
        category: pcs.category,
        value: pcs.value,
      },
    });
  }

  console.log("🎉 Seluruh rangkaian seeding selesai dengan sukses!");
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
