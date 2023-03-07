const fs = require("fs");

class ProductManager {
  constructor(path) {
    this.path = path;
  }

  loadProducts() {
    try {
      const data = fs.readFileSync(this.path, "utf-8");
      return JSON.parse(data);
    } catch (error) {
      console.error("Error al cargar los productos", error);
      return [];
    }
  }

  addProduct(product) {
    const products = this.loadProducts();
    const { title, description, price, thumbnail, code, stock } = product;
    if (!title || !description || !price || !thumbnail || !code || !stock) {
      console.error("Error: Todos los campos son obligatorios");
      return;
    }
    const productSameCode = products.find((p) => p.code === code);
    if (productSameCode) {
      console.error("Error: El código ya existe");
      return;
    }
    const newProduct = {
      id: products.length > 0 ? products[products.length - 1].id + 1 : 1,
      ...product,
    };
    products.push(newProduct);
    this.saveProducts(products);
  }

  getProductById(id) {
    const products = this.loadProducts();
    const product = products.find((p) => p.id === id);
    if (product) {
      return product;
    } else {
      console.error("Error: Producto no encontrado");
    }
  }

  updateProduct(id, fieldsToUpdate) {
    const products = this.loadProducts();
    const productIndex = products.findIndex((p) => p.id === id);
    if (productIndex !== -1) {
      const updatedProduct = { ...products[productIndex], ...fieldsToUpdate };
      products[productIndex] = updatedProduct;
      this.saveProducts(products);
    } else {
      console.error("Error: Producto no encontrado");
    }
  }

  deleteProduct(id) {
    const products = this.loadProducts();
    const productIndex = products.findIndex((p) => p.id === id);
    if (productIndex !== -1) {
      products.splice(productIndex, 1);
      this.saveProducts(products);
    } else {
      console.error("Error: Producto no encontrado");
    }
  }

  saveProducts(products) {
    const data = JSON.stringify(products, null, 2);
    fs.writeFileSync(this.path, data);
  }
}

const productManager = new ProductManager("Products.json");

// Para agregar un producto
productManager.addProduct({
  title: "Placa de video",
  description: "RTX 4090",
  price: 899.99,
  thumbnail: "img/rtx_4090.jpg",
  code: "PV001",
  stock: 4,
});

const products = productManager.loadProducts(); // Para Obtener todos los productos
console.log(products);

const productById = productManager.getProductById(1); // Por ID
console.log(productById);

productManager.updateProduct(2, { price: 1500.99 }); // Actualizar un producto de la lista

productManager.deleteProduct(0); // Eliminar un producto

module.exports = ProductManager;
