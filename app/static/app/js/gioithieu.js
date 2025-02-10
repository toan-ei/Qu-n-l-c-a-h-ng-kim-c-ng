document.addEventListener('DOMContentLoaded', function() {
    // API endpoint lấy danh sách sản phẩm
    const productAPI = 'http://127.0.0.1:8000/api/products/product';
  
    // Lấy sản phẩm và render ra giao diện
    fetch(productAPI)
      .then(response => response.json())
      .then(renderProducts)
      .catch(error => console.error('Error fetching products:', error));
  
    // Hàm render danh sách sản phẩm
    function renderProducts(products) {
      const productList = document.getElementById('gioithieuProductList');
      if (!productList) return;
      
      // Với mỗi sản phẩm, ta tạo ra 1 thẻ HTML chứa hình, tên, mô tả, giá và nút đặt hàng.
      let htmls = products.map(product => {
        return `
          <div class="product-item">
            <img alt="${product.product_description}" src="${product.product_image_first}" />
            <h3>${product.product_name}</h3>
            <p>${product.product_description}</p>
            <p class="price">${product.product_price} VND</p>
            <button class="order_button" data-id="${product.product_id}">Đặt Hàng</button>
          </div>
        `;
      });
      productList.innerHTML = htmls.join('');
      
      // Sau khi hiển thị sản phẩm, gán sự kiện cho các nút “Đặt Hàng”
      attachOrderButtonEvents();
    }
  
    // Gán sự kiện click cho các nút "Đặt Hàng"
    function attachOrderButtonEvents() {
      const orderButtons = document.querySelectorAll('.order_button');
      orderButtons.forEach(button => {
        button.addEventListener('click', function() {
          const productId = this.getAttribute('data-id');
          // Ở trang này, giả sử mỗi lần đặt hàng là 1 sản phẩm (quantity = 1)
          const quantity = 1;
          // Gọi API để lấy chi tiết sản phẩm (nếu cần)
          fetch(`http://127.0.0.1:8000/api/products/product/${productId}`)
            .then(response => response.json())
            .then(data => {
              const productData = data.data;
              addToCart(productData, quantity);
            })
            .catch(error => console.error('Error fetching product detail:', error));
        });
      });
    }
  
    // Hàm thêm sản phẩm vào giỏ hàng (localStorage) và cập nhật mini cart
    function addToCart(product, quantity) {
      // Lấy giỏ hàng hiện có từ localStorage
      let cart = JSON.parse(localStorage.getItem('cart')) || [];
      // Kiểm tra xem sản phẩm đã có trong giỏ hay chưa
      const existingProduct = cart.find(item => item.id == product.product_id);
      if (existingProduct) {
        existingProduct.quantity += quantity;
      } else {
        cart.push({
          id: product.product_id,
          name: product.product_name,
          price: product.product_price,
          image: product.product_image_first,
          quantity: quantity,
          checked: true  // Mặc định chọn sản phẩm để tính tổng
        });
      }
      localStorage.setItem('cart', JSON.stringify(cart));
      updateMiniCart(cart);
      alert('Đặt hàng thành công!');
    }
  
    // Hàm cập nhật mini cart (tương tự như trong sanpham.js)
    function updateMiniCart(cart) {
      const miniCartItems = document.getElementById('miniCartItems');
      const miniCartTotal = document.getElementById('miniCartTotal');
  
      if (!miniCartItems || !miniCartTotal) {
        console.error('Mini Cart elements not found.');
        return;
      }
  
      miniCartItems.innerHTML = ''; // Xóa nội dung cũ
      let total = 0;
  
      cart.forEach((product, index) => {
        if (product.checked) {
          total += product.price * product.quantity;
        }
  
        const cartItem = document.createElement('div');
        cartItem.classList.add('cart_item');
        cartItem.innerHTML = `
          <div class="cart_checkbox">
            <input type="checkbox" class="cart_select" data-index="${index}" ${product.checked ? 'checked' : ''}>
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
  
      // Gán sự kiện thay đổi checkbox, tăng giảm số lượng và xóa sản phẩm
      document.querySelectorAll('.cart_select').forEach(checkbox => {
        checkbox.addEventListener('change', (e) => {
          const index = e.target.dataset.index;
          cart[index].checked = e.target.checked;
          localStorage.setItem('cart', JSON.stringify(cart));
          updateMiniCart(cart);
        });
      });
  
      document.querySelectorAll('.increase_quantity').forEach(button => {
        button.addEventListener('click', (e) => {
          const index = e.target.dataset.index;
          cart[index].quantity++;
          localStorage.setItem('cart', JSON.stringify(cart));
          updateMiniCart(cart);
        });
      });
  
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
  
      document.querySelectorAll('.remove_item').forEach(button => {
        button.addEventListener('click', (e) => {
          const index = e.target.dataset.index;
          cart.splice(index, 1);
          localStorage.setItem('cart', JSON.stringify(cart));
          updateMiniCart(cart);
        });
      });
    }
  
    // Khi trang load, cập nhật mini cart với dữ liệu đã lưu (nếu có)
    const savedCart = JSON.parse(localStorage.getItem('cart')) || [];
    updateMiniCart(savedCart);
  });
  