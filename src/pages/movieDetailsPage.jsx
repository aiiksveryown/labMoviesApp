import React from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "react-query";

import { getMovie } from '../api/tmdb-api'
import Spinner from '../components/spinner'
import MovieDetails from "../components/movieDetails";
import PageTemplate from "../components/templateMoviePage";

const MovieDetailsPage = (props) => {
  const { id } = useParams();

  const { data: movie, error, isLoading, isError } = useQuery(
    ["movie", { id: id }],
    getMovie
  );

  if (isLoading) {
    return <Spinner />;
  }

  if (isError) {
    return <h1>{error.message}</h1>;
  }

  return (
    <>
      {movie ? (
        <>
          <PageTemplate movie={movie}>
            <MovieDetails movie={movie} />
          </PageTemplate>
        </>
      ) : (
        <p>Waiting for movie details</p>
      )}
    </>
  );
};

export default MovieDetailsPage;
