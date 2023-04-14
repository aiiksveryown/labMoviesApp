import React, { useContext  } from "react";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import Avatar from "@mui/material/Avatar";
import FavoriteIcon from "@mui/icons-material/Favorite";
import Paper from "@mui/material/Paper";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import HomeIcon from "@mui/icons-material/Home";
import { MoviesContext } from "../../contexts/moviesContext";

const styles = {
    root: {  
    display: "flex",
    justifyContent: "space-around",
    alignItems: "center",
    flexWrap: "wrap",
    padding: 1.5,
  },
};

const MovieHeader = (props) => {
  const movie = props.movie;
  const { favourites } = useContext(MoviesContext);

  const isMovieFavourite = (movie) => {
    const isFav = favourites.find((m) => m.movie_id === movie.id);
    if (isFav !== undefined) {
      return true;
    }
    return false;
  };

  return (
    <Paper component="div" sx={styles.root}>
      <IconButton aria-label="go back">
        <ArrowBackIcon color="primary" fontSize="large" />
      </IconButton>

      {
        isMovieFavourite(movie) ? (
          <IconButton aria-label="favourite">
            <FavoriteIcon color="secondary" fontSize="large" />
          </IconButton>
        ) : <IconButton aria-label="add to favourites" >
            <FavoriteIcon color="primary" fontSize="large" />
          </IconButton>
      }

      <Typography variant="h4" component="h3">
        {movie.title}{"   "}
        <a href={movie.homepage}>
          <HomeIcon color="primary"  fontSize="='large"/>
        </a>
        <br />
        <span>{`${movie.tagline}`} </span>
      </Typography>
      <IconButton aria-label="go forward">
        <ArrowForwardIcon color="primary" fontSize="large" />
      </IconButton>
    </Paper>
  );
};

export default MovieHeader;
