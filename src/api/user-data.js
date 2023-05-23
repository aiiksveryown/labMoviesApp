export const getFavourites = async (userId) => {
  return fetch(
    `/api/accounts/${userId}/favourites/`, { headers: {
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

export const addFavourite = async (userId, movieId) => {
  return fetch(
    `/api/accounts/${userId}/favourites/`, { method: 'POST', headers: {
      'Authorization': window.localStorage.getItem('token'),
      'Content-Type': 'application/json'
    }, body: JSON.stringify({ movieId })
    }
  ).then((response) => {
    if (!response.ok) {
      throw new Error(response.json().message);
    }
    return response.json();
  })
    .catch((error) => {
      console.log(error);
      throw error
    });
}

export const removeFavourite = async (userId, movieId) => {
  return fetch(
    `/api/accounts/${userId}/favourites/${movieId}`, { method: 'DELETE', headers: {
      'Authorization': window.localStorage.getItem('token'),
      'Content-Type': 'application/json'
    }
    }
  ).then((response) => {
    if (response.status === 404) {
      console.log('Movie not found in favourites')
      return;
    }
    return response.json();
  })
    .catch((error) => {
      throw error
    });
}

export const getUserPlaylist = async (userId) => {
  return fetch(
    `/api/accounts/${userId}/playlist/`, {
    headers: {
      Authorization: window.localStorage.getItem('token'),
    }
  }
  ).then((response) => {
    if (!response.ok) {
      throw new Error(response.json().message);
    }
    return response.json();
  });
};

export const addMovieToPlaylist = async (userId, movieId) => {
  return fetch(
    `/api/accounts/${userId}/playlist/`, { method: 'POST', headers: {
      'Authorization': window.localStorage.getItem('token'),
      'Content-Type': 'application/json'
    }, body: JSON.stringify({ movieId })
    }
  ).then((response) => {
    if (!response.ok) {
      throw new Error(response.json().message);
    }
    return response.json();
  })
    .catch((error) => {
      console.log(error);
      throw error
    });
}

export const removeMovieFromPlaylist = async (userId, movieId) => {
  return fetch(
    `/api/accounts/${userId}/playlist/${movieId}`, {
      method: 'DELETE', headers: {
        'Authorization': window.localStorage.getItem('token'),
        'Content-Type': 'application/json'
      }
  }
  ).then((response) => {
    if (response.status === 404) {
      console.log('Movie not found in playlist')
      return;
    }
    return response.json();
  })
    .catch((error) => {
      throw error
    });
};