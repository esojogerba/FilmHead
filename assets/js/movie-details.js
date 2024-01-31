"use strict";

// Imports
import { API_KEY, imageBaseURL, fetchDataFromAPI } from "./api.js";
import { createMediaCard } from "./media-card.js";

// Retrieves the saved movieId of the movie selected from local storage.
const movieId = window.localStorage.getItem("movieId");

console.log(movieId);

// Retrieves the page's content.
const pageContent = document.querySelector("[page-content]");

// Retrieves movie details using the provided movieId.
fetchDataFromAPI(
    `https://api.themoviedb.org/3/movie/${movieId}?api_key=${API_KEY}&append_to_response=casts,videos,images,releases`,
    function (movie) {
        // Stores data for current movie into movie.
        const {
            backdrop_path,
            poster_path,
            title,
            release_date,
            runtime,
            vote_average,
            releases: {
                countries: [{ certification }],
            },
            genres,
            overview,
            casts: { cast, crew },
            videos: { results: videos },
        } = movie;
    }
);
