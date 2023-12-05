"use strict";

// Imports
import { API_KEY, imageBaseURL, fetchDataFromAPI } from "./api.js";

// Retrieves page-content <article> from movies page.
const pageContent = document.querySelector("[page-content]");

// Retrieves popular movie data and passes it in JSON format to heroBanner().
fetchDataFromServer(
    `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&page=1`,
    heroBanner
);

// Builds the hero banner.
// Uses data retrieved from fetchDataFromAPI() as a parameter.
const heroBanner = function ({ results: getMovieList }) {
    // Creates banner <section>.
    const banner = document.createElement("section");
    banner.classList.add("banner");
    banner.ariaLabel = "Popular Movies";

    // Sets up inner banner HTML boilerplate.
    banner.innerHTML = `
        <div class="banner-slider-row"></div>

        <div class="banner-control-row">

            <div class="banner-control-inner"></div>
            
        </div>
    `;
};
