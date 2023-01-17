import UserDao from '../daos/usersDao.js';

class UserApi{
  constructor(){
    this.userDao = new UserDao()
  }
    getPersonas({ campo, valor }) {
        const personas = Object.values(personasMap)
        if (campo && valor) {
            return personas.filter(p => p[ campo ] == valor);
        } else {
            return personas;
        }
    }

    getPersona({ id }) {
        if (!personasMap[ id ]) {
            throw new Error('Persona not found.');
        }
        return personasMap[ id ];
    }

    createPersona({ datos }) {
        const id = crypto.randomBytes(10).toString('hex');
        const nuevaPersona = new Persona(id, datos)
        personasMap[ id ] = nuevaPersona;
        return nuevaPersona;
    }

    updatePersona({ id, datos }) {
        if (!personasMap[ id ]) {
            throw new Error('Persona not found');
        }
        const personaActualizada = new Persona(id, datos)
        personasMap[ id ] = personaActualizada;
        return personaActualizada;
    }

    deletePersona({ id }) {
        if (!personasMap[ id ]) {
            throw new Error('Persona not found');
        }
        const personaBorrada = personasMap[ id ]
        delete personasMap[ id ];
        return personaBorrada;
    }
}

export default UserApi