import { z } from "zod";

export const LoginUserSchema = z.object({
  body: z.object({
    email: z
      .email({ message: "Format email tidak valid" })
      .min(1, { message: "Email tidak boleh kosong" })
      .trim()
      .toLowerCase(),

    password: z
      .string({ message: "Password wajib diisi" })
      .min(1, { message: "Password tidak boleh kosong" }),
  }),
});
