let selectedOption = null;

function selectOption(option, element) {
    selectedOption = option;
    document.getElementById('proximo').disabled = false;

    // Destacar a opção selecionada
    const opcoes = document.querySelectorAll('.doacao-opcao');
    opcoes.forEach(opcao => {
        opcao.classList.remove('selected'); // Remove destaque de todas
    });

    element.classList.add('selected'); // Adiciona destaque à opção selecionada
}

document.getElementById('proximo').addEventListener('click', function() {
    document.querySelector('.doacao-section').style.display = 'none';
    document.getElementById('formulario').style.display = 'block';
    document.getElementById('tipo-doacao').innerText = selectedOption === 'sangue' ? 'Doação de Sangue' : 'Doação de Medula Óssea';
});

document.getElementById('donationForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Impede o envio padrão do formulário

    // Gera um ticket aleatório
    const ticket = Math.floor(Math.random() * 10000);
    document.getElementById('ticket').innerText = ticket;

    // Exibe a seção de confirmação
    document.getElementById('formulario').style.display = 'none';
    document.getElementById('confirmacao').style.display = 'block';
});
