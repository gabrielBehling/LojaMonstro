const loginForm = document.querySelector(".login-form");
const signupForm = document.querySelector(".signup-form");
const toggleForms = document.querySelectorAll(".toggle-form");

toggleForms.forEach((toggle) => {
  toggle.addEventListener("click", () => {
    if (loginForm.classList.contains("active")) {
      // Fechar o formulário de login
      loginForm.classList.add("closing");
      setTimeout(() => {
        loginForm.classList.remove("active", "closing");
        signupForm.classList.add("active");
      }, 500); // Tempo da animação
    } else {
      // Fechar o formulário de criação de conta
      signupForm.classList.add("closing");
      setTimeout(() => {
        signupForm.classList.remove("active", "closing");
        loginForm.classList.add("active");
      }, 500); // Tempo da animação
    }
  });
});
