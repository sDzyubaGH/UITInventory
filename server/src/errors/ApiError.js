import { codes } from "./statusCodes.js"

const { BAD_REQUEST, FORBIDDEN, INTERNAL, UNAUTHORIZED } = codes

class ApiError extends Error {
  constructor(code, message) {
    super(message)
    this.code = code
  }

  static badRequest(message) {
    return new ApiError(BAD_REQUEST, message)
  }

  static internal(message) {
    return new ApiError(INTERNAL, message)
  }

  static unauthorized(message) {
    return new ApiError(UNAUTHORIZED, message)
  }

  static forbidden(message) {
    return new ApiError(FORBIDDEN, message)
  }
}

export default ApiError