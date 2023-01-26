import { loggerInfo } from '../../config/log4.js';
import productsSocket from './products.socket.js';
import messagesSocket from './messages.socket.js';

export default (io) => {
  io.on('connection', async (socket) => {
    loggerInfo.info(`Un cliente con el id: [${socket.id}] y la ip: [${socket.handshake.address}] se ha conectado.`);
    
    productsSocket(io, socket);
    messagesSocket(io, socket);

    socket.on('disconnect', (_) => {
      loggerInfo.info(`El cliente de id: [${socket.id}] y la ip: [${socket.handshake.address}] se ha desconectado.`);
    });
  });
}  