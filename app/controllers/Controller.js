import { Model } from "../models/Model.js";
import { View } from "../views/View.js";

class Controller {
  constructor(model, view) {
    this.model = model;
    this.view = view;
  }

  showExpiredProducts() {
    this.view.renderExpiredProduct();
  }

  getProduct(id) {
    return this.model.getProductsById(id);
  }

  async getPage(page) {
    const { products, count } = await this.model.fetchProductsByPage(page);
    this.view.renderProduct(products);
    return { count };
  }

  async getNearExpirationProducts(page) {
    return this.model.getAboutToExpireProducts(page);
  }

  async createProduct(product, page) {
    this.model.addProduct(product);
    await this.getPage(page);
  }

  async updateProduct(id, product, page) {
    this.model.updateProductsById(id, product);
    await this.getPage(page);
  }

  async deleteProducts(id, page) {
    this.model.delProductsById(id);
    await this.getPage(page);
    this.showExpiredProducts();
  }
}

export const controller = new Controller(new Model(), new View());
