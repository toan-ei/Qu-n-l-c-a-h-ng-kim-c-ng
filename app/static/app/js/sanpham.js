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
        
            fetch(`http://127.0.0.1:8000/api/products/product/${productId}`, {
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
<<<<<<< HEAD
                // Chuyển hướng sang trang thanhToan.html
                window.location.href = '/thanhtoan';
=======
                
                // Hiển thị thông báo "Đặt hàng thành công"
                alert('Đặt hàng thành công!');
                
                // Cập nhật mini cart ngay lập tức
                updateMiniCart(data, inputValue);
>>>>>>> c087a4d3fb032f953295ecc5a1bb22c47b6656ab
            })
            .catch((error) => {
                console.error('Error:', error);
            });
        });
    }
});
<<<<<<< HEAD
=======
// Hàm cập nhật mini cart
function updateMiniCart(product, inputValue) {
    const miniCartItems = document.getElementById('miniCartItems');
    const miniCartTotal = document.getElementById('miniCartTotal');

    // Xóa các sản phẩm cũ trong mini cart
    miniCartItems.innerHTML = '';

    // Thêm sản phẩm vào mini cart
    const cartItem = document.createElement('div');
    cartItem.classList.add('cart_item');
    cartItem.innerHTML = `
        <div class="cart_img">
            <a href="#"><img src="${product.data.product_image_first}" alt="${product.data.product_name}"></a>
        </div>
        <div class="cart_info">
            <a href="#">${product.data.product_name}</a>
            <span class="quantity">Qty : ${inputValue}</span>
            <span class="price_cart">${(product.data.product_price * inputValue).toLocaleString()} VND</span>
        </div>
        <div class="cart_remove">
            <a href="javascript:void(0)"><i class="ion-android-close"></i></a>
        </div>
    `;
    miniCartItems.appendChild(cartItem);

    // Tính toán và cập nhật tổng tiền
    const total = product.data.product_price * inputValue;
    miniCartTotal.textContent = `${total.toLocaleString()} VND`;

    // Lắng nghe sự kiện xóa sản phẩm trong mini cart
    const removeButton = cartItem.querySelector('.cart_remove a');
    removeButton.addEventListener('click', () => {
        // Xóa sản phẩm khỏi mini cart
        miniCartItems.removeChild(cartItem);

        // Xóa dữ liệu sản phẩm và số lượng khỏi localStorage
        localStorage.removeItem('productData');
        localStorage.removeItem('inputValue');

        // Cập nhật lại tổng tiền trong mini cart
        miniCartTotal.textContent = '0 VND';
    });
}
>>>>>>> c087a4d3fb032f953295ecc5a1bb22c47b6656ab
