// Lapisan HTTP: baca request, panggil service, kirim response.
import { Request, Response } from "express";
import jwt from "jsonwebtoken";

import { loginUserService } from "@/services/users/login.service.ts";
const JWT_SECRET = process.env.JWT_SECRET || "";

export async function loginUserController(req: Request, res: Response) {
  try {
    const { email, password } = req.body;
    const result_data = await loginUserService({ email, password });

    const token = jwt.sign(
      {
        id: result_data.id,
        email: result_data.email,
        role: "admin",
      },
      JWT_SECRET,
      {
        expiresIn: "8h",
      },
    );

    return res.status(200).json({
      success: true,
      message: "Login berhasil",
      data: {
        id: result_data.id,
        name: result_data.name,
        email: result_data.email,
      },
      token,
    });
  } catch (err: any) {
    console.error("🔥 DETAIL ERROR Login BACKEND:", err);

    if (err.message === "EMAIL_NOT_FOUND") {
      return res.status(401).json({
        status: false,
        message: "EMAIL_NOT_FOUND",
      });
    }

    if (err.message === "INVALID_PASSWORD") {
      return res.status(401).json({
        status: false,
        message: "INVALID_PASSWORD",
      });
    }

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
