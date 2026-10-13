import { z } from "zod";

export const CreateUserSchema = z.object({
  body: z.object({
    name: z
      .string({ message: "Nama wajib diisi" })
      .trim()
      .min(1, { message: "Nama tidak boleh kosong" })
      .min(3, { message: "Nama minimal 3 karakter" })
      .max(50, { message: "Nama maksimal 50 karakter" }),

    email: z
      .email({ message: "Format email tidak valid" })
      .max(50, { message: "Email maksimal 50 karakter" })
      .trim()
      .toLowerCase(),

    password: z
      .string()
      .min(1, { message: "Password wajib diisi" })
      .min(8, { message: "Password minimal 8 karakter demi keamanan" })
      .max(100, { message: "Password maksimal 100 karakter" }),
  }),
});

export const GetUserParamsSchema = z.object({
  params: z.object({
    id: z.coerce
      .number({ message: "ID harus berupa angka" })
      .int({ message: "ID harus berupa bilangan bulat" })
      .positive({ message: "ID tidak boleh minus atau nol" }),
  }),
});
