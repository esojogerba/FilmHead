"use strict";

// Imports
import { API_KEY, imageBaseURL, fetchDataFromAPI } from "./api.js";
import { createMediaCard } from "./media-card.js";

// Exports search functionality.
export function search() {
    // Retrieve the search field.
    const searchField = Array.prototype.slice.call(
        document.getElementsByClassName("search-field")
    );

    console.log(searchField);
}
