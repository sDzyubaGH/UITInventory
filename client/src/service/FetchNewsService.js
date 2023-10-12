import ProductService from "./ProductService.js";

export default class NewsService {
  async getLatestNews() {
    const response = await ProductService.getLatest();
    const latestActions = response.data.latestActions.map((post) => {
      const productInfo = post.product;
      const userInfo = post.user;

      const toTransform = new Date(productInfo.add_date);
      const formattedDate = `${toTransform.getUTCDate()}.${
        toTransform.getUTCMonth() + 1
      }.${toTransform.getUTCFullYear()}`;

      const latestActions = {
        userName: userInfo.firstName + " " + userInfo.surname,
        product: productInfo.name,
        date: formattedDate,
      };

      return { latestActions };
    });
    return latestActions;
  }
}
