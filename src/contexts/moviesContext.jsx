import React, { useState, createContext, useContext } from "react";
import { useQuery } from "react-query";
import { AuthContext } from "./authContext";

import { getFavourites, addFavourite, removeFavourite, getUserPlaylist, addMovieToPlaylist, removeMovieFromPlaylist } from "../api/user-data";

export const MoviesContext = createContext(null);

function useFavourites(userId) {
  return useQuery(["favourites", userId], () => getFavourites(userId), {
    enabled: !!userId,
    staleTime: 1000 * 60 * 5,
  });
}

function usePlaylist(userId) {
  return useQuery(["playlist", userId], () => getUserPlaylist(userId), {
    enabled: !!userId,
    staleTime: 1000 * 60 * 5,
  });
}

const MoviesContextProvider = (props) => {
  const [myReviews, setMyReviews] = useState({});
  const { userId, email } = useContext(AuthContext);

  const { data: favourites, refetch: refetchFavourites } = useFavourites(
    userId
  );

  const { data: playlist, refetch: refetchPlaylist } = usePlaylist(userId);

  const addToFavourites = async (movie) => {
    if (favourites.find((movie_id) => movie_id === movie.id)) {
      return;
    }

    try {
      const request = await addFavourite(userId, movie.id);
      refetchFavourites();
    } catch (error) {
      if (error.response) {
        console.log(error.response.data);
      } else {
        console.log(error);
      }
    }
  };

  const removeFromFavourites = async (movie) => {
    try {
      const request = await removeFavourite(userId, movie.id);
      refetchFavourites();
    } catch (error) {
      if (error.response) {
        console.log(error.response.data);
      } else {
        console.log(error);
      }      
    }
  };

  const addReview = (movie, review) => {
    setMyReviews({ ...myReviews, [movie.id]: review });
  };

  const addToPlaylist = async (movie) => {
    if (playlist.find((movie_id) => movie_id === movie.id)) {
      return;
    }

    try {
      const request = await addMovieToPlaylist(userId, movie.id);
      refetchPlaylist();
    } catch (error) {
      if (error.response) {
        console.log(error.response.data);
      } else {
        console.log(error);
      }      
    }
  };

  const removeFromPlaylist = async (movie) => {
    try {
      const request = await removeMovieFromPlaylist(userId, movie.id);
      refetchPlaylist();
    } catch (error) {
      if (error.response) {
        console.log(error.response.data);
      } else {
        console.log(error);
      }
    }
  };

  return (
    <MoviesContext.Provider
      value={{
        favourites: favourites || [],
        playlist: playlist || [],
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
