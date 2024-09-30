import { cellOrdering } from "../utils/CellOrdering.js";
import deleteProduct from "./deleteProducts.js";

import { expiredProductsWindow } from "../services/ExpiredProductsWindow.js";
import { windowUtils } from "../utils/WindowUtils.js";
import { apiConnector } from "../API/ApiConnector.js";

export default () => {
  document.querySelector("#expiredProductBtn").addEventListener("click", async () => {
    let currentPage = document.querySelector("#products").getAttribute("page");
    const expiredProducts = await apiConnector.getExpiredProducts(--currentPage);
    windowUtils.visibilityOff();
    windowUtils.lockContent();
    windowUtils.closeWindow("#expiredOnes");
    windowUtils.showExpiredProducts();
    expiredProductsWindow.isNearExpiration(expiredProducts);
    expiredProductsWindow.tooltipInit();
    expiredProductsWindow.cleanTable();

    deleteProduct("#expiredOnes");
    cellOrdering.order("expiredProducts");
  });
};
