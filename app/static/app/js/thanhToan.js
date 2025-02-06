document.addEventListener('DOMContentLoaded', () => {
    // Lấy dữ liệu đã lưu từ localStorage
    const storedData = localStorage.getItem('productData');
    const inputValue = localStorage.getItem('inputValue');

    if (storedData && inputValue) {
        const product = JSON.parse(storedData);
        renderThanhToan(product, inputValue);
        // Nếu cần, xóa dữ liệu sau khi sử dụng
        localStorage.removeItem('productData');
        localStorage.removeItem('inputValue');
    }
});

function renderThanhToan(product, inputValue) {
    const thanhToanName = document.getElementById('thanhToanName');
    const thanhToanPrice = document.getElementById('thanhToanPrice');
    const thanhToanSoLuong = document.getElementById('thanhToanSoLuong');
    const productImage = document.getElementById('thanhToanImage');

    if (thanhToanName && thanhToanPrice && thanhToanSoLuong && productImage) {
        thanhToanName.textContent = product.data.product_name;
        thanhToanPrice.textContent = `${parseFloat(product.data.product_price).toLocaleString()} VND`;
        thanhToanSoLuong.value = inputValue;
        productImage.src = product.data.product_image_first;
        productImage.alt = product.data.product_name;
    } else {
        console.error('Không tìm thấy phần tử thanh toán.');
    }
}
