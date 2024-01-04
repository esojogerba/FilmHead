"use strict";

// Imports
import { API_KEY, imageBaseURL, fetchDataFromAPI } from "./api.js";
import { createMediaCard } from "./media-card.js";

// Retrieves page-content <article> from movies page.
const pageContent = document.querySelector("[page-content]");
