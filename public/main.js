const socket = io.connect('http://localhost:8080', { forceNew: true });

socket.emit('askData');

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

function sendData(e) {
    const input = document.getElementById('MyForm');
    const formData = {
        title: input.title.value,
        precio: input.precio.value,
        thumbnail: input.thumbnail.value
    }
    console.log(formData);
    socket.emit('new-message', formData);
}
  

socket.on('products', function (data) {
  console.log(data);
  render(data)
});
