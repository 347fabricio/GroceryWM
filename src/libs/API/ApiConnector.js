import { controller } from "../../../app/controllers/Controller.js";

class ApiConnector {
  getExpiredProducts(page) {
    return controller.getNearExpirationProducts(page);
  }

  get(id) {
    return controller.getProduct(id);
  }

  getByPage(page = 0) {
    return controller.getPage(page);
  }

  post(product, page) {
    controller.createProduct(product, page);
  }

  put(id, product, page) {
    controller.updateProduct(id, product, page);
  }

  async delete(id, page) {
    await controller.deleteProducts(id, page);
  }
}

export const apiConnector = new ApiConnector();
