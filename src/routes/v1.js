import { Router } from "express";

import { validateTokenUser } from "@/middlewares/userToken/validate.token.user.ts";
import { TokenUserSchema } from "@/schema_validate/salesPoint/salesPoint.schema.ts";
import { registerUserController } from "@/controllers/users/register.controller.ts";
import { validateUserRegister } from "@/middlewares/users/validate.create.user.ts";
import { CreateUserSchema } from "@/schema_validate/users/register.schema.ts";
import { loginUserController } from "@/controllers/users/login.controller.ts";
import { validateUserLogin } from "@/middlewares/users/validate.login.user.ts";
import { LoginUserSchema } from "@/schema_validate/users/login.schema.ts";
import { salesPointController } from "@/controllers/salesPoint/salesPoint.controller.ts";
import { statSummariesController } from "@/controllers/statSummaries/statSummaries.controller.ts";
import { categoriesController } from "@/controllers/categories/categories.controller.ts";
import { trafficController } from "@/controllers/traffic/traffic.controller.ts";
import { productsController } from "@/controllers/products/products.controller.ts";
import { ordersController } from "@/controllers/orders/orders.controller.ts";

const router = Router();

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

router.get(
  "/overview/stat_summaries",
  validateTokenUser(TokenUserSchema),
  statSummariesController,
);

router.get(
  "/overview/sales_trend",
  validateTokenUser(TokenUserSchema),
  salesPointController,
);

router.get(
  "/overview/categories",
  validateTokenUser(TokenUserSchema),
  categoriesController,
);

router.get(
  "/overview/traffic",
  validateTokenUser(TokenUserSchema),
  trafficController,
);

router.get(
  "/overview/products",
  validateTokenUser(TokenUserSchema),
  productsController,
);

router.get(
  "/overview/orders",
  validateTokenUser(TokenUserSchema),
  ordersController,
);

export default router;
