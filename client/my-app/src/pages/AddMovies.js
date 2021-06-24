import { useMutation } from "@apollo/client";
import { ADD_MOVIES, GET_MOVIES } from "../graph";
import { useState } from "react";
import { useHistory } from "react-router";

export default function AddMovie() {
  const history = useHistory();
  const [movieData, setMovieData] = useState({
    title: "",
    overview: "",
    poster_path: "",
    popularity: 0.0,
    tags: [""],
  });
  const [addMovie, data] = useMutation(ADD_MOVIES); // data is the returning val
  // const [addMovie, data] = useMutation(ADD_MOVIES, {refetchQueries: [{ query: GET_MOVIES }]}); // another way is to refetchquery immediately here

  function handleAddNewMovie(event) {
    event.preventDefault();
    let input = {
      title: movieData.title,
      overview: movieData.overview,
      poster_path: movieData.poster_path,
      popularity: movieData.popularity,
      tags: movieData.tags,
    };

    addMovie({
      variables: {
        input: input,
      },
      refetchQueries: [{ query: GET_MOVIES }],
    });
    history.push("/");
  }

  function handleChange(event) {
    let value = event.target.value;
    let name = event.target.name;
    if (name === "tags") {
      value = value.split(",");
    }
    if (name === "popularity") {
      value = Number(value);
    }
    setMovieData({ ...movieData, [name]: value });
  }

  return (
    <>
      <div className="container mt-5 col-8">
        <form onSubmit={handleAddNewMovie}>
          <div class="mb-3">
            <label for="exampleInputEmail1" class="form-label">
              Title
            </label>
            <input
              name="title"
              onChange={handleChange}
              type="text"
              class="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
            />
          </div>
          <div class="mb-3">
            <label for="exampleInputPassword1" class="form-label">
              Overview
            </label>
            <input
              name="overview"
              onChange={handleChange}
              type="text"
              class="form-control"
              id="exampleInputPassword1"
            />
          </div>
          <div class="mb-3">
            <label for="exampleInputPassword1" class="form-label">
              poster_path
            </label>
            <input
              name="poster_path"
              onChange={handleChange}
              type="text"
              class="form-control"
              id="exampleInputPassword1"
            />
          </div>
          <div class="mb-3">
            <label for="exampleInputEmail1" class="form-label">
              Popularity
            </label>
            <input
              name="popularity"
              onChange={handleChange}
              type="number"
              step="0.1"
              min="1"
              max="10"
              class="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
            />
          </div>
          <div class="mb-3">
            <label for="exampleInputPassword1" class="form-label">
              tags
            </label>
            <input
              name="tags"
              onChange={handleChange}
              type="text"
              class="form-control"
              id="exampleInputPassword1"
            />
          </div>

          <button type="submit" class="btn btn-primary">
            Submit
          </button>
        </form>
      </div>
    </>
  );
}
