document.addEventListener('DOMContentLoaded', () => {
    const storedData = localStorage.getItem('productData');
    const inputValue = localStorage.getItem('inputValue');
    console.log(storedData, inputValue)
    
    if (storedData && inputValue) {
        const product = JSON.parse(storedData);
        renderCheckout(product, inputValue);
        localStorage.removeItem('productData');
        localStorage.removeItem('inputValue');
    } else {
        console.warn('Không tìm thấy dữ liệu trong localStorage.');
    }
});

function renderCheckout(product, inputValue) {
    const thanhToanName = document.getElementById('thanhToanName');
    const thanhToanPrice = document.getElementById('thanhToanPrice');
    const thanhToanSoLuong = document.getElementById('thanhToanSoLuong');
    const productImage = document.getElementById('thanhToanImage');
    const totalPriceEl = document.getElementById('total-price');

    if (!thanhToanName || !thanhToanPrice || !thanhToanSoLuong || !productImage || !totalPriceEl) {
        console.error('Một hoặc nhiều phần tử không tồn tại. Kiểm tra ID trong HTML.');
        return;
    }

    thanhToanName.textContent = product.product_name;
    thanhToanPrice.textContent = `${parseFloat(product.product_price).toLocaleString()} VND`;
    thanhToanSoLuong.value = inputValue;
    productImage.src = product.product_image_first;
    productImage.alt = product.product_name;

    const numericPrice = parseFloat(product.product_price);
    const total = numericPrice * inputValue;
    totalPriceEl.textContent = `${total.toLocaleString('vi-VN')} VND`;
}


