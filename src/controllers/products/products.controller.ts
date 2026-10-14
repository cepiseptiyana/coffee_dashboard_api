import { Request, Response } from "express";
import { productsService } from "@/services/products/products.service.ts";

export async function productsController(req: Request, res: Response) {
  try {
    const result_data = await productsService();

    return res.status(200).json({
      success: true,
      message: "Success GET data PRODUCTS",
      data: result_data,
    });
  } catch (err: any) {
    console.error("🔥 DETAIL ERROR BACKEND:", err);

    if (err.message === "USER_NOT_FOUND") {
      return res.status(404).json({
        success: false,
        message: "Pengguna tidak ditemukan",
      });
    }

    return res.status(500).json({
      success: false,
      message: "Terjadi kesalahan internal pada server.",
    });
  }
}
