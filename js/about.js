// Ajuste no evento de clique para rolar até a seção "Saiba Mais"
document.querySelectorAll(".hero__button").forEach((button) => {
  button.addEventListener("click", function (e) {
    e.preventDefault();

    // Recupera o ID do alvo do link
    const targetId = this.getAttribute("href");
    const targetElement = document.querySelector(targetId);

    // Definindo o deslocamento para levar em consideração o cabeçalho fixo
    const headerOffset = 75; // Ajuste conforme o tamanho do cabeçalho fixo
    const elementPosition =
      targetElement.getBoundingClientRect().top + window.scrollY;
    const offsetPosition = elementPosition - headerOffset;

    // Rolagem suave até a seção alvo
    window.scrollTo({ top: offsetPosition, behavior: "smooth" });
  });
});
