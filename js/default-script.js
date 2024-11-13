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

document.addEventListener("DOMContentLoaded", async () => {
  try {
    const response = await fetch("http://127.0.0.1:3000/user/profile", {
      method: "GET",
      credentials: "include",
    });

    if (response.ok) {
      const data = await response.json();
      const profileImage = document.querySelector(".profile-icon");

      if (data.userIcon) {
        profileImage.src = data.userIcon;
      }
    } else {
      console.error("Erro ao carregar imagem de perfil.");
    }
  } catch (error) {
    console.error("Erro ao carregar perfil:", error);
  }
});

document.addEventListener("DOMContentLoaded", async () => {
  if (!document.querySelector(".ultimasPostagens")) return;

  const response = await fetch("http://127.0.0.1:3000/posts");

  if (response.ok) {
    const posts = await response.json();
    showPosts(posts);
  }
});

function showPosts(posts) {}
