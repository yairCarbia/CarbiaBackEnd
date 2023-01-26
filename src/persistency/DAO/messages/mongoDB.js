import MongoDBContainer from '../../containers/mongoDBContainer.js';
import messageModel from '../../../models/mongoose/messages.model.js';
import MsgDTO from '../../DTO/msgDTO.js';
import { loggerError } from '../../../config/log4.js';

let instanceMongoDB = null;
class MessagesDAOMongoDB extends MongoDBContainer {
  constructor() {
    super();
    this.collectionName = messageModel;
  }

  static getInstance = () => {
    if (!instanceMongoDB) {
      instanceMongoDB = new MessagesDAOMongoDB();
    }
    return instanceMongoDB;
  };

  insertMsg = async (msgData) => {
    try {
      const { email, firstName, lastName, age, nickName, avatar } =
        msgData.author;
      const msg = msgData.msg;
      const fyh = msgData.fyh;

      const data = {
        email,
        firstName,
        lastName,
        age,
        nickName,
        avatar,
        msg,
        fyh,
      };
      await this.collectionName.create(data);
      return { success: 'El mensaje fue añadido al sistema.' };
    } catch (error) {
      loggerError.error(error);
      throw error;
    }
  };

  readMsgs = async () => {
    try {
      const messages = await this.collectionName.find();
      if (!messages.length) {
        throw 'No se encontraron mensajes en la base de datos.';
      }
      return MsgDTO.toDTO(messages);
    } catch (error) {
      loggerError.error(error);
      throw error;
    }
  };
}

export default MessagesDAOMongoDB;
