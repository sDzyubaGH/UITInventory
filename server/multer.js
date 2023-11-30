import path from "path";
import fs from "fs";
import multer from "multer";

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
    let fileName = Buffer.from(file.originalname, "latin1").toString("utf-8");
    return cb(null, fileName);
  },
});

export { storage };
