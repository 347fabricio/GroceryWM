import { tableUtils } from "../utils/TableUtils.js";
import { apiConnector } from "../API/ApiConnector.js";
import { table } from "../services/Table.js";

export default (element) => {
  const delProductBtn = document.querySelector(`${element} #delProductBtn`);

  delProductBtn.addEventListener("click", async () => {
    const checkedOne = tableUtils.getChecked(element);
    if (checkedOne.length) {
      let really = confirm(`Você quer excluir este(s) produto(s?`);
      if (really) {
        let currentPage = document.querySelector("#products").getAttribute("page");
        await apiConnector.delete(checkedOne, --currentPage);
        table.getCurrentPage();
      }
    } else {
      tableUtils.flashWarning(element);
    }
  });
};
