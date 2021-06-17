const { getDatabase } = require("../config/mongodb");
const { ObjectId } = require("mongodb");
const collectionMovie = "Movie";

class Movie {
  static findAll() {
    return getDatabase().collection(collectionMovie).find().toArray();
  }
  static findById() {
    return getDatabase()
      .collection(collectionMovie)
      .find({ _id: ObjectId(id) })
      .toArray();
  }
  static create(payload) {
    return getDatabase().collection(collectionMovie).insertOne(payload);
  }
  static update(filter, updated) {
    return getDatabase().collection(collectionMovie).updateOne(filter, updated);
  }
  static destroy(payload) {
    return getDatabase().collection(collectionMovie).deleteOne(payload);
  }
}

module.exports = Movie;
