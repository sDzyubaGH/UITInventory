import { Router } from "express";
import { authController } from "../controllers/AuthController.js";
import { check } from "express-validator";
import authMiddleware from "../middleware/authMiddleware.js";

const authRouter = new Router();
authRouter.post(
  "/registration",
  [
    check("login", "Логин не может быть пустым").notEmpty(),
    check(
      "password",
      "Пароль не может быть пустым и меньше 4 символов"
    ).isLength({ min: 4 }),
  ],
  authController.registration
);
authRouter.post(
  "/login",
  [
    check("login", "Логин не может быть пустым").notEmpty(),
    check("password", "Пароль не может быть пустым").notEmpty(),
  ],
  authController.login
);

authRouter.get("/auth", authMiddleware, authController.check);

export default authRouter;
