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