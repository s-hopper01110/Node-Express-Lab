const express = require('express');

const postsRouter = require('./posts/posts-router.js');

const server = express();

server.use(express.json());
server.use('/api/posts', postsRouter);

server.get('/', (req, res) => {
    res.send('Node Express Lab -- success');
  });

  module.exports = server; 
  