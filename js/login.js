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
  } else {
    alert("Erro ao fazer login. Verifique suas credenciais.");
  }
};

signupForm.onsubmit = async function (event) {
  event.preventDefault();

  // Cria o objeto FormData e adiciona os campos do formulário
  const formData = new FormData();

  // Adiciona os campos de texto ao FormData
  const username = document.getElementById("signupUsername").value;
  const password = document.getElementById("signupPassword").value;
  formData.append("username", username);
  formData.append("password", password);

  // Adiciona o arquivo ao FormData
  const userIcon = document.getElementById("signupUserIcon").files[0];
  if (userIcon) {
    formData.append("userIcon", userIcon);
  }

  const response = await fetch("http://127.0.0.1:3000/register", {
    method: "POST",
    body: formData, // Envia no formato multipart/form-data automaticamente
    credentials: "include", // Inclui cookies se necessário
  });

  if (response.ok) {
    window.location.href = "/index.html";
  } else {
    const errorData = await response.json();
    alert(`Erro ao registrar usuário: ${errorData.message}`);
  }
};
