import authAxios from "../axios.js";

export default class FetchProductService {
  static async getLatest() {
    try {
      const response = await authAxios.get(
        "http://localhost:8000/api/product/latestAction"
      );
      return response;
    } catch (error) {
      error;
    }
  }
}
