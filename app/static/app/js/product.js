const productAPI = 'http://127.0.0.1:8000/api/products/product';

function start() {
    getProduct(renderProduct);
}

start();

function getProduct(callback) {
    fetch(productAPI)
        .then(response => response.json())
        .then(callback)
        .catch(error => console.error('Lỗi khi tải sản phẩm:', error));
}

function renderProduct(products) {
    let listProductBlock = document.querySelector('.list_product');

    if (!listProductBlock) {
        console.error('Không tìm thấy danh sách sản phẩm.');
        return;
    }

    let htmls = products.map(product => `
        <div class="col-lg-3 col-md-4 col-sm-6">
            <div class="single_product">
                <div class="product_thumb">
                    <a href="#" class="primary_img">
                        <img class="product_image_first" src="${product.product_image_first}" alt="product1">
                    </a>
                    <a href="#" class="secondary_img">
                        <img class="product_image_second" src="${product.product_image_second}" alt="product2">
                    </a>
                    <div class="quick_button">
                        <a href="#" class="quick_view_button" data-toggle="modal" data-target="#modal_box" 
                            data-id="${product.product_id}" 
                            data-name="${product.product_name}" 
                            data-price="${product.product_price}" 
                            data-description="${product.product_description}" 
                            data-imagefirst="${product.product_image_first}">
                            Xem Nhanh
                        </a>
                    </div>
                </div>
                <div class="product_content">
                    <div class="tag_cate">
                        <a class="product_description" href="#">${product.product_description}</a>
                    </div>
                    <h3>
                        <a class="product_name" href="#">${product.product_name}</a>
                    </h3>
                    <div class="price_box">
                        <span class="current_price product_price">${product.product_price} VND</span>
                    </div>
                </div>
            </div>
        </div>
    `);

    listProductBlock.innerHTML = htmls.join('');
    setupQuickView();
}

// 🛒 Xử lý "Xem Nhanh" và cập nhật modal box
function setupQuickView() {
    const quickViewButtons = document.querySelectorAll('.quick_view_button');

    quickViewButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault();

            const productId = button.getAttribute('data-id');

            fetch(`/api/products/product/${productId}`)
                .then(response => response.json())
                .then(product => {
                    // Cập nhật modal với thông tin sản phẩm
                    document.getElementById('modalImage').src = product.data.product_image_first;
                    document.getElementById('modalName').textContent = product.data.product_name;
                    document.getElementById('modalPrice').textContent = `${product.data.product_price} VND`;
                    document.getElementById('modalDescription').textContent = product.data.product_description;
                    document.getElementById('order_button').setAttribute('data-id', product.data.product_id);
                })
                .catch(error => console.error('Lỗi khi tải thông tin sản phẩm:', error));
        });
    });
}

// 🛍 Thêm vào giỏ hàng và cập nhật mini cart
document.addEventListener('DOMContentLoaded', () => {
    const orderButton = document.getElementById('order_button');

    if (orderButton) {
        orderButton.addEventListener('click', (e) => {
            e.preventDefault();
            
            const productId = orderButton.getAttribute('data-id');
            const quantityInput = document.getElementById('myInput');
            const quantity = quantityInput ? parseInt(quantityInput.value) : 1;

            if (quantity <= 0) {
                alert('Vui lòng nhập số lượng hợp lệ!');
                return;
            }

            fetch(`/api/products/product/${productId}`)
                .then(response => response.json())
                .then(product => {
                    let cart = JSON.parse(localStorage.getItem('cart')) || [];

                    // Kiểm tra xem sản phẩm đã tồn tại chưa
                    const existingProduct = cart.find(item => item.id === productId);
                    if (existingProduct) {
                        existingProduct.quantity += quantity;
                    } else {
                        cart.push({
                            id: productId,
                            name: product.data.product_name,
                            price: product.data.product_price,
                            image: product.data.product_image_first,
                            quantity: quantity,
                            checked: false  // Thêm thuộc tính checked mặc định
                        });
                    }

                    localStorage.setItem('cart', JSON.stringify(cart));

                    // Cập nhật mini cart ngay lập tức
                    updateMiniCart(cart);
                    alert('Thêm vào giỏ hàng thành công!');
                })
                .catch(error => console.error('Lỗi khi thêm vào giỏ hàng:', error));
        });
    }

    const savedCart = JSON.parse(localStorage.getItem('cart')) || [];
    updateMiniCart(savedCart);
});

// 🔄 Cập nhật mini cart và checkbox
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

    miniCartTotal.textContent = `${total.toLocaleString()} VND`;

    // Xử lý sự kiện checkbox
    document.querySelectorAll('.cart_select').forEach(checkbox => {
        checkbox.addEventListener('change', (e) => {
            const index = e.target.dataset.index;
            cart[index].checked = e.target.checked;
            localStorage.setItem('cart', JSON.stringify(cart));
            updateMiniCart(cart);
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
                cart.splice(index, 1);
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
