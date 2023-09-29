import jwt from "jsonwebtoken";
import "dotenv/config";

class TokenService {
  generateTokens(payload) {
    const accessToken = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: "24h",
    });
    return accessToken;
  }
}

export const token = new TokenService();
