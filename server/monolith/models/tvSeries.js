const { getDatabase } = require("../config/mongodb");
const { ObjectId } = require("mongodb");
const collectionTvSeries = "TvSeries";

class Movie {
  static findAll() {
    return getDatabase().collection(collectionTvSeries).find().toArray();
  }
  static findById() {
    return getDatabase()
      .collection(collectionTvSeries)
      .find({ _id: ObjectId(id) })
      .toArray();
  }
}

module.exports = Movie;
