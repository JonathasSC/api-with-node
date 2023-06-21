const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const router = express.Router();

// Carregando as rotas:
const put    = require('./routes/put')
const index  = require('./routes/index');
const del    = require('./routes/delete');
const create = require('./routes/create')

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false}));


app.use('/', index)
app.use('/', create);
app.use('/', put);
app.use('/', del);

module.exports = app;