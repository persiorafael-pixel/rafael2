// Admin script
document.addEventListener('DOMContentLoaded', function() {
    fetchUsers();
    fetchOcorrencias();
});

function fetchUsers() {
    fetch('http://localhost:3000/users', {
        headers: { 'Authorization': localStorage.getItem('token') }
    })
    .then(response => response.json())
    .then(data => {
        const tbody = document.getElementById('usersTable');
        tbody.innerHTML = '';
        data.forEach(user => {
            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td>${user.username}</td>
                <td>${user.role}</td>
                <td class="status-${user.status}">${user.status}</td>
                <td>
                    ${user.status === 'pendente' ? `<button class="btn" onclick="aprovar(${user.id})">Aprovar</button> <button class="btn btn-danger" onclick="recusar(${user.id})">Recusar</button>` : ''}
                </td>
            `;
            tbody.appendChild(tr);
        });
    });
}

function aprovar(userId) {
    fetch('http://localhost:3000/aprovar', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': localStorage.getItem('token')
        },
        body: JSON.stringify({ user_id: userId })
    })
    .then(response => response.json())
    .then(data => {
        alert('Usuário aprovado!');
        fetchUsers();
    });
}

function recusar(userId) {
    fetch('http://localhost:3000/recusar', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': localStorage.getItem('token')
        },
        body: JSON.stringify({ user_id: userId })
    })
    .then(response => response.json())
    .then(data => {
        alert('Usuário recusado!');
        fetchUsers();
    });
}

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

function logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    window.location.href = '../index.html';
}