const express = require('express');
const app = express();
const PORT = 3344;
const serveStatic = require('serve-static');
const path = require('path');
const MongoClient = require('mongodb').MongoClient;
const bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

app.use(serveStatic(path.join(__dirname, 'public')));

app.get('/shit', (req, res) => {
    MongoClient.connect("mongodb://localhost:27017/music", function(err, client) {
    let db = client.db('music');
        db.collection('notes').find().toArray(function(err, result) {
            res.send(result)
        });
    });
})
app.post('/shoot', (req, res) => {
    MongoClient.connect("mongodb://localhost:27017/music", function(err, client) {
    let db = client.db('music');
        db.collection('notes').insertOne({
            frac:req.body.newNote,
            dec:eval(req.body.newNote)
        })
    });
    res.redirect('/');
})


app.get('/favicon.ico', (req, res) => {
    res.send('my favorite')
})

app.listen(PORT, () => console.log('localhost:'+ PORT))

