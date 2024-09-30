import { apiConnector } from "../API/ApiConnector.js";
import { tableUtils } from "../utils/TableUtils.js";
import { dataSenderWindow } from "../services/DataSenderWindow.js";
import { windowUtils } from "../utils/WindowUtils.js";

export default () => {
  document.querySelector("#updtProductBtn").addEventListener("click", async () => {
    const checkedOnes = tableUtils.getChecked("#products");
    switch (checkedOnes.length) {
      case 0:
        tableUtils.flashWarning("#products");
        break;
      case 1:
        windowUtils.lockContent();
        windowUtils.visibilityOff();
        dataSenderWindow.showDataSenderWindow();
        dataSenderWindow.justComma();
        dataSenderWindow.todaysDate();
        dataSenderWindow.jsonDestructurer(apiConnector.get(+checkedOnes[0]));
        windowUtils.closeWindow("#dSWindow");
        dataSenderWindow.updateProduct(+checkedOnes[0]);
        break;
      case 2:
        tableUtils.createNote("<strong>Atenção!</strong> Selecione apenas <strong>um</strong> produto");
        break;
    }
  });
};
