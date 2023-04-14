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

export const MoviesContext = createContext(null);

function useFavourites(userId) {
  return useQuery(["favourites", userId], () => fetchFavourites(userId), {
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
  const { user } = useContext(AuthContext);

  const { data: favourites, refetch: refetchFavourites } = useFavourites(
    user?.id
  );
  const { data: playlist, refetch: refetchPlaylist } = usePlaylist(user?.id);

  const addToFavourites = async (movie) => {
    if (favourites.find((m) => m.movie_id === movie.id)) {
      return;
    }

    const error = await addToFavouriteMovies(user?.id, movie.id);

    if (!error) {
      refetchFavourites();
    }
  };

  const removeFromFavourites = async (movie) => {
    const error = await removeFromFavouriteMovies(user?.id, movie.id);

    if (!error) {
      refetchFavourites();
    }
  };

  const addReview = (movie, review) => {
    setMyReviews({ ...myReviews, [movie.id]: review });
  };

  const addToPlaylist = async (movie) => {
    if (playlist.find((m) => m.movie_id === movie.id)) {
      return;
    }

    const error = await addToMoviePlaylist(user?.id, movie.id);

    if (!error) {
      refetchPlaylist();
    }
  };

  const removeFromPlaylist = async (movie) => {
    const error = await removeFromMoviePlaylist(user?.id, movie.id);

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
