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

app.post('/searches', getBooks);

// helper functions
function getBooks (req, res) {
  const url =`https://www.googleapis.com/books/v1/volumes?q=${req.query_type}:${req.search_query}`;
  const queryStructure = {
    search_query: req.body.search_query,
    query_type: req.body.query_type === 'on' ? input_title : input_author,
  }
  return superagent.get(url)
  .then(res => {
    return new Book(results, res);
  })
  // .catch(error => errorHandler(error));
};

// constructor functions for returned API object
function Book(query, results) {
  this.image = results.imageLinks.thumbnail;
  this.title = results.volumeInfo.title;
  this.author = results.volumeInfo.authors;
  this.description = results.volumeInfo.description;
  this.search_query = query;
};

// placeholder ejs header greeting on index.ejs
let greetingMessage = 'Hello World!';

app.listen(PORT, () => {
  console.log(`listening on port: ${PORT}`);
});
