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

loginForm.onsubmit = async function (event) {
  event.preventDefault();

  const formData = new FormData(event.target);
  const data = Object.fromEntries(formData.entries());

  const response = await fetch("http://127.0.0.1:3000/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
    credentials: "include", // Envia e salva cookies automaticamente
  });

  if (response.ok) {
    alert("Login bem-sucedido!");
    window.location.href = "/index.html";
    // Redirecione ou atualize a página conforme necessário
  } else {
    alert("Erro ao fazer login. Verifique suas credenciais.");
  }
};

signupForm.onsubmit = async function (event) {
  event.preventDefault();

  // Cria o FormData para enviar dados e o arquivo de imagem
  const formData = new FormData(event.target);
  const data = Object.fromEntries(formData.entries());

  try {
    const response = await fetch("http://127.0.0.1:3000/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
      credentials: "include", // Envia e salva cookies automaticamente
    });

    if (response.ok) {
      alert("Usuário registrado com sucesso!");
      window.location.href = "/index.html";

      // Redireciona ou mostra mensagem adicional conforme necessário
    } else {
      const errorData = await response.json();
      alert(`Erro ao registrar usuário: ${errorData.message}`);
    }
  } catch (error) {
    console.error("Erro ao registrar:", error);
    alert("Ocorreu um erro. Tente novamente.");
  }
};
