const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');

const routes = require('./routes');



const app = express();

mongoose.connect('mongodb+srv://julia:julia@projetoaircnc-6agna.mongodb.net/projetoAircnc?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
//GET, POST, PUT, DELETE

// req.query = Acesar query params (para filtros)
// req.params = Acessar route params (para edição, delete)
// req.body = Acessar corpo da requisição (para criação, edição) 

app.use(cors( ));
app.use(express.json());
app.use('/files', express.static(path.resolve(__dirname, '..', 'uploads')));
app.use(routes);


app.listen(3000);