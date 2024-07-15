const express = require('express');
const bodyParser = require('body-parser');
const app = express()
const http = require('http').createServer(app);
const api_reception = require('./src/api_server/api_reception');
require('dotenv').config();

const mongoose = require('mongoose');
const path = require('path');

// Add the CORS headers in the request.
app.use(function (req, res, next) {

  // Website you wish to allow to connect
  res.setHeader('Access-Control-Allow-Origin', '*');

  // Request methods you wish to allow
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');

  // Request headers you wish to allow
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader('Access-Control-Allow-Credentials', true);

  // Pass to next layer of middleware
  next();
});

app.use(express.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// let me us know server is running
const httpServer = http.listen(process.env.PORT, () => {
  console.log('Listen on :' + process.env.PORT);
});

api_reception.ApiReceptionRegistration(app);

//connect to db
mongoose.connect(process.env.DATABASE_URL)
  .then(async () => {
    api_reception.initmodels();
    console.log("Connected to MongoDB");
  }).catch((error) => {
    console.log(error);
  });

app.use(express.static('public'));