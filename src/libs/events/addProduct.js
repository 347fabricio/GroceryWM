import { windowUtils } from "../utils/WindowUtils.js";
import { dataSenderWindow } from "../services/DataSenderWindow.js";

export default () => {
  document.querySelector("#addProductBtn").addEventListener("click", () => {
    windowUtils.lockContent();
    windowUtils.visibilityOff();
    dataSenderWindow.showDataSenderWindow();
    dataSenderWindow.justComma();
    dataSenderWindow.todaysDate();
    dataSenderWindow.todaysDateButton();
    windowUtils.closeWindow("#dSWindow");
    dataSenderWindow.createNewProduct();
  });
};
