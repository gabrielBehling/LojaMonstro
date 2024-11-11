async function carregarPost() {
  try {
    const urlParams = new URLSearchParams(window.location.search);
    const postId = urlParams.get("id");

    if (!postId) {
      document.getElementById("post-content").innerText =
        "Post não encontrado.";
      return;
    }

    const response = await fetch("./data/posts.json");
    const posts = await response.json();
    const post = posts.find((p) => p.id === postId);

    if (post) {
      document.getElementById("post-title").innerText = post.title;
      document.getElementById(
        "post-meta"
      ).innerText = `Por ${post.author} em ${post.date} às ${post.time}`;
      document.getElementById("post-content").innerText = post.content;
    } else {
      document.getElementById("post-content").innerText =
        "Post não encontrado.";
    }
  } catch (error) {
    console.error("Erro ao carregar o post:", error);
    document.getElementById("post-content").innerText =
      "Erro ao carregar o post.";
  }
}

document.addEventListener("DOMContentLoaded", carregarPost);