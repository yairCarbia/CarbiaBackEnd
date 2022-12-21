// function prodsDto(title, price, description){
//   return {
//     title,
//     price,
//     description
//   }
// }
// export default prodsDto

export default class ProdsDto {
  constructor({ title, price, description}) {
    this.title = title
    this.price = price
    this.description = description
  }
}

export function asDto(prods) {
  if (Array.isArray(prods)) return prods.map((p) => new ProdsDto(p));
  else return new ProdsDto(prods);
}

