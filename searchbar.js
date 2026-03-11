import { getDataFromApis } from "./Api.js";

let allProducts = [];
let categories = [];

export async function loadProduct() {
  allProducts = await getDataFromApis();
  categories = [...new Set(allProducts.map((product) => product.category))];
}

export function showSuggestions(query, containerId) {
  const suggestionsContainer = document.getElementById(containerId);
  if (!suggestionsContainer) return;

  suggestionsContainer.innerHTML = "";

  if (!query) {
    suggestionsContainer.style.display = "none";
    return;
  }

  const filtered = categories.filter((cat) =>
    cat.toLowerCase().includes(query.toLowerCase()),
  );

  if (filtered.length > 0) {
    suggestionsContainer.style.display = "block";
    filtered.forEach((cat) => {
      const div = document.createElement("div");
      div.classList.add("suggestion-item");
      div.textContent = cat;

      div.addEventListener("click", () => {
        // 1. Input-Feld Text setzen
        const isSidebar = containerId === "sidebarSuggestions";
        const inputId = isSidebar ? "sidebarSearchbar" : "searchbar";
        const inputElement = document.getElementById(inputId);
        if (inputElement) inputElement.value = cat;

        // 2. Vorschläge schließen
        suggestionsContainer.innerHTML = "";
        suggestionsContainer.style.display = "none";

        // 3. WEITERLEITUNG ZU DEN PRODUKTEN
        // Wir nutzen encodeURIComponent, damit Leerzeichen/Sonderzeichen in der URL funktionieren
        window.location.href = `allProducts.html?category=${encodeURIComponent(cat)}`;
      });

      suggestionsContainer.appendChild(div);
    });
  } else {
    suggestionsContainer.style.display = "none";
  }
}
