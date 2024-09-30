import * as bootstrap from "bootstrap";

class ExpiredProductsWindow {
  toPaint(element, exp) {
    switch (true) {
      case exp <= 0:
        [...element.children].forEach((child) => child.classList.add("opacity-25"));
        element.classList.add("text-decoration-line-through");
        this.tooltip(element, "Expirado");
        break;
      case exp <= 31:
        element.querySelector("#madeon").classList.add("text-decoration-underline");
        element.querySelector("#expireson").classList.add("text-decoration-underline");
        this.tooltip(element, `Expira em ${exp} dias`);
        break;
    }
    document.querySelector("#expiredProducts tbody").append(element);
  }

  tooltip(parent, status) {
    parent.setAttribute("data-bs-toggle", "tooltip");
    parent.setAttribute("data-bs-placement", "right");
    parent.setAttribute("data-bs-title", status);
  }

  tooltipInit() {
    const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]');
    const tooltipList = [...tooltipTriggerList].map((tooltipTriggerEl) => new bootstrap.Tooltip(tooltipTriggerEl));
  }

  cleanTable() {
    document.querySelector("#expiredOnes #closeBtn").addEventListener(
      "click",
      () => {
        document.querySelector("#expiredProducts tbody").remove();
        document.querySelector("#expiredProducts").appendChild(document.createElement("tbody"));
      },
      { once: true }
    );
  }

  isNearExpiration(expiredProducts) {
    let rowElements = document.querySelectorAll("#products tbody tr");
    let rowIds = [...rowElements].map((row) => +row.querySelector("#id div").innerText);

    for (let i = 0; i < expiredProducts.length; i++) {
      const targetIndex = rowIds.indexOf(expiredProducts[i].id);
      if (targetIndex !== -1) {
        this.toPaint(rowElements[targetIndex].cloneNode(true), expiredProducts[i].duration);
      }
    }
  }

  dateDiff(fst, snd) {
    return Math.round((snd - fst) / (1000 * 60 * 60 * 24));
  }

  today() {
    return parse(format(new Date(), "dd/MM/yyyy"), "dd/MM/yyyy", new Date());
  }

  getExpiredProductDates() {
    return Array.from(document.querySelectorAll("#products  #expireson"))
      .slice(1)
      .map((element) => {
        const [day, month, year] = element.innerText.split("/");
        return parse(`${day}/${month}/${year}`, "dd/MM/yyyy", new Date());
      });
  }
}

export const expiredProductsWindow = new ExpiredProductsWindow();
