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

    if (err.message === "TABLE_NOT_FOUND") {
      return res.status(404).json({
        success: false,
        message: "TABLE_NOT_FOUND",
      });
    }

    if (err.message === "COLUMN_NOT_FOUND") {
      return res.status(404).json({
        success: false,
        message: "COLUMN_NOT_FOUND",
      });
    }

    if (err.message === "INCONSISTENT_DATA") {
      return res.status(404).json({
        success: false,
        message: "INCONSISTENT_DATA",
      });
    }

    if (err.message === "DB_POOL_TIMEOUT") {
      return res.status(404).json({
        success: false,
        message: "DB_POOL_TIMEOUT",
      });
    }

    return res.status(500).json({
      success: false,
      message: "Terjadi kesalahan internal pada server.",
    });
  }
}
