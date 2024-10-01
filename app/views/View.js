import { tableUtils } from "../../src/libs/utils/TableUtils.js";

export class View {
  renderProduct(products) {
    const table = document.createElement("tbody");
    document.querySelector("#products tbody").remove();
    const columns = [...document.querySelectorAll("#products thead tr th")].map((x) => x.getAttribute("id"));
    for (let row = 0; row < products.length; row++) {
      const tableRow = table.insertRow();

      for (let x = 0; x < columns.length; x++) {
        const cell = tableRow.insertCell();
        cell.id = columns[x];
        cell.classList.add(...["px-1", "py-0"]);

        switch (x) {
          case 0:
            tableUtils.createDiv(cell, products[row][columns[x]]);
            break;
          case 2:
            cell.innerText = tableUtils.periodToComma(products[row][columns[x]]);
            break;
          case 3:
            cell.innerText = tableUtils.unitNotation(products[row][columns[x]]);
            break;
          case 5:
            cell.innerText = tableUtils.formatDate(products[row][columns[x]]);
            break;
          case 7:
            cell.innerText = tableUtils.formatDate(products[row][columns[x]]);
            break;
          case 8:
            cell.innerText = tableUtils.formatDate(products[row][columns[x]]);
            break;
          case 9:
            cell.innerText = tableUtils.get2First(cell, products[row][columns[x]]);
            break;
          default:
            cell.innerText = products[row][columns[x]];
        }
      }
    }
    document.querySelector("#products").append(table);
  }

  renderExpiredProduct() {
    const bool = [...document.querySelector("#expiredOnes").classList].includes("d-block");
    if (bool) {
      const products = [...document.querySelectorAll("#products tbody tr #id div")].map((x) => x.innerText);
      const expiredProducts = [...document.querySelectorAll("#expiredProducts tbody tr #id div")].map((x) => x.innerText);
      const list = expiredProducts.map((x) => products.includes(x));
      for (let i = list.length; i >= 0; i--) {
        if (list[i] === false) document.querySelectorAll("#expiredProducts tbody tr")[i].remove();
      }
    }
  }
}
