// slider.js

document.addEventListener('DOMContentLoaded', function(){
    // Lấy các phần tử nút mũi tên và container danh sách sản phẩm
    const prevArrow = document.querySelector('.prev_arrow');
    const nextArrow = document.querySelector('.next_arrow');
    const listProduct = document.querySelector('.list_product');
    
    // Thiết lập số pixel cuộn khi click (cuộn một lần)
    const scrollAmount = 500;
    // Thiết lập tốc độ cuộn khi nhấn giữ (số pixel mỗi lần interval)
    const holdScrollSpeed = 10;
    // Thời gian cho mỗi lần cuộn khi nhấn giữ (ms)
    const holdScrollInterval = 10;
    
    // Biến lưu trữ interval của nhấn giữ
    let scrollInterval;

    // -------------------------------
    // Xử lý nút mũi tên cho cuộn "một lần click"
    // -------------------------------
    if (prevArrow) {
        // Khi click nhanh (một lần)
        prevArrow.addEventListener('click', function(e) {
            e.preventDefault();
            listProduct.scrollBy({
                left: -scrollAmount,
                behavior: 'smooth'
            });
        });
        
        // Khi nhấn giữ chuột
        prevArrow.addEventListener('mousedown', function(e) {
            e.preventDefault();
            scrollInterval = setInterval(function(){
                listProduct.scrollBy({
                    left: -holdScrollSpeed,
                    behavior: 'auto'
                });
            }, holdScrollInterval);
        });
        
        // Dừng nhấn giữ khi thả chuột hoặc di chuyển ra ngoài nút
        prevArrow.addEventListener('mouseup', function(e) {
            clearInterval(scrollInterval);
        });
        prevArrow.addEventListener('mouseleave', function(e) {
            clearInterval(scrollInterval);
        });
        // Hỗ trợ cho màn hình cảm ứng
        prevArrow.addEventListener('touchend', function(e) {
            clearInterval(scrollInterval);
        });
    }
    
    if (nextArrow) {
        // Khi click nhanh (một lần)
        nextArrow.addEventListener('click', function(e) {
            e.preventDefault();
            listProduct.scrollBy({
                left: scrollAmount,
                behavior: 'smooth'
            });
        });
        
        // Khi nhấn giữ chuột
        nextArrow.addEventListener('mousedown', function(e) {
            e.preventDefault();
            scrollInterval = setInterval(function(){
                listProduct.scrollBy({
                    left: holdScrollSpeed,
                    behavior: 'auto'
                });
            }, holdScrollInterval);
        });
        
        // Dừng nhấn giữ khi thả chuột hoặc di chuyển ra ngoài nút
        nextArrow.addEventListener('mouseup', function(e) {
            clearInterval(scrollInterval);
        });
        nextArrow.addEventListener('mouseleave', function(e) {
            clearInterval(scrollInterval);
        });
        // Hỗ trợ cho màn hình cảm ứng
        nextArrow.addEventListener('touchend', function(e) {
            clearInterval(scrollInterval);
        });
    }
    
    // -------------------------------
    // Xử lý kéo (drag) danh sách sản phẩm bằng chuột
    // -------------------------------
    let isDown = false;
    let startX;
    let scrollLeft;
    
    listProduct.addEventListener('mousedown', (e) => {
        isDown = true;
        listProduct.classList.add('active');
        startX = e.pageX - listProduct.offsetLeft;
        scrollLeft = listProduct.scrollLeft;
    });
    
    listProduct.addEventListener('mouseleave', () => {
        isDown = false;
        listProduct.classList.remove('active');
    });
    
    listProduct.addEventListener('mouseup', () => {
        isDown = false;
        listProduct.classList.remove('active');
    });
    
    listProduct.addEventListener('mousemove', (e) => {
        if (!isDown) return;
        e.preventDefault();
        const x = e.pageX - listProduct.offsetLeft;
        const walk = (x - startX); // Điều chỉnh hệ số nếu cần
        listProduct.scrollLeft = scrollLeft - walk;
    });
});

$(document).on('click', '.quick_view_button', function(e) {
    e.preventDefault();
    var productId = $(this).data('id');
    
    // Giả sử bạn có 1 hàm getProductDetails để lấy thông tin sản phẩm dựa trên productId
    getProductDetails(productId, function(product) {
      $('#modalName').text(product.product_name);
      $('#modalPrice').text(product.product_price + ' VND');
      $('#modalDescription').text(product.product_description);
      $('#modalImage').attr('src', product.product_image_first);
      // ... cập nhật thêm các thông tin khác nếu cần
    });
  });