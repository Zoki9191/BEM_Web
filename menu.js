//für die Pfeile zum seitlichen Scrollen
export const ProductScroll = {
  amount: 400,
  moveLeft() {
    const container = document.querySelector(".hero-products__scrollContainer");
    container.scrollBy({ left: -this.amount, behavior: "smooth" });
  },
  moveRight() {
    const container = document.querySelector(".hero-products__scrollContainer");
    container.scrollBy({ left: this.amount, behavior: "smooth" });
  },
};

//Hamburger Menu öffnen und schließen

export function initMenu() {
  const hamburger = document.getElementById("hamburger");
  const sidebar = document.getElementById("sidebar");
  const overlay = document.getElementById("overlay");

  if (!hamburger || !sidebar || !overlay) return;

  hamburger.addEventListener("click", () => {
    sidebar.classList.toggle("sidebar--open");
    overlay.classList.toggle("overlay--visible");
    hamburger.style.opacity = sidebar.classList.contains("sidebar--open")
      ? "0"
      : "1";
  });

  overlay.addEventListener("click", () => {
    sidebar.classList.remove("sidebar--open");
    overlay.classList.remove("overlay--visible");
    hamburger.style.opacity = "1";
  });

  window.addEventListener("resize", () => {
    if (window.innerWidth >= 801) {
      sidebar.classList.remove("sidebar--open");
      overlay.classList.remove("overlay--visible");
      hamburger.style.opacity = "1";
      document.body.style.overflow = "auto";
    }
  });
}
