import { favourite } from "../graph/var";

export default function FavouritePage() {
  //   console.log(favourite(), "FAVORITE");
  return (
    <>
      <div
        class=" mt-5 mx-auto justify-content-center flex-wrap"
        style={{ width: "800px" }}
      >
        {favourite().map((movie, i) => {
          return (
            <>
              <div class="card mx-2 my-2">
                <div className="d-flex">
                  <div className="col-2">
                    <img
                      src={movie.poster_path}
                      class="card-img-top"
                      alt="..."
                    />
                  </div>
                  <div class="card-body" style={{ width: "200px" }}>
                    <h5 class="card-title">{movie.title}</h5>
                    <p class="card-text">{movie.overview}</p>
                    {movie.tags.map((tag, i) => {
                      return (
                        <span key={i} className="badge bg-info text-dark mx-1">
                          {tag}
                        </span>
                      );
                    })}
                  </div>
                </div>
              </div>
            </>
          );
        })}
      </div>
    </>
  );
}
