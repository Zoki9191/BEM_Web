import { getDataFromApis } from "./Api.js";

export function ProductDetailView(product) {
  const { category, title, description, image, price, stock = 15 } = product;

  return `
    <div class="products-card" data-price="${price}" data-stock="${stock}">
      <div class="products-element__category">${category}</div>
      <div class="products-element__items">
        <p class="products-element__items-title">${title}</p>
        <div class="image-wrapper">
          <img src="${image}" alt="${title}" class="products-element__items-image"/>
        </div>
        <div class="products-element__items-description">${description}</div>
        <span class="products-element__items-price">${price.toFixed(2)} €</span>
        <button class="products-element__items--buy-button">bestellen</button>
      </div>
      <div class="products-element__counter">
        <button class="products-element__items--minus-button">-</button>
        <span class="counter-value">0</span>
        <button class="products-element__items--plus-button">+</button>
        <span class="counter-price">0.00 €</span>
        <span class="counter-soldout" style="color:red;font-weight:bold;"></span>
      </div>
    </div>
  `;
}

// Initialisiere alle Buttons (Plus, Minus, Kaufen)

export function initProductCounters() {
  const payContainer = document.querySelector(".paymant-container");
  if (payContainer) payContainer.style.display = "none";

  document.querySelectorAll(".products-card").forEach((card) => {
    const counter = card.querySelector(".products-element__counter");
    const plusBtn = counter.querySelector(
      ".products-element__items--plus-button",
    );
    const minusBtn = counter.querySelector(
      ".products-element__items--minus-button",
    );
    const spanCount = counter.querySelector(".counter-value");
    const spanPrice = counter.querySelector(".counter-price");
    const spanSoldOut = counter.querySelector(".counter-soldout");

    const pricePerItem = parseFloat(card.dataset.price);
    const stockLimit = parseInt(card.dataset.stock) || 15;
    let count = 0;

    // Anzeige aktualisieren

    const updateDisplay = () => {
      spanCount.textContent = count;
      spanPrice.textContent = (count * pricePerItem).toFixed(2) + " €";
      spanSoldOut.textContent = count >= stockLimit ? "Maximal verfügbar!" : "";
      plusBtn.disabled = count >= stockLimit;
      minusBtn.disabled = count <= 0;
    };

    // Plus / Minus Buttons

    plusBtn.addEventListener("click", () => {
      if (count < stockLimit) {
        count++;
        updateDisplay();
      }
    });

    minusBtn.addEventListener("click", () => {
      if (count > 0) {
        count--;
        updateDisplay();
      }
    });

    updateDisplay();

    // Kaufen Button

    const buyBtn = card.querySelector(".products-element__items--buy-button");
    buyBtn.addEventListener("click", () => {
      if (count === 0) {
        alert("Bitte mindestens 1 Stück wählen.");
        return;
      }
      if (!payContainer) return;

      payContainer.style.display = "flex";
      const orderTableBody = payContainer.querySelector("tbody");
      const orderTotalCell = payContainer.querySelector(
        ".order-summary__total td:last-child",
      );
      const title = card.querySelector(
        ".products-element__items-title",
      ).textContent;

      let row = Array.from(orderTableBody.rows).find(
        (r) => r.cells[0].textContent === title,
      );

      if (row) {
        row.cells[1].textContent = count + "x";
        row.cells[2].textContent = (count * pricePerItem).toFixed(2) + " €";
      } else {
        const tr = document.createElement("tr");
        tr.innerHTML = `<td>${title}</td><td>${count}x</td><td>${(count * pricePerItem).toFixed(2)} €</td>`;
        orderTableBody.appendChild(tr);
      }

      // Gesamtsumme aktualisieren
      const total = Array.from(orderTableBody.rows).reduce((sum, r) => {
        return (
          sum +
          parseFloat(r.cells[2].textContent.replace(" €", "").replace(",", "."))
        );
      }, 0);
      orderTotalCell.textContent = total.toFixed(2).replace(".", ",") + " €";
    });
  });
}

// Produkte laden & anzeigen

export async function AllProductsView() {
  const container = document.querySelector(".products-element");
  if (!container) return;

  const allProducts = await getDataFromApis();

  const params = new URLSearchParams(window.location.search);
  const categoryFilter = params.get("category");

  const filtered = categoryFilter
    ? allProducts.filter((p) => p.category === categoryFilter)
    : allProducts;

  if (!filtered || filtered.length === 0) {
    container.innerHTML = "<p>Keine Produkte gefunden.</p>";
    return;
  }

  // Gruppieren nach Kategorie
  const grouped = filtered.reduce((acc, product) => {
    const cat = product.category.toLowerCase();
    if (!acc[cat]) acc[cat] = [];
    acc[cat].push(product);
    return acc;
  }, {});

  // Priorität für Kategorien
  const priority = [
    "women's clothing",
    "men's clothing",
    "jewelery",
    "electronics",
    "furniture",
    "beauty",
    "fragrances",
    "groceries",
  ];

  // Sortieren nach Priorität
  const sortedCategories = Object.keys(grouped).sort((a, b) => {
    let ia = priority.indexOf(a);
    if (ia === -1) ia = 99;
    let ib = priority.indexOf(b);
    if (ib === -1) ib = 99;
    return ia - ib;
  });

  // HTML rendern
  let allHtml = "";
  sortedCategories.forEach((cat) => {
    allHtml += `
      <div class="category-section">
        <h2 class="category-title">${cat}</h2>
        <div class="category-grid">
          ${grouped[cat].map(ProductDetailView).join("")}
        </div>
      </div>
    `;
  });

  container.innerHTML = allHtml;

  // Buttons initialisieren
  initProductCounters();
}
AllProductsView();
