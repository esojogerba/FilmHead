"use strict";

// Imports
import { API_KEY, imageBaseURL, fetchDataFromAPI } from "./api.js";

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
        return newGenreList.join("· ");
    },
};

// Retrieves all genres from API.
fetchDataFromAPI(
    `https://api.themoviedb.org/3/genre/movie/list?api_key=${API_KEY}`,

    function ({ genres }) {
        for (const { id, name } of genres) {
            genreList[id] = name;
        }

        // Retrieves popular movie data and passes it in JSON format to heroBanner().
        fetchDataFromAPI(
            `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&page=1`,
            heroBanner
        );
    }
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

    // Holds index of the current banner item.
    let controlItemIndex = 0;

    // Iterates through each entry in the getMovieList map.
    for (const [index, movie] of getMovieList.entries()) {
        // TODO : For each movie in movie list make call to get movie details (runtime, rating).

        // Stores data for the current movie into movie.
        const {
            backdrop_path,
            title,
            release_date,
            genre_ids,
            overview,
            poster_path,
            vote_average,
            id,
        } = movie;

        // Creates a new slider item <div>.
        const sliderItem = document.createElement("div");
        sliderItem.classList.add("banner-slider-item");
        // TODO : remove this once slider control is implemented
        sliderItem.classList.add("active");
        sliderItem.setAttribute("banner-slider-item", "");

        // Sets inner HTML for sliderItem.
        // Uses template literals to inject movie data retrieved from API into the HTML.
        // TODO : add rating and runtime info
        // TODO : button add getMediaDetails link
        // TODO : button add "Add To Folder" link
        sliderItem.innerHTML = `

            <img src="${imageBaseURL}w1280${backdrop_path}"
            alt="${title}" class="img-cover" title="${title}"
            loading="${index === 0 ? "eager" : "lazy"}"/>

            <div class="banner-content">
                <h2 class="banner-heading">${title}</h2>

                <p class="banner-text">${overview}</p>

                <div class="meta-list">
                    <div class="meta-item">${release_date.split("-")[0]}</div>
                    <div class="meta-item">1hr 58min</div>
                    <div class="meta-item card-badge">R</div>
                </div>

                <p class="banner-genre">
                    ${genreList.asString(genre_ids)}
                </p>

                <div class="banner-buttons">
                    <a
                        class="btn"
                        href="movie-details.html"
                        onclick=""
                    >
                        Details
                    </a>

                    <a
                        class="btn-icon"
                        href=""
                        onclick=""
                        id="banner-add-btn"
                    >
                        <svg class="material-icon" id="add-svg">
                            <use
                                xlink:href="/assets/images/icons.svg#add-icon"
                            />
                        </svg>
                    </a>
                </div>
            </div>

        `;

        // Adds the new sliderItem into .banner-slider-row.
        banner.querySelector(".banner-slider-row").appendChild(sliderItem);

        // Creates a new banner control item.
        const controlItem = document.createElement("button");
        controlItem.classList.add("poster-box", "banner-control-item");
        controlItem.setAttribute("banner-control-item", `${controlItemIndex}`);

        // Increments index for next banner control item.
        controlItemIndex++;

        // Sets banner control item's HTML.
        // Uses template literals to inject movie data retrieved from API into the HTML.
        controlItem.innerHTML = `
        <img src="${imageBaseURL}w154${poster_path}" alt="${title}" 
        loading="lazy" draggable="false" class="img-cover">
        `;

        // Appends new banner control item into banner-control-inner.
        banner.querySelector(".banner-control-inner").appendChild(controlItem);
    }

    // Adds banner into pageContent.
    pageContent.appendChild(banner);

    // Adds banner slide functionality.
    addBannerSlide();
};
