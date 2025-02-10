document.addEventListener('DOMContentLoaded', () => {
    const addTocart = document.getElementById('order_button');
    if (addTocart) {
        addTocart.addEventListener('click', (e) => {
            const productId = addTocart.getAttribute('data-id');
            const inputElement = document.getElementById('myInput');
            const inputValue = inputElement ? inputElement.value : 0;
            
            if (!inputValue || inputValue <= 0) {
                alert('Vui lòng nhập số lượng hợp lệ!');
                return;
            }
        
            fetch(`http://127.0.0.1:8000/api/products/product/${productId}  `, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                }
            })
            .then(response => response.json())
            .then(data => {
                console.log('Success:', data);
                console.log('soluong', inputValue);
                // Lưu dữ liệu sản phẩm và số lượng vào localStorage
                localStorage.setItem('productData', JSON.stringify(data));
                localStorage.setItem('inputValue', inputValue);
                // Chuyển hướng sang trang thanhToan.html
                window.location.href = '/thanhtoan';
            })
            .catch((error) => {
                console.error('Error:', error);
            });
        });
    }
});
