const express = require('express');
const mongodb = require('mongodb')

const router = express.Router();

// get posts
router.get('/', async (req,res) => {
    const posts = await loadPostsCollection();
    res.send(await posts.find({}).toArray())
}) //references the '/api/posts' given in index.js

// add posts
router.post('/', async (req, res) => {
    const posts = await loadPostsCollection();
    await posts.insertOne({
        text: req.body.text,
        createdAt: new Date()
    });
    res.status(201).send
})

// delete posts
router.delete('/:id', async (req, res) => {
    const posts = await loadPostsCollection();
    await posts.deleteOne({_id: new mongodb.ObjectID(req.params.id)})
    res.status(200).send
});

async function loadPostsCollection() {
    const client = await mongodb.MongoClient.connect('mongodb+srv://nate-schmidt-37:Ausfahrt1@cluster0-k75z3.mongodb.net/test?retryWrites=true&w=majority', {
        useNewUrlParser: true
    });

    return client.db('Clust0').collection('posts')
}

module.exports = router;