import { Request, Response } from "express";
import { categoriesService } from "@/services/categories/categories.service.ts";

export async function categoriesController(req: Request, res: Response) {
  try {
    const result_data = await categoriesService();

    return res.status(200).json({
      success: true,
      message: "Success GET data CATEGORIES",
      data: result_data,
    });
  } catch (err: any) {
    console.error("🔥 DETAIL ERROR BACKEND:", err);

    if (err.message === "TABLE_NOT_FOUND_OR_INVALID_NAME") {
      return res.status(404).json({
        success: false,
        message: "TABLE_NOT_FOUND_OR_INVALID_NAME",
      });
    }

    if (err.message === "DATA_PRODUCT_CATEGORY_NOT_FOUND") {
      return res.status(404).json({
        success: false,
        message: "DATA_PRODUCT_CATEGORY_NOT_FOUND",
      });
    }

    return res.status(500).json({
      success: false,
      message: "Terjadi kesalahan internal pada server.",
    });
  }
}
