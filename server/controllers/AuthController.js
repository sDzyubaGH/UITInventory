import { prisma } from "../service/prisma.js";
import "dotenv/config.js";
import bcryptjs, { hash } from "bcrypt";
import { validationResult } from "express-validator";
import { token } from "../service/token-service.js";

class AuthController {
  async registration(req, res, next) {
    try {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        return res.status(400).json({ message: "Ошибка при регистрации", errors: errors.array() });
      }
      const { login, password, firstName, surname, position, patronymic } = req.body;
      const candidate = await prisma.user.findFirst({ where: { login } });
      if (candidate) {
        return res.status(400).json({
          message: `Пользователь с таким логином уже существует`,
        });
      }

      if (password.includes(" ")) {
        return res.status(400).json({ message: "Пароль не может содержать пробелы" });
      }

      if (login.includes(" ")) {
        return res.status(400).json({ message: "Логин не может содержать пробелы" });
      }

      if (!login || login.trim() === "") {
        return res.status(400).json({ message: "Логин не может быть пустым" });
      }

      if (!password || password.trim() === "") {
        return res.status(400).json({ message: "Пароль не может быть пустым" });
      }

      const pswdHash = await hash(password, 8);
      const user = await prisma.user.create({
        data: {
          login,
          password: pswdHash,
          firstName,
          surname,
          position,
          patronymic,
        },
      });
      const accessToken = token.generateTokens({
        id: user.id,
        lastName: user.surname,
        firstName: user.firstName,
        position: user.position,
        patronymic: user.patronymic,
      });
      res.status(200).send({ message: `Регистрация прошла успешно`, accessToken });
    } catch (error) {
      res.status(500).json({ message: "Ошибка Регистрации" });
    }
  }

  async login(req, res, next) {
    try {
      const { login, password } = req.body;
      if (password.includes(" ")) {
        return res.status(400).json({ message: "Пароль не может содержать пробелы" });
      }

      if (login.includes(" ")) {
        return res.status(400).json({ message: "Логин не может содержать пробелы" });
      }

      if (!login || login.trim() === "") {
        return res.status(400).json({ message: "Логин не может быть пустым" });
      }

      if (!password || password.trim() === "") {
        return res.status(400).json({ message: "Пароль не может быть пустым" });
      }
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
        position: user.position,
        patronymic: user.patronymic,
      });

      return res.status(200).json({ accessToken });
    } catch (error) {
      res.status(400).json({ message: "Ошибка логина" });
    }
  }

  async check(req, res, next) {
    try {
      const token = token.generateTokens(req.user.id);
      return res.status(200).json({ token });
    } catch (error) {}
  }
}

export const authController = new AuthController();
