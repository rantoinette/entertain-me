const Movie = require("../models/movies");

class Controller {
  static showAllMovie(req, res, next) {
    Movie.findAll()
      .then((data) => {
        res.status(200).json(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }
  static findOneMovie(req, res, next) {
    let id = req.params.id;
    Movie.findById(id)
      .then((data) => {
        res.status(200).json(data[0]);
      })
      .catch((err) => {
        console.log(err);
      });
  }
  static addMovie(req, res, next) {
    const newMovie = {
      title: req.body.title,
      overview: req.body.overview,
      poster_path: req.body.poster_path,
      popularity: req.body.popularity,
      tags: req.body.tags,
    };

    Movie.create(newMovie)
      .then((data) => {
        res.status(201).json(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }
  static addMovieBulk(req, res, next) {
    const newMovie = [
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
    Movie.createMany(newMovie)
      .then((data) => {
        res.status(201).json(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }
  static editMovie(req, res, next) {
    let id = req.params.id;
    const updatedMovie = {
      title: req.body.title,
      overview: req.body.overview,
      poster_path: req.body.poster_path,
      popularity: req.body.popularity,
      tags: req.body.tags,
    };
    Movie.update(id, updatedMovie)
      .then((data) => {
        return res.status(200).json(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }
  static deleteMovie(req, res, next) {
    let id = req.params.id;
    Movie.destroy(id)
      .then(() => {
        res.status(201).json({ message: "deleted" });
      })
      .catch((err) => {
        console.log(err);
      });
  }
}

module.exports = Controller;
