import { apiConnector } from "../API/ApiConnector.js";

class Table {
  async buildPage() {
    const { count } = await apiConnector.getByPage(0);
    this.pagination(count);
    this.renderPage();
    this.nextPage();
    this.previousPage();
  }

  pagination(count) {
    const pages = Math.ceil(count / 50);
    document.querySelector("#products").setAttribute("page", 1);
    document.querySelector("#products").setAttribute("totalPages", pages);
    document.querySelector("#products").setAttribute("countProducts", count);

    if (pages > 1) {
      const newPageItem = document.querySelector("#page-item-bp").cloneNode(true);
      const pagination = document.querySelector("#page .pagination");

      const temp = [...pagination.children].slice(0, -1);
      const lastOne = [...pagination.children].pop();

      temp.push(newPageItem);
      temp.push(lastOne);

      [...document.querySelector("#page .pagination").children].forEach((child) => child.remove());
      document.querySelector("#page .pagination").append(...temp);

      [...document.querySelectorAll("#page-item-bp")].forEach((x, y) => (x.firstChild.innerText = y + 1));

      document.querySelector("#page").classList.remove("d-none");
      document.querySelector("#page").classList.add(...["d-flex", "justify-content-center"]);
    }
  }

  renderPage() {
    document.querySelectorAll("#page-item-bp").forEach((button, index) =>
      button.addEventListener("click", async (event) => {
        let page = document.querySelector("#products").getAttribute("page");
        const buttonText = event.target.innerText;

        if (buttonText !== page) {
          await apiConnector.getByPage(buttonText - 1);
          document.querySelector("#products").setAttribute("page", buttonText);
          this.currentPage(index);
        }
      })
    );
  }

  nextPage() {
    document.querySelector("#nextPage").addEventListener("click", async () => {
      let page = document.querySelector("#products").getAttribute("page");
      let totalPages = document.querySelector("#products").getAttribute("totalPages");
      if (page < totalPages) {
        await apiConnector.getByPage(+page);
        document.querySelector("#products").setAttribute("page", +page + 1);
        this.currentPage(page);
      } else {
        console.log("can not do that");
      }
    });
  }

  previousPage() {
    document.querySelector("#previousPage").addEventListener("click", async () => {
      let page = document.querySelector("#products").getAttribute("page");
      if (page > 1) {
        page--;
        await apiConnector.getByPage(page - 1);
        document.querySelector("#products").setAttribute("page", page);
        this.currentPage(page - 1);
      }
    });
  }

  currentPage(index) {
    const pages = document.querySelectorAll("#page-item-bp .page-link");
    pages.forEach((page) => {
      page.style.backgroundColor = "initial";
    });
    pages[index].style.backgroundColor = "#33383d";
  }
}

export const table = new Table();
