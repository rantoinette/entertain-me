const { MongoClient } = require("mongodb");

const uri = "mongodb://localhost:27017";

let database = null;

async function connect() {
  try {
    const client = new MongoClient(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    await client.connect();
    const db = await client.db("entertainment-hacktiv8");
    // console.log("connected");
    // console.log(db, "database");

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
