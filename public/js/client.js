const socket = io.connect();

/* ---------------------------- products section ---------------------------- */
const inputTitle = document.getElementById('inputTitle');
const inputPrice = document.getElementById('inputPrice');
const inputThumbnail = document.getElementById('inputThumbnail');
const btnSendProduct = document.getElementById('btnSendProduct');
const addProductForm = document.getElementById('addProductForm');

addProductForm.addEventListener('submit', (evt) => {
  evt.preventDefault();
  const product = {
    title: inputTitle.value,
    price: inputPrice.value,
    thumbnail: inputThumbnail.value,
  };
  socket.emit('update-product', product);
  addProductForm.reset();
});

socket.on('view-products', (products) => {
  makeHtmlTable(products).then(
    (html) => (document.getElementById('product-list').innerHTML = html)
  );
});

const makeHtmlTable = async (products) => {
  const res = await fetch('templates/viewProducts.hbs');
  let template = await res.text();
  template = Handlebars.compile(template);
  const html = template({ products });
  return html;
};

inputTitle.addEventListener('input', () => {
  const existName = inputTitle.value.length;
  const existPrice = inputPrice.value.length;
  inputPrice.disabled = !existName;
  btnSendProduct.disabled = !existName || !existPrice;
});

inputPrice.addEventListener('input', () => {
  const existPrice = inputPrice.value.length;
  inputThumbnail.disabled = !existPrice;
  btnSendProduct.disabled = !existPrice;
});

/* ---------------------------- messages section ---------------------------- */

/* ----------------------------- denormalization ---------------------------- */
const schemaAuthor = new normalizr.schema.Entity(
  'author',
  {},
  { idAttribute: 'id' }
);
const schemaMsg = new normalizr.schema.Entity(
  'post',
  { author: schemaAuthor },
  { idAttribute: '_id' }
);
const schemaMessages = new normalizr.schema.Entity(
  'posts',
  { messages: [schemaMsg] },
  { idAttribute: 'id' }
);
/* ----------------------------------------------------------------------------- */

const inputEmail = document.getElementById('inputEmail');
const inputFirstName = document.getElementById('inputFirstName');
const inputLastName = document.getElementById('inputLastName');
const inputAge = document.getElementById('inputAge');
const inputNickName = document.getElementById('inputNickName');
const inputUrlAvatar = document.getElementById('inputUrlAvatar');
const inputMessage = document.getElementById('inputMessage');
const btnSend = document.getElementById('btnSend');
const addMessageForm = document.getElementById('addMessageForm');

addMessageForm.addEventListener('submit', (evt) => {
  evt.preventDefault();
  const message = {
    author: {
      email: inputEmail.value,
      firstName: inputFirstName.value,
      lastName: inputLastName.value,
      age: inputAge.value,
      nickName: inputNickName.value,
      avatar: inputUrlAvatar.value,
    },
    msg: inputMessage.value,
  };
  socket.emit('new-message', message);
  addMessageForm.reset();
  inputMessage.focus();
  inputEmail.value = '';
});

socket.on('view-messages', (messages) => {
  if (!messages.error) {
    const messagesSize = JSON.stringify(messages).length;
    console.log(messages, messagesSize);

    const denormalizedMessages = normalizr.denormalize(
      messages.result,
      schemaMessages,
      messages.entities
    );

    const denormalizedMessagesSize =
      JSON.stringify(denormalizedMessages).length;
    console.log(denormalizedMessages, denormalizedMessagesSize);

    let compressionPercentage = parseInt(
      (messagesSize * 100) / denormalizedMessagesSize
    );

    console.log(`Porcentaje de compresión ${compressionPercentage}%`);
    document.getElementById('compression-info').innerText =
      compressionPercentage;

    console.log(denormalizedMessages.messages);
    makeHtmlList(denormalizedMessages.messages).then(
      (html) => (document.getElementById('message-list').innerHTML = html)
    );
  } else {
    console.log(messages);
    document.getElementById('compression-info').innerText = '0';
    makeHtmlList(messages).then(
      (html) => (document.getElementById('message-list').innerHTML = html)
    );
  }
});

const makeHtmlList = async (messages) => {
  const res = await fetch('templates/viewMessages.hbs');
  let template = await res.text();
  template = Handlebars.compile(template);
  const html = template({ messages });
  return html;
};

inputEmail.addEventListener('input', () => {
  const existEmail = inputEmail.value.length;
  const existText = inputMessage.value.length;
  inputMessage.disabled = !existEmail;
  btnSend.disabled = !existEmail || !existText;
});

inputMessage.addEventListener('input', () => {
  const existText = inputMessage.value.length;
  btnSend.disabled = !existText;
});
