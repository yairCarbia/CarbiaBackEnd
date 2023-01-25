
class UserDao {
  constructor() {
    this.user = [];
  }

  getUsuarios() {
    return this.Usuarios;
  }

  saveUsuario(usuario) {
    this.Usuarios.push(usuario);
  }

  updateUsuario(id, campos) {
    const index = this.Usuarios.findIndex((usuario) => usuario.id === id);

    if (index == -1) {
      throw new Error('Usuario not found');
    }
    const usuarioActualizado = { ...this.Usuarios[index], ...campos };
    this.Usuarios[index] = usuarioActualizado;
    return usuarioActualizado;
  }

  deleteUsuarioWhere(campo, valor) {
    let i = 0;
    const deleted = [];
    while (i < this.Usuarios.length) {
      if (this.Usuarios[i][campo] == valor) {
        deleted.push(this.Usuarios.splice(i, 1)[0]);
      } else {
        i++;
      }
    }
    return deleted;
  }
}

export default UserDao