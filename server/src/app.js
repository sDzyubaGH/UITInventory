import express from "express";
import "dotenv/config";
import cors from "cors";

import indexRouter from "../router/index.js";

const app = express();
const PORT = process.env.PORT;

app.use(express.json());
app.use(cors());

app.use("/api", indexRouter);

const start = async () => {
  try {
    app.listen(PORT, () => {
      console.log(`Server start on port ${PORT}`);
    });
  } catch (error) {
    console.log(error);
  }
};
start();
// await prisma.$connect(process.env.DATABASE_URL);
// Нет необходимости вызывать $connect() благодаря поведению отложенного подключения:
// экземпляр PrismaClient подключается лениво при первом запросе к API ($connect() вызывается «под капотом»).
// Если  нужно, чтобы первый запрос ответил мгновенно вызываем явно prisma.$connect()
