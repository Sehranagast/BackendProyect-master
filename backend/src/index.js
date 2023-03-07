const fs = require("fs");
const { ProductManager } = require("ProductManager.js");
const products = require("Products.json");

class ProductManager {
  constructor() {
    this.products = [];
    this.nextProductId = 1;
  }

  addProduct(title, description, price, thumbnail, code, stock) {
    if (!title || !description || !price || !thumbnail || !code || !stock) {
      console.error("Error: Todos los campos son obligatorios");
      return;
    }

    const productSameCode = this.products.find((p) => p.code === code);
    if (productSameCode) {
      console.error("Error: El código ya existe");
      return;
    }

    const newProduct = {
      id: this.nextProductId,
      title,
      description,
      price,
      thumbnail,
      code,
      stock,
    };
    this.nextProductId++;

    this.products.push(newProduct);
  }

  getProducts() {
    return this.products;
  }

  getProductById(id) {
    const product = this.products.find((p) => p.id === id);
    if (product) {
      return product;
    } else {
      console.error("Error: Producto no encontrado");
    }
  }
}
const productManager = new ProductManager();

productManager.addProduct(
  "Placa de video",
  "RTX 4090",
  899.99,
  "img/rtx_4090.jpg",
  "PV001",
  4
);
productManager.addProduct(
  "Procesador",
  "Intel i9-11900KF",
  150.0,
  "img/i9.jpg",
  "PN001",
  5
);

const products = productManager.getProducts();
console.log(products);

const productById = productManager.getProductById(1);
console.log(productById);

const productByIdNotFound = productManager.getProductById(3);
