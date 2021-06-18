const { ApolloServer, gql, ApolloError } = require("apollo-server");
const fetch = require("node-fetch");
const Redis = require("ioredis");
const redis = new Redis();
let movieUrl = "http://localhost:4001/movies";
let seriesUrl = "http://localhost:4002/series";

const typeDefs = gql`
  type Movie {
    _id: ID
    title: String
    overview: String
    poster_path: String
    popularity: Float
    tags: [String]
  }
  type Series {
    _id: ID
    title: String
    overview: String
    poster_path: String
    popularity: Float
    tags: [String]
  }
  type Query {
    movies: [Movie]
    moviesById(id: ID): Movie
    series: [Series]
    seriesById(id: ID): Series
  }
  type Mutation {
    createMovies(
      title: String
      overview: String
      poster_path: String
      popularity: Float
      tags: [String]
    ): Movie
    updateMovies(
      _id: ID
      title: String
      overview: String
      poster_path: String
      popularity: Float
      tags: [String]
    ): Movie
    deleteMovies(_id: ID): Movie
    createSeries(
      title: String
      overview: String
      poster_path: String
      popularity: Float
      tags: [String]
    ): Movie
    updateSeries(
      _id: ID
      title: String
      overview: String
      poster_path: String
      popularity: Float
      tags: [String]
    ): Movie
    deleteSeries(_id: ID): Movie
  }
`;

const resolvers = {
  Query: {
    movies: () => {
      let gotRedis = false;
      return redis
        .get("movies")
        .then((data) => {
          if (data) {
            gotRedis = true;
            //   console.log(data, "data>");
            return data;
          } else {
            return fetch(movieUrl);
          }
        })
        .then((resp) => {
          if (!gotRedis) {
            return resp.json();
          } else {
            return JSON.parse(resp);
          }
        })
        .then((data) => {
          if (!gotRedis) {
            redis.set("movies", JSON.stringify(data));
            return data;
          } else {
            return data;
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    moviesById: (_, args) => {
      return fetch(`${movieUrl}/` + args.id)
        .then((resp) => {
          //   console.log(resp.json());
          return resp.json();
        })
        .then((data) => {
          return data;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    series: () => {
      let gotRedis = false;
      return redis
        .get("series")
        .then((data) => {
          if (data) {
            gotRedis = true;
            return data;
          } else {
            return fetch(seriesUrl);
          }
        })
        .then((resp) => {
          if (!gotRedis) {
            redis.set("series", JSON.stringify(resp));
            return resp.json();
          } else {
            return JSON.parse(resp);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    seriesById: (_, args) => {
      let gotRedis = false;
      return redis
        .get("series")
        .then((data) => {
          if (data) {
            gotRedis = true;
            //   console.log(data, "data>");
            return data;
          } else {
            return fetch(seriesUrl);
          }
        })
        .then((resp) => {
          if (!gotRedis) {
            return resp.json();
          } else {
            return JSON.parse(resp);
          }
        })
        .then((data) => {
          if (!gotRedis) {
            redis.set("series", JSON.stringify(data));
            return data;
          } else {
            return data;
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
  Mutation: {
    createMovies: (_, args) => {
      const data = {
        title: args.title,
        overview: args.overview,
        poster_path: args.poster_path,
        popularity: args.popularity,
        tags: args.tags,
      };

      return fetch(movieUrl, {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((resp) => {
          return resp.json();
        })
        .then((data) => {
          return data;
        })
        .finally(() => {
          redis.del("movies");
        });
    },
    updateMovies: (_, args) => {
      const data = {
        title: args.title,
        overview: args.overview,
        poster_path: args.poster_path,
        popularity: args.popularity,
        tags: args.tags,
      };

      return fetch(`${movieUrl}/${args._id}`, {
        method: "PUT",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
        },
      }).finally((data) => {
        redis.del("movies");
      });
    },
    deleteMovies: (_, args) => {
      return fetch(`${movieUrl}/${args._id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      }).finally((data) => {
        redis.del("movies");
      });
    },
    createSeries: (_, args) => {
      const data = {
        title: args.title,
        overview: args.overview,
        poster_path: args.poster_path,
        popularity: args.popularity,
        tags: args.tags,
      };

      return fetch(seriesUrl, {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((resp) => {
          return resp.json();
        })
        .then((data) => {
          return data;
        })
        .finally(() => {
          redis.del("movies");
        });
    },
    updateSeries: (_, args) => {
      const data = {
        title: args.title,
        overview: args.overview,
        poster_path: args.poster_path,
        popularity: args.popularity,
        tags: args.tags,
      };

      return fetch(`${seriesUrl}/${args._id}`, {
        method: "PUT",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
        },
      }).finally(() => {
        redis.del("movies");
      });
    },
    deleteSeries: (_, args) => {
      return fetch(`${seriesUrl}/${args._id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      }).finally(() => {
        redis.del("movies");
      });
    },
  },
};

const server = new ApolloServer({ typeDefs, resolvers });
server.listen().then(({ url }) => {
  console.log(`GraphQl server running at ${url}`);
});
