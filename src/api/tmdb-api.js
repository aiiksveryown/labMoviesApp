export const getMovies = () => {
  return fetch(
    `/api/movies?language=en-US&include_adult=false&include_video=false&page=1`,{headers: {
      'Authorization': window.localStorage.getItem('token')
   }}
  ).then((response) => {
    if (!response.ok) {
      throw new Error(response.json().message);
    }
    return response.json();
  })
  .catch((error) => {
     throw error
  });
};

export const getMovie = (args) => {
  const [, idPart] = args.queryKey;
  const { id } = idPart;
  return fetch(
    `/api/movies/${id}`,{headers: {
      'Authorization': window.localStorage.getItem('token')
   }}
  ).then((response) => {
    if (!response.ok) {
      throw new Error(response.json().message);
    }
    return response.json();
  })
  .catch((error) => {
    throw error
 });
};

export const getMovieImages = ({ queryKey }) => {
  const [, idPart] = queryKey;
  const { id } = idPart;
  return fetch(
    `/api/movies/${id}/images`, {headers: {
      'Authorization': window.localStorage.getItem('token')
   }}
  ).then( (response) => {
    if (!response.ok) {
      throw new Error(response.json().message);
    }
    return response.json();

  })
  .catch((error) => {
    throw error
 });
};

export const getMovieReviews = (id) => {
  return fetch(
    `/api/movies/${id}/reviews`, {headers: {
      'Authorization': window.localStorage.getItem('token')
   }}
  ).then((response) => {
    if (!response.ok) {
      throw new Error(response.json().message);
    }
    return response.json();

  })
  .catch((error) => {
    throw error
  });
};

export const getUpcomingMovies = () => {
  return fetch(
    `/api/movies/upcoming?language=en-US&include_adult=false&page=1`,
    {
      headers: {
      'Authorization': window.localStorage.getItem('token')
    }}
  ).then((response) => {
    if (!response.ok) {
      throw new Error(response.json().message);
    }
    return response.json();
  })
  .catch((error) => {
     throw error
  });
};

export const getGenres = async () => {
  return fetch(
    "/api/genre/movie/list" +
      import.meta.env.VITE_TMDB_KEY +
      "&language=en-US",{headers: {
        'Authorization': window.localStorage.getItem('token')
     }}
  ).then( (response) => {
    if (!response.ok) {
      throw new Error(response.json().message);
    }
    return response.json();
  })
  .catch((error) => {
    throw error
 });
};

export const getMovieRecommendations = async ({ queryKey }) => {
  const [, { id }] = queryKey;
  const response = await fetch(
    `/api/movies/${id}/recommendations`,{headers: {
      'Authorization': window.localStorage.getItem('token')
   }}
  );
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  const data = await response.json();
  return data.results; 
};