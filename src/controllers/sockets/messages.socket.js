import { PERSISTENCY } from '../../config/index.js';
import { loggerError } from '../../config/log4.js';
import DAOFactory from '../../persistency/DAO/DAOFactory.js';
import normalizeMessages from '../../utils/normalizer/normalizeMessages.js';

let messageDAO;

(async () => {
  try {
    messageDAO = await DAOFactory.getPersistency('messages', PERSISTENCY);
    return messageDAO;
  } catch (error) {
    loggerError.error(error);
    throw `${error}`;
  }
})();

export default async (io, socket) => {
  try {
    /* ------------------------ carga inicial de mensajes ----------------------- */
    socket.emit(
      'view-messages',
      normalizeMessages(await messageDAO.readMsgs())
    );
  } catch (error) {
    io.sockets.emit('view-messages', { error });
  }

  /* ------------------------ actualizacion de mensajes ----------------------- */
  socket.on('new-message', async (msg) => {
    try {
      msg.fyh = new Date().toLocaleString();
      await messageDAO.insertMsg(msg);

      io.sockets.emit(
        'view-messages',
        normalizeMessages(await messageDAO.readMsgs())
      );
    } catch (error) {
      io.sockets.emit('view-messages', { error });
    }
  });
};
