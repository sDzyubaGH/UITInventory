import path from "path";
import fs from "fs";
import multer from "multer";

const storage = multer.diskStorage({
  destination: async function (req, file, cb) {
    const filesDir = process.env.FILES_PATH;
    if (!fs.existsSync(filesDir)) fs.mkdirSync(filesDir);

    const filePath = path.join(`${process.env.FILES_PATH}`, new Date().toLocaleDateString("ru-RU"));
    if (!fs.existsSync(filePath)) fs.mkdirSync(filePath);

    console.log(req.body);
    return cb(null, filePath);
  },
  filename: function (req, file, cb) {
    let fileName = Buffer.from(file.originalname, "latin1").toString("utf-8");
    return cb(null, fileName);
  },
});

export { storage };
