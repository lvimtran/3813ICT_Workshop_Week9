const express = require('express');
const app = express();
const http = require('http').Server(app);
const bodyParser = require('body-parser');
const cors = require('cors');
const MongoClient = require('mongodb').MongoClient;
var ObjectID = require('mongodb').ObjectID;
const PORT = 3000;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(function(req, res, next){
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE, OPTIONS");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

const products = require('./dbOperations/operations');
app.post('/products', products.insert);
app.get('/productFind', products.find);
app.post('/productUpdate', products.update);
app.post('/productDelete', products.delete);





const url = 'mongodb://localhost:27017';
MongoClient.connect(url, {poolSize:10, useNewUrlParser: true, useUnifiedTopology: true}, function(err, client) {
    if (err) {return console.log(err)}
    const dbName = 'mydb';
    const db = client.db(dbName);

    require('./routes/api-add')(db,app);
    require('./routes/api-prodcount')(db,app);
    require('./routes/api.validid')(db,app);
    require('./routes/api-getlist')(db,app);
    require('./routes/api-getitem')(db, app,ObjectID);
    require('./routes/api.update')(db,app,ObjectID);
    require('./routes/api-deleteitem')(db,app,ObjectID);

    require('./listen')(http)
})

app.listen(PORT, () => {
    console.log("Server is listening on port 3000")
})