import { Router } from "express";
import { authController } from "../controllers/AuthController.js";
import { check } from "express-validator";
import authMiddleware from "../middleware/authMiddleware.js";
import validationMiddleware from "../middleware/validationMiddleware.js";

const authRouter = new Router();

authRouter.post(
  "/registration",
  [
    check("login", "Логин не может быть пустым").notEmpty(),
    check(
      "password",
      "Пароль не может быть пустым и меньше 4 символов"
    ).isLength({ min: 4 }),
    check("firstName", "Это поле не может быть пустым").notEmpty(),
    check("surname", "Это поле не может быть пустым").notEmpty(),
  ],
  validationMiddleware,
  authController.registration
);

authRouter.post(
  "/login",
  [
    check("login", "Логин не может быть пустым").notEmpty(),
    check("password", "Пароль не может быть пустым").notEmpty(),
  ],
  validationMiddleware,
  authController.login
);

authRouter.get("/auth", authMiddleware, authController.check);

export default authRouter;
