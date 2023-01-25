class BookDto{
  constructor({_id, title, price, author}){
    this.title = title,
    this.price = price 
    this.author = author
    this._id = _id
  }

}

export default function(data){
  if(Array.isArray(data)) return data.map(el => new BookDto(el))
  return new BookDto(data)
}