import { tableUtils } from "../utils/TableUtils.js";
import { apiConnector } from "../API/ApiConnector.js";

export default (element) => {
  const delProductBtn = document.querySelector(`${element} #delProductBtn`);

  delProductBtn.addEventListener("click", () => {
    const checkedOne = tableUtils.getChecked(element);
    if (checkedOne.length) {
      let really = confirm(`Você quer excluir este(s) produto(s?`);
      if (really) {
        let currentPage = document.querySelector("#products").getAttribute("page");
        apiConnector.delete(checkedOne, --currentPage);
      }
    } else {
      tableUtils.flashWarning(element);
    }
  });
};
