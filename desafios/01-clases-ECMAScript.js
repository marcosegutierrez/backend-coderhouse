class ProductManager {
    constructor () {
        this.products = []
    }

    #idGenerator() {
        let max = 0;
        this.products.map((p) => { 
            if (p.id > max) max = p.id;
        });
        return max;
    }

    addProduct(title, description, price, thumbnail, code, stock) {
        if (!title || !description || !price || !thumbnail || !code || !stock) {
            return console.log('Producto no agregado. Todos los campos son obligatorios');
        }

        const product = {
            id: this.#idGenerator()+1,
            title,
            description, 
            price, 
            thumbnail, 
            code, 
            stock
        }
        
        if  (this.products.find(p => p.code === product.code)) {
            return console.log(`Ya existe un producto con el código: ${product.code}`)
        } else {
            this.products.push(product);
            console.log(`Producto agregado: ${product.title} - id. ${product.id}`);
        }
    }

    getProducts() {
        console.log(this.products);
    }

    getProductById(id) {
        let productFound = this.products.find(p => p.id === id);
        if (productFound) console.log(productFound)
        else console.error('Not found');
    }
}

// Proceso de Testing:

const john = new ProductManager();
john.getProducts();
john.addProduct("producto prueba", "Este es un producto prueba", 200, "Sin imagen", "abc123", 25);
john.getProducts();
john.addProduct("producto prueba", "Este es un producto prueba", 200, "Sin imagen", "abc123", 25);
john.addProduct("producto prueba 2", "Este es un producto prueba", 250, "Sin imagen", "abc456", 30);
john.getProductById(2);
john.getProductById(0);
john.addProduct("producto prueba 3", "Este es un producto prueba", 100);