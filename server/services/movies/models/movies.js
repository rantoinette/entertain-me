const { getDatabase } = require("../config/mongodb");
const { ObjectId } = require("mongodb");
const collectionMovie = "Movie"; //to make the table

class Movie {
  static findAll() {
    return getDatabase().collection(collectionMovie).find().toArray();
  }
  static findById(id) {
    return getDatabase()
      .collection(collectionMovie)
      .find({ _id: ObjectId(id) })
      .toArray();
  }
  static create(payload) {
    return getDatabase().collection(collectionMovie).insertOne(payload);
  }
  static createMany(payload) {
    return getDatabase().collection(collectionMovie).insertMany(payload);
  }
  static update(filter, updated) {
    // console.log(filter);
    // console.log(updated);
    return (
      getDatabase()
        .collection(collectionMovie)
        // .updateOne({ _id: ObjectId(filter) }, { $set: updated });
        .replaceOne({ _id: ObjectId(filter) }, updated)
    );
  }

  static destroy(id) {
    return getDatabase()
      .collection(collectionMovie)
      .deleteOne({ _id: ObjectId(id) });
  }
}

module.exports = Movie;
