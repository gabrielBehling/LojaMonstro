document.addEventListener('DOMContentLoaded', () => {
    const searchInput = document.getElementById('searchInput');
  
    searchInput.addEventListener('focus', () => {
      searchInput.placeholder = ''; // Remove o placeholder ao focar
    });
  
    searchInput.addEventListener('blur', () => {
      if (searchInput.value === '') {
        searchInput.placeholder = 'Buscar produto...'; // Restaura o placeholder se o campo estiver vazio
      }
    });
  });
  
async function loadInitData() {
    try {
        const response = await fetch('/dados/products.json');
        const produtos = await response.json();

        const listaProdutos = document.querySelector('ul');

        listaProdutos.innerHTML = '';

        produtos.forEach(produto => {
            const item = document.createElement('li');
            item.textContent = `${produto.name} - R$${produto.price.toFixed(2)} (Fornecedor: ${produto.supplier})`;
            listaProdutos.appendChild(item);
        });
    } catch (error) {
        console.error('Erro ao carregar os produtos:', error);
    }
}

document.addEventListener("DOMContentLoaded", loadInitData)
