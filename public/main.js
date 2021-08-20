const socket = io.connect('http://localhost:8080', { forceNew: true });


//Pedimos la data que hay actualmente enviando un socket
socket.emit('askProducts');
socket.emit('askMessages');
let submitChat = document.getElementById('form-Chat');

function sendData(e) {
    const input = document.getElementById('MyForm');
    const formData = {
        title: input.title.value,
        precio: input.precio.value,
        thumbnail: input.thumbnail.value
    }
    console.log(formData);
    socket.emit('new-product', formData);
}
  

socket.on('products', function (data) {
  console.log(data);
  render(data)
});

socket.on('updateChat', (messages) => {
  messages.forEach((message) => {
    renderChat(message);
  });

});

socket.on('messages', (data) => {
  console.log('RECIBI MENSAJE');
  alert(data);
});

submitChat.addEventListener('submit', (e) => {
  let form = submitChat.getElementsByTagName('input');
  let inputTxt = document.getElementById('text');
  let inputs = new Object();
  e.preventDefault();

  for (let index = 0; index < form.length; index++) {
    inputs[form[index].name] = form[index].value;
  }
  socket.emit('new-message', inputs);
  inputTxt.value = '';
});


renderChat = (data) => {
  let chatUl = document.getElementById('messages');
  let newElement = document.createElement('li');
  newElement.className = 'message left appeared';
  let htmlMessage = `
  <div class="avatar"></div>
  <div class="text_wrapper">
      <span class="email">${data.email}</span>
      <span class="date"> [ ${data.date} ]: </span>
      <span class="text">${data.text}</span>
  </div>`;
  newElement.innerHTML = htmlMessage;
  chatUl.appendChild(newElement);
  chatUl.scrollTo(0, document.body.scrollHeight);
};

function render(data) {
  console.log(data);
  var html = data
    .map(function (elem, index) {
      return `<tr>
              <td>${elem.title}</td>
              <td>${elem.precio}</td>
              <td><img style="width: 100px" src="${elem.thumbnail}"></img></td>
          </tr>`;
    })
    .join(' ');

  document.getElementById('miTabla').innerHTML = html;
}