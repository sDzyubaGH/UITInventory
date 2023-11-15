import { Router } from "express";
import authRouter from "./authRouter.js";
import productRouter from "./productRouter.js";
import { prisma } from "../service/prisma.js";

const indexRouter = new Router();

indexRouter.use("/user", authRouter);
indexRouter.use("/product", productRouter);
indexRouter.use("/products/:id", async (req, res, next) => {
  const { id } = req.params;

  const product = await prisma.product.findUnique({
    where: { id: Number(id) },
    include: {
      files: true,
      users: true,
    },
  });

  return res.status(200).json(product);
});

export default indexRouter;
