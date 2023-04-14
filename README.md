# Enterprise Web Development - Assignment 1.

__Name:__ Ikechukwu Festus-Ihedioha

## Overview.
+ Upcoming Movies
+ Recommended Movies
+ Playlist
+ Carousel in Movie details page
+ Sign in page

## Feature Design.

#### Recommended movies feature

> Shows a list of recommended movies based on the movie in view. The list is rendered below the current movie details

![][image1]

#### Playlist

> Allows a user to save movies to a personal playlist, and the playlist page displays movies that the user has added in the past.

![][image2]

#### Carousel in movie details page

> Organizes the movie images into a carousel to prevent overflow. There are back/forward buttons to navigate the images

![][image3]

## Authentication.

+ /movies - List of 20  movies from the Discover endpoint.
+ /movies/{movie_id} - Detailed information on a specific movie.
+ /reviews/{review_id} - The full text of a movie review.
+ /reviews/form - Form to add review to a movie.
+ /movie/{movie_id}/recommended - A list of recommended movies based on a given movie. 
+ /movies/playlist - (Protected) A list of movies that the user wants to see later.
+ /movies/favourites - (Protected) A list of movies that the user loves.
+ /signin - Login page
+ /signup - Signup page

#### Protected features

The favourite and playlist features are disabled for unauthenticated users, and accessing the respective pages redirects to the login page. 

#### Supabase
> Users table. Used for authentication
![][image4]


## Deployment

> Vercel Project. URL: (https://lab-movies-app-two.vercel.app/)
![][image5]


email: test1@example.com ; Password: pass1

## Persistence (if relevant).

> Favourites and playlist tables in supabase. They have been setup with RLS policies to only allow a user to access their own data.
![][image6]

[image1]: ./images/image1.png
[image2]: ./images/image2.png
[image3]: ./images/image3.png
[image4]: ./images/image4.png
[image5]: ./images/image5.png
[image6]: ./images/image6.png