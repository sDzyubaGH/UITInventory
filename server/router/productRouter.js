import { Router } from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import { prodController } from "../controllers/ProductController.js";
import { check } from "express-validator";

const productRouter = new Router();
// const multer = require("multer");
// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     return cb(null, "./public/Images");
//   },
//   filename: function (req, file, cb) {
//     return cb(null, `${Date.now()}`);
//   },
// });
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
