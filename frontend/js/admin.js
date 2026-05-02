// Admin script
document.addEventListener('DOMContentLoaded', function() {
    // Set today's date as default
    const today = new Date().toISOString().split('T')[0];
    document.getElementById('data').value = today;
    
    // Set current time as default
    const now = new Date();
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    document.getElementById('hora').value = `${hours}:${minutes}`;
    
    fetchUsers();
    fetchOcorrencias();
});

function showTab(tabId, event) {
    const tabs = document.querySelectorAll('.tab-content');
    tabs.forEach(tab => tab.classList.remove('active'));
    document.getElementById(tabId).classList.add('active');

    const buttons = document.querySelectorAll('.tab-button');
    buttons.forEach(button => button.classList.remove('active'));
    event.target.classList.add('active');
    
    if (tabId === 'ocorrencias') {
        fetchOcorrencias();
    }
}

function fetchUsers() {
    fetch('http://localhost:3000/users', {
        headers: { 'Authorization': localStorage.getItem('token') }
    })
    .then(response => response.json())
    .then(data => {
        const tbody = document.getElementById('usersTable');
        tbody.innerHTML = '';
        
        const pendentes = data.filter(u => u.status === 'pendente');
        
        if (pendentes.length === 0) {
            tbody.innerHTML = '<tr><td colspan="4" style="text-align: center; color: #999;">Nenhum usuário pendente</td></tr>';
            return;
        }
        
        pendentes.forEach(user => {
            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td><strong>${user.username}</strong></td>
                <td><span style="background: #e7f3ff; padding: 5px 10px; border-radius: 3px; font-size: 12px;">${user.role}</span></td>
                <td class="status-${user.status}"><strong>${user.status}</strong></td>
                <td>
                    <button class="btn" onclick="aprovar(${user.id})"><i class="fas fa-check"></i> Aprovar</button>
                    <button class="btn btn-danger" onclick="recusar(${user.id})"><i class="fas fa-times"></i> Recusar</button>
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
        alert('Usuário aprovado com sucesso!');
        fetchUsers();
    })
    .catch(error => alert('Erro ao aprovar usuário'));
}

function recusar(userId) {
    if (!confirm('Deseja realmente recusar este usuário?')) return;
    
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
    })
    .catch(error => alert('Erro ao recusar usuário'));
}

function criarOcorrencia() {
    const aluno = document.getElementById('aluno').value.trim();
    const turma = document.getElementById('turma').value.trim();
    const descricao = document.getElementById('descricao').value.trim();
    const data = document.getElementById('data').value;
    const hora = document.getElementById('hora').value;

    if (!aluno || !turma || !descricao || !data || !hora) {
        alert('Preencha todos os campos');
        return;
    }

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
        alert('Ocorrência registrada com sucesso!');
        document.getElementById('aluno').value = '';
        document.getElementById('turma').value = '';
        document.getElementById('descricao').value = '';
        
        const today = new Date().toISOString().split('T')[0];
        document.getElementById('data').value = today;
        
        fetchOcorrencias();
    })
    .catch(error => {
        console.error('Erro:', error);
        alert('Erro ao registrar ocorrência');
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
        
        if (data.length === 0) {
            div.innerHTML = '<p style="text-align: center; color: #999; padding: 20px;">Nenhuma ocorrência registrada</p>';
            return;
        }
        
        data.forEach(ocorrencia => {
            const card = document.createElement('div');
            card.className = 'card';
            card.style.borderLeft = '4px solid #ffc107';
            card.innerHTML = `
                <div style="display: flex; justify-content: space-between; align-items: start;">
                    <div>
                        <h4 style="margin: 0 0 10px 0; color: #333;">
                            <i class="fas fa-user"></i> ${ocorrencia.aluno}
                        </h4>
                        <p style="margin: 5px 0; color: #666;">
                            <strong>Turma:</strong> ${ocorrencia.turma}
                        </p>
                        <p style="margin: 5px 0; color: #666;">
                            <strong>Descrição:</strong> ${ocorrencia.descricao}
                        </p>
                        <p style="margin: 5px 0; color: #999; font-size: 12px;">
                            <i class="fas fa-calendar"></i> ${ocorrencia.data} às ${ocorrencia.hora}
                        </p>
                    </div>
                </div>
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