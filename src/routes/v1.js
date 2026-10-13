import { Router } from "express";

import { registerUserController } from "@/controllers/users/register.controller.ts";
import { validateUserRegister } from "@/middlewares/users/validate.create.user.ts";
import { CreateUserSchema } from "@/schema_validate/users/register.schema.ts";
import { loginUserController } from "@/controllers/users/login.controller.ts";
import { validateUserLogin } from "@/middlewares/users/validate.login.user.ts";
import { LoginUserSchema } from "@/schema_validate/users/login.schema.ts";

const router = Router();

// Daftarkan setiap modul baru di sini
// router.use("/stats", statsRoutes);
router.post(
  "/auth/register",
  validateUserRegister(CreateUserSchema),
  registerUserController,
);
router.post(
  "/auth/login",
  validateUserLogin(LoginUserSchema),
  loginUserController,
);

export default router;
