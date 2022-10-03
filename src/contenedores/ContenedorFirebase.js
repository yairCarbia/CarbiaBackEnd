// const admin = require("firebase-admin");
// const serviceAccount = require("../connect/fir-carbia-firebase-adminsdk-sc0a6-0ebfd1649d.json");

// admin.initializeApp({
//     credential: admin.credential.cert(serviceAccount)
// });
// const db = admin.firestore();

// class ContenedorFirebase {
//     constructor(coll) {
//         this.coll = coll;
//         this.connexion();
//         this.query = db.collection(coll);
//     }

//     async connexion() {
//         console.log("Firestore: base de datos conectada");
//     }

//     async save(obj) {
//         try {
//             let guardar = await this.query.add(obj);
//             return guardar.id;
//         } catch (error) {
//             console.log(`error al guardar: ${error}`);
//         } finally {
//         }
//     }

//     // traer producto por id
//     async getById(id) {
//         try {
//             let datos = await this.query.doc(id).get();
//             let newDatos = { ...datos.data(), id: datos.id };
//             return newDatos;
//         } catch (error) {
//             return `No se pudo traer producto ${id}. ${error}`;
//         } finally {
//         }
//     }

//     //traer todos los productos
//     async getAll() {
//         try {
//             let querySnapshot = await this.query.get();
//             let docs = querySnapshot.docs;
//             let newDatos = docs.map(doc => ({
//                 ...doc.data(),
//                 id: doc.id
//             }));
//             return newDatos;
//         } catch (error) {
//             console.log(`error al listar: ${error}`);
//             return [];
//         } finally {
//         }
//     }

//     // eliminar producto por id
//     async deleteById(id) {
//         try {
//             let datos = await this.query.doc(id).delete();
//             return datos;
//         } catch (error) {
//             console.log(`error al eliminar: ${error}`);
//         } finally {
//         }
//     }

//     async updateById(obj) {
//         try {
//             await this.query.doc(obj.id).update(obj);
//             return obj.id;
//         } catch (error) {
//             console.log(`error al actualizar: ${error}`);
//         }
//     }
// }

// module.exports = ContenedorFirebase;



class CarritoDaoFirebase {



    async save(obj) {
        try {
            if (obj.producto && obj.precio && obj.thumbnail) {
                let carritos = await this.db.add(obj);
                return carritos
            } else {
                return { error: "no tiene elementos" }
            }
        } catch (error) {
            console.warm('hay un error ', error)
            return { error: error.message }
        }
    }
    async getById(id) {
        try {
            const getall = this.db.doc(id);
            const doc = await getall.get();
            if (!doc.exists) {
                console.log('No such document!');
            } else {
                return doc.data();
            }
        } catch (error) {
            return { error: error.message }
        }
    }
    async getAll() {
        try {
            let querySnapshot = await this.db.get()
            let data = querySnapshot.docs.map(obj => obj.data())
            return data;
        } catch (error) {
            return { error: error.message }
        }
    }
    async updateById(id, obj) {
        try {
            if (obj.producto && obj.precio && obj.thumbnail) {
                let carritos = await this.db.doc(id).set(obj);
                return carritos
            } else {
                return { error: "no tiene elementos" }
            }
        } catch (error) {
            console.warm('hay un error ', error)
            return { error: error.message }
        }
    }
    async deleteById(id) {
        try {
            let carritos = await this.db.doc(id).delete();
            return carritos
        } catch (error) {
            return { error: error.message }
        }
    }
}

module.exports = CarritoDaoFirebase;