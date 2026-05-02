// Dashboard script
document.addEventListener('DOMContentLoaded', function() {
    fetchOcorrencias();
});

function fetchOcorrencias() {
    fetch('http://localhost:3000/ocorrencias', {
        headers: { 'Authorization': localStorage.getItem('token') }
    })
    .then(response => response.json())
    .then(data => {
        const div = document.getElementById('ocorrenciasList');
        div.innerHTML = '';
        data.forEach(ocorrencia => {
            const card = document.createElement('div');
            card.className = 'ocorrencia-card';
            card.innerHTML = `
                <h4>${ocorrencia.aluno} - ${ocorrencia.turma}</h4>
                <p>${ocorrencia.descricao}</p>
                <small>${ocorrencia.data} ${ocorrencia.hora}</small>
            `;
            div.appendChild(card);
        });
    });
}

function criarOcorrencia() {
    const aluno = document.getElementById('aluno').value;
    const turma = document.getElementById('turma').value;
    const descricao = document.getElementById('descricao').value;
    const data = document.getElementById('data').value;
    const hora = document.getElementById('hora').value;
    fetch('http://localhost:3000/ocorrencia', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': localStorage.getItem('token')
        },
        body: JSON.stringify({ aluno, turma, descricao, data, hora })
    })
    .then(response => response.json())
    .then(data => {
        alert('Ocorrência criada!');
        document.getElementById('aluno').value = '';
        document.getElementById('turma').value = '';
        document.getElementById('descricao').value = '';
        document.getElementById('data').value = '';
        document.getElementById('hora').value = '';
        fetchOcorrencias();
    });
}

function logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    window.location.href = '../index.html';
}