// Adds event on multiple elements.
const addEventOnElements = function (elements, eventType, callback) {
    for (const elem of elements) elem.addEventListener(eventType, callback);
};

// Toggle dropdown menu when button is clicked.
function toggleDropdown() {
    document.querySelector(".dropdown-menu").classList.toggle("show-dropdown");
}

// Closes dropdown menu when user clicks outside of it.
window.onclick = function (event) {
    if (!event.target.matches(".dropdown-btn")) {
        var dropdowns = document.getElementsByClassName("dropdown-menu");
        var i;
        for (i = 0; i < dropdowns.length; i++) {
            var openDropdown = dropdowns[i];
            if (openDropdown.classList.contains("show-dropdown")) {
                openDropdown.classList.remove("show-dropdown");
            }
        }
    }
};

// Stores the movieId of the movie that was clicked in local storage for later use.
const getMovieDetails = function (movieId) {
    window.localStorage.setItem("movieId", String(movieId));
};

// Stores the showId of the show that was clicked in local storage for later use.
const getShowDetails = function (showId) {
    window.localStorage.setItem("showId", String(showId));
};

// Stores the genre selected from the dropdown into local storage for later use.
const getMediaGrid = function (linkType, urlParam, genreName, mediaType) {
    window.localStorage.setItem("linkType", linkType);
    window.localStorage.setItem("urlParam", urlParam);
    window.localStorage.setItem("genreName", genreName);
    window.localStorage.setItem("mediaType", mediaType);
};

// Opens a pop up.
const openPopUp = function (name) {
    document.querySelector(".pop-up-overlay").classList.add("active");
    document.querySelector(`${name}`).classList.add("active");
};

// Closes a pop up.
const closePopUp = function (name) {
    document.querySelector(".pop-up-overlay").classList.remove("active");
    document.querySelector(`${name}`).classList.remove("active");
};

// Open filter drop down section.
const filterDropdown = function (name) {
    var dropdown;
    // Toggle active on the appropriate dropdown.
    if (name == "sort-by") {
        dropdown = document.querySelector(".sort-by-dropdown");
        dropdown.classList.toggle("active");
    } else if (name == "filter-by") {
        dropdown = document.querySelector(".filter-by-dropdown");
        dropdown.classList.toggle("active");
    } else if (name == "filter-movie-genres") {
        dropdown = document.querySelector(".movie-genres-scroll");
        dropdown.classList.toggle("active");
    } else if (name == "filter-show-genres") {
        dropdown = document.querySelector(".show-genres-scroll");
        dropdown.classList.toggle("active");
    } else if (name == "filter-streaming") {
        dropdown = document.querySelector(".streaming-scroll");
        dropdown.classList.toggle("active");
    }
};
