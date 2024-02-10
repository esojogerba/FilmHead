"use strict";

// Imports
import { API_KEY, imageBaseURL, fetchDataFromAPI } from "./api.js";
import { createMediaCard } from "./media-card.js";

// Retrieve genre name of movie list from local storage.
const genreName = window.localStorage.getItem("genreName");
// Retrieve url parameter from local storage.
const urlParam = window.localStorage.getItem("urlParam");
