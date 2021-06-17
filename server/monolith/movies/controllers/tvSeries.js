const Series = require("../models/tvSeries");

class Controller {
  static showAllSeries(req, res, next) {
    Series.findAll()
      .then((data) => {
        res.status(200).json(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }
  static findOneSeries(req, res, next) {
    let id = req.params.id;
    Series.findById(id)
      .then((data) => {
        res.status(200).json(data[0]);
      })
      .catch((err) => {
        console.log(err);
      });
  }
  static addSeries(req, res, next) {
    const newSeries = {
      title: req.body.title,
      overview: req.body.overview,
      poster_path: req.body.poster_path,
      popularity: req.body.popularity,
      tags: req.body.tags,
    };
    Series.create(newSeries)
      .then((data) => {
        res.status(201).json(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }
  static addSeriesBulk(req, res, next) {
    const newSeries = [
      {
        title: "title 1",
        overview: "overview 1",
        poster_path: "posterpath 1",
        popularity: 5.4,
        tags: ["horror", "romance"],
      },
      {
        title: "title 2",
        overview: "overview 2",
        poster_path: "posterpath 2",
        popularity: 5.4,
        tags: ["horror", "comedy"],
      },
      {
        title: "title 3",
        overview: "overview 3",
        poster_path: "posterpath 3",
        popularity: 5.4,
        tags: ["comedy", "romance"],
      },
    ];
    Series.createMany(newSeries)
      .then((data) => {
        res.status(201).json(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }
  static editSeries(req, res, next) {
    let id = req.params.id;
    // console.log(id, "edit Series id");
    const updatedSeries = {
      title: req.body.title,
      overview: req.body.overview,
      poster_path: req.body.poster_path,
      popularity: req.body.popularity,
      tags: req.body.tags,
    };
    Series.update(id, updatedSeries)
      .then((data) => {
        res.status(200).json(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }
  static deleteSeries(req, res, next) {
    let id = req.params.id;
    Series.destroy(id)
      .then(() => {
        res.status(201).json({ message: "deleted" });
      })
      .catch((err) => {
        console.log(err);
      });
  }
}

module.exports = Controller;
