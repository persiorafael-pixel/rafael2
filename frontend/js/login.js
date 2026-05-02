// Login script
document.addEventListener('DOMContentLoaded', function() {
    fetchEmpresas();
    document.getElementById('loginForm').addEventListener('submit', login);
    document.getElementById('createUserLink').addEventListener('click', () => {
        window.location.href = 'pages/createUser.html';
    });
});

function fetchEmpresas() {
    fetch('http://localhost:3000/empresas')
        .then(response => response.json())
        .then(data => {
            const select = document.getElementById('empresa');
            data.forEach(empresa => {
                const option = document.createElement('option');
                option.value = empresa.id;
                option.textContent = empresa.nome;
                select.appendChild(option);
            });
        });
}

function login(e) {
    e.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const empresa_id = document.getElementById('empresa').value;

    const data = { username, password };
    if (empresa_id) data.empresa_id = empresa_id;

    fetch('http://localhost:3000/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(data => {
        if (data.token) {
            localStorage.setItem('token', data.token);
            localStorage.setItem('role', data.role);
            redirectUser(data.role);
        } else {
            alert(data.error);
        }
    });
}

function redirectUser(role) {
    if (role === 'super_admin') {
        window.location.href = 'pages/superadmin.html';
    } else if (role === 'admin') {
        window.location.href = 'pages/admin.html';
    } else {
        window.location.href = 'pages/dashboard.html';
    }
}