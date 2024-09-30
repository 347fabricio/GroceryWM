import { cellOrdering } from "../../libs/utils/CellOrdering.js";
import { table } from "../../libs/services/Table.js";

import addProduct from "../../libs/events/addProduct.js";
import deleteProduct from "../../libs/events/deleteProducts.js";
import updateProduct from "../../libs/events/updateProduct.js";
import expiredProducts from "../../libs/events/expiredProducts.js";
import selectExpiredProducts from "../../libs/events/selectExpiredProducts.js";

addProduct();
deleteProduct("#content");
updateProduct();
expiredProducts();
selectExpiredProducts();

cellOrdering.order("products");

window.onload = async () => {
  await table.buildPage();
};
