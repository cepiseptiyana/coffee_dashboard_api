import { Request, Response } from "express";
import { statSummariesService } from "@/services/statSummaries/statSummaries.service";

export async function statSummariesController(req: Request, res: Response) {
  try {
    const result_data = await statSummariesService();

    return res.status(200).json({
      success: true,
      message: "success GET data STAT_SUMMARY",
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
