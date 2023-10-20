import { validationResult } from "express-validator";

export default function (req, res, next) {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res
        .status(400)
        .json({ message: "Ошибка при регистрации", errors: errors.array() });
    }

    next();
  } catch (error) {
    next(error)
  }
}
