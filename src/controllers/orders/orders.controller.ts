import { Request, Response } from "express";
import { ordersService } from "@/services/order/order.service.ts";

export async function ordersController(req: Request, res: Response) {
  try {
    const result_data = await ordersService();

    return res.status(200).json({
      success: true,
      message: "Success GET data Orders",
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
