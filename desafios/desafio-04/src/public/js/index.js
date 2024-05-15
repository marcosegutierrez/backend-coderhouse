const socketClient = io();

const products = document.getElementById('products');

socketClient.on('productos', (arrayProducts)=>{
    let infoProducts = '';
    arrayProducts.map((prod)=>{
        infoProducts += `${prod.title} - $${prod.price} </br>`
    })
    products.innerHTML = infoProducts
})