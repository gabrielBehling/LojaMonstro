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
  