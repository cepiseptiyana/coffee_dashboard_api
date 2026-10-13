import { Request, Response } from "express";
import { salesPointService } from "@/services/salesPoint/salesPoint.service";

export async function salesPointController(req: Request, res: Response) {
  try {
    const userId = req.user;
    const result_data = await salesPointService();
    console.log("ISI RESULT_DATA SALES : ", result_data);

    return res.status(200).json({
      success: true,
      message: "Berhasil mengambil ringkasan data",
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
