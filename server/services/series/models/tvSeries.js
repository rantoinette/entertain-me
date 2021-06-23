const { getDatabase } = require("../config/mongodb");
const { ObjectId } = require("mongodb");
const collectionSeries = "series";

class Series {
  static findAll() {
    return getDatabase().collection(collectionSeries).find().toArray();
  }
  static findById(id) {
    return getDatabase()
      .collection(collectionSeries)
      .find({ _id: ObjectId(id) })
      .toArray();
  }
  static create(payload) {
    return getDatabase().collection(collectionSeries).insertOne(payload);
  }
  static createMany(payload) {
    return getDatabase().collection(collectionSeries).insertMany(payload);
  }
  static update(filter, updated) {
    // console.log(filter);
    // console.log(updated);
    return getDatabase()
      .collection(collectionSeries)
      .updateOne({ _id: ObjectId(filter) }, { $set: updated });
  }
  static destroy(id) {
    return getDatabase()
      .collection(collectionSeries)
      .deleteOne({ _id: ObjectId(id) });
  }
}

module.exports = Series;
