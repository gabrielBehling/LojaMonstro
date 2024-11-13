const postForm = document.querySelector(".form-container");

postForm.onsubmit = async function (event) {
  event.preventDefault();

  // Cria o objeto FormData e adiciona campos do formulário
  const formData = new FormData(postForm);
  formData.append("title", document.getElementById("title").value);
  formData.append("subtitle", document.getElementById("subtitle").value);
  formData.append("content", document.getElementById("content").value);

  // Adiciona arquivos ao FormData
  const imgFile = document.getElementById("img").files[0];
  const footerImgFile = document.getElementById("footerImg").files[0];

  if (imgFile) formData.append("img", imgFile);
  if (footerImgFile) formData.append("footerImg", footerImgFile);

  try {
    const response = await fetch("http://127.0.0.1:3000/post", {
      method: "POST",
      body: formData, // O FormData configura automaticamente o tipo multipart/form-data
      credentials: "include", // Envia cookies automaticamente se necessários
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