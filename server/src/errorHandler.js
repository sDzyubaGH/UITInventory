import ApiError from "./errors/ApiError.js"

export default function (error, req, res, next) {
  if (error instanceof ApiError) {
    return res.status(error.code).json({message: error.message})
  }

  return res.status(500).json({ error })
}