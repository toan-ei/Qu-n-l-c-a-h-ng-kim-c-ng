document.addEventListener('DOMContentLoaded', () => {
<<<<<<< HEAD
    const addTocart = document.getElementById('order_button');
    if (addTocart) {
        addTocart.addEventListener('click', (e) => {
            const productId = addTocart.getAttribute('data-id');
            const inputElement = document.getElementById('myInput');
            const inputValue = inputElement ? inputElement.value : 0;
=======
    const addToCartButton = document.getElementById('order_button');
    
    if (addToCartButton) {
        addToCartButton.addEventListener('click', () => {
            const productId = addToCartButton.getAttribute('data-id');
            const inputElement = document.getElementById('myInput');
            const inputValue = inputElement ? parseInt(inputElement.value) : 0;
>>>>>>> 71e366c5a590c4f0c32f5bb2dfa67977ea180740
            
            if (!inputValue || inputValue <= 0) {
                alert('Vui lòng nhập số lượng hợp lệ!');
                return;
            }
<<<<<<< HEAD
        
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
=======

            fetch(`http://127.0.0.1:8000/api/products/product/${productId}`)
                .then(response => response.json())
                .then(data => {
                    console.log('Success:', data);
                    
                    // Lấy danh sách sản phẩm hiện có trong localStorage
                    let cart = JSON.parse(localStorage.getItem('cart')) || [];

                    // Kiểm tra xem sản phẩm đã tồn tại chưa
                    const existingProduct = cart.find(item => item.id === productId);
                    if (existingProduct) {
                        existingProduct.quantity += inputValue;
                    } else {
                        cart.push({
                            id: productId,
                            name: data.data.product_name,
                            price: data.data.product_price,
                            image: data.data.product_image_first,
                            quantity: inputValue
                        });
                    }

                    // Lưu lại giỏ hàng vào localStorage
                    localStorage.setItem('cart', JSON.stringify(cart));

                    // Cập nhật mini cart ngay lập tức
                    updateMiniCart(cart);
                    alert('Đặt hàng thành công!');
                })
                .catch(error => {
                    console.error('Error:', error);
                });
        });
    }

    // Tải giỏ hàng từ localStorage khi trang load
    const savedCart = JSON.parse(localStorage.getItem('cart')) || [];
    updateMiniCart(savedCart);
});

// Hàm cập nhật mini cart
// Cập nhật Mini Cart
function updateMiniCart(cart) {
    const miniCartItems = document.getElementById('miniCartItems');
    const miniCartTotal = document.getElementById('miniCartTotal');

    if (!miniCartItems || !miniCartTotal) {
        console.error('Không tìm thấy Mini Cart.');
        return;
    }

    miniCartItems.innerHTML = ''; // Xóa nội dung cũ

    let total = 0;

    cart.forEach((product, index) => {
        // Kiểm tra xem sản phẩm có được chọn hay không
        const isChecked = product.checked ? 'checked' : '';

        if (product.checked) {
            total += product.price * product.quantity;
        }

        const cartItem = document.createElement('div');
        cartItem.classList.add('cart_item');
        cartItem.innerHTML = `
            <div class="cart_checkbox">
                <input type="checkbox" class="cart_select" data-index="${index}" ${isChecked}>
            </div>
            <div class="cart_img">
                <a href="#"><img src="${product.image}" alt="${product.name}"></a>
            </div>
            <div class="cart_info">
                <a href="#">${product.name}</a>
                <div class="quantity_controls">
                    <button class="decrease_quantity" data-index="${index}">-</button>
                    <span class="product_quantity">${product.quantity}</span>
                    <button class="increase_quantity" data-index="${index}">+</button>
                </div>
                <span class="price_cart">${(product.price * product.quantity).toLocaleString()} VND</span>
            </div>
            <div class="cart_remove">
                <a href="javascript:void(0)" class="remove_item" data-index="${index}">
                    <i class="ion-android-close"></i>
                </a>
            </div>
        `;
        miniCartItems.appendChild(cartItem);
    });

    // Cập nhật tổng tiền
    miniCartTotal.textContent = `${total.toLocaleString()} VND`;

    // Sự kiện thay đổi checkbox
    document.querySelectorAll('.cart_select').forEach(checkbox => {
        checkbox.addEventListener('change', (e) => {
            const index = e.target.dataset.index;
            cart[index].checked = e.target.checked;
            localStorage.setItem('cart', JSON.stringify(cart));
            updateMiniCart(cart); // Cập nhật lại tổng tiền
        });
    });

    // Sự kiện tăng số lượng
    document.querySelectorAll('.increase_quantity').forEach(button => {
        button.addEventListener('click', (e) => {
            const index = e.target.dataset.index;
            cart[index].quantity++;
            localStorage.setItem('cart', JSON.stringify(cart));
            updateMiniCart(cart);
        });
    });

    // Sự kiện giảm số lượng
    document.querySelectorAll('.decrease_quantity').forEach(button => {
        button.addEventListener('click', (e) => {
            const index = e.target.dataset.index;
            if (cart[index].quantity > 1) {
                cart[index].quantity--;
            } else {
                cart.splice(index, 1); // Xóa sản phẩm nếu số lượng về 0
            }
            localStorage.setItem('cart', JSON.stringify(cart));
            updateMiniCart(cart);
        });
    });

    // Sự kiện xóa sản phẩm
    document.querySelectorAll('.remove_item').forEach(button => {
        button.addEventListener('click', (e) => {
            const index = e.target.dataset.index;
            cart.splice(index, 1);
            localStorage.setItem('cart', JSON.stringify(cart));
            updateMiniCart(cart);
        });
    });
}

// Khi trang load, tải lại giỏ hàng từ localStorage
document.addEventListener('DOMContentLoaded', () => {
    const savedCart = JSON.parse(localStorage.getItem('cart')) || [];
    updateMiniCart(savedCart);
>>>>>>> 71e366c5a590c4f0c32f5bb2dfa67977ea180740
});
