const Contenedor = require("./clase")
const pruebasConsola = async () => {
    //Agregar productos

    // await contenedor.save({ title: "Gaseosa", price: 300, thumbnail: "gaseosa.png" });
    // await contenedor.save({ title: "Pizza", price: 500, thumbnail: "pizza.png" });
    // await contenedor.save({ title: "Pastas", price: 600, thumbnail: "pastas.png" });

    // Luego de agregar los productos , comentar las lineas porque se vuelven agregar.


    //Obtener todos los productos
    let productos = await contenedor.getAll(); //no comentar
    // console.log("Todos los productos!", productos);


    // Obtenemos producto por el id
    // const producto = await contenedor.getById(3);
    // console.log("El producto seleccionado segun el  ID es :", producto)

    //Eliminamos un producto por el id

    //1ero ver la totalidad de los productos 
    // console.log("Todos los productos!", productos);

    //Eliminarlo por id
    // await contenedor.deleteById(1);


    //Ver que se elimino el producto
    // console.log("Todos los productos!", productos);


    //Eliminamos todos los productos
    // await contenedor.deleteAll();

    // //Varificar si se eliminaron
    // productos = await contenedor.getAll();
    // console.log('No hay productos ! ', productos);
}
const contenedor = new Contenedor("./productos.txt");
pruebasConsola();

