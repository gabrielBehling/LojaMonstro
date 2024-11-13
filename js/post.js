async function carregarPost() {
  try {
    const urlParams = new URLSearchParams(window.location.search);
    const postId = urlParams.get("id");

    if (!postId) {
      document.getElementById("post-title").innerText = "Post não encontrado.";
      return;
    }

    const response = await fetch(`http://127.0.0.1:3000/post/${postId}`);

    if (response.ok) {
      let post = await response.json();
      console.log(post);

      post.date = new Date(post.date).toLocaleDateString("pt-BR", {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });

      post.time = new Date(post.time).toLocaleTimeString("pt-BR", {
        hour: '2-digit',
        minute: '2-digit'
      });
      
      document.getElementById('post-title').textContent = post.title;
      document.getElementById('post-subtitle').textContent = post.subtitle;
      document.getElementById('post-img').src = post.img;
      document.getElementById('post-meta').textContent = `Autor: ${post.author} | Data: ${post.date} ${post.time}`;
      document.getElementById('post-content').textContent = post.content;
      document.getElementById('post-footer-img').src = post.footerImg;
    }

    if (post) {
    } else {
      document.getElementById("post-content").innerText = "Post não encontrado.";
    }
  } catch (error) {
    console.error("Erro ao carregar o post:", error);
    document.getElementById("post-content").innerText = "Erro ao carregar o post.";
  }
}

document.addEventListener("DOMContentLoaded", carregarPost);
