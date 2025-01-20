const productAPI  = 'http://127.0.0.1:8000/api/products/product';

function start(){
    getProduct(renderProduct);
}

start();

function getProduct(callback){
    fetch(productAPI)
        .then(function(response){
            return response.json();
        })
        .then(callback)
}

function renderProduct(products){
    let listProductBlock = document.querySelector('.list_product');
    let htmls = products.map(function(product){
        return `
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
                            <a href="#" data-toggle="modal" data-target="#modal_box" data-placement="top" data-original-title="quick view" 
                            data-id="${product.product_id}" 
                            data-name="${product.product_name}" 
                            data-price="${product.product_price}" 
                            data-description-sub="${product.product_description_sub}"
                            data-imagefirst="${product.product_image_first}"
                            class="quick_view_button">
                                Quick View
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
                            <span class="current_price product_price">${product.product_price}</span>
                        </div>
                    </div>
                </div>
            </div>
        `
    })
    listProductBlock.innerHTML = htmls.join('');
    clickQuickView();

}

function clickQuickView(){
    let quickViewBtn = document.querySelectorAll('.quick_view_button');
    quickViewBtn.forEach(function(quickView){
        quickView.addEventListener('click', function(event){
            event.preventDefault();
            let productData = {
                imageFirst: quickView.getAttribute('data-imagefirst'),
                name: quickView.getAttribute('data-name'),
                price: quickView.getAttribute('data-price'),
                description: quickView.getAttribute('data-description-sub'),
            };
            console.log(productData);
            document.getElementById('modalImage').src = productData.imageFirst;
            document.getElementById('modalName').textContent = productData.name;
            document.getElementById('modalPrice').textContent = productData.price;
            document.getElementById('modalDescription').textContent = productData.description;
        });
    });
}

