import { Request, Response } from "express";
import { trafficService } from "@/services/traffic/traffic.service.ts";

export async function trafficController(req: Request, res: Response) {
  try {
    const result_data = await trafficService();

    return res.status(200).json({
      success: true,
      message: "success GET data HOURLY_TRAFFIC",
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
