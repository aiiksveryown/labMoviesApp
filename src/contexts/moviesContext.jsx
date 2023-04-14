import React, { useState, createContext, useContext } from "react";
import { useQuery } from "react-query";
import { supabase } from "../supabaseClient"; // Import your Supabase client
import { AuthContext } from "./authContext";

export const MoviesContext = createContext(null);

async function fetchFavourites(userId) {
  const { data, error } = await supabase
    .from("favourites")
    .select("*")
    .eq("user_id", userId);
  
  console.log(userId);

  if (error) {
    throw error;
  }

  return data;
}

function useFavourites(userId) {
  return useQuery(
    ["favourites", userId],
    () => fetchFavourites(userId),
    {
      enabled: !!userId, // Only fetch favourites when userId is available
      staleTime: 1000 * 60 * 5, // Cache data for 5 minutes
    }
  );
}

const MoviesContextProvider = (props) => {
  const [myReviews, setMyReviews] = useState({});
  const [playlist, setPlaylist] = useState([]);
  const { user } = useContext(AuthContext);

  const { data: favourites, refetch: refetchFavourites } = useFavourites(user?.id);

  const addToFavourites = async (movie) => {
    if (favourites.find((m) => m.movie_id === movie.id)) {
      return;
    }
    
    const { error } = await supabase
      .from("favourites")
      .insert([{ user_id: user?.id, movie_id: movie.id }]);

    if (!error) {
      refetchFavourites();
    }
  };
  
  const removeFromFavourites = async (movie) => {
    const { error } = await supabase
    .from("favourites")
    .delete()
    .eq("user_id", user?.id)
    .eq("movie_id", movie.id);
    
    if (!error) {
      refetchFavourites();
    }
  };

  const addReview = (movie, review) => {
    setMyReviews({ ...myReviews, [movie.id]: review });
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
        favourites: favourites || [],
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
