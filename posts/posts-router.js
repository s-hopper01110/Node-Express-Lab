const express = require('express');

const db = require('../data/db.js');

const router = express.Router();


// When the client makes a GET request to /api/posts:
// If there's an error in retrieving the posts from the database: cancel the request & respond with HTTP status code 500.
// return the following JSON object: { error: "The posts information could not be retrieved." }.

router.get('/', (req, res ) => {
    db.find()
    .then(posts => {
        res.status(200).json({ success: true, posts});
    })//headers
    .catch(err => {
        res.status(500).json({ success: false, message: 'The posts information could not be retrieved.'})
    })
})


// When the client makes a GET request to /api/posts/:id:

// If the post with the specified id is not found: return HTTP status code 404 (Not Found).
// return the following JSON object: { message: "The post with the specified ID does not exist." }.


//If there's an error in retrieving the post from the database: cancel the request.
// respond with HTTP status code 500.
// return the following JSON object: { error: "The post information could not be retrieved." }.

router.get('/:id', ( req, res ) => {
    const { id } = req.params;

    db.findById(id)
    .then(posts => {
        if (posts) {
            res.status(201).json({ success: true, posts });
        }else{
            res.status(404).json({ success: false, message: 'The post with the specified ID does not exist.'})
        }
    })
    .catch(err => {
        res.status(500).json({ success: false, error: 'The post information could not be retrieved.'})

        })
    })

module.exports = router; 