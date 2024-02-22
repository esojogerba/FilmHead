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

    console.log(searchFields);

    // Create the search-modal <div>
    const searchModal = document.createElement("div");
    searchModal.classList.add("search-modal");
    document.querySelector("main").appendChild(searchModal);
}
