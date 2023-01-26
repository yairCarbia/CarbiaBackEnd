class ProductDTO {
  constructor({ id, title, price, thumbnail }) {
    this.id = id;
    this.title = title;
    this.price = price;
    this.thumbnail = thumbnail;
  }

  #toJSON = () => {
    return {
      id: this.id,
      title: this.title,
      price: this.price,
      thumbnail: this.thumbnail,
    };
  };

  static toDTO = (products) => {
    if (Array.isArray(products)) {
      return products.map((product) => new ProductDTO(product).#toJSON()); 
    } else return new ProductDTO(products);
  };
}

export default ProductDTO;
