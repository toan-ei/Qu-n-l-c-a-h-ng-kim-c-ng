const cartApi = 'http://127.0.0.1:8000/api/carts/cart';

document.addEventListener('DOMContentLoaded', () => {
    const addTocart = document.getElementById('cart_button');
    addTocart.addEventListener('click', (e) => {
        const productId = addTocart.getAttribute('data-id');
        const inputElement = document.getElementById('myInput');
        let inputValue = inputElement ? inputElement.value : 0;
        let quantity = parseInt(inputValue);

        if (isNaN(quantity) || quantity <= 0) {
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
            let totalPrice = data.data.product_price * quantity;
            let productData = {
                'product_name': data.data.product_name,
                'product_image': data.data.product_image_first,
                'product_total_price': totalPrice,
                'quantity': quantity,
            };
            fetch(cartApi, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Token ' + localStorage.getItem('token'),
                },
                body: JSON.stringify(productData),
            })
            .then(response => response.json())
            .then(response => {
                if (response.status) {
                    alert('Thêm vào giỏ hàng thành công!');
                    console.log('Order Response:', response.data);
                } else {
                    alert('Thêm vào giỏ hàng thất bại!');
                    console.error('Error:', response.errors);
                }
            })
            .catch(error => {
                console.error('Lỗi khi thêm vào giỏ hàng:', error);
                alert('Đã xảy ra lỗi khi thêm sản phẩm vào giỏ hàng.');
            });
        })
        .catch(error => {
            console.error('Lỗi khi lấy dữ liệu sản phẩm:', error);
        });

    });
});

document.addEventListener('DOMContentLoaded', () => {
    const cartLink = document.getElementById('cartIcon');
    const miniCart = document.querySelector('.mini_cart');

    if (!cartLink) {
        console.error('Không tìm thấy phần tử giỏ hàng.');
        return;
    }

    cartLink.onclick = async (e) => {
        e.stopPropagation();

        const token = localStorage.getItem('token');
        if (!token) {
            alert('Bạn chưa đăng nhập!');
            return;
        }

        try {
            const response = await fetch(cartApi, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Token ${token}`,
                },
            });

            if (!response.ok) {
                throw new Error(`Lỗi API: ${response.status}`);
            }

            const data = await response.json();
            console.log('Dữ liệu giỏ hàng:', data);

            if (data.status && data.data.length > 0) {
                let miniCartHTML = '';
                let totalAmount = 0;

                data.data.forEach((item, index) => {
                    const itemTotal = parseFloat(item.product_total_price);
                    totalAmount += itemTotal;

                    miniCartHTML += `
                        <div class="cart_item">
                            <label class="cart_checkbox">
                                <input type="checkbox" class="cart_select" data-id="${item.cart_item_id}">
                            </label>
                            <div class="cart_img">
                                <a href="#"><img src="${item.product_image}" alt="${item.product_name}"></a>
                            </div>
                            <div class="cart_info">
                                <a href="#">${item.product_name}</a>
                                <span class="quantity">Số lượng : ${item.quantity}</span>
                                <span class="price_cart">Giá : ${itemTotal.toLocaleString()} VND</span>
                            </div>
                            <div data-id="${item.cart_item_id}" class="cart_remove">
                                <a href="#"><i class="ion-android-close"></i></a>
                            </div>
                        </div>
                    `
                    ;
                });

                document.getElementById('miniCartItems').innerHTML = miniCartHTML;
                document.getElementById('miniCartTotal').textContent = `${totalAmount.toLocaleString()} VND`;
                miniCart.style.display = 'block';

            } else {
                document.getElementById('miniCartItems').innerHTML = '<p>Giỏ hàng trống.</p>';
                document.getElementById('miniCartTotal').textContent = '0 VND';
                miniCart.style.display = 'block';
            }

        } catch (error) {
            console.error('Lỗi khi tải giỏ hàng:', error);
            alert('Không thể tải giỏ hàng. Vui lòng thử lại!');
        }
    };
    const closeBtn = document.querySelector('.mini_cart_close');
    if (closeBtn) {
        closeBtn.onclick = () => {
            miniCart.style.display = 'none';
        };
    }
});

document.addEventListener('click', async (e) => {
    if (e.target.closest('.cart_remove')) {
        const removeBtn = e.target.closest('.cart_remove');
        const cartItemId = removeBtn.dataset.id;
        if (confirm(`Bạn có chắc chắn muốn xóa sản phẩm ID ${cartItemId}?`)) {
            try {
                const response = await fetch(`${cartApi}/${cartItemId}/`, {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Token ${localStorage.getItem('token')}`,
                    }
                });

                const result = await response.json();

                if (result.status) {
                    alert(result.message);
                    location.reload();
                    console.log(result)
                } else {
                    alert(result.message);
                }
            } catch (error) {
                console.error('Lỗi khi xóa sản phẩm:', error);
                alert('Đã xảy ra lỗi khi xóa sản phẩm.');
            }
        }
    }
});

