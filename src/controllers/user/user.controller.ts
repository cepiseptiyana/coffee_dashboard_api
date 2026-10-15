import { Request, Response } from "express";
import { userService } from "@/services/user/user.service.ts";

export async function userController(req: Request, res: Response) {
  try {
    const { id } = req.user;
    const result_data = await userService(id);

    if (!result_data || result_data instanceof Error) {
      return res.status(404).json({
        success: false,
        message: "User tidak ditemukan atau terjadi kesalahan",
      });
    }

    const data_user = {
      id: result_data?.id,
      name: result_data?.name,
      email: result_data?.email,
      created_at: result_data?.created_at,
    };

    return res.status(200).json({
      success: true,
      message: "Success GET data USER",
      data: data_user,
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
