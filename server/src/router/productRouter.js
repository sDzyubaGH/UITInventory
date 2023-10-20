import { Router } from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import { prodController } from "../controllers/ProductController.js";
import { check } from "express-validator";

const productRouter = new Router();
productRouter.post(
  "/addProduct",
  [
    check("name", "Это поле не может быть пустым").notEmpty(),
    check("quantity", "Это поле не может быть пустым").notEmpty(),
  ],
  authMiddleware,
  prodController.postProduct
); // Добавление товара
productRouter.get("/allProduct", authMiddleware, prodController.getFullProduct); //Получение всех товаров на складе
productRouter.get(
  "/latestAction",
  authMiddleware,
  prodController.getLatestActions
); // Получение послдених изменений
productRouter.post(
  "/addStatements",
  authMiddleware,
  prodController.addStatement
); // Добавление информации о пользователе и товаре
export default productRouter;
