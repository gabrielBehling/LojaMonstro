// Toggle da sub-navegação e rotação do ícone de hambúrguer
function toggleSubNav() {
  const subNavigation = document.querySelector(".sub-navigation");
  const hamburger = document.querySelector(".hamburger-menu");

  subNavigation.classList.toggle("open");
  hamburger.classList.toggle("open");
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
      const elementPosition = targetElement.getBoundingClientRect().top + window.scrollY;
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

let currentSlideIndex = 0; // Índice da primeira exibição do carrossel
const itemsPerPage = 6; // Número de itens visíveis por vez

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
                  <span class="produto-preco">R$ ${produto.price.toFixed(
                    2
                  )}</span>
                  <span class="produto-fornecedor">Fornecedor: ${
                    produto.supplier
                  }</span>
                  <button type="button" class="cart__add">
                      <i class='bx bxs-cart-add'></i>
                      <span>Adic. ao carrinho</span>
                  </button>
              </div>
          `;
      item.style.display = "none"; // Esconde os itens inicialmente
      listaProdutos.appendChild(item);

      // Adiciona evento de clique para o botão "Adicionar ao carrinho"
      item.querySelector(".cart__add").addEventListener("click", () => {
        addItemToCart(produto.name, produto.price);
      });
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
        ? "block"
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

// ====================================================================================== Carrinho

// Evento para o botão do carrinho
document.getElementById("search__cart").addEventListener("click", () => {
  const bill = document.getElementById("bill");

  if (bill.style.display === "flex") {
    // Se estiver visível, fecha a nota fiscal
    bill.style.display = "none";
    closeBill(bill);
  } else {
    // Se não estiver visível, abre a nota fiscal
    bill.style.display = "flex";
    bill.classList.remove("closing");
  }
});

// Evento para o botão "Fechar"
document.getElementById("bill__button-close").addEventListener("click", () => {
  document.getElementById("bill").style.display = "none";
});

// Event for the "Limpar" button
document.getElementById("bill__button-clear").addEventListener("click", () => {
  const itemsList = document.getElementById("bill__itens");
  itemsList.innerHTML = ""; // Limpa os itens na nota fiscal
  document.getElementById("bill__itens-total").innerText = "0.00"; // Redefine o total

  // Redefine o contador do carrinho
  cartItems = []; // Limpa o array de itens do carrinho
  updateCartCount(); // Atualiza o contador para 0
});

let cartItems = []; // Array para armazenar os itens do carrinho
let cartTotal = 0; // Total do carrinho

// Função para adicionar item ao carrinho
function addItemToCart(name, price) {
  const existingItem = cartItems.find((item) => item.name === name);

  if (existingItem) {
    existingItem.quantity++;
  } else {
    cartItems.push({ name, price, quantity: 1 });
  }

  cartTotal += price;
  updateBill();
  updateCartCount(); // Atualiza o contador do carrinho
}

function updateCartCount() {
  const cartCountElement = document.getElementById("cart-count");
  const totalItems = cartItems.reduce(
    (total, item) => total + item.quantity,
    0
  );
  cartCountElement.innerText = totalItems; // Atualiza o texto do contador
}

function updateBill() {
  const billItemsList = document.getElementById("bill__itens");
  billItemsList.innerHTML = ""; // Limpa a lista atual

  cartItems.forEach((item, index) => {
    const li = document.createElement("li");
    li.innerHTML = `${item.name} x ${item.quantity} - R$ ${(
      item.price * item.quantity
    ).toFixed(2)}`;

    // Cria o botão "X"
    const removeButton = document.createElement("button");
    removeButton.innerText = "X";
    removeButton.style.color = "red";
    removeButton.style.marginLeft = "10px"; // Espaço entre o texto e o botão
    removeButton.style.border = "none";
    removeButton.style.background = "none";
    removeButton.style.cursor = "pointer";
    removeButton.style.fontSize = "16px";
    removeButton.style.fontWeight = "bold";

    // Adiciona evento de clique para remover o item
    removeButton.addEventListener("click", () => {
      cartTotal -= item.price * item.quantity; // Atualiza o total
      cartItems.splice(index, 1); // Remove o item do carrinho
      updateBill(); // Atualiza a nota fiscal
      updateCartCount(); // Atualiza o contador do carrinho
    });

    li.appendChild(removeButton); // Adiciona o botão "X" ao item
    billItemsList.appendChild(li); // Adiciona o item à nota fiscal
  });

  // Atualiza o total da nota fiscal
  cartTotal = Math.max(cartTotal, 0); // Garante que o total não seja negativo
  document.getElementById("bill__itens-total").innerText = cartTotal.toFixed(2);
}

// Evento para cada botão "Adicionar ao carrinho"
document.querySelectorAll(".cart__add").forEach((button) => {
  button.addEventListener("click", () => {
    const productElement = button.closest("div[role='listitem']");
    const productName = productElement.querySelector("h3").innerText;
    const productPrice = parseFloat(
      productElement
        .querySelector("h4")
        .innerText.replace("R$ ", "")
        .replace(",", ".")
    );

    addItemToCart(productName, productPrice);
  });
});

// Evento para o botão "Finalizar Compra"
document
  .getElementById("bill__button-checkout")
  .addEventListener("click", () => {
    if (cartItems.length === 0) {
      alert("Não há itens no carrinho para finalizar a compra.");
      return; // Impede a execução do código abaixo se não houver itens
    }
    alert("Compra finalizada!"); // Exemplo de alerta
    printBill(); // Chama a função para imprimir a nota fiscal
  });

// Função para imprimir a nota fiscal
function printBill() {
  const billItems = document.getElementById("bill__itens");
  const billItemsClone = billItems.cloneNode(true); // Clona a lista de itens
  const removeButtons = billItemsClone.querySelectorAll("button"); // Seleciona todos os botões "X"

  // Remove todos os botões "X" da cópia
  removeButtons.forEach((button) => button.remove());

  const billTotal = document.getElementById("bill__itens-total").innerText;

  const printWindow = window.open("", "_blank", "width=600,height=400");
  printWindow.document.write(`
    <html>
      <head>
        <title>Nota Fiscal</title>
        <style>
          body {
            font-family: Arial;
            padding: 20px;
          }

          h1 {
            text-align: center;
            font-size: 3rem;
            margin-bottom: 1rem;
          }

          ul {
            place-self: center;
            list-style: none;
            padding: 0;
          }

          li {
            width: fit-content;
            place-self: center;
            padding: 10px 0;
            font-size: 1rem;
            text-align: justify;
          }
          
          .total {
            font-weight: bold;
            font-size: 1.25rem;
            text-align: center;
            margin-top: 20px;
          }
        </style>
      </head>
      <body>
        <h1>Nota Fiscal</h1>
        <br>
        <hr>
        <br>
        <ul>${billItemsClone.innerHTML}</ul>
        <br>
        <hr>
        <br>
        <div class="total">Total: R$ ${billTotal}</div>
      </body>
    </html>
  `);

  printWindow.document.close();
  printWindow.print();
  printWindow.close();
}
