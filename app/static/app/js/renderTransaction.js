const transactionApi = 'http://127.0.0.1:8000/api/transactions/transaction';

function renderTransactionHistory(transactions) {
    const tbody = document.querySelector('table tbody');
    tbody.innerHTML = '';

    transactions.forEach(transaction => {
        const row = document.createElement('tr');
        row.style.color = '#2d3436';
        row.style.fontSize = '1.1rem';

        row.innerHTML = `
            <td>${transaction.transaction_code}</td>
            <td>${new Date(transaction.transaction_date).toLocaleDateString()}</td>
            <td>${transaction.product_name}</td>
            <td>${transaction.quantity}</td>
            <td style="color: #d63031; font-weight: bold;">${transaction.product_total_price.toLocaleString('vi-VN')} VND</td>
        `;
        tbody.appendChild(row);
    });
}

function loadTransactionHistory() {
    fetch(transactionApi, {
        method: 'GET',
        headers: {
            'Authorization': 'Token ' + localStorage.getItem('token')
        }
    })
    .then(response => response.json())
    .then(data => {
        if (data.status) {
            renderTransactionHistory(data.data);
        } else {
            alert('Không tải được lịch sử giao dịch.');
        }
    })
    .catch(error => {
        console.error('Lỗi khi tải lịch sử giao dịch:', error);
        alert('Có lỗi xảy ra khi tải lịch sử giao dịch.');
    });
}

document.addEventListener('DOMContentLoaded', loadTransactionHistory);
