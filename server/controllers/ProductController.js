import { prisma } from "../service/prisma.js";
import "dotenv/config.js";
import Docxtemplater from "docxtemplater";
import PizZip from "pizzip";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

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
    let { products } = req.body;
    const { files } = req;

    console.log(products);
    console.log(!files);

    if (!products.length) {
      return res.status(400).json({ message: "Добавьте товары" });
    }

    if (!files.length) {
      return res.status(400).json({
        message: "Загрузите файл",
      });
    }
    products = JSON.parse(products);

    const Type = {
      INVOICE: "INVOICE",
      MEMO: "MEMO",
    };

    const filePath = files.map((item) => {
      return item.path;
    });

    try {
      for (const product of products) {
        const addProduct = await prisma.product.create({
          data: {
            users: {
              create: {
                userId: product.userId,
              },
            },
            files: {
              create: {
                filepath: filePath.join(";"),
                type: Type.INVOICE,
              },
            },
            name: product.productName,
            quantity: parseInt(product.quantity),
          },
        });
      }
      res.status(200).json({
        message: `Товары добавлены на склад`,
      });
    } catch (error) {
      console.log("error", error);
      res.status(400).json({ message: "Типовое значение" });
    }
  }

  async getFullProduct(req, res, next) {
    const { take, skip, includeZeroQuantity } = req.query;

    const withoutZero = {
      type: "ADD",
      product: {},
    };

    if (includeZeroQuantity === "false") {
      withoutZero.product.quantity = {
        not: 0,
      };
    } // только для выписки

    try {
      const fullProduct = await prisma.actions.findMany({
        take: parseInt(take) || 10,
        skip: parseInt(skip) || 0,

        where: withoutZero,
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

      const result = fullProduct.map((ac) => {
        const toTransform = new Date(ac.product.add_date);
        const formattedDate = `${toTransform.getUTCDate()}.${
          toTransform.getUTCMonth() + 1
        }.${toTransform.getUTCFullYear()}`;

        return {
          ...ac.product,
          customerFullName: `${ac.user.firstName} ${ac.user.surname}`,
          add_date: formattedDate,
        };
      });
      return res.status(200).json(result);
    } catch (error) {
      console.error("Ошибка при получении списка товаров:", error);
      res.status(400).json({ message: "Ошибка" });
    }
  }

  async searchProducts(req, res, next) {
    const { name, includeZeroQuantity } = req.query;

    const withoutZero = {
      type: "ADD",
      product: {},
    };

    if (includeZeroQuantity === "false") {
      withoutZero.product.quantity = {
        not: 0,
      };
    }

    try {
      const fullProduct = await prisma.actions.findMany({
        orderBy: { id: "desc" },
        where: withoutZero,
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

      const result = filteredCustomers.map((ac) => {
        const toTransform = new Date(ac.product.add_date);
        const formattedDate = `${toTransform.getUTCDate()}.${
          toTransform.getUTCMonth() + 1
        }.${toTransform.getUTCFullYear()}`;
        return {
          ...ac.product,
          customerFullName: `${ac.user.firstName} ${ac.user.surname}`,
          add_date: formattedDate,
        };
      });

      res.status(200).json(result);
    } catch (error) {
      console.error("Ошибка при получении списка пользователей:", error);
      res.status(400).json({ message: "Ошибка" });
    }
  }

  async filterDate(req, res, next) {
    let { startDate, endDate } = req.query;

    const MIN_DATE = new Date("2000-01-01");
    const MAX_DATE = new Date("3000-01-01");

    let startD = new Date(startDate);
    let endD = new Date(endDate);

    if (!isDate(startD)) {
      startD = null;
    }

    if (!isDate(endD)) {
      endD = null;
    }

    // Если даты фильтрации совпадают и полностью захватывает день
    if (startD && endD) {
      const [year, month, day] = [
        endD.getFullYear(),
        endD.getMonth(),
        endD.getDate(),
      ];
      endD = new Date(year, month, day + 1);
    }
    try {
      const fullProduct = await prisma.actions.findMany({
        where: {
          type: "ADD",
          product: {
            add_date: {
              gte: startD || MIN_DATE,
              lte: endD || MAX_DATE,
            },
          },
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

      const result = fullProduct.map((ac) => {
        const toTransform = new Date(ac.product.add_date);
        const formattedDate = `${toTransform.getUTCDate()}.${
          toTransform.getUTCMonth() + 1
        }.${toTransform.getUTCFullYear()}`;
        return {
          ...ac.product,
          customerFullName: `${ac.user.firstName} ${ac.user.surname}`,
          add_date: formattedDate,
        };
      });
      return res.status(200).json(result);
    } catch (error) {
      console.error("Ошибка при получении списка товаров:", error);
      res.status(400).json({ message: "Ошибка" });
    }
  }

  async deleteProduct(req, res, next) {
    console.log("Request body:", req.body);
    let { products } = req.body;
    if (!products) {
      return res.status(400).json({ message: "No products provided" });
    }

    products = JSON.parse(products);

    console.log(products);

    try {
      // Чтение файла шаблона
      const __filename = fileURLToPath(import.meta.url);
      const __dirname = path.dirname(__filename);

      const content = fs.readFileSync(
        path.resolve(__dirname, process.env.TEMPLATEPATH),
        "binary"
      );

      const zip = new PizZip(content);
      const doc = new Docxtemplater(zip, {
        paragraphLoop: true,
        linebreaks: true,
      });

      // products.map((product) => {
      //   console.log(product);
      // });
      // const fileProductData = {
      //   products: products.map((product) => ({})),
      // };

      doc.setData(products);
      doc.render();

      const buf = doc.getZip().generate({
        type: "nodebuffer",
        compression: "DEFLATE",
      });

      fs.writeFileSync(path.resolve(__dirname, process.env.OUTPUTPATH), buf);

      for (const product of products) {
        await prisma.product.update({
          where: {
            id: product.productId,
          },
          data: {
            quantity: { decrement: Number(product.quantity) },
          },
        });
        await prisma.actions.create({
          data: {
            type: "DISMISS",
            employee: product.customer,
            office: product.roomNumber,
            productId: Number(product.productId),
            userId: Number(product.user.userId),
            issuedQuantity: Number(product.quantity),
          },
        });
      }
      return res.status(200).json({ message: "OK" });
    } catch (error) {
      console.error("Ошибка:", error);
      res.status(400).json({ message: "Ошибка" });
    }
  }

  async getAllCustomers(req, res, next) {
    try {
      const allCustomers = await prisma.user.findMany({
        orderBy: { id: "desc" },
      });
      const result = allCustomers.map((user) => {
        if (!user.patronymic) {
          const value = `${user.surname} ${user.firstName.slice(0, 1) + "."}`;
          const label = value;
          return {
            value,
            label,
          };
        } else {
          const value = `${user.surname} ${user.firstName.slice(0, 1)}${
            "." + user?.patronymic.slice(0, 1) + "."
          }`;
          const label = value;
          return {
            value,
            label,
          };
        }
      });
      res.status(200).json({ message: "Все пользователи", result });
    } catch (error) {
      console.error("Ошибка запроса:", error);
      res.status(500).json({ message: "Произошла ошибка сервера" });
    }
  }
}

function isDate(date) {
  return date instanceof Date && !isNaN(date);
}

export const prodController = new ProductController();

// async generateDocx(req, res, next) {
//   try {

//   } catch (error) {

//   }
// }
