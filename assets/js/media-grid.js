"use strict";

// Imports
import { API_KEY, imageBaseURL, fetchDataFromAPI } from "./api.js";
import { createMediaCard } from "./media-card.js";

// Retrieve the link type from local storage.
const linkType = window.localStorage.getItem("linkType");
// Retrieve page name from local storage.
const pageName = window.localStorage.getItem("pageName");
// Retrieve url parameter from local storage.
const urlParam = window.localStorage.getItem("urlParam");
// Retrieve media type from local storage.
const mediaType = window.localStorage.getItem("mediaType");
// URL
let fetchURL;

// Variables for movie list page.
let currentPage = 1;
let totalPages = 0;

// Set URL
if (linkType == "genre") {
    // Set genre URL
    fetchURL = `https://api.themoviedb.org/3/discover/${mediaType}?api_key=${API_KEY}&sort_by=popularity.desc&include_adult=false&page=${currentPage}&${urlParam}`;
} else if (linkType == "list") {
    // Set list URL
    fetchURL = `https://api.themoviedb.org/3${urlParam}?api_key=${API_KEY}&page=${currentPage}`;
}

// Retrieves the page's content.
const pageContent = document.querySelector("[page-content]");

// Creates a media grid for the genre selected from the dropdown.
fetchDataFromAPI(fetchURL, function ({ results: mediaList, total_pages }) {
    // Set total pages.
    totalPages = total_pages;

    // Set title of document to the type of media list being loaded.
    if (mediaType == "movie") {
        document.title = `${pageName} Movies - FilmHead`;
    } else {
        document.title = `${pageName} Shows - FilmHead`;
    }

    // Stores header for the page.
    let pageHeader = ``;

    // Creates media-grid <section>.
    const mediaGridElem = document.createElement("section");
    mediaGridElem.classList.add("media-grid", "container");

    if (mediaType == "movie") {
        mediaGridElem.ariaLabel = `${pageName} Movies`;
        pageHeader = `${pageName} ·  Movies`;
    } else {
        mediaGridElem.ariaLabel = `${pageName} Shows`;
        pageHeader = `${pageName} ·  Shows`;
    }

    // Set media-grid <section> HTML.
    mediaGridElem.innerHTML = `
        <div class="grid-header">
            <svg class="material-icon" id="grid-search-svg">
                <use
                    xlink:href="/assets/images/icons.svg#search-icon"
                />
            </svg>

            <h1 class="grid-title">${pageHeader}</h1>
        </div>

        <div class="grid-list">
        </div>

        <button class="btn load-more" load-more>Load More</button>
    `;

    // Creates a media-card for each item in mediaList.
    for (const item of mediaList) {
        // Imported from media_card.js.
        const mediaCard = createMediaCard(`grid-${mediaType}`, item);
        // Adds the newly created media-card into grid-list <div>.
        mediaGridElem.querySelector(".grid-list").appendChild(mediaCard);
    }

    // Adds media-grid to the page.
    pageContent.appendChild(mediaGridElem);

    // Load more button functionality.
    // this == load-more-btn.
    document
        .querySelector("[load-more]")
        .addEventListener("click", function () {
            // If there are no more pages, remove Load More button.
            if (currentPage >= totalPages) {
                this.style.display = "none";
                return;
            }

            // Increment currentPage to signify next page.
            currentPage++;

            // Update the URL
            if (linkType == "genre") {
                fetchURL = `https://api.themoviedb.org/3/discover/${mediaType}?api_key=${API_KEY}&sort_by=popularity.desc&include_adult=false&page=${currentPage}&${urlParam}`;
            } else if (linkType == "list") {
                fetchURL = `https://api.themoviedb.org/3${urlParam}?api_key=${API_KEY}&page=${currentPage}`;
            }

            // Retrieve the data for the next page of the media list.
            fetchDataFromAPI(fetchURL, ({ results: mediaList }) => {
                // Creates a media-card for each item in mediaList.
                for (const item of mediaList) {
                    // Imported from media_card.js.
                    const mediaCard = createMediaCard(
                        `grid-${mediaType}`,
                        item
                    );
                    // Adds the newly created media-card into grid-list <div>.
                    mediaGridElem
                        .querySelector(".grid-list")
                        .appendChild(mediaCard);
                }
            });

            // Remove :focus from load-more btn
            this.blur();
        });
});
