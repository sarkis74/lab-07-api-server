'use strict';

let db = [];


module.exports.getPosts = (req,res,next) => {
    let count = db.length;
    let results = db;
    if(res)
        res.json({count,results});// Sends back (database) array length and content
};

module.exports.getPostsId = (req,res,next) => {
    let id = req.params.id;// Variable stores URL parameter "id"
    let record = db.filter((record) => record.id === parseInt(id));// Parses (database) array elements(ids)
    if(res)
    res.json(record[0]);// First element(id) sent back in JSON format
};


module.exports.postPosts = (req,res,next) => {
    let {name,author,title,article} = req.body;// Destructuring request body(storing its properties values in declared variables)
    let record = {name,author,title,article};// Creating an object with properties based on the destructured variables
    record.id = db.length + 1;// Creating new  id after each created object
    db.push(record);// Adding to array simulating database
    console.log(db);
    if(res)
    res.json(record);
};

module.exports.putPostsId = (req,res,next) => { // Need to update "record" values?
    const requestId = parseInt(req.params.id);// Storing the id required from user for update
    let record = db.filter(record => {// Record here is the returned id
        return record.id == requestId;// Matching/searching id on record with user request id
    })[0];// --> object that's first element of database array
    console.log(record)
    if (!record) {// if id not in database
        let item = req.body;
        item.id = requestId;
        db.push(item);
        res.sendStatus(201);
    } else {
        record.name = req.body.name;
        res.sendStatus(204);
    }
};

module.exports.deletePostsId = (req,res,next) => {
    const requestId = parseInt(req.params.id);
    let record = db.filter(record => {// Record here is the returned id
        return record.id == requestId;// Matching/searching id on record with user request id
    })[0];

    if (!record) {
        return res.sendStatus(404);
    }

    db = db.filter(record => record.id !== id);
    res.sendStatus(204);
};