function updateMiniCartTotal() {
    const selectedCheckbox = document.querySelector('.cart_select:checked');
    console.log(selectedCheckbox);
    let totalAmount = 0;

    if (selectedCheckbox) {
        const cartItem = selectedCheckbox.closest('.cart_item');
        const priceText = cartItem.querySelector('.price_cart').textContent;
        totalAmount = parseInt(priceText.replace(/[^\d]/g, ''));
    }

    document.getElementById('cartCLick').textContent = `${totalAmount.toLocaleString()} VND`;
}

function clickThanhToan() {
    const thanhToanBtn = document.getElementById('cart_thanh_toan');
    thanhToanBtn.onclick = () => {
        const selectedCheckbox = document.querySelector('.cart_select:checked');
        if (!selectedCheckbox) {
            alert('Vui lòng chọn một sản phẩm trước khi thanh toán!');
            return;
        }

        const cartId = selectedCheckbox.getAttribute('data-id');
        fetch(`${cartApi}/${cartId}/`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Token ${localStorage.getItem('token')}`,
            }
        })
        .then(response => response.json())
        .then((data) => {
            if (!data.status || !data.data) {
                console.warn('Dữ liệu không hợp lệ từ API:', data);
                alert('Không tìm thấy dữ liệu sản phẩm. Vui lòng thử lại.');
                return;
            }
            const product = data.data;
            if (!product.product_name || !product.product_total_price || !product.quantity) {
                console.warn('Dữ liệu không đầy đủ:', product);
                alert('Dữ liệu sản phẩm không hợp lệ. Vui lòng thử lại.');
                return;
            }

            let product_price = parseFloat(product.product_total_price) / parseInt(product.quantity);
            if (isNaN(product_price)) {
                console.warn('Giá sản phẩm không hợp lệ:', product_price);
                alert('Giá sản phẩm không hợp lệ. Vui lòng thử lại.');
                return;
            }

            let productInfo = {  
                'product_name': product.product_name,
                'product_price': product_price,
                'product_image_first': product.product_image,
            };

            localStorage.setItem('productData', JSON.stringify(productInfo));
            localStorage.setItem('inputValue', product.quantity);
            console.log('Dữ liệu giỏ hàng đã lưu:', productInfo);

            setTimeout(() => {
                window.location.href = '/thanhtoan';
            }, 100);
        })
        .catch(error => {
            console.error('Lỗi khi thanh toán:', error);
            alert('Không thể lấy dữ liệu sản phẩm. Vui lòng thử lại sau.');
        });
    }
}

document.addEventListener('DOMContentLoaded', () => {
    clickThanhToan();
});


document.addEventListener('change', (e) => {
    if (e.target.classList.contains('cart_select')) {
        document.querySelectorAll('.cart_select').forEach((checkbox) => {
            if (checkbox !== e.target) {
                checkbox.checked = false;
            }
        });
        updateMiniCartTotal();
    }
});

