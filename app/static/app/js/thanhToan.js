document.addEventListener('DOMContentLoaded', () => {
    // Lấy dữ liệu đã lưu từ localStorage
    const storedData = localStorage.getItem('productData');
    const inputValue = localStorage.getItem('inputValue');

    if (storedData && inputValue) {
        const product = JSON.parse(storedData);
        renderThanhToan(product, inputValue);
<<<<<<< HEAD
        // Nếu cần, xóa dữ liệu sau khi sử dụng
        localStorage.removeItem('productData');
        localStorage.removeItem('inputValue');
    }
});

=======
        updateMiniCart(product, inputValue); // Cập nhật mini cart
    }
});

// Cập nhật dữ liệu hiển thị trong thanh toán
>>>>>>> c087a4d3fb032f953295ecc5a1bb22c47b6656ab
function renderThanhToan(product, inputValue) {
    const thanhToanName = document.getElementById('thanhToanName');
    const thanhToanPrice = document.getElementById('thanhToanPrice');
    const thanhToanSoLuong = document.getElementById('thanhToanSoLuong');
    const productImage = document.getElementById('thanhToanImage');
<<<<<<< HEAD

    if (thanhToanName && thanhToanPrice && thanhToanSoLuong && productImage) {
=======
    const totalPriceElement = document.getElementById('total-price');

    if (thanhToanName && thanhToanPrice && thanhToanSoLuong && productImage && totalPriceElement) {
        // Cập nhật thông tin sản phẩm và số lượng
>>>>>>> c087a4d3fb032f953295ecc5a1bb22c47b6656ab
        thanhToanName.textContent = product.data.product_name;
        thanhToanPrice.textContent = `${parseFloat(product.data.product_price).toLocaleString()} VND`;
        thanhToanSoLuong.value = inputValue;
        productImage.src = product.data.product_image_first;
        productImage.alt = product.data.product_name;
<<<<<<< HEAD
=======

        // Tính tổng tiền
        const totalPrice = parseFloat(product.data.product_price) * inputValue;
        totalPriceElement.textContent = `${totalPrice.toLocaleString()} VND`;

        // Lắng nghe sự thay đổi số lượng và cập nhật vào localStorage
        thanhToanSoLuong.addEventListener('input', (e) => {
            const newQuantity = e.target.value;
            if (newQuantity && newQuantity > 0) {
                localStorage.setItem('inputValue', newQuantity);
                // Cập nhật lại tổng tiền
                const newTotalPrice = parseFloat(product.data.product_price) * newQuantity;
                totalPriceElement.textContent = `${newTotalPrice.toLocaleString()} VND`;
            }
        });
>>>>>>> c087a4d3fb032f953295ecc5a1bb22c47b6656ab
    } else {
        console.error('Không tìm thấy phần tử thanh toán.');
    }
}
<<<<<<< HEAD
=======

// Cập nhật mini cart với sản phẩm và tổng tiền
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
