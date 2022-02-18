var express = require('express');
var dotenv = require('dotenv');
var mongo = require('mongodb');
var MongoClient = mongo.MongoClient;
var cors = require('cors');
var app = express();
app.use(cors());

dotenv.config();
var mongoUrl = 'mongodb+srv://143gopi_247:P.Gopi143@cluster0.vss3u.mongodb.net/malling?retryWrites=true&w=majority';

const bodyParser = require('body-Parser');
var port = process.env.PORT || 1431;

var db;

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());


app.get('/',(req, res) => {
    res.send("Hii from shopping mall")
})


app.get('/category',(req, res) => {
    db.collection('items').find().toArray((err,result) =>{
        if(err) throw err;
        res.send(result)
    })
})

app.get('/product',(req, res) => {
    db.collection('products').find().toArray((err,result) =>{
        if(err) throw err;
        res.send(result)
    })
})


app.get('/orders',(req, res) => {
    db.collection('order').find().toArray((err,result) =>{
        if(err) throw err;
        res.send(result)
    })
})

app.get('/product/:id',(req, res) => {
    db.collection('products').find({"cate_id":id}).toArray((err,result) =>{
        if(err) throw err;
        res.send(result)
    })
})




MongoClient.connect(mongoUrl, (err,client)=>{
    if(err) console.log("Error while connecting")
    db = client.db('malling');
    app.listen(port,() =>{ 
        console.log(`listening on port ${port}`)
    })
})
