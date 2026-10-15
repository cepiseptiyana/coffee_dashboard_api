import { Request, Response, NextFunction } from "express";
import { ZodObject, ZodError } from "zod";
import jwt from "jsonwebtoken";

// Menambahkan tipe data kustom ke Express Request agar TypeScript tidak error saat memakai req.user
declare global {
  namespace Express {
    interface Request {
      user?: any;
    }
  }
}

export function validateTokenUser(schema: ZodObject) {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      await schema.parseAsync({
        headers: req.headers,
      });

      const authHeader = req.headers.authorization;

      if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({
          success: false,
          message: "Akses ditolak. Token tidak disediakan atau format salah.",
        });
      }

      const parts = authHeader.split(" ");
      const token = parts[1];

      if (!token) {
        return res.status(401).json({
          success: false,
          message: "Akses ditolak. Format token tidak valid.",
        });
      }

      const jwtSecret = process.env.JWT_SECRET || "rahasia_aku";
      const decodedUser = jwt.verify(token, jwtSecret);
      req.user = decodedUser;

      next();
    } catch (error) {
      if (error instanceof ZodError) {
        return res.status(400).json({
          success: false,
          message: "Validasi format token gagal",
          errors: error.issues.map((issue) => ({
            field: issue.path[1],
            message: issue.message,
          })),
        });
      }

      if (
        error instanceof jwt.JsonWebTokenError ||
        error instanceof jwt.TokenExpiredError
      ) {
        return res.status(401).json({
          success: false,
          message:
            error instanceof jwt.TokenExpiredError
              ? "Token telah kedaluwarsa"
              : "Token tidak valid / tidak dikenali",
        });
      }

      next(error);
    }
  };
}
