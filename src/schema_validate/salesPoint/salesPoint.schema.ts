import { z } from "zod";

export const TokenUserSchema = z.object({
  headers: z.object({
    authorization: z
      .string({ message: "Header Authorization wajib disertakan" })
      .regex(/^Bearer \S+$/, {
        message: "Format token harus 'Bearer <token>'",
      }),
  }),
});
