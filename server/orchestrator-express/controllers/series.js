const axios = require("axios");
let url = "http://localhost:4002/series";

class Controller {
  static showAllSeries(req, res, next) {
    axios({
      method: "GET",
      url,
    })
      .then(({ data }) => {
        console.log(data, "data show all");
        res.status(200).json(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }
  static findOneSeries(req, res, next) {
    let id = req.params.id;
    axios({
      method: "GET",
      url: `${url}/${id}`,
    })
      .then(({ data }) => {
        res.status(200).json(data);
        // console.log(data, "data find one");
      })
      .catch((err) => {
        console.log(err);
      });
  }
  static addSeries(req, res, next) {
    console.log("INSIDE");
    axios({
      method: "POST",
      url: `${url}`,
    })
      .then(({ data }) => {
        res.status(200).json(data);
        // console.log(data, "data");
      })
      .catch((err) => {
        console.log(err);
      });
  }
  static editSeries(req, res, next) {
    let id = req.params.id;
    const updatedSeries = {
      title: req.body.title,
      overview: req.body.overview,
      poster_path: req.body.poster_path,
      popularity: req.body.popularity,
      tags: req.body.tags,
    };
    axios({
      method: "PUT",
      url: `${url}/${id}`,
      data: updatedSeries,
    })
      .then(({ data }) => {
        res.status(200).json(data);
        // console.log(data, "data");
      })
      .catch((err) => {
        console.log(err);
      });
  }
  static deleteSeries(req, res, next) {
    let id = req.params.id;
    axios({
      method: "DELETE",
      url: `${url}/${id}`,
      data: id,
    })
      .then(({ data }) => {
        res.status(200).json(data);
        // console.log(data, "data");
      })
      .catch((err) => {
        console.log(err);
      });
  }
}

module.exports = Controller;
