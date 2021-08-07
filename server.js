const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const handlebars = require('express-handlebars');
const mongoose = require('mongoose');
const chat = require('./models/chat');


const routes = require('./routes/index');
const productos = require('./api/productos');
const { horaFecha } = require('./utils/index');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api/', routes());

app.engine('hbs', handlebars({
    extname: '.hbs',
    defaultLayout: 'index.hbs',
    layoutsDir: __dirname + '/views/layouts',
    partialsDir: __dirname + '/views/partials'
}));

app.set('view engine', 'hbs');
app.set('views', './views');
app.use(express.static('public'));

CRUD()
async function CRUD() {
    try {
        const URL = 'mongodb://localhost:27017/ecommerce'
        await mongoose.connect(URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log('Base de datos conectada')
    } catch (error) {
        console.log(error)
    }
}

const puerto = 8080;
let messages = [];

io.on('connect', socket => {
    console.log('usuario conectado');
    socket.emit('lista', productos.listar());
    socket.emit('messages', messages);
    socket.on('new-message', data => {
        (async() => {
            try {
                data.hour = horaFecha();
                messages.push(data);
                await chat.create(data);
                await io.sockets.emit('messages', messages);
                await console.log('Mensaje Guardado!');
            } catch (error) {
                console.log(error)
            }
        })();
    });
});

http.listen(puerto, () => {
    console.log(`Servidor escuchando en http://localhost:${puerto}`);
});