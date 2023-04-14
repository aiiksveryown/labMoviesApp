import React from "react";
import { useQuery } from "react-query";
import Grid from "@mui/material/Grid";
import Carousel from "react-material-ui-carousel";
import Box from "@mui/material/Box";

import Spinner from "../spinner";
import MovieHeader from "../headerMovie";
import MovieCard from "../movieCard";
import { getMovieImages, getMovieRecommendations } from "../../api/tmdb-api";

const TemplateMoviePage = ({ movie, children }) => {
  const { data: imagesData, error, isLoading, isError } = useQuery(
    ["images", { id: movie.id }],
    getMovieImages
  );

  const {
    data: recommendationsData,
    isLoading: recommendationsLoading,
    isError: recommendationsError,
    error: recommendationsFetchError,
  } = useQuery(
    ["recommendations", { id: movie.id }],
    getMovieRecommendations,
    {
      staleTime: 1000 * 60 * 5, // Cache data for 5 minutes
    }
  );

  if (isLoading) {
    return <Spinner />;
  }

  if (isError) {
    return <h1>{error.message}</h1>;
  }

  const images = imagesData.posters;

  return (
    <>
      <MovieHeader movie={movie} />

      <Grid container spacing={5} style={{ padding: "15px" }}>
        <Grid item xs={3}>
          <Box sx={{ width: "100%" }}>
            {images && images.length > 0 && (
              <Carousel
                autoPlay={false}
                animation="slide"
                navButtonsAlwaysVisible={true}
              >
                {images.map((image, index) => (
                  <img
                    key={index}
                    src={`https://image.tmdb.org/t/p/w500/${image.file_path}`}
                    alt={image.poster_path}
                    style={{ width: "100%" }}
                  />
                ))}
              </Carousel>
            )}
          </Box>
        </Grid>

        <Grid item xs={9}>
          {children}
        </Grid>
      </Grid>

      {recommendationsLoading && <Spinner />}
      {recommendationsError && <h1>{recommendationsFetchError.message}</h1>}
      {recommendationsData && (
        <div>
          <h2>Recommended Movies:</h2>
          <Grid container spacing={2}>
            {recommendationsData.map((recommendedMovie) => (
              <Grid item key={recommendedMovie.id} xs={6} sm={4} md={3} lg={2}>
                <MovieCard
                  action={(movie) => {}}
                  movie={recommendedMovie}
                />
              </Grid>
            ))}
          </Grid>
        </div>
      )}
    </>
  );
};

export default TemplateMoviePage;
