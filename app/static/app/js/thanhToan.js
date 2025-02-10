document.addEventListener('DOMContentLoaded', () => {
<<<<<<< HEAD
    // Lấy dữ liệu đã lưu từ localStorage
    const storedData = localStorage.getItem('productData');
    const inputValue = localStorage.getItem('inputValue');

    if (storedData && inputValue) {
        const product = JSON.parse(storedData);
        renderThanhToan(product, inputValue);
        // Nếu cần, xóa dữ liệu sau khi sử dụng
        //localStorage.removeItem('productData');
        //localStorage.removeItem('inputValue');
    }
});

function renderThanhToan(product, inputValue) {
    const thanhToanName = document.getElementById('thanhToanName');
    const thanhToanPrice = document.getElementById('thanhToanPrice');
    const thanhToanSoLuong = document.getElementById('thanhToanSoLuong');
    const productImage = document.getElementById('thanhToanImage');
    const totalPriceElement = document.getElementById('total-price');

    if (thanhToanName && thanhToanPrice && thanhToanSoLuong && productImage) {
        thanhToanName.textContent = product.data.product_name;
        thanhToanPrice.textContent = `${parseFloat(product.data.product_price).toLocaleString()} VND`;
        thanhToanSoLuong.value = inputValue;
        productImage.src = product.data.product_image_first;
        productImage.alt = product.data.product_name;

        const totalPrice = parseFloat(product.data.product_price) * inputValue;
        totalPriceElement.textContent = `${totalPrice.toLocaleString()} VND`;

        thanhToanSoLuong.addEventListener('input', (e) => {
            const newQuantity = e.target.value;
            if (newQuantity && newQuantity > 0) {
                localStorage.setItem('inputValue', newQuantity);
                const newTotalPrice = parseFloat(product.data.product_price) * newQuantity;
                totalPriceElement.textContent = `${newTotalPrice.toLocaleString()} VND`;
            }
        });
    } else {
        console.error('Không tìm thấy phần tử thanh toán.');
    }
=======
    // Lấy giỏ hàng từ localStorage (dùng key "cart")
    const storedData = localStorage.getItem('cart');
    const cartItems = storedData ? JSON.parse(storedData) : [];

    // Lọc ra các sản phẩm đã được chọn (có thuộc tính checked === true)
    const selectedItems = cartItems.filter(item => item.checked);

    renderThanhToan(selectedItems);
});

function renderThanhToan(products) {
    const productsContainer = document.getElementById('thanhToanProducts');
    const totalPriceElement = document.getElementById('total-price');

    if (!productsContainer || !totalPriceElement) {
        console.error('Không tìm thấy phần tử hiển thị thanh toán.');
        return;
    }

    // Xóa nội dung cũ
    productsContainer.innerHTML = '';
    let totalAmount = 0;

    if (products.length === 0) {
        productsContainer.innerHTML = '<p>Bạn chưa chọn sản phẩm nào để thanh toán.</p>';
        totalPriceElement.textContent = '0 VND';
        return;
    }

    products.forEach((product, index) => {
        const itemTotal = product.price * product.quantity;
        totalAmount += itemTotal;

        // Render thông tin sản phẩm theo giao diện ban đầu
        // Lưu ý: số lượng chỉ hiển thị dưới dạng văn bản, không có input tăng giảm
        const card = document.createElement('div');
        card.className = "card mb-4 shadow-sm animate__animated animate__fadeInLeft";
        card.innerHTML = `
            <div class="row g-0">
                <div class="col-md-4">
                    <img src="${product.image}" alt="${product.name}" class="img-fluid rounded-start">
                </div>
                <div class="col-md-8">
                    <div class="card-body">
                        <h5 class="card-title"><strong>${product.name}</strong></h5>
                        <p class="card-text text-danger"><strong>${product.price.toLocaleString()} VND</strong></p>
                        <p>Số lượng: ${product.quantity}</p>
                    </div>
                </div>
            </div>
        `;
        productsContainer.appendChild(card);
    });

    totalPriceElement.textContent = `${totalAmount.toLocaleString()} VND`;
>>>>>>> 71e366c5a590c4f0c32f5bb2dfa67977ea180740
}
