"use strict";

// Import API key.
import { key } from "./key.js";

// Constant variables.
const API_KEY = key;
const imageBaseURL = "http://image.tmdb.org/t/p/";

// Fetches data from API using a url.
// Passes the results in JSON format into a callback function,
// along with an optional parameter if applicable.
const fetchDataFromAPI = function (
    url,
    callback,
    optionalParam1,
    optionalParam2
) {
    // Fetch data from URL.
    fetch(url)
        // Format results into JSON format.
        .then((response) => response.json())
        // Callback function provided as parameter is called.
        .then((data) => callback(data, optionalParam1, optionalParam2));
};

// Export functionalities and constant variables.
export { imageBaseURL, API_KEY, fetchDataFromAPI };
