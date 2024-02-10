"use strict";

// Imports
import { API_KEY, imageBaseURL, fetchDataFromAPI } from "./api.js";
import { createMediaCard } from "./media-card.js";

// Retrieve genre name of movie list from local storage.
const genreName = window.localStorage.getItem("genreName");
// Retrieve url parameter from local storage.
const urlParam = window.localStorage.getItem("urlParam");
// Retrieve media type from local storage.
const mediaType = window.localStorage.getItem("mediaType");

// Retrieves the page's content.
const pageContent = document.querySelector("[page-content]");

// Variables for movie list page.
let currentPage = 1;
let totalPages = 0;

// URL
let fetchURL = `https://api.themoviedb.org/3/discover/${mediaType}?api_key=${API_KEY}&sort_by=popularity.desc&include_adult=false&page=${currentPage}&${urlParam}`;

// Creates a media grid for the genre selected from the dropdown.
fetchDataFromAPI(fetchURL, function ({ results: mediaList, total_pages }) {
    // Set total pages.
    totalPages = total_pages;

    // Set title of document to the type of media list being loaded.
    if (mediaType == "movie") {
        document.title = `${genreName} Movies - FilmHead`;
    } else {
        document.title = `${genreName} Shows - FilmHead`;
    }

    // Creates media-grid <section>.
    const mediaGridElem = document.createElement("section");
    mediaGridElem.classList.add("media-grid", "container");
    if (mediaType == "movie") {
        mediaGridElem.ariaLabel = `${genreName} Movies`;
    } else {
        mediaGridElem.ariaLabel = `${genreName} Shows`;
    }

    // Set media-grid <section> HTML.
    mediaGridElem.innerHTML = `
        <div class="grid-header">
            <svg class="material-icon" id="grid-search-svg">
                <use
                    xlink:href="/assets/images/icons.svg#search-icon"
                />
            </svg>

            <h1 class="grid-title">Science Fiction Movies</h1>
        </div>

        <div class="grid-list">
        </div>

        <button class="btn load-more">Load More</button>
    `;
});
