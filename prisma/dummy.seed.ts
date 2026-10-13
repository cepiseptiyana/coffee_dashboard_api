interface MenuItem {
  key: string;
  icon: string;
  label: string;
  children?: MenuItem[];
}

type TrendDirection = "up" | "down" | "flat";

interface StatSummary {
  id: string;
  title: string;
  value: number;
  prefix?: string;
  suffix?: string;
  trend: TrendDirection;
  trendValue: string;
  description: string;
}

interface SalesPoint {
  date: string; // format: "2026-07-01"
  revenue: number;
  cupsSold: number;
}

interface ProductCategorySales {
  category: string;
  value: number;
}

interface HourlyTraffic {
  hour: string; // "08:00"
  customers: number;
}

type ProductStatus = "tersedia" | "stok menipis" | "habis";

interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  sold: number;
  stock: number;
  status: ProductStatus;
}

type OrderStatus = "selesai" | "diproses" | "dibatalkan";
type OrderChannel = "dine-in" | "take-away" | "online";

interface Order {
  id: string;
  customer: string;
  items: string;
  total: number;
  channel: OrderChannel;
  status: OrderStatus;
  createdAt: string; // ISO datetime
}

interface Customer {
  id: string;
  name: string;
  email: string;
  totalOrders: number;
  totalSpent: number;
  memberSince: string;
  tier: "Reguler" | "Silver" | "Gold";
}

export const PRODUCTS: Product[] = [
  {
    id: "P-001",
    name: "Espresso Tonic",
    category: "Espresso Based",
    price: 28000,
    sold: 214,
    stock: 40,
    status: "tersedia",
  },
  {
    id: "P-002",
    name: "Caramel Macchiato",
    category: "Espresso Based",
    price: 32000,
    sold: 198,
    stock: 12,
    status: "stok menipis",
  },
  {
    id: "P-003",
    name: "V60 Ethiopia Yirgacheffe",
    category: "Manual Brew",
    price: 35000,
    sold: 87,
    stock: 25,
    status: "tersedia",
  },
  {
    id: "P-004",
    name: "Matcha Latte",
    category: "Non-Coffee",
    price: 30000,
    sold: 132,
    stock: 30,
    status: "tersedia",
  },
  {
    id: "P-005",
    name: "Butter Croissant",
    category: "Pastry",
    price: 22000,
    sold: 156,
    stock: 0,
    status: "habis",
  },
  {
    id: "P-006",
    name: "Cold Brew Original",
    category: "Cold Brew",
    price: 27000,
    sold: 121,
    stock: 18,
    status: "tersedia",
  },
  {
    id: "P-007",
    name: "Vietnam Drip",
    category: "Manual Brew",
    price: 24000,
    sold: 74,
    stock: 8,
    status: "stok menipis",
  },
  {
    id: "P-008",
    name: "Chocolate Croissant",
    category: "Pastry",
    price: 25000,
    sold: 98,
    stock: 22,
    status: "tersedia",
  },
];

export const CUSTOMERS: Customer[] = [
  {
    id: "CUS-01",
    name: "Rangga Pratama",
    email: "rangga.p@mail.com",
    totalOrders: 42,
    totalSpent: 1580000,
    memberSince: "2024-02-10",
    tier: "Gold",
  },
  {
    id: "CUS-02",
    name: "Nadia Salsabila",
    email: "nadia.s@mail.com",
    totalOrders: 27,
    totalSpent: 890000,
    memberSince: "2024-08-22",
    tier: "Silver",
  },
  {
    id: "CUS-03",
    name: "Farhan Hidayat",
    email: "farhan.h@mail.com",
    totalOrders: 15,
    totalSpent: 420000,
    memberSince: "2025-01-15",
    tier: "Reguler",
  },
  {
    id: "CUS-04",
    name: "Citra Ayu",
    email: "citra.a@mail.com",
    totalOrders: 63,
    totalSpent: 2340000,
    memberSince: "2023-11-03",
    tier: "Gold",
  },
  {
    id: "CUS-05",
    name: "Bagas Wirawan",
    email: "bagas.w@mail.com",
    totalOrders: 8,
    totalSpent: 210000,
    memberSince: "2025-05-30",
    tier: "Reguler",
  },
];

