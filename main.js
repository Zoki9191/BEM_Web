// import { AllProductsView } from "./allProductView.js";
// import { savedCommentsShow } from "./commentView.js";
// import { initMenu, ProductScroll } from "./menu.js";
// import { saveCommentsToLocalStorage } from "./saveToLocSt.js";
// import { loadProduct } from "./searchbar.js";

// document.addEventListener("DOMContentLoaded", async () => {
//   await loadProduct();
//   savedCommentsShow();

//   const heroButton = document.getElementById("hero__button");

//   if (heroButton) {
//     heroButton.addEventListener("click", async () => {
//       await AllProductsView();
//       document
//         .querySelector(".products-element")
//         ?.scrollIntoView({ behavior: "smooth" });
//     });
//   }

//   const saveButton = document.getElementById("save");

//   if (saveButton) {
//     saveButton.addEventListener("click", () => {
//       saveCommentsToLocalStorage();
//       savedCommentsShow();
//     });
//   }
// });

// window.ProductScroll = ProductScroll;
// window.initMenu = initMenu();

import { AllProductsView } from "./allProductView.js";
import { savedCommentsShow } from "./commentView.js";
import { initMenu, ProductScroll } from "./menu.js";
import { saveCommentsToLocalStorage } from "./saveToLocSt.js";
import { loadProduct, showSuggestions } from "./searchbar.js";

document.addEventListener("DOMContentLoaded", async () => {
  await loadProduct();
  savedCommentsShow();

  // --- HEADER SUCHE ---
  const searchbar = document.getElementById("searchbar");
  if (searchbar) {
    searchbar.addEventListener("input", (event) => {
      // Wir geben die ID des Ergebnis-Containers im Header mit
      showSuggestions(event.target.value, "suggestions");
    });
  }

  // --- SIDEBAR SUCHE (NEU) ---
  const sidebarSearchbar = document.getElementById("sidebarSearchbar");
  if (sidebarSearchbar) {
    sidebarSearchbar.addEventListener("input", (event) => {
      // Wir geben die ID des Ergebnis-Containers in der Sidebar mit
      showSuggestions(event.target.value, "sidebarSuggestions");
    });
  }

  // Klick außerhalb schließt beide Vorschläge
  document.addEventListener("click", (e) => {
    if (
      !e.target.closest(".header__searchbar") &&
      !e.target.closest(".side__searchbar")
    ) {
      const s1 = document.getElementById("suggestions");
      const s2 = document.getElementById("sidebarSuggestions");
      if (s1) s1.style.display = "none";
      if (s2) s2.style.display = "none";
    }
  });

  // --- RESTLICHE LOGIK ---
  const heroButton = document.getElementById("hero__button");
  if (heroButton) {
    heroButton.addEventListener("click", async () => {
      await AllProductsView();
      document
        .querySelector(".products-element")
        ?.scrollIntoView({ behavior: "smooth" });
    });
  }

  const saveButton = document.getElementById("save");
  if (saveButton) {
    saveButton.addEventListener("click", () => {
      saveCommentsToLocalStorage();
      savedCommentsShow();
    });
  }
});

window.ProductScroll = ProductScroll;
window.initMenu = initMenu();

// import { AllProductsView } from "./allProductView.js";
// import { savedCommentsShow } from "./commentView.js";
// import { initMenu, ProductScroll } from "./menu.js";
// import { saveCommentsToLocalStorage } from "./saveToLocSt.js";
// import { loadProduct, showSuggestions } from "./searchbar.js";

// document.addEventListener("DOMContentLoaded", async () => {
//   await loadProduct();

//   savedCommentsShow();

//   const searchbar = document.getElementById("searchbar");

//   if (searchbar) {
//     searchbar.addEventListener("input", (event) => {
//       const query = event.target.value;
//       showSuggestions(query);
//     });
//   }

//   const heroButton = document.getElementById("hero__button");

//   if (heroButton) {
//     heroButton.addEventListener("click", async () => {
//       await AllProductsView();
//       document
//         .querySelector(".products-element")
//         ?.scrollIntoView({ behavior: "smooth" });
//     });
//   }

//   const saveButton = document.getElementById("save");

//   if (saveButton) {
//     saveButton.addEventListener("click", () => {
//       saveCommentsToLocalStorage();
//       savedCommentsShow();
//     });
//   }
// });

// window.ProductScroll = ProductScroll;
// window.initMenu = initMenu();
