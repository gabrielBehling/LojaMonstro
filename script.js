// Impede que quando clicar em link, a barra de navegação não cobre a seção
document.querySelectorAll(".sub-navigation a").forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();

    const targetId = this.getAttribute("href");
    const targetElement = document.querySelector(targetId);

    // Scroll to the target element, adjusting for the fixed header height
    const headerOffset = 126; // Height of the fixed header
    const elementPosition = targetElement.getBoundingClientRect().top;
    const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

    window.scrollTo({
      top: offsetPosition,
      behavior: "smooth", // Optional: for smooth scrolling
    });
  });
});

// Toggle da sub-navegação e rotação do ícone de hambúrguer
function toggleSubNav() {
  const subNavigation = document.getElementById("sub-navigation");
  const hamburger = document.querySelector(".hamburger-menu");

  // Alterna a classe "open" para sub-navegação e hambúrguer
  subNavigation.classList.toggle("open");
  hamburger.classList.toggle("open");
}

// Adiciona o evento de clique no ícone do hambúrguer
document
  .querySelector(".hamburger-menu")
  .addEventListener("click", toggleSubNav);

// Ajuste no evento de scroll para ajustar a posição da navegação
document.querySelectorAll(".sub-navigation a").forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();

    const targetId = this.getAttribute("href");
    const targetElement = document.querySelector(targetId);

    // Scroll to the target element, adjusting for the fixed header height
    const headerOffset = 126; // Altura do cabeçalho fixo
    const elementPosition = targetElement.getBoundingClientRect().top;
    const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

    window.scrollTo({
      top: offsetPosition,
      behavior: "smooth", // Optional: for smooth scrolling
    });

    // Fecha a subnavegação após o clique
    toggleSubNav();
  });
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

let currentSlideIndex = 0; // Índice da primeira exibição do carrossel
const itemsPerPage = 3; // Número de itens visíveis por vez

async function carregarProdutos() {
  try {
    const response = await fetch("/dados/products.json");
    const produtos = await response.json();

    const listaProdutos = document.getElementById("produtos");
    listaProdutos.innerHTML = "";

    produtos.forEach((produto, index) => {
      const item = document.createElement("li");
      item.classList.add("produto-item");
      item.innerHTML = `
                <div class="produto-detalhes">
                    <span class="produto-nome">${produto.name}</span>
                    <span class="produto-preco">R$${produto.price.toFixed(
                      2
                    )}</span>
                    <span class="produto-fornecedor">Fornecedor: ${
                      produto.supplier
                    }</span>
                </div>
            `;
      item.style.display = "none"; // Esconde os itens inicialmente
      listaProdutos.appendChild(item);
    });

    updateCarrossel();

    // Adiciona eventos para navegação
    document
      .getElementById("prev-btn")
      .addEventListener("click", () => mudarSlide(-1));
    document
      .getElementById("next-btn")
      .addEventListener("click", () => mudarSlide(1));
  } catch (error) {
    console.error("Erro ao carregar os produtos:", error);
  }
}

// Função para atualizar os itens visíveis do carrossel
function updateCarrossel() {
  const items = document.querySelectorAll("#produtos .produto-item");
  items.forEach((item, index) => {
    item.style.display =
      index >= currentSlideIndex && index < currentSlideIndex + itemsPerPage
        ? "flex"
        : "none";
  });
}

// Função para mudar o slide
function mudarSlide(direction) {
  const totalItems = document.querySelectorAll(
    "#produtos .produto-item"
  ).length;
  currentSlideIndex += direction * itemsPerPage;

  // Limita o índice para que ele não ultrapasse os limites do carrossel
  if (currentSlideIndex < 0) currentSlideIndex = totalItems - itemsPerPage;
  if (currentSlideIndex >= totalItems) currentSlideIndex = 0;

  updateCarrossel();
}

// Carrega os produtos ao carregar a página
document.addEventListener("DOMContentLoaded", carregarProdutos);
