'use strict';

const express = require('express');

const app = express();

const PORT = process.env.PORT || 8080;

const middleware = require('./api_middleware');

let db = [];// Array to store values? simulating database?

app.use(express.json());

app.use( (req,res,next) => {
    console.log('LOG:', req.method, req.path);// Logs HTTP verb and URL route
    next();
});

app.get('/posts', middleware.getPosts);

app.get('/posts/:id', middleware.getPostsId);


app.post('/posts', middleware.postPosts);

app.put('/posts/:id', middleware.putPostsId);

app.delete('/posts/:id', middleware.deletePostsId);

module.exports = {
    server: app,
    start: port => {
        let PORT = port || process.env.PORT || 8080;
        app.listen(PORT, () => console.log(`Listening on ${PORT}`));
    },
};


