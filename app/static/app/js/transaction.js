const transactionApi = 'http://127.0.0.1:8000/api/transactions/transaction';

let orderBtn = document.getElementById('order');
orderBtn.onclick = function(event){
    event.preventDefault();
    let nameProduct = document.getElementById('thanhToanName').textContent.trim();
    let quantityProduct = parseInt(document.getElementById('thanhToanSoLuong').value);
    let totalProduct = parseFloat(document.getElementById('total-price').textContent.replace(/[^\d]/g, ''));
    const orderData = {
        product_name: nameProduct,
        quantity: quantityProduct,
        product_total_price: totalProduct,
        transaction_code: `TX${Date.now()}`
    };
    console.log(orderData);
    console.log(localStorage.getItem('token'));
    fetch(transactionApi, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Token ' + localStorage.getItem('token')
        },
        body: JSON.stringify(orderData)
    })
    .then((response) => response.json())
    .then(function(data){
        console.log(data)
        if (data.status) {
            alert('Đặt hàng thành công!');
            console.log('Order Response:', data.data);
        } else {
            alert('Đặt hàng thất bại.');
            console.error('Error:', data.errors);
        }
    })
    .catch(function(Errors){
        console.error('Errors:', Errors);
        alert('Có lỗi xảy ra khi đặt hàng.');
    });
};

