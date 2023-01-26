class MsgDTO {
  constructor({ id, email, msg, fyh, avatar }) {
    this.id = id;
    this.email = email;
    this.msg = msg;
    this.fyh = fyh;
    this.avatar = avatar;
  }

  #toJSON = () => {
    return {
      id: this.id,
      email: this.email,
      msg: this.msg,
      fyh: this.fyh,
      avatar: this.avatar,
    };
  };

  static toDTO = (messages) => {
    if (Array.isArray(messages)) {
      return messages.map((msg) => new MsgDTO(msg).#toJSON()); 
    } else return new MsgDTO(messages);
  };
}

export default MsgDTO;
