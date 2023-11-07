import { Router } from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import { prodController } from "../controllers/ProductController.js";
import { check } from "express-validator";
import multer from "multer";
import "dotenv/config";
import { prisma } from "../service/prisma.js";
import path from "path";
import fs from "fs";

const productRouter = new Router();
const storage = multer.diskStorage({
  destination: async function (req, file, cb) {
    const filePath = path.join(
      `${process.env.FILES_PATH}`,
      new Date().getTime().toString()
    );

    if (!fs.existsSync(filePath)) fs.mkdirSync(filePath);

    return cb(null, filePath);
  },
  filename: function (req, file, cb) {
    return cb(null, file.originalname);
  },
});

const upload = multer({ storage });

productRouter.post(
  "/addProduct",
  // [
  //   check("productName", "Это поле не может быть пустым").notEmpty(),
  //   check("quantity", "Это поле не может быть пустым").notEmpty(),
  // ],
  authMiddleware,
  upload.array("files", 3),
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

productRouter.delete(
  "/deleteProduct",
  authMiddleware,
  prodController.deleteProduct
);

productRouter.get("/filterDate", authMiddleware, prodController.filterDate);

// productRouter.post("/upload", authMiddleware, prodController.postUploadFile);

productRouter.get(
  "/searchCustomers",
  authMiddleware,
  prodController.searchCustomers
);
export default productRouter;
