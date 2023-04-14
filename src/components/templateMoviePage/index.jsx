import React from "react";
import { useQuery } from "react-query";
import Grid from "@mui/material/Grid";
import Carousel from "react-material-ui-carousel";
import Box from "@mui/material/Box";

import Spinner from "../spinner";
import MovieHeader from "../headerMovie";
import { getMovieImages } from "../../api/tmdb-api";

const TemplateMoviePage = ({ movie, children }) => {
  const { data, error, isLoading, isError } = useQuery(
    ["images", { id: movie.id }],
    getMovieImages
  );

  if (isLoading) {
    return <Spinner />;
  }

  if (isError) {
    return <h1>{error.message}</h1>;
  }
  const images = data.posters;

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
    </>
  );
};

export default TemplateMoviePage;
