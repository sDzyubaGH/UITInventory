// import ApiError from "./errors/ApiError.js";
import { logger } from "./logger.js";

export default function (error, req, res, next) {
  // if (error instanceof ApiError) {
  //   logger.error(`${error.message}\n${error.stack}`)
  // } else {
  //   logger.error(`${error.message}\n${error.stack}`)
  // }

  console.log(error)
  // logger.error(`${error.message}\n${error.stack}`)

  next(error)
}