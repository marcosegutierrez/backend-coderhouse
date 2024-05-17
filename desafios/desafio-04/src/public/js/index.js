const socketClient = io();

const productsDiv = document.getElementById('products');
const hbsProducts = document.getElementById('hbsProducts');


socketClient.on('newProduct', (newProduct)=>{
    let newProducts = `<ul>
            <li>${newProduct.id}</li>
            <li>${newProduct.title}</li>
            <li>${newProduct.description}</li>
            <li>${newProduct.code}</li>
            <li>${newProduct.price}</li>
            <li>${newProduct.status}</li>
            <li>${newProduct.stock}</li>
            <li>${newProduct.category}</li>
            <li>${newProduct.thumbnails}</li>
        </ul>`;
    products.innerHTML += newProducts;
})

socketClient.on('deleteProduct', (products) => {
    let newProducts = '';
    products.forEach(newProduct => {
        newProducts += `<ul>
            <li>${newProduct.id}</li>
            <li>${newProduct.title}</li>
            <li>${newProduct.description}</li>
            <li>${newProduct.code}</li>
            <li>${newProduct.price}</li>
            <li>${newProduct.status}</li>
            <li>${newProduct.stock}</li>
            <li>${newProduct.category}</li>
            <li>${newProduct.thumbnails}</li>
        </ul>`
    });

    productsDiv.innerHTML = newProducts;
    hbsProducts.innerHTML = "";
})