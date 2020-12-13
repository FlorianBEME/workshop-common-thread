const express = require('express');
const app = express();
var cors = require ('cors');
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cors())
const router = require('./routes/index.routes');


app.use('/api', router);

module.exports = app;