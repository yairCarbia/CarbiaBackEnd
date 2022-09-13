const optionsMariaDB = {
    client: 'mysql',
    connection: {
        host: 'localhost',
        user: 'root',
        password: '',
        database: 'productosCoder'
    },
    pool: { min: 0, max: 7 }

}

module.exports = {
    optionsMariaDB
}