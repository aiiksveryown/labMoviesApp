import React, { useState } from "react";

export const MoviesContext = React.createContext(null);

const MoviesContextProvider = (props) => {
  const [favourites, setFavourites] = useState([]);
  const [myReviews, setMyReviews] = useState({})
  const [playlist, setPlaylist] = useState([]);
  
  const addToFavourites = (movie) => {
    let updatedFavourites = [...favourites];
    if (!favourites.includes(movie.id)) {
      updatedFavourites.push(movie.id);
    }
    setFavourites(updatedFavourites);
  };

  const addReview = (movie, review) => {
    setMyReviews( {...myReviews, [movie.id]: review } )
  };

  const removeFromFavourites = (movie) => {
    setFavourites(favourites.filter((mId) => mId !== movie.id));
  };

  const addToPlaylist = (movie) => {
    if (!playlist.includes(movie.id)) {
      setPlaylist([...playlist, movie.id]);
    }
  };

  const removeFromPlaylist = (movie) => {
    setPlaylist(playlist.filter((mId) => mId !== movie.id));
  };

  return (
    <MoviesContext.Provider
      value={{
        favourites,
        playlist,
        addToFavourites,
        removeFromFavourites,
        addReview,
        addToPlaylist,
        removeFromPlaylist,
      }}
    >
      {props.children}
    </MoviesContext.Provider>
  );
};

export default MoviesContextProvider;
