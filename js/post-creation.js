document.querySelector(".form-container").onsubmit = async function (event) {
  event.preventDefault();

  // Cria o objeto FormData e adiciona os campos do formulário
  const formData = new FormData();

  // Adiciona os campos de texto ao FormData
  formData.append("title", document.getElementById("titulo").value);
  formData.append("subtitle", document.getElementById("subtitulo").value);
  formData.append("content", document.getElementById("paragrafos").value);

  // Adiciona arquivos ao FormData
  const imgFile = document.getElementById("imagem").files[0];
  const footerImgFile = document.getElementById("footer-imagem").files[0];

  if (imgFile) formData.append("img", imgFile);
  if (footerImgFile) formData.append("footerImg", footerImgFile);

  try {
    const response = await fetch("http://127.0.0.1:3000/post", {
      method: "POST",
      body: formData, // Envia no formato multipart/form-data automaticamente
      credentials: "include", // Inclui cookies se necessário
    });

    if (response.ok) {
      alert("Post criado com sucesso!");
    } else {
      const errorData = await response.json();
      alert(`Erro ao criar post: ${errorData.message}`);
    }
  } catch (error) {
    console.error("Erro ao enviar o post:", error);
    alert("Ocorreu um erro. Tente novamente.");
  }
};
