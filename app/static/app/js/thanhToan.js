document.addEventListener('DOMContentLoaded', () => {
    let product = null;
    
    // Ưu tiên kiểm tra xem có sản phẩm được đặt hàng hay không (orderedProduct)
    const orderedProductData = localStorage.getItem('orderedProduct');
    if (orderedProductData) {
        product = JSON.parse(orderedProductData);
        // Sau khi lấy dữ liệu, bạn có thể xóa key này nếu không cần dùng nữa
        localStorage.removeItem('orderedProduct');
    } else {
        // Nếu không có orderedProduct, kiểm tra trong giỏ hàng
        const cartData = localStorage.getItem('cart');
        if (cartData) {
            const cart = JSON.parse(cartData);
            // Lọc ra các sản phẩm được đánh dấu (checked === true)
            const checkoutProducts = cart.filter(item => item.checked);
            if (checkoutProducts.length > 0) {
                // Chọn sản phẩm đầu tiên để hiển thị thông tin (theo giao diện cũ chỉ hiển thị 1 sản phẩm)
                product = checkoutProducts[0];
            }
        }
    }
    
    // Nếu có sản phẩm, render giao diện thanh toán, nếu không thì thông báo
    if (product) {
        renderCheckout(product);
    } else {
        alert("Giỏ hàng rỗng, vui lòng kiểm tra lại giỏ hàng.");
        // Nếu cần có thể chuyển hướng về trang sản phẩm:
        // window.location.href = '/sanpham';
    }
});

/**
 * Hàm renderCheckout nhận vào 1 đối tượng sản phẩm và cập nhật giao diện thanh toán
 * với các phần tử cũ: thanhToanImage, thanhToanName, thanhToanPrice, thanhToanSoLuong và total-price.
 */
function renderCheckout(product) {
    const imageEl = document.getElementById('thanhToanImage');
    const nameEl = document.getElementById('thanhToanName');
    const priceEl = document.getElementById('thanhToanPrice');
    const quantityEl = document.getElementById('thanhToanSoLuong');
    const totalPriceEl = document.getElementById('total-price');

    if (!imageEl || !nameEl || !priceEl || !quantityEl || !totalPriceEl) {
        console.error("Không tìm thấy các phần tử hiển thị thông tin thanh toán.");
        return;
    }
    
    // Cập nhật thông tin sản phẩm (chỉ hiển thị 1 sản phẩm theo giao diện cũ)
    imageEl.src = product.image;
    imageEl.alt = product.name;
    nameEl.textContent = product.name;
    priceEl.textContent = parseFloat(product.price).toLocaleString() + " VND";
    quantityEl.value = product.quantity;
    
    // Tính tổng tiền dựa trên sản phẩm được chọn
    const total = parseFloat(product.price) * product.quantity;
    totalPriceEl.textContent = total.toLocaleString() + " VND";
}
