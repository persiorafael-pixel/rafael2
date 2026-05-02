// Super Admin script
document.addEventListener('DOMContentLoaded', function() {
    fetchEmpresas();
    fetchAllUsers();
});

function showTab(tabId, event) {
    const tabs = document.querySelectorAll('.tab-content');
    tabs.forEach(tab => tab.classList.remove('active'));
    document.getElementById(tabId).classList.add('active');

    const buttons = document.querySelectorAll('.tab-button');
    buttons.forEach(button => button.classList.remove('active'));
    event.target.classList.add('active');
}

function fetchEmpresas() {
    fetch('http://localhost:3000/empresas')
        .then(response => response.json())
        .then(data => {
            const select = document.getElementById('empresa_id');
            const promoteSelect = document.getElementById('promoteSchool');
            select.innerHTML = '<option value="">Selecione uma escola</option>';
            promoteSelect.innerHTML = '<option value="">Selecione uma escola</option>';
            data.forEach(empresa => {
                const option = document.createElement('option');
                option.value = empresa.id;
                option.textContent = empresa.nome;
                select.appendChild(option);

                const promoteOption = document.createElement('option');
                promoteOption.value = empresa.id;
                promoteOption.textContent = empresa.nome;
                promoteSelect.appendChild(promoteOption);
            });
        });
}

function fetchAllUsers() {
    fetch('http://localhost:3000/users', {
        headers: { 'Authorization': localStorage.getItem('token') }
    })
    .then(response => response.json())
    .then(data => {
        const tbody = document.getElementById('allUsersTable');
        tbody.innerHTML = '';
        data.forEach(user => {
            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td>${user.username}</td>
                <td>${user.escola || 'N/A'}</td>
                <td>${user.role}</td>
                <td class="status-${user.status}">${user.status}</td>
            `;
            tbody.appendChild(tr);
        });
    });
}

function loadUsersBySchool() {
    const schoolId = document.getElementById('promoteSchool').value;
    if (!schoolId) {
        document.getElementById('promoteUsersTable').innerHTML = '';
        return;
    }
    fetch(`http://localhost:3000/users?empresa_id=${schoolId}`, {
        headers: { 'Authorization': localStorage.getItem('token') }
    })
    .then(response => response.json())
    .then(data => {
        const tbody = document.getElementById('promoteUsersTable');
        tbody.innerHTML = '';
        data.forEach(user => {
            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td>${user.username}</td>
                <td>${user.escola || 'N/A'}</td>
                <td>${user.role}</td>
                <td class="status-${user.status}">${user.status}</td>
                <td>
                    ${user.role !== 'admin' ? `<button class="btn" onclick="promoverUsuario(${user.id})">Promover</button>` : ''}
                </td>
            `;
            tbody.appendChild(tr);
        });
    });
}

function criarEscola() {
    const nome = document.getElementById('nomeEscola').value;
    fetch('http://localhost:3000/empresa', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': localStorage.getItem('token')
        },
        body: JSON.stringify({ nome })
    })
    .then(response => response.json())
    .then(data => {
        alert('Escola criada!');
        document.getElementById('nomeEscola').value = '';
        fetchEmpresas(); // Refresh select
    });
}

function criarUsuario() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const role = document.getElementById('role').value;
    const empresa_id = document.getElementById('empresa_id').value;
    fetch('http://localhost:3000/createUser', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': localStorage.getItem('token')
        },
        body: JSON.stringify({ username, password, role, empresa_id })
    })
    .then(response => response.json())
    .then(data => {
        alert('Usuário criado!');
        document.getElementById('username').value = '';
        document.getElementById('password').value = '';
        fetchAllUsers(); // Refresh table
    });
}

function promoverUsuario(userId) {
    fetch('http://localhost:3000/promover', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': localStorage.getItem('token')
        },
        body: JSON.stringify({ user_id: userId })
    })
    .then(response => response.json())
    .then(data => {
        alert('Usuário promovido!');
        loadUsersBySchool();
        fetchAllUsers();
    });
}

function logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    window.location.href = '../index.html';
}