const MongoClient = require('mongodb').MongoClient;
const url = 'mongodb://localhost:27017';
let db;

MongoClient.connect(url, { useUnifiedTopology: true }, (err, client) => {
  if (err) throw err;
  db = client.db('mydb');
  require('./add')(db);
  // Add other file requires as needed
});
