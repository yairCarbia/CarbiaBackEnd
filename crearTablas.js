
const { optionsMariaDB } = require("./mariaDB/conectionMariaDb")
const { optionsSqlite3 } = require("./sqlite3/conectionSqlite3")

//pasamos las opciones de conexion a knex

const knexMariaDb = require("knex")(optionsMariaDB);
const knexSqlite3 = require("knex")(optionsSqlite3)

const productos = [

    {
        "title": "Goma",
        "price": "5",
        "thumbnail":
            "https://cdn1.iconfinder.com/data/icons/office-171/32/office-04-512.png"
    },
    {
        "title": "Lapiz",
        "price": "50",
        "thumbnail":
            "https://cdn2.iconfinder.com/data/icons/flat-pack-1/64/Pencil-128.png"
    }

];

const tablaProd = "products";

const MariaDb = async () => {
    try {
        console.log("Creando tabla Products...");
        await knexMariaDb.schema.createTable(tablaProd, table => {
            table.increments("id").primary();
            table.string("title").notNullable();
            table.string("price").notNullable();
            table.string("thumbnail");
        });

        console.log("Insertando productos...");
        await knexMariaDb(tablaProd).insert(productos);
    } catch (error) {
        console.log(`error creando tabla ${error}`);
    } finally {
        knexMariaDb.destroy();
    }
}

const mensajes = [
    {
        "mail": "yair@coder.com",
        "mensaje": "hola",
        "hora": "1:57:42 AM"
    }
];
const tablaMensajes = "messages";
const sqlite3 = async () => {
    try {
        console.log("Creando tabla Mensajes...");
        await knexSqlite3.schema.createTable(tablaMensajes, table => {
            table.increments("id");
            table.string("mail");
            table.float("hora");
            table.string("mensaje");
        });

        console.log("Insertando mensajes...");
        await knexSqlite3(tablaMensajes).insert(mensajes); // Le podemos pasar un obj o un array
    } catch (error) {
        console.log(error);
    } finally {
        knexSqlite3.destroy();
    }
}
MariaDb();
sqlite3();