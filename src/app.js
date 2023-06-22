require('dotenv').config()

const express = require('express');
const mongoose = require('mongoose');
const user = require('./models/models')
const bodyParser = require('body-parser');

mongoose.connect(process.env.URI_STRING)

const app = express();


// Carregar rotas:
const baseRoute = require('./routes/base-route')
const interactiveRoutes = require('./routes/interactives-routes')


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.use('/', baseRoute)
app.use('/user', interactiveRoutes)

module.exports = app;