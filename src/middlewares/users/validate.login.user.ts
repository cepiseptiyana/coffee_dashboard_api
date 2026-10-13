import { Request, Response, NextFunction } from "express";
import { ZodObject, ZodError } from "zod";

export function validateUserLogin(schema: ZodObject) {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const parsed = await schema.parseAsync({
        body: req.body,
      });

      req.body = parsed.body;
      next();
    } catch (error) {
      if (error instanceof ZodError) {
        return res.status(400).json({
          success: false,
          message: "Validasi input gagal",
          errors: error.issues.map((issue: any) => ({
            field: issue.path[1],
            message: issue.message,
          })),
        });
      }

      next(error);
    }
  };
}
