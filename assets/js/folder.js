"use strict";

// Imports
import { API_KEY, imageBaseURL, fetchDataFromAPI } from "./api.js";

const movieGenres = function ({ genres }) {
    // Retrieve movie scroll inside filter pop up from doc
    const movieScroll = document.querySelector(".movie-genres-scroll");

    // Holds all movie genres and their ID's.
    const movieGenresList = {};

    // Iterates through each movie genre in the JSON file.
    for (const { id, name } of genres) {
        // Make a key value pair
        movieGenresList[id] = name;
    }

    // Iterates through each entry in genreList.
    for (const [genreId, genreName] of Object.entries(movieGenresList)) {
        // Create scroll item
        const scrollItem = document.createElement("div");
        scrollItem.classList.add("filter-by-scroll-item");
        // Set scroll item inner HTML.
        scrollItem.innerHTML = `
            <a class="add-to-folder-scroll-btn" href=""></a>
            <span>${genreName}</span>
        `;
        // Add new scroll item to movieScroll
        movieScroll.appendChild(scrollItem);
    }

    // API call to get show genres
    //  API call to get movie genres
    fetchDataFromAPI(
        `https://api.themoviedb.org/3/genre/tv/list?api_key=${API_KEY}`,
        showGenres
    );
};

//  API call to get movie genres
fetchDataFromAPI(
    `https://api.themoviedb.org/3/genre/movie/list?api_key=${API_KEY}`,
    movieGenres
);

// Edit inner HTML of movie genre dropdown

// Create a scroll item for each genre

// API call to get watch providers
// If not available, manually input them.
