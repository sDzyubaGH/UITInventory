import authAxios from "./axios.js";

export default class ProductService {
  static async getLatest() {
    try {
      const response = await authAxios.get(
        "http://localhost:8000/api/product/latestAction"
      );
      return response;
    } catch (error) {
      console.log(error);
    }
  }
}
