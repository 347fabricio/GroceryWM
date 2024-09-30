import { expiredProducts } from "../../src/libs/services/ExpiredProduct.js";

export class Model {
  async fetchProductsByPage(page) {
    const storedProducts = JSON.parse(localStorage.getItem("products")) || (await this.loadDatabase());
    localStorage.setItem("products", JSON.stringify(storedProducts));
    let fiftyOnes = storedProducts.slice(50 * page, 50 * ++page);
    if (fiftyOnes.includes(false)) fiftyOnes = fiftyOnes.filter((x) => x !== false);
    return { products: fiftyOnes, count: storedProducts.length };
  }

  async getAboutToExpireProducts(page) {
    const products = JSON.parse(localStorage.getItem("products"));
    const today = expiredProducts.todaysDate();
    const expiredOnes = [];

    for (let i = page * 50; i < (page + 1) * 50; i++) {
      if (products[i] == undefined) {
        return expiredOnes;
      }
      const duration = expiredProducts.isProductExpired(today, products[i].expireson);
      if (duration > 0 && duration <= 31) {
        expiredOnes.push({ index: i, id: products[i].id, duration: duration });
      } else if (duration <= 0) {
        expiredOnes.push({ index: i, id: products[i].id, duration: 0 });
      }
    }

    return expiredOnes;
  }

  getProductsById(id) {
    let products = JSON.parse(localStorage.getItem("products"));
    return products.filter((x) => x.id == id)[0];
  }

  addProduct(newProduct) {
    let products = JSON.parse(localStorage.getItem("products"));
    products.push(newProduct);
    localStorage.setItem("products", JSON.stringify(products));
  }

  updateProductsById(id, updatedProduct) {
    let products = JSON.parse(localStorage.getItem("products"));
    const index = products.findIndex((x) => x.id == id);
    products[index] = updatedProduct;
    localStorage.setItem("products", JSON.stringify(products));
  }

  delProductsById(id) {
    let products = JSON.parse(localStorage.getItem("products"));
    for (let i = 0; i < id.length; i++) products = products.filter((el) => el.id != id[i]);
    localStorage.setItem("products", JSON.stringify(products));
  }

  async loadDatabase() {
    const response = await fetch("./app/models/database.json");
    return response.json();
  }
}
