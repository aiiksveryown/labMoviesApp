import { supabase } from "../supabaseClient"; // Import your Supabase client

export async function fetchFavourites(userId) {
  const { data, error } = await supabase
    .from("favourites")
    .select("*")
    .eq("user_id", userId);

  if (error) {
    throw error;
  }

  return data;
}

export async function addToFavouriteMovies(userId, movieId) {
  const { error } = await supabase
    .from("favourites")
    .insert([{ user_id: userId, movie_id: movieId }]);

  return error;
}

export async function removeFromFavouriteMovies(userId, movieId) {
  const { error } = await supabase
    .from("favourites")
    .delete()
    .eq("user_id", userId)
    .eq("movie_id", movieId);

  return error;
}

// Add similar functions for playlists
export async function fetchPlaylist(userId) {
  const { data, error } = await supabase
    .from("playlists")
    .select("*")
    .eq("user_id", userId);

  if (error) {
    throw error;
  }

  return data;
}

export async function addToMoviePlaylist(userId, movieId) {
  const { error } = await supabase
    .from("playlists")
    .insert([{ user_id: userId, movie_id: movieId }]);

  return error;
}

export async function removeFromMoviePlaylist(userId, movieId) {
  const { error } = await supabase
    .from("playlists")
    .delete()
    .eq("user_id", userId)
    .eq("movie_id", movieId);

  return error;
}
