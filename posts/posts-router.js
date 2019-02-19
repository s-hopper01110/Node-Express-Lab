const express = require('express');

const db = require('../data/db.js');

const router = express.Router();


// When the client makes a GET request to /api/posts:
// If there's an error in retrieving the posts from the database: cancel the request & respond with HTTP status code 500.
// return the following JSON object: { error: "The posts information could not be retrieved." }.

//GET:

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

//GET:

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


// When the client makes a POST request to /api/posts:

// If the request body is missing the title or contents property: cancel the request & respond with HTTP status code 400 (Bad Request).
// return the following JSON response: { errorMessage: "Please provide title and contents for the post." }.


// If the information about the post is valid: save (.insert) the new post the the database & return HTTP status code 201 (Created).
// return the newly created post.

// If there's an error while saving the post: cancel the request & respond with HTTP status code 500 (Server Error).
// return the following JSON object: { error: "There was an error while saving the post to the database" }.

//POST:

router.post('/', ( req, res ) => {
    const { title, contents } = req.body;
    if ( !title || !contents ) {
        res.status(400).json({ error: 'Please provide title and contents for the post.' });
    }else{
        db
        .insert({ title, contents })
        .then(posts => {
            res.status(201).json( posts );
        })
        .catch(err => {
            res.status(500).json({ error: 'There was an error while saving the post to the database' })
        })
    }
})


// When the client makes a DELETE request to /api/posts/:id:

// If the post with the specified id is not found: return HTTP status code 404 (Not Found).
// return the following JSON object: { message: "The post with the specified ID does not exist." }.
 

//If there's an error in removing the post from the database: cancel the request & respond with HTTP status code 500.
// return the following JSON object: { error: "The post could not be removed" }.

//DELETE: 

router.delete('/:id', ( req, res ) => {
    const { id } =req.params;
    db
    .remove(id)
    .then(posts => {
        if( posts ){
            res.status(204).end();
        }else{
            res.status(404).json({ success: false,  message:'The post with the specified ID does not exist.' })
        }
    })
    .catch(err => {
        res.status(500).json({ error: 'The post could not be removed' })
    })
})


// When the client makes a PUT request to /api/posts/:id:

// If the post with the specified id is not found: return HTTP status code 404 (Not Found).
// return the following JSON object: { message: "The post with the specified ID does not exist." }.


//If the request body is missing the title or contents property: cancel the request & respond with HTTP status code 400 (Bad Request).
// return the following JSON response: { errorMessage: "Please provide title and contents for the post." }.

// If there's an error when updating the post: cancel the request.
// respond with HTTP status code 500.
// return the following JSON object: { error: "The post information could not be modified." }.

//If the post is found and the new information is valid: update the post document in the database using the new information sent in the request body.
// return HTTP status code 200 (OK).
// return the newly updated post.

//PUT:

router.put('/:id', ( req, res ) => {
    const { id } = req.params;
    const changes = req.body;

    db
    .update( id, changes ) 
    .then(postsID => {
        if(!postsID) {
            res.status(404).json({ success: false, message:'The post with the specified ID does not exist.'  })
        }else if ( !changes.title || !changes.contents ){
            return res.status(400).json({ success: false, message: 'Please provide title and contents for user' })
        }else{
            return res.status(200).json({ success: true, changes })
    }

})
.catch(err=> {
    res.status(500).json({ success: false, error:'The post information could not be modified.' })
})
})

module.exports = router; 