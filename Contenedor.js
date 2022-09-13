
const fs = require("fs");

class Contenedor {
	constructor(knex, tabla) {
		this.knex = knex;
		this.tabla = tabla;
	}
	async save(obj) {
		try {
			await this.knex(this.tabla).insert(obj);
			return { msg: "Producto agregado correctamente papa! " };
		}
		catch (error) { console.log(error); }
	}


	async getAll() {
		try {
			const listadoProductos = await this.knex.from(this.tabla).select("*");
			console.log("---Listado---")
			return listadoProductos;

		} catch (error) { console.log(error); }
	}
	async getById(id) {
		try {
			const listadoById = await this.knex.from(this.tabla).select("*").where({ id: id });
			console.log("---Listado Por Id---")
			return listadoById;
		}
		catch (error) { console.log(error); }
	}

	async updateById(id, product) {
		try {
			console.log(product);
			await this.knex
				.from(this.tabla)
				.where({ id: id })
				.update({ ...product });
			return { message: "Producto actualizado" };
		} catch (error) {
			console.log(`Error al actualizar el producto: ${error}`);
		}
	}


	async deleteById(id) {
		try {
			const deleteProdById = await this.knex.from(this.tabla).select("*").where({ id: id }).del();
			console.log("---Eliminado por Id---")
			return deleteProdById;
		}
		catch (error) { console.log(error); }
	}
	async deleteAll() {
		try {
			const listadoProductosDel = await this.knex.from(this.tabla).del();
			console.log("---Todos los productos eliminados---")
			return listadoProductosDel;
		} catch (error) { console.log(error); }
	}
}

module.exports = { Contenedor };