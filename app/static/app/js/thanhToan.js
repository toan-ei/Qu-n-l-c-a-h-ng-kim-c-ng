document.addEventListener('DOMContentLoaded', () => {
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
}
