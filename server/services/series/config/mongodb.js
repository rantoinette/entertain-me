const { MongoClient } = require("mongodb");

const uri =
  "mongodb://raissa:mongodb@cluster0-shard-00-00.reqnj.mongodb.net:27017,cluster0-shard-00-01.reqnj.mongodb.net:27017,cluster0-shard-00-02.reqnj.mongodb.net:27017/entertainment?ssl=true&replicaSet=atlas-oywure-shard-0&authSource=admin&retryWrites=true&w=majority";

let database = null;

async function connect() {
  try {
    const client = new MongoClient(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    await client.connect();
    const db = await client.db("entertainment");

    database = db;
    return db;
  } catch (err) {
    console.log(err);
  }
}

function getDatabase() {
  return database;
}

module.exports = { connect, getDatabase };
