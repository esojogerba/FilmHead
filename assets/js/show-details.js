"use strict";

// Imports
import { API_KEY, imageBaseURL, fetchDataFromAPI } from "./api.js";
import { createMediaCard } from "./media-card.js";

// Retrieves the saved showId of the show selected from local storage.
const showId = window.localStorage.getItem("showId");

console.log(showId);
