// Toggle da sub-navegação e rotação do ícone de hambúrguer
function toggleSubNav() {
  const subNavigation = document.querySelector(".sub-navigation");
  const hamburger = document.querySelector(".hamburger-menu");
  const icon = hamburger.querySelector("i"); // Select the icon inside the hamburger menu

  subNavigation.classList.toggle("open");
  hamburger.classList.toggle("open");

  // Change the icon based on the state of the sub-navigation
  if (subNavigation.classList.contains("open")) {
    icon.classList.remove("bx-menu"); // Remove the hamburger icon
    icon.classList.add("bx-x"); // Add the close icon
  } else {
    icon.classList.remove("bx-x"); // Remove the close icon
    icon.classList.add("bx-menu"); // Add the hamburger icon back
  }
}

// Adiciona o evento de clique no ícone do hambúrguer
document
  .querySelector(".hamburger-menu")
  .addEventListener("click", toggleSubNav);

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
      const headerOffset = 80;
      const elementPosition =
        targetElement.getBoundingClientRect().top + window.scrollY;
      const offsetPosition = elementPosition - headerOffset;
      window.scrollTo({ top: offsetPosition, behavior: "smooth" });
      toggleSubNav();
    });
  }
});

document.addEventListener("DOMContentLoaded", () => {
  const hamburgerMenu = document.getElementById("hamburger-menu");
  const subNavigation = document.querySelector(".sub-navigation");

  // Verificar se os elementos estão presentes no DOM
  if (hamburgerMenu && subNavigation) {
    hamburgerMenu.addEventListener("click", () => {
      // Alterna a classe 'active' no menu
      subNavigation.classList.toggle("active");
      hamburgerMenu.classList.toggle("active");
    });
  } else {
    console.error("Erro: Elemento do menu ou navegação não encontrado");
  }
});
