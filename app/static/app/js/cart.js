const ApiCart = 'http://127.0.0.1:8000/api/cart/add/';

const addTocart = document.getElementById('order_button');
addTocart.addEventListener('click', (e)=>{
    const productId = addToCart.getAttribute('data-id');
    const inputValue = document.getElementById('myInput').value;
    const data = {
        product_id: productId,
        quantity: inputValue

    }
    fetch(`${ApiCart}${productId}`,{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    })
        .then(response => response.json())
        .then(data => {
            console.log('Success:', data);
        })
        .catch((error) => {
            console.error('Error:', error);
        });
})
