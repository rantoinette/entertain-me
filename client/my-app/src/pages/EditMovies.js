import { useMutation, useQuery } from "@apollo/client";
import { GET_MOVIE_BY_ID, GET_MOVIES, EDIT_MOVIES } from "../graph";
import { useState } from "react";
import { useHistory, useParams } from "react-router";

export default function EditMovie() {
  const history = useHistory();
  const [movieData, setMovieData] = useState({});
  const { id } = useParams();
  const { loading, error, data } = useQuery(GET_MOVIE_BY_ID, {
    variables: { type: id },
    onCompleted: function (data) {
      setMovieData({
        title: data.moviesById.title,
        overview: data.moviesById.overview,
        poster_path: data.moviesById.poster_path,
        popularity: data.moviesById.popularity,
        tags: data.moviesById.tags,
      });
    },
  });

  const [editMovie, edited] = useMutation(EDIT_MOVIES);

  if (loading) return "Loading...";
  if (error) return `Error! ${error.message}`;

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

  function handleEditMovie(event) {
    event.preventDefault();
    let input = {
      _id: id,
      title: movieData.title,
      overview: movieData.overview,
      poster_path: movieData.poster_path,
      popularity: movieData.popularity,
      tags: movieData.tags,
    };
    // console.log(input, "inputt");
    editMovie({
      variables: {
        input: input,
      },
      refetchQueries: [{ query: GET_MOVIES }],
    });
    history.push("/");
  }

  return (
    <>
      <div className="container mt-5 col-8">
        <form onSubmit={handleEditMovie}>
          <div className="mb-3">
            <label for="exampleInputEmail1" className="form-label">
              Title
            </label>
            <input
              name="title"
              value={movieData.title}
              onChange={handleChange}
              type="text"
              className="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
            />
          </div>
          <div className="mb-3">
            <label for="exampleInputPassword1" className="form-label">
              Overview
            </label>
            <input
              name="overview"
              onChange={handleChange}
              value={movieData.overview}
              type="text"
              className="form-control"
              id="exampleInputPassword1"
            />
          </div>
          <div className="mb-3">
            <label for="exampleInputPassword1" className="form-label">
              poster_path
            </label>
            <input
              name="poster_path"
              onChange={handleChange}
              value={movieData.poster_path}
              type="text"
              className="form-control"
              id="exampleInputPassword1"
            />
          </div>
          <div class="mb-3">
            <label for="exampleInputEmail1" class="form-label">
              Popularity
            </label>
            <input
              name="popularity"
              value={movieData.popularity}
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
          <div className="mb-3">
            <label for="exampleInputPassword1" className="form-label">
              tags
            </label>
            <input
              name="tags"
              onChange={handleChange}
              value={movieData.tags}
              type="text"
              className="form-control"
              id="exampleInputPassword1"
            />
          </div>

          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </form>
      </div>
    </>
  );
}
