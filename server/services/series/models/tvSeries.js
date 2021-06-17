const { getDatabase } = require("../config/mongodb");
const { ObjectId } = require("mongodb");
const collectionMovie = "Series";

class Series {
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
    return getDatabase()
      .collection(collectionMovie)
      .updateOne({ _id: ObjectId(filter) }, { $set: updated });
  }
  static destroy(id) {
    return getDatabase()
      .collection(collectionMovie)
      .deleteOne({ _id: ObjectId(id) });
  }
}

module.exports = Series;
