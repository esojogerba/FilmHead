"use strict";

// Imports
import { API_KEY, imageBaseURL, fetchDataFromAPI } from "./api.js";

//  API call to get movie genres
fetchDataFromAPI(
    `https://api.themoviedb.org/3/genre/movie/list?api_key=${API_KEY}`,
    movieGenres
);

const movieGenres = function ({ genres }) {
    // Retrieve movie scroll inside filter pop up from doc
    const movieScroll = document.querySelector(".movie-genres-scroll");

    // API call to get show genres
};

// Edit inner HTML of movie genre dropdown

// Create a scroll item for each genre

// API call to get watch providers
// If not available, manually input them.
