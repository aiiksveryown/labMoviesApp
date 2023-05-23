import React, { useState, createContext, useContext } from "react";
import { useQuery } from "react-query";
import { AuthContext } from "./authContext";
import {
  fetchFavourites,
  addToFavouriteMovies,
  removeFromFavouriteMovies,
  fetchPlaylist,
  addToMoviePlaylist,
  removeFromMoviePlaylist,
} from "../db/supabase";

import { getFavourites, addFavourite, removeFavourite } from "../api/user-data";

export const MoviesContext = createContext(null);

function useFavourites(userId) {
  return useQuery(["favourites", userId], () => getFavourites(userId), {
    enabled: !!userId,
    staleTime: 1000 * 60 * 5,
  });
}

function usePlaylist(userId) {
  return useQuery(["playlist", userId], () => fetchPlaylist(userId), {
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
    if (playlist.find((m) => m.movie_id === movie.id)) {
      return;
    }

    const error = await addToMoviePlaylist(userId, movie.id);

    if (!error) {
      refetchPlaylist();
    }
  };

  const removeFromPlaylist = async (movie) => {
    const error = await removeFromMoviePlaylist(userId, movie.id);

    if (!error) {
      refetchPlaylist();
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
