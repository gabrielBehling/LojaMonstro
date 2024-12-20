// document.addEventListener('DOMContentLoaded', () => {
//   const audio = document.getElementById('audio');
//   // Set initial volume to a low value for background music
//   audio.volume = 0.0; // Start volume at 0 for fade-in

//   // Function to fade in the audio
//   function fadeInAudio(duration) {
//       const interval = 100; // Interval in milliseconds
//       const increment = (0.1 / (duration / interval)); // Increment volume by 0.1 over the duration

//       let currentVolume = 0.0;
//       audio.play(); // Start playing audio

//       const fadeInterval = setInterval(() => {
//           if (currentVolume < 0.1) { // Fade to 10%
//               currentVolume = Math.min(currentVolume + increment, 0.1);
//               audio.volume = currentVolume;
//           } else {
//               clearInterval(fadeInterval); // Stop the interval when target volume is reached
//           }
//       }, interval);
//   }

//   // Automatically fade in the audio when the page loads
//   fadeInAudio(7500); // Fade in over 2 seconds
// });

let currentScrollPosition = 0; // Posição atual de rolagem
const itemsToScroll = 4; // Número de itens a serem rolados de cada vez

async function carregarProdutos(event, query='') {
  try {
    const response = await fetch("http://127.0.0.1:3000/products");
    let produtos = await response.json();

    if (query!='') {
      produtos = produtos.filter(item =>
      item.name.toLowerCase().includes(query.toLowerCase()) ||
      item.supplier.toLowerCase().includes(query.toLowerCase())
      );
    }

    const listaProdutos = document.getElementById("produtos");
    listaProdutos.innerHTML = ""; // Limpa a lista antes de adicionar novos produtos

    produtos.forEach((produto) => {
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
                  <button type="button" class="cart__add carrossel__product">
                      <i class='bx bxs-cart-add'></i>
                      <span>Adic. ao carrinho</span>
                  </button>
              </div>
          `;
      listaProdutos.appendChild(item); // Adiciona o item à lista

      // Adiciona evento de clique para o botão "Adicionar ao carrinho"
      item.querySelector(".cart__add").addEventListener("click", () => {
        addItemToCart(produto.name, produto.price);
      });
    });
  } catch (error) {
    console.error("Erro ao carregar os produtos:", error);
  }
}

function handleKeyPress(){
  if (event.key === "Enter") {
    search()
  }
}

async function search() {
  let inputElement = document.querySelector(".search__input")
  carregarProdutos( event, inputElement.value )
}

// Função para mudar o slide
function mudarSlide(direction) {
  const produtosContainer = document.getElementById("produtos");
  const itemWidth =
    produtosContainer.scrollWidth / produtosContainer.children.length; // Largura média de um item
  const scrollAmount = itemWidth * itemsToScroll; // Quantidade a ser rolada

  // Atualiza a posição de rolagem
  currentScrollPosition += direction * scrollAmount;

  // Garante que a posição de rolagem não ultrapasse os limites
  if (currentScrollPosition < 0) {
    currentScrollPosition = 0;
  } else if (
    currentScrollPosition >
    produtosContainer.scrollWidth - produtosContainer.clientWidth
  ) {
    currentScrollPosition =
      produtosContainer.scrollWidth - produtosContainer.clientWidth;
  }

  // Rola suavemente para a nova posição
  produtosContainer.scrollTo({
    left: currentScrollPosition,
    behavior: "smooth", // Habilita a rolagem suave
  });
}

// Adiciona eventos para navegação
document
  .getElementById("prev-btn")
  .addEventListener("click", () => mudarSlide(-1));
document
  .getElementById("next-btn")
  .addEventListener("click", () => mudarSlide(1));

function verificarTamanhoTela() {
  const produtosContainer = document.getElementById("produtos");
  if (window.innerWidth < 850) {
    const itemsToScroll = 3;
  } else if (window.innerWidth < 570) {
    const itemsToScroll = 2;
  }
}

// Add resize event listener
window.addEventListener("resize", verificarTamanhoTela);

// Carrega os produtos ao carregar a página
document.addEventListener("DOMContentLoaded", carregarProdutos);

// ====================================================================================== Carrinho

// Evento para o botão do carrinho
document.getElementById("search__cart").addEventListener("click", () => {
  const bill = document.getElementById("bill");
  const cart = document.getElementById("search__cart");

  if (bill.style.display === "flex") {
    // Se estiver visível, fecha a nota fiscal
    bill.style.display = "none";
    cart.classList.remove("opened");
    closeBill(bill);
  } else {
    // Se não estiver visível, abre a nota fiscal
    bill.style.display = "flex";
    bill.classList.remove("closing");
    cart.classList.add("opened");
  }
});

// Evento para o botão "Fechar"
document.getElementById("bill__button-close").addEventListener("click", () => {
  document.getElementById("bill").style.display = "none";
  document.getElementById("search__cart").classList.remove("opened");
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
    const productElement = button.parentElement;
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
