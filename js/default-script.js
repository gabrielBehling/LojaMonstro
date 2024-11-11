// Toggle da sub-navegação e rotação do ícone de hambúrguer
function toggleSubNav() {
  const subNavigation = document.querySelector(".sub-navigation");
  const hamburger = document.querySelector(".hamburger-menu");
  const icon = hamburger.querySelector("i");

  subNavigation.classList.toggle("open");
  hamburger.classList.toggle("open");

  // Change the icon based on the state of the sub-navigation
  if (subNavigation.classList.contains("open")) {
    icon.classList.remove("bx-menu");
    icon.classList.add("bx-x");
  } else {
    icon.classList.remove("bx-x");
    icon.classList.add("bx-menu");
  }
}

// Adiciona o evento de clique no ícone do hambúrguer
document
  .querySelector(".hamburger-menu")
  .addEventListener("click", toggleSubNav);

// Ajuste no evento de scroll para ajustar a posição da navegação
document.querySelectorAll(".sub-navigation a").forEach((anchor) => {
  if (anchor.classList.contains("in-page-link")) {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      const targetId = this.getAttribute("href");
      const targetElement = document.querySelector(targetId);
      const headerOffset = 75;
      const elementPosition =
        targetElement.getBoundingClientRect().top + window.scrollY;
      const offsetPosition = elementPosition - headerOffset;
      window.scrollTo({ top: offsetPosition, behavior: "smooth" });
      toggleSubNav();
    });
  }
});
