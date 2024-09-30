let toggleExpPr = true;

export default () => {
  document.querySelector("#selExpProductBtn").addEventListener("click", () => {
    if (toggleExpPr) {
      toggleExpiredCheckboxes(true);
    } else {
      toggleExpiredCheckboxes(false);
    }

    toggleExpPr = !toggleExpPr;
  });
};

const toggleExpiredCheckboxes = (bool) => {
  let checkbox = document.querySelectorAll("#expiredOnes .actionCheckbox");
  let expiredOnes = [];

  document.querySelectorAll("#expiredProducts tbody tr").forEach((x, y) => {
    if (x.dataset.bsTitle == "Expirado") expiredOnes.push(y);
  });
  expiredOnes.forEach((index) => (checkbox[index].checked = bool));
};
