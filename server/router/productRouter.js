import { Router } from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import { prodController } from "../controllers/ProductController.js";
import { check } from "express-validator";
import multer from "multer";
import "dotenv/config";
import { storage } from "../multer.js";

const productRouter = new Router();

const upload = multer({ storage });

productRouter.post(
  "/addProduct",
  authMiddleware,
  upload.array("files", 3), // Максимальное количество загружаемых файлов
  prodController.postProduct
); // Добавление товара

productRouter.get("/allProduct", authMiddleware, prodController.getFullProduct); //Получение всех товаров на складе

productRouter.get(
  "/searchProducts",
  authMiddleware,
  prodController.searchProducts
); //Получение всех товаров на складе

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

productRouter.post(
  "/delete",
  authMiddleware,
  upload.none(),
  prodController.deleteProduct
); // Выписка товаров

productRouter.get("/filterDate", authMiddleware, prodController.filterDate); // Фильтр по дате

productRouter.get(
  "/searchCustomers",
  authMiddleware,
  prodController.searchCustomers
); // Поиск по сотрудникам

productRouter.get(
  "/allCustomers",
  authMiddleware,
  prodController.getAllCustomers
);

export default productRouter;
