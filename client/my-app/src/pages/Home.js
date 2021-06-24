import { GET_MOVIES, DELETE_MOVIES, GET_SERIES } from "../graph";
import { useQuery } from "@apollo/client";
import { useHistory } from "react-router";
import { useMutation } from "@apollo/client";
import { favourite } from "../graph/var";

export default function Home() {
  const history = useHistory();

  const { loading, error, data } = useQuery(GET_MOVIES);
  const {
    loading: loadingSeries,
    error: errorSeries,
    data: dataSeries,
  } = useQuery(GET_SERIES);
  const [inputData, deleted] = useMutation(DELETE_MOVIES);

  if (loading) return "Loading...";
  if (error) return `Error! ${error.message}`;
  if (loadingSeries) return "Loading...";
  if (errorSeries) return `Error! ${errorSeries.message}`;

  function handleDeleteAction(movieId) {
    let type = movieId;
    inputData({
      variables: { type },
      refetchQueries: [{ query: GET_MOVIES }],
    });
  }

  function handleAddToFav(movie) {
    const currentFavourite = favourite(); //return favourite content
    let newFavourite;

    let movieExist = false;
    favourite().forEach((el, i) => {
      if (el._id === movie._id) {
        movieExist = true;
      }
    });

    if (movieExist == false) {
      newFavourite = [...currentFavourite, movie];
      favourite(newFavourite);
    }

    //another way
    // const found = favourite().find(item => item._id===id)
    // if (!found) {
    //   newFavourite = [...currentFavourite, movie];
    //   favourite(newFavourite);
    // }
  }

  return (
    <>
      <h1 className="container mt-2">Movies</h1>
      <div className="d-flex justify-content-center flex-wrap container mx-auto">
        {data.movies.map((movie, i) => {
          return (
            <div key={i} className="card mt-4 mx-2 my-2 col-3">
              <img
                className="card-img-top mx-auto"
                src={movie.poster_path}
                alt={movie.poster_path}
                style={{ width: "98%" }}
              />
              <div className="card-body">
                <h5 className="card-title">{movie.title}</h5>
                <p className="card-text">{movie.overview}</p>

                <div>
                  <button
                    className="btn btn-dark"
                    onClick={() => history.push(`/editMovies/${movie._id}`)}
                  >
                    <i class="bi bi-pen"></i>
                  </button>
                  <button
                    onClick={() => handleDeleteAction(movie._id)}
                    className="btn btn-dark"
                  >
                    <i class="bi bi-trash"></i>
                  </button>
                  <button
                    onClick={() => handleAddToFav(movie)}
                    className="btn btn-dark"
                  >
                    <i class="bi bi-heart"></i>
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <h1 className="container mt-2">Series</h1>
      <div className="d-flex justify-content-center flex-wrap container mx-auto">
        {dataSeries.series.map((series, i) => {
          return (
            <div key={i} className="card mt-4 mx-2 my-2 col-3">
              <img
                className="card-img-top mx-auto"
                src={series.poster_path}
                alt={series.poster_path}
                style={{ width: "98%" }}
              />
              <div className="card-body">
                <h5 className="card-title">{series.title}</h5>
                <p className="card-text">{series.overview}</p>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}
