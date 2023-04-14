import React from "react";
import { BrowserRouter, Route, Navigate, Routes } from "react-router-dom";
import { createRoot } from "react-dom/client";
import { QueryClientProvider, QueryClient } from "react-query";
import { ReactQueryDevtools } from 'react-query/devtools'

import { AuthContextProvider } from './contexts/authContext';
import ProtectedRoutes from './components/ProtectedRoutes';
import AddMovieReviewPage from './pages/addMovieReviewPage'
import MoviesContextProvider from "./contexts/moviesContext";
import SiteHeader from './components/siteHeader'
import MovieReviewPage from "./pages/movieReviewPage";
import HomePage from "./pages/homePage";
import MoviePage from "./pages/movieDetailsPage";
import FavouriteMoviesPage from "./pages/favouriteMoviesPage";
import UpcomingMoviesPage from "./pages/upcomingMoviesPage";
import SignInPage from './pages/SignInPage';
import SignUpPage from './pages/SignUpPage';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 360000,
      refetchInterval: 360000, 
      refetchOnWindowFocus: false
    },
  },
});

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthContextProvider>
        <BrowserRouter>
          <SiteHeader />
          <MoviesContextProvider>
            <Routes>
              <Route path="/movies/upcoming" element={<UpcomingMoviesPage />} />
              <Route path="/movies/:id" element={<MoviePage />} />
              <Route path="/reviews/:id" element={<MovieReviewPage />} />
              <Route path="/" element={<HomePage />} />
              <Route path="*" element={<Navigate to="/" />} />
              <Route path="/signin" element={<SignInPage />} />
              <Route path="/signup" element={<SignUpPage />} />
              <Route path="/*" element={<ProtectedRoutes />}>
                <Route path="reviews/form" element={<AddMovieReviewPage/>} />
                <Route path="movies/favourites" element={<FavouriteMoviesPage />} />
              </Route>
            </Routes>
          </MoviesContextProvider>
        </BrowserRouter>
        <ReactQueryDevtools initialIsOpen={false} />
      </AuthContextProvider>
    </QueryClientProvider>
  );
};

const rootElement = createRoot(document.getElementById("root"));
rootElement.render(<App />);
