const eventos = [
    { id: 1, titulo: "NATAL", data: "25-12-2024", local: "CASA", descricao: "CELEBRAÇÃO EM FAMILIA." },
    { id: 2, titulo: "ANO NOVO", data: "01-01-2025", local: "PRAIA", descricao: "CELEBRAÇÃO COM IRMAOS." },
];

const participantes = {};

function loadEventos() {
    const lista = document.getElementById('eventos-lista');
    eventos.forEach(evento => {
        const div = document.createElement('div');
        div.className = 'evento';
        div.innerHTML = `
            <h2>${evento.titulo}</h2>
            <p><strong>Data:</strong> ${evento.data}</p>
            <p><strong>Local:</strong> ${evento.local}</p>
            <p>${evento.descricao}</p>
            <button onclick="verParticipantes(${evento.id})">VER OS COLEGUINHAS</button>
        `;
        lista.appendChild(div);
    });
}

function verParticipantes(eventoId) {
    localStorage.setItem('eventoId', eventoId);
    window.location.href = 'participantes.html';
}

function loadParticipantes() {
    const eventoId = localStorage.getItem('eventoId');
    const lista = document.getElementById('participantes-lista');
    
    if (!participantes[eventoId]) {
        participantes[eventoId] = [];
    }

    participantes[eventoId].forEach(participante => {
        const div = document.createElement('div');
        div.className = 'participante';
        div.innerHTML = `<p>${participante.nome} - ${participante.email}</p>`;
        lista.appendChild(div);
    });

    document.getElementById('form-participante').addEventListener('submit', function(event) {
        event.preventDefault();
        const nome = document.getElementById('nome').value;
        const email = document.getElementById('email').value;

        participantes[eventoId].push({ nome, email });
        loadParticipantes(); // Atualiza a lista
        this.reset(); // Limpa o formulário
    });
}

// Carregar eventos na página principal
if (document.getElementById('eventos-lista')) {
    loadEventos();
}

// Carregar participantes na página de participantes
if (document.getElementById('participantes-lista')) {
    loadParticipantes();
}
