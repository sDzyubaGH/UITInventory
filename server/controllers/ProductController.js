import { prisma } from "../service/prisma.js";
import "dotenv/config.js";

class ProductController {
  async getLatestActions(req, res, next) {
    try {
      const latestActions = await prisma.statements.findMany({
        select: {
          user: {
            select: {
              firstName: true,
              surname: true,
            },
          },
          product: {
            select: {
              name: true,
              add_date: true,
            },
          },
        },
        orderBy: {
          date: "desc",
        },
        take: 20,
      });

      res.status(200).json({ message: "Последние изменения", latestActions });
    } catch (error) {
      console.error("Ошибка запроса:", error);
      res.status(500).json({ message: "Произошла ошибка сервера" });
    }
  }

  async addStatement(req, res, next) {
    const { userId, productId, date, employee, office } = req.body;

    try {
      const createdStatement = await prisma.statements.create({
        data: {
          userId,
          productId,
          date,
          employee,
          office,
        },
      });

      res.status(200).json({
        message: "Данные успешно добавлены",
        statement: createdStatement,
      });
    } catch (error) {
      console.error("Ошибка при добавлении данных:", error);
      res.status(500).json({ message: "Произошла ошибка сервера" });
    }
  }

  async postProduct(req, res, next) {
    const { name, quantity, add_date } = req.body;
    try {
      const addProduct = await prisma.product.create({
        data: {
          name,
          quantity,
          add_date,
        },
      });
      res.status(200).json({
        message: `Товар добавлен на склад`,
        addProduct,
      });
    } catch (error) {
      res.status(400).json({ message: "Типовое значение" });
    }
  }

  async getFullProduct(req, res, next) {
    try {
      const fullProduct = await prisma.product.findMany();
      if (fullProduct.length === 0) {
        res.status(404).json({ message: "База данных пуста" });
      }
      res.status(200).json({ message: "Список всех товаров", fullProduct });
    } catch (error) {
      console.error("Ошибка при получении списка товаров:", error);
      res.status(400).json({ message: "Ошибка" });
    }
  }
}
export const prodController = new ProductController();