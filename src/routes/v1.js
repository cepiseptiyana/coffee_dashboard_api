import { Router } from "express";

import { validateTokenUser } from "@/middlewares/userToken/validate.token.user.ts";
import { registerUserController } from "@/controllers/users/register.controller.ts";
import { validateUserRegister } from "@/middlewares/users/validate.create.user.ts";
import { CreateUserSchema } from "@/schema_validate/users/register.schema.ts";
import { loginUserController } from "@/controllers/users/login.controller.ts";
import { validateUserLogin } from "@/middlewares/users/validate.login.user.ts";
import { LoginUserSchema } from "@/schema_validate/users/login.schema.ts";
import { salesPointController } from "@/controllers/salesPoint/salesPoint.controller.ts";
import { TokenUserSchema } from "@/schema_validate/salesPoint/salesPoint.schema.ts";

const router = Router();

// ==========================================
// ===== OVERVIEW PAGE ==========================
// ==========================================
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

// ==========================================
// ===== STATSUMMARY ===========================
// ==========================================
router.get(
  "/overview/statSummary",
  validateTokenUser(TokenUserSchema),
  salesPointController,
);

export default router;
