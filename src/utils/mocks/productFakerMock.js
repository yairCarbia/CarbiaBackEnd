import generateProduct from './productGenerator.js';

class ProductFakerMock {
  constructor() {
    this.products = [];
  }

  #save(prod) {
    let newId;
    if (this.products.length == 0) {
      newId = 1;
    } else {
      newId = this.products[this.products.length - 1].id + 1;
    }

    const newProduct = { id: newId, ...prod };
    this.products.push(newProduct);
  }

  populateProducts = (qty = 5) => {
    for (let i = 0; i < qty; i++) {
      const newProduct = generateProduct();
      this.#save(newProduct);
    }
    return this.products;
  };
}

export default ProductFakerMock;
