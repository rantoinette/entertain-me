import { gql, useQuery } from "@apollo/client";

export const GET_MOVIES = gql`
  query GetMovies {
    movies {
      _id
      title
      overview
      poster_path
      popularity
      tags
    }
  }
`;

export const GET_SERIES = gql`
  query GetSeries {
    series {
      _id
      title
      overview
      poster_path
      popularity
      tags
    }
  }
`;

export const GET_MOVIE_BY_ID = gql`
  query GetMovieById($type: ID) {
    moviesById(id: $type) {
      _id
      title
      overview
      poster_path
      popularity
      tags
    }
  }
`;

export const ADD_MOVIES = gql`
  mutation AddMovies($input: MovieInput) {
    createMovies(movie: $input) {
      title
      overview
      poster_path
      popularity
      tags
    }
  }
`;

export const EDIT_MOVIES = gql`
  mutation EditMovies($input: MovieInput) {
    updateMovies(movie: $input) {
      title
      overview
      poster_path
      popularity
      tags
    }
  }
`;

export const DELETE_MOVIES = gql`
  mutation DeleteMovies($type: ID) {
    deleteMovies(_id: $type) {
      message
    }
  }
`;
