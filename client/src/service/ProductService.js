import axios from "axios";

export default class ProductService {
  static async getLatest() {
    try {
      const response = await axios.get(
        "http://localhost:8000/api/product/latestAction"
      );
      return response.data;
    } catch (error) {
      console.log(error);
    }
  }
}
