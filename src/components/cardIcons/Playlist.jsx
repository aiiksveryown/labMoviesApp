import React, { useContext } from "react";
import { MoviesContext } from "../../contexts/moviesContext";
import IconButton from "@mui/material/IconButton";
import {PlaylistAdd, PlaylistRemove} from "@mui/icons-material";

const AddToPlaylistIcon = ({ movie }) => {
  const context = useContext(MoviesContext);

  const onUserSelect = (e) => {
    e.preventDefault();
    context.addToPlaylist(movie);
  };
  
  return (
    <IconButton
      aria-label="add to playlist"
      onClick={onUserSelect}
    >
      <PlaylistAdd color="primary" fontSize="large" />
    </IconButton>
  );
};

const RemoveFromPlaylistIcon = ({ movie }) => {
  const context = useContext(MoviesContext);

  const onUserSelect = (e) => {
    e.preventDefault();
    context.removeFromPlaylist(movie);
  };

  return (
    <IconButton
      aria-label="remove from playlist"
      onClick={onUserSelect}
    >
      <PlaylistRemove color="primary" fontSize="large" />
    </IconButton>
  );
};

export { AddToPlaylistIcon, RemoveFromPlaylistIcon };
