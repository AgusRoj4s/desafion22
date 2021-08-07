const form = document.querySelector('#action');
const titleInput = document.querySelector('nombre');
const priceInput = document.querySelector('precio');
const thumbnailInput = document.querySelector('foto');

const socket = io.connect();

const productTemplate = Handlebars.compile(`
    <div class="jumbotron">
    <h1>Vista de Productos</h1>
    {{#if hayProductos}} 
        <div class="table-responsive">
            <table class="table table-dark">
                <tr> <th>Nombre</th> <th>Precio</th> <th>Foto</th></tr>
                {{#each prod}}
                    <tr> <td>{{this.title}}</td> <td>{{this.price}}</td> <td><img width="50" src={{this.thumbnail}} alt="not found"></td> </tr>
                {{/each}}
            </table>
        </div>
    {{else}}  
        <h3 class="alert alert-warning">No se encontraron productos</h3>
    {{/if}}
    </div>
`);

function renderProducts(prod = []) {
    const html = productTemplate({ prod, hayProductos: !!prod.length });
    return html;
};

socket.on('lista', (data) => {
    let final = renderProducts(data);
    document.getElementById('datos').innerHTML = final;
});

socket.on('messages', (data) => {
    render(data);
});

function addMessage(e) {
    var mensaje = {
        author: document.getElementById('username').value,
        text: document.getElementById('texto').value
    };
    socket.emit('new-message', mensaje);
    return false;
}

function render(data) {
    let html = data.map(function(elem, index) {
        return (`<div>
                <strong style="color:blue">${elem.author}</strong>
                <strong style="color:brown">[${elem.hour}]:</strong>
                <em style="color:green" face="italic" >${elem.text}</em> </div>`)
    }).join(" ");
    document.getElementById('messages').innerHTML = html;
}