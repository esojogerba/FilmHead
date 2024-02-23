"use strict";

// Imports
import { API_KEY, imageBaseURL, fetchDataFromAPI } from "./api.js";
import { createMediaCard } from "./media-card.js";

// Exports search functionality.
export function search() {
    // Retrieve the search fields.
    const searchFields = Array.prototype.slice.call(
        document.getElementsByClassName("search-field")
    );

    // Create the search-modal <div>
    const searchModal = document.createElement("div");
    searchModal.classList.add("search-modal");
    document.querySelector("main").appendChild(searchModal);

    // Timeout variable for loading data.
    let searchTimeout;

    // Start searching for media when there is an input in the search field.
    // Refreshes search every time a new character is added to input value.
    searchFields.forEach((element) => {
        element.addEventListener("input", function () {
            // If search field is empty, remove active class.
            if (!element.value.trim()) {
                searchModal.classList.remove("active");
                clearTimeout(searchTimeout);
                return;
            }

            // Reset timeout.
            clearTimeout(searchTimeout);

            // Set timeout to the time it takes to retrieve the results of the current search field input.
            searchTimeout = setTimeout(() => {
                // Search data from API that corresponds to search field input.
                fetchDataFromAPI(
                    `https://api.themoviedb.org/3/search/multi?api_key=${API_KEY}&query=${element.value}&include_adult=false&language=en-US&page=1`,
                    function ({ results: mediaList }) {
                        // When a search is initiated, add active class.
                        searchModal.classList.add("active");

                        // Sets search-modal <div> HTML.
                        // Uses template literals to inject current input value into the HTML.
                        searchModal.innerHTML = `
                            <section class="media-grid container">
                                <div class="grid-header">
                                    <svg class="material-icon" id="grid-search-svg">
                                        <use
                                            xlink:href="/assets/images/icons.svg#search-icon"
                                        />
                                    </svg>
                                    <h1 class="grid-title">${element.value}</h1>
                                </div>
            
                                <div class="grid-list">
                                </div>
                            </section>
                        `;

                        // Creates a media-card for each item in mediaList.
                        for (const item of mediaList) {
                            // Only creates media cards for movies and tv shows.
                            if (
                                item.media_type == "movie" ||
                                item.media_type == "tv"
                            ) {
                                // Imported from media_card.js.
                                const mediaCard = createMediaCard(
                                    `grid-${item.media_type}`,
                                    item
                                );
                                // Adds the newly created media-card into grid-list <div>.
                                searchModal
                                    .querySelector(".grid-list")
                                    .appendChild(mediaCard);
                            }
                        }
                    }
                );
            }, 500);
        });
    });
}
