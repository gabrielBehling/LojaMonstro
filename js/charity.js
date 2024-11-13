let selectedOption = null;

function selectOption(option, element) {
  selectedOption = option;
  document.getElementById("proximo").disabled = false;

  // Destacar a opção selecionada
  const opcoes = document.querySelectorAll(".doacao-opcao");
  opcoes.forEach((opcao) => {
    opcao.classList.remove("selected"); // Remove destaque de todas
    opcao.classList.add("faded"); // Adiciona a classe 'faded' para opções não selecionadas
  });

  element.classList.add("selected"); // Adiciona destaque à opção selecionada
  element.classList.remove("faded"); // Remove a classe 'faded' da opção selecionada
}

document.getElementById("proximo").addEventListener("click", function () {
  document.querySelector(".doacao-section").style.display = "none";
  document.getElementById("formulario").style.display = "block";
  document.getElementById("tipo-doacao").innerText =
    selectedOption === "sangue" ? "Doação de Sangue" : "Doação de Medula Óssea";

  // Atualiza o link do botão "Começar a Doar"
  document.getElementById("btn-doar").href = "#formulario";
});

document
  .getElementById("donationForm")
  .addEventListener("submit", function (event) {
    event.preventDefault(); // Impede o envio padrão do formulário

    // Gera um ticket aleatório
    const ticket = Math.floor(Math.random() * 10000);
    document.getElementById("ticket").innerText = ticket;

    // Exibe a seção de confirmação
    document.getElementById("formulario").style.display = "none";
    document.getElementById("confirmacao").style.display = "block";

    // Atualiza o link do botão "Começar a Doar"
    document.getElementById("btn-doar").href = "#confirmacao";
  });

//
document.getElementById("btn-doar").addEventListener("click", function (e) {
  e.preventDefault(); // Impede o comportamento padrão do link
  const targetId = this.getAttribute("href"); // Obtém o ID do alvo
  const targetElement = document.querySelector(targetId); // Seleciona o elemento alvo
  const headerOffset = 75; // Ajuste conforme necessário
  const elementPosition =
    targetElement.getBoundingClientRect().top + window.scrollY; // Posição do elemento
  const offsetPosition = elementPosition - headerOffset; // Ajusta a posição

  // Rolagem suave
  window.scrollTo({ top: offsetPosition, behavior: "smooth" });
});

const telefoneInput = document.querySelector("#telefone");

telefoneInput.addEventListener("input", () => {
    // Remove todos os caracteres que não são dígitos
    let value = telefoneInput.value.replace(/\D/g, "");

    // Aplica a máscara
    if (value.length > 10) {
        value = value.slice(0, 11); // Limita a 11 dígitos
    }
    if (value.length > 7) {
        value = value.slice(0, 7) + "-" + value.slice(7); // Adiciona o hífen após 5 dígitos
    }
    if (value.length > 2) {
        value = "(" + value.slice(0, 2) + ") " + value.slice(2); // Adiciona o código de área
    }

    telefoneInput.value = value; // Atualiza o valor do input
});
