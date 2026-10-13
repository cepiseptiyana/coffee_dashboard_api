// Lapisan HTTP: baca request, panggil service, kirim response.
import { Request, Response } from "express";
import jwt from "jsonwebtoken";

import { loginUserService } from "@/services/users/login.service.ts";
const JWT_SECRET = process.env.JWT_SECRET || "";

export async function loginUserController(req: Request, res: Response) {
  try {
    const { email, password } = req.body;
    const result_data_user = await loginUserService({ email, password });
    console.log("RESULT DATA : ", result_data_user);

    const token = jwt.sign(
      { id: result_data_user.id, role: "user" },
      JWT_SECRET,
      { expiresIn: "1d" },
    );

    return res.status(200).json({
      success: true,
      message: "Login berhasil",
      data: {
        id: result_data_user.id,
        email: result_data_user.email,
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

    return res.status(500).json({
      success: false,
      message: "Terjadi kesalahan internal pada server.",
    });
  }
}
