const fs = require('fs');

class ProductManager {
    constructor (path) {
        this.path = path;
        this.#productManagerGenerator();
    }

    async #productManagerGenerator() {
        if(!fs.existsSync(this.path)) {
            let products = [];
            fs.promises.writeFile(this.path, JSON.stringify(products));
        }
    }

    async #idGenerator() {
        let products = await this.getProducts()
        let max = 0;
        if (products) {
            products.forEach((p) => { 
                if (p.id > max) max = p.id;
            });
        }
        return max;
    }

    async addProduct(title, description, price, thumbnail, code, stock) {
        if (!title || !description || !price || !thumbnail || !code || !stock) {
            return console.log('Producto no agregado. Todos los campos son obligatorios');
        }

        const product = {
            id: await this.#idGenerator()+1,
            title,
            description,
            price,
            thumbnail,
            code,
            stock
        }

        let products = await this.getProducts();
        
        if  (products.find(p => p.code === product.code)) {
            return console.log(`Ya existe un producto con el código: ${product.code}`)
        } else {
            products.push(product);
            await fs.promises.writeFile(this.path, JSON.stringify(products));
            console.log(`Producto agregado: ${product.title} - id. ${product.id}`);
        }
    }

    async getProducts() {
        let products = await fs.promises.readFile(this.path, 'utf-8');
        if (products) return JSON.parse(products);
        else return [];
    }

    async getProductById(id) {
        let products = await this.getProducts();
        let productFound = products.find(p => p.id === id);
        if (productFound) return productFound
        else return 'Product not found';
    }

    async updateProduct(id, key, value) {
        if (key === "id") {
            console.log('No se puede modificar el id');
        } else {
            let products = await this.getProducts();
            let product = await this.getProductById(id);
            if (typeof product === 'object') {
                let newProducts = products.filter((product) => product.id != id);
                product[key] = value;
                newProducts.push(product);
                newProducts.sort((a, b) => a.id - b.id);
                await fs.promises.writeFile(this.path, JSON.stringify(newProducts));
                console.log(`Producto modificado: ${product.title} - id. ${product.id}`)
            } else console.log('Product not found');
        }
    }

    async deleteProduct(id) {
        try {
            let product = await this.getProductById(id);
            if (typeof product === 'object') {
                let products = await this.getProducts();
                let newProducts = products.filter((product) => product.id != id);
                await fs.promises.writeFile(this.path, JSON.stringify(newProducts));
                console.log(`Producto eliminado: ${product.title} - id. ${product.id}`);
            } else console.log('Product not found');
        } catch (error) {
            console.log(error);
        }
        
    }

}

// Proceso de Testing:

const testing = async () => {
    try {
        const john = new ProductManager('./john-pm.json');
        console.log(await john.getProducts());
        await john.addProduct("producto prueba", "Este es un producto prueba", 200, "Sin imagen", "abc123", 25);
        await john.addProduct("producto prueba 2", "Este es un producto prueba", 250, "Sin imagen", "abc456", 30);
        console.log(await john.getProducts());
        console.log(await john.getProductById(5));
        console.log(await john.getProductById(2));
        await john.updateProduct(1,"id", 500);
        await john.updateProduct(1,"price", 300);
        await john.updateProduct(10,"price", 500);
        console.log(await john.getProducts());
        await john.deleteProduct(2);
        await john.deleteProduct(5);
        console.log(await john.getProducts());
    } catch (error) {
        console.log(error);
    }
}

testing();