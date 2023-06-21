const express = require('express');
const bodyParser = require('body-parser');

const app = express();

// Carregar rotas:
const baseRoute = require('./routes/base-route')
const interactiveRoutes = require('./routes/interactives-routes')


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));


app.use('/', interactiveRoutes)
app.use('/', baseRoute)
app.use('/', interactiveRoutes)
app.use('/', interactiveRoutes)

module.exports = app;