export const ORDERS: Order[] = [
  {
    id: "ORD-1042",
    customer: "Rangga Pratama",
    items: "2x Espresso Tonic, 1x Croissant",
    total: 78000,
    channel: "dine-in",
    status: "selesai",
    createdAt: "2026-07-07T09:12:00",
  },
  {
    id: "ORD-1043",
    customer: "Nadia Salsabila",
    items: "1x Matcha Latte",
    total: 30000,
    channel: "online",
    status: "diproses",
    createdAt: "2026-07-07T09:20:00",
  },
  {
    id: "ORD-1044",
    customer: "Farhan Hidayat",
    items: "1x V60 Ethiopia, 1x Cold Brew",
    total: 62000,
    channel: "take-away",
    status: "selesai",
    createdAt: "2026-07-07T09:35:00",
  },
  {
    id: "ORD-1045",
    customer: "Citra Ayu",
    items: "3x Caramel Macchiato",
    total: 96000,
    channel: "dine-in",
    status: "selesai",
    createdAt: "2026-07-07T09:50:00",
  },
  {
    id: "ORD-1046",
    customer: "Bagas Wirawan",
    items: "1x Vietnam Drip",
    total: 24000,
    channel: "online",
    status: "dibatalkan",
    createdAt: "2026-07-07T10:02:00",
  },
  {
    id: "ORD-1047",
    customer: "Intan Permata",
    items: "2x Chocolate Croissant",
    total: 50000,
    channel: "take-away",
    status: "diproses",
    createdAt: "2026-07-07T10:15:00",
  },
];

export const STAT_SUMMARIES: StatSummary[] = [
  {
    id: "revenue",
    title: "Pendapatan Hari Ini",
    value: 4820000,
    prefix: "Rp",
    trend: "up",
    trendValue: "12.4%",
    description: "vs kemarin",
  },
  {
    id: "cups",
    title: "Cangkir Terjual",
    value: 386,
    suffix: "cup",
    trend: "up",
    trendValue: "8.1%",
    description: "vs kemarin",
  },
  {
    id: "orders",
    title: "Total Pesanan",
    value: 214,
    trend: "down",
    trendValue: "3.2%",
    description: "vs kemarin",
  },
  {
    id: "avg",
    title: "Rata-rata Transaksi",
    value: 22500,
    prefix: "Rp",
    trend: "flat",
    trendValue: "0.4%",
    description: "vs kemarin",
  },
];

export const SALES_TREND: SalesPoint[] = [
  { date: "01 Jul", revenue: 3800000, cupsSold: 302 },
  { date: "02 Jul", revenue: 4120000, cupsSold: 318 },
  { date: "03 Jul", revenue: 3950000, cupsSold: 296 },
  { date: "04 Jul", revenue: 4460000, cupsSold: 344 },
  { date: "05 Jul", revenue: 4780000, cupsSold: 361 },
  { date: "06 Jul", revenue: 4390000, cupsSold: 329 },
  { date: "07 Jul", revenue: 4820000, cupsSold: 386 },
];

export const HOURLY_TRAFFIC: HourlyTraffic[] = [
  { hour: "07:00", customers: 12 },
  { hour: "08:00", customers: 28 },
  { hour: "09:00", customers: 34 },
  { hour: "10:00", customers: 22 },
  { hour: "11:00", customers: 18 },
  { hour: "12:00", customers: 40 },
  { hour: "13:00", customers: 46 },
  { hour: "14:00", customers: 30 },
  { hour: "15:00", customers: 26 },
  { hour: "16:00", customers: 33 },
  { hour: "17:00", customers: 38 },
  { hour: "18:00", customers: 24 },
];

export const PRODUCT_CATEGORY_SALES: ProductCategorySales[] = [
  { category: "Espresso Based", value: 145 },
  { category: "Manual Brew", value: 62 },
  { category: "Non-Coffee", value: 58 },
  { category: "Pastry", value: 74 },
  { category: "Cold Brew", value: 47 },
];
