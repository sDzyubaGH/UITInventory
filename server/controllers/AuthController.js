import { prisma } from "../service/prisma.js";
import express from "express";
import "dotenv/config";
import bcryptjs, { hash } from "bcrypt";
import { validationResult } from "express-validator";
import { token } from "../service/token-service.js";

class AuthController {
  async registration(req, res, next) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res
          .status(400)
          .json({ message: "Ошибка при регистрации", errors });
      }
      const { login, password } = req.body;
      const candidate = await prisma.user.findFirst({ where: { login } });
      if (candidate) {
        return res.status(400).json({
          message: `Пользователь с таким именем уже существует`,
        });
      }
      const pswdHash = await hash(password, 8);
      const user = await prisma.user.create({
        data: { login, password: pswdHash },
      });
      res.status(200).send(user);
    } catch (error) {
      console.log(error);
      res.status(400).json({ message: "Registration error" });
    }
  }
  async login(req, res, next) {
    try {
      const { login, password } = req.body;
      const user = await prisma.user.findFirst({ where: { login } });
      if (!user) {
        return res
          .status(400)
          .json({ message: `Пользователь ${login} не найден` });
      }
      const validPassword = bcryptjs.compareSync(password, user.password);
      if (!validPassword) {
        return res.status(400).json({ message: "Неверный пароль" });
      }
      const accessToken = token.generateTokens(user.id);

      return res.status(200).json({ accessToken });
    } catch (error) {
      console.log(error);
      res.status(400).json({ message: "Login error" });
    }
  }
  async logout(req, res, next) {
    try {
    } catch (error) {}
  }
  async refresh(req, res, next) {
    try {
    } catch (error) {}
  }
  async check(req, res, next) {
    try {
      const accessTokentoken = token.generateTokens(req.user.id);
      return res.json({ accessTokentoken });
    } catch (error) {}
  }
}

export const authController = new AuthController();
