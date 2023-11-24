import FetchProductService from "./FetchProductService.js";

export default class NewsService {
  async getLatestNews() {
    const response = await FetchProductService.getLatest();
    const latestActions = response.data.latest.map((action) => {
      const productInfo = action.product;
      const userInfo = action.user;

      const toTransform = new Date(productInfo.add_date);
      const formattedDate = `${toTransform.getUTCDate()}.${
        toTransform.getUTCMonth() + 1
      }.${toTransform.getUTCFullYear()}`;

      const latestActions = {
        userName: userInfo.firstName + " " + userInfo.surname,
        product: productInfo.name,
        date: formattedDate,
        issuedQuantity: action.issuedQuantity,
        quantity: productInfo.quantity,
        type: action.type,
      };

      return { latestActions };
    });
    return latestActions;
  }
}
