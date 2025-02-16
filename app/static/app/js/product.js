const productAPI = 'http://127.0.0.1:8000/api/products/product';

function start() {
    getProduct(renderProduct);
}

// Hàm lấy sản phẩm từ API
function getProduct(callback) {
    fetch(productAPI)
        .then(response => response.json())
        .then(callback)
        .catch(error => console.error('Lỗi khi tải sản phẩm:', error));
}

// Hàm render danh sách sản phẩm vào phần tử .list_product
function renderProduct(products) {
    const listProductBlock = document.querySelector('.list_product');
    if (!listProductBlock) {
        console.error('Không tìm thấy danh sách sản phẩm.');
        return;
    }

    const htmls = products.map(product => `
        <div class="col-lg-3 col-md-4 col-sm-6">
            <div class="single_product">
                <div class="product_thumb" data-id="${product.product_id}">
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

// Hàm đăng ký sự kiện cho nút "Xem Nhanh" trong danh sách sản phẩm
function setupQuickView() {
    const quickViewButtons = document.querySelectorAll('.quick_view_button');
    quickViewButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            const productId = button.getAttribute('data-id');
            fetch(`${productAPI}/${productId}`)
                .then(response => response.json())
                .then(product => {
                    // Cập nhật thông tin sản phẩm vào modal
                    document.getElementById('modalImage').src = product.data.product_image_first;
                    document.getElementById('modalName').textContent = product.data.product_name;
                    document.getElementById('modalPrice').textContent = `${product.data.product_price} VND`;
                    document.getElementById('modalDescription').textContent = product.data.product_description;
                    // Gán data-id cho nút " HàngĐặt" và "Thêm vào giỏ hàng"
                    document.getElementById('order_button').setAttribute('data-id', product.data.product_id);
                    document.getElementById('cart_button').setAttribute('data-id', product.data.product_id);
                    // Đặt mặc định số lượng là 1 khi mở Quick View
                    document.getElementById('myInput').value = 1;
                })
                .catch(error => console.error('Lỗi khi tải thông tin sản phẩm:', error));
        });
    });
        // Ngăn chặn hành vi mặc định khi click vào hình ảnh
        const imageLinks = document.querySelectorAll('.primary_img, .secondary_img');
        imageLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
            });
        });
    }
    

document.addEventListener('DOMContentLoaded', () => {
    start();
});
