import { validationResult } from "express-validator";
import { prisma } from "../service/prisma.js";
import "dotenv/config.js";

class ProductController {
  async getLatestActions(req, res, next) {
    try {
      const latest = await prisma.actions.findMany({
        take: 20,
        include: {
          user: {
            select: {
              id: true,
              firstName: true,
              surname: true,
              position: true,
            },
          },
          product: true,
        },
        orderBy: { id: "desc" },
      });
      res.status(200).json({ message: "Последние изменения", latest });
    } catch (error) {
      console.error("Ошибка запроса:", error);
      res.status(500).json({ message: "Произошла ошибка сервера" });
    }
  }

  async addStatement(req, res, next) {
    const { userId, productId, date, employee, office } = req.body;
    try {
      const createdStatement = await prisma.actions.create({
        data: {
          userId,
          productId,
          date,
          employee,
          office,
          date,
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
    const result = validationResult(req);
    if (!result.isEmpty()) {
      return res.status(400).json({ errors: result.array() });
    }
    const { name, quantity, add_date, userId } = req.body;
    try {
      const addProduct = await prisma.product.create({
        data: {
          users: {
            create: {
              userId: userId,
            },
          },
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
      console.log("error", error);
      res.status(400).json({ message: "Типовое значение" });
    }
  }

  async getFullProduct(req, res, next) {
    const { take, skip } = req.query;
    try {
      const fullProduct = await prisma.actions.findMany({
        take: parseInt(take) || 10,
        skip: parseInt(skip) || 0,

        where: {
          type: "ADD",
        },
        include: {
          user: {
            select: {
              id: true,
              firstName: true,
              surname: true,
              position: true,
            },
          },
          product: true,
        },
        orderBy: { id: "desc" },
      });
      return res.status(200).json(fullProduct);
    } catch (error) {
      console.error("Ошибка при получении списка товаров:", error);
      res.status(400).json({ message: "Ошибка" });
    }
  }

  async searchProducts(req, res, next) {
    const { name } = req.query;

    try {
      const fullProduct = await prisma.actions.findMany({
        orderBy: { id: "desc" },
        include: {
          product: true,
          user: true,
        },
      });

      const filteredProducts = fullProduct.filter((ac) => {
        const p = ac.product;
        if (p.name.toLowerCase().indexOf(name.toLowerCase()) !== -1)
          return true;
        else return false;
      });

      const result = [];
      for (const ac of filteredProducts) {
        const toTransform = new Date(ac.product.add_date);
        const formattedDate = `${toTransform.getUTCDate()}.${
          toTransform.getUTCMonth() + 1
        }.${toTransform.getUTCFullYear()}`;

        result.push({
          ...ac.product,
          add_date: formattedDate,
          customerFullName: `${ac.user.firstName} ${ac.user.surname}`,
        });
      }
      return res.status(200).json(result);
    } catch (error) {
      console.error("Ошибка при получении списка товаров:", error);
      res.status(400).json({ message: "Ошибка" });
    }
  }

  async searchCustomers(req, res, next) {
    const { name } = req.query;
    try {
      const fullCustomer = await prisma.actions.findMany({
        orderBy: { id: "desc" },
        include: {
          product: true,
          user: true,
        },
      });

      const filteredCustomers = fullCustomer.filter((ac) => {
        const customer = ac.user;
        const customerFullName = `${customer.firstName} ${customer.surname}`;

        if (customerFullName.toLowerCase().includes(name.toLowerCase())) {
          return true;
        } else {
          return false;
        }
      });

      const result = filteredCustomers.map((ac) => ({
        ...ac.product,
        customerFullName: `${ac.user.firstName} ${ac.user.surname}`,
      }));

      res.status(200).json(result);
    } catch (error) {
      console.error("Ошибка при получении списка пользователей:", error);
      res.status(400).json({ message: "Ошибка" });
    }
  }

  async deleteProduct(req, res, next) {
    try {
      const deleteProduct = await prisma.actions.delete({});
      return res.status(200).json({ message: "Товар удален" });
    } catch (error) {
      console.error("Ошибка невозможно удалить", error);
      req.status(400).json({ message: "Ошибка" });
    }
  }
}
export const prodController = new ProductController();
