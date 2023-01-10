//DTO prods
class ProdsDto{
  constructor({title, price, description}){
    this.title = title
    this.price = price
    this.description = description
  }
}

export const asDto = (prods) => {
  if(Array.isArray(prods)) return prods.map(prod => new ProdsDto(prod))
  else return new ProdsDto(prods)
}