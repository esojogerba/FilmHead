"use strict";

// Imports
import { API_KEY, imageBaseURL, fetchDataFromAPI } from "./api.js";
import { createMediaCard } from "./media-card.js";

// Retrieves page-content <article> from movies page.
const pageContent = document.querySelector("[page-content]");

// Fetch all genres. Example: [ { "id": "123", "name": "Action" } ]
// Then change genre format to {123: "Action"}
const genreList = {
    // Assign correct genre string to each genre_id provided. Example: [23 , 43] = "Action, Romance".
    asString(genreIdList) {
        // Will hold list of genre strings.
        let newGenreList = [];

        for (const genreId of genreIdList) {
            // If current genreId exists in genreList, push it to newGenreList.
            // this == genreList
            this[genreId] && newGenreList.push(this[genreId]);
        }
        return newGenreList.join(" · ");
    },
};

// Retrieves all genres from API.
fetchDataFromAPI(
    `https://api.themoviedb.org/3/genre/tv/list?api_key=${API_KEY}`,

    function ({ genres }) {
        for (const { id, name } of genres) {
            genreList[id] = name;
        }

        // Retrieves popular movie data and passes it in JSON format to heroBanner().
        fetchDataFromAPI(
            `https://api.themoviedb.org/3/tv/popular?api_key=${API_KEY}&page=1`,
            heroBanner
        );
    }
);

// Builds the hero banner.
// Uses data retrieved from fetchDataFromServer() as a parameter.
const heroBanner = function ({ results: getShowList }) {
    // Creates banner <section>.
    const banner = document.createElement("section");
    banner.classList.add("banner");
    banner.ariaLabel = "Popular Shows";

    // Sets up inner banner HTML boilerplate.
    banner.innerHTML = `
        <div class="banner-slider-row"></div>

        <div class="banner-control-row">

            <div class="banner-control-inner"></div>
            
        </div>
    `;

    // Holds index of the current banner item.
    let controlItemIndex = 0;

    // Iterates through each entry in getShowList map.
    for (const [index, show] of getShowList.entries()) {
        // Stores data for the current show into show.
        const {
            backdrop_path,
            name,
            first_air_date,
            genre_ids,
            overview,
            poster_path,
            vote_average,
            id,
        } = show;

        // Creates a new slider item <div>.
        const sliderItem = document.createElement("div");
        sliderItem.classList.add("banner-slider-item");
        sliderItem.setAttribute("banner-slider-item", "");
    }
};
