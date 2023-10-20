import { prisma } from "../service/prisma.js";
import "dotenv/config.js";
import bcryptjs, { hash } from "bcrypt";
import { validationResult } from "express-validator";
import { token } from "../service/token-service.js";
import ApiError from "../errors/ApiError.js";

class AuthController {
  async registration(req, res, next) {
    try {
      const { login, password, firstName, surname, position = null } = req.body;
      const candidate = await prisma.user.findFirst({ where: { login } });
      if (candidate) {
        return res.status(400).json({
          message: `Пользователь с таким логином уже существует`,
        });
      }
      const pswdHash = await hash(password, 8);
      const user = await prisma.user.create({
        data: { login, password: pswdHash, firstName, surname, position },
      });
      return res.status(200).send({ message: `Регистрация прошла успешно`, user });
    } catch (error) {
      next(ApiError.internal(error.message))
      // res.status(500).json({ message: "Ошибка Регистрации" });
    }
  }

  async login(req, res, next) {
    try {
      const { login, password } = req.body;
      const user = await prisma.user.findFirst({ where: { login } });
      if (!user) {
        return res.status(400).json({ message: `Пользователь ${login} не найден` });
      }

      const validPassword = bcryptjs.compareSync(password, user.password);
      if (!validPassword) {
        return res.status(400).json({ message: "Неверный пароль" });
      }

      const accessToken = token.generateTokens({
        id: user.id,
        lastName: user.surname,
        firstName: user.firstName,
      });

      return res.status(200).json({ accessToken });
    } catch (error) {
      next(ApiError.internal('LoginError:', error.message))
    }
  }

  async check(req, res, next) {
    try {
      const token = token.generateTokens(req.user.id);
      return res.status(200).json({ token });
    } catch (error) {
      next(ApiError.internal('CheckAuthError:', error.message))
    }
  }
}

export const authController = new AuthController();
