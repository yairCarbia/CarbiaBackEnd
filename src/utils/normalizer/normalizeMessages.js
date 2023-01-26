import { normalize, schema } from 'normalizr';

const schemaAuthor = new schema.Entity('author', {}, { idAttribute: 'email' });

const schemaMsg = new schema.Entity(
  'post',
  { author: schemaAuthor },
  { idAttribute: 'id' }
);

const schemaMessages = new schema.Entity(
  'posts',
  { messages: [schemaMsg] },
  { idAttribute: 'id' }
);

const normalizeMessages = (messagesWithId) =>
  normalize({ id: 'messages', messages: messagesWithId }, schemaMessages);

export default normalizeMessages;