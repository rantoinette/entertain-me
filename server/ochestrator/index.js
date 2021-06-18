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
      return fetch(movieUrl)
        .then((resp) => {
          return resp.json();
        })
        .then((data) => {
          return data;
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
      return fetch(seriesUrl)
        .then((resp) => {
          return resp.json();
        })
        .then((data) => {
          return data;
        });
    },
    seriesById: (_, args) => {
      return fetch(`${seriesUrl}/` + args.id)
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
      });
    },
    deleteMovies: (_, args) => {
      return fetch(`${movieUrl}/${args._id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
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
      });
    },
    deleteSeries: (_, args) => {
      return fetch(`${seriesUrl}/${args._id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });
    },
  },
};

const server = new ApolloServer({ typeDefs, resolvers });
server.listen().then(({ url }) => {
  console.log(`GraphQl server running at ${url}`);
});
