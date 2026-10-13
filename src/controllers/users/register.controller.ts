// Lapisan HTTP: baca request, panggil service, kirim response.
import { Request, Response } from "express";
import { createUserService } from "@/services/users/register.service.ts";

export async function registerUserController(req: Request, res: Response) {
  try {
    const { name, email, password } = req.body;
    const result_data_user = await createUserService({ name, email, password });

    return res.status(201).json({
      success: true,
      message: "Registrasi user baru berhasil",
      data: {
        id: result_data_user.id,
        email: result_data_user.email,
        created_at: result_data_user.created_at,
      },
    });
  } catch (err: any) {
    console.error("🔥 DETAIL ERROR REGISTRASI BACKEND:", err);

    if (err.message === "EMAIL_ALREADY_EXISTS") {
      return res.status(400).json({
        success: false,
        message: "Email tersebut sudah terdaftar, silakan gunakan email lain.",
      });
    }

    return res.status(500).json({
      success: false,
      message: "Terjadi kesalahan internal pada server.",
    });
  }
}
