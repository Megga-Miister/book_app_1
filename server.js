'use strict';

// node packages
const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;
const cors = require('cors');
const superagent = require('superagent');


require('dotenv').config();

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('./public'));

app.set('view engine', 'ejs');

// server routes
app.get('/', (req, res) => {
  res.render('../public/views/pages/index', { greeting: greetingMessage });
});



let greetingMessage = 'Hello World!';

app.listen(PORT, () => {
  console.log('listening on port: ${PORT}');
});
