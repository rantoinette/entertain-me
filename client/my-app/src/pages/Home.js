import { GET_MOVIES, DELETE_MOVIES } from "../graph";
import { useQuery } from "@apollo/client";
import { useHistory } from "react-router";
import { useMutation } from "@apollo/client";
import { favourite } from "../graph/var";

export default function Home() {
  const history = useHistory();

  const { loading, error, data } = useQuery(GET_MOVIES);
  const [inputData, deleted] = useMutation(DELETE_MOVIES);

  if (loading) return "Loading...";
  if (error) return `Error! ${error.message}`;

  function handleDeleteAction(movieId) {
    // console.log(movieId, "movieID");
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

    console.log(favourite(), "fav");
  }

  return (
    <>
      <div className="row container">
        {data.movies.map((movie, i) => {
          return (
            <div key={i} className="card mt-4 col-3 mx-2 my-2">
              <img
                className="card-img-top"
                src={movie.poster_path}
                alt={movie.poster_path}
              />
              <div className="card-body">
                <h5 className="card-title">{movie.title}</h5>
                <p className="card-text">{movie.overview}</p>
                {movie.tags.map((tag, i) => {
                  return (
                    <p key={i} className="card-text">
                      {tag}
                    </p>
                  );
                })}

                <div>
                  <button
                    className="btn btn-dark"
                    onClick={() => history.push(`/editMovies/${movie._id}`)}
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDeleteAction(movie._id)}
                    className="btn btn-dark"
                  >
                    Delete
                  </button>
                  <button
                    onClick={() => handleAddToFav(movie)}
                    className="btn btn-dark"
                  >
                    Favourite
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}
