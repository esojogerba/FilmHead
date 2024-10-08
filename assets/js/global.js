// Adds event on multiple elements.
const addEventOnElements = function (elements, eventType, callback) {
    for (const elem of elements) elem.addEventListener(eventType, callback);
};

// Transitions
window.onload = () => {
    const transitionElement = document.querySelector(".transition");
    const anchors = document.querySelectorAll("a");

    setTimeout(() => {
        transitionElement.classList.remove("is-active");
    }, 250);

    // for (let i = 0; i < anchors.length; i++) {
    //     const anchor = anchors[i];

    //     anchor.addEventListener("click", (e) => {
    //         e.preventDefault();

    //         let target = e.target.href;

    //         transitionElement.classList.add("is-active");

    //         setTimeout(() => {
    //             window.location.href = target;
    //         }, 250);
    //     });
    // }
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

// If user opens media details links in a new tab, media id is stored.
const params = new URLSearchParams(window.location.search);
const movieId = params.get("movieId");
const showId = params.get("showId");

if (movieId) {
    window.localStorage.setItem("movieId", movieId);
}

if (showId) {
    window.localStorage.setItem("showId", showId);
}

// Stores the genre or list to create a media grid.
const getMediaGrid = function (linkType, urlParam, pageName, mediaType) {
    window.localStorage.setItem("linkType", linkType);
    window.localStorage.setItem("urlParam", urlParam);
    window.localStorage.setItem("pageName", pageName);
    window.localStorage.setItem("mediaType", mediaType);
};

// If user opens media grid links in a new tab, media details are stored.
const linkType = params.get("linkType");
const urlParam = params.get("urlParam");
const pageName = params.get("pageName");
const mediaType = params.get("mediaType");

if (linkType) {
    window.localStorage.setItem("linkType", linkType);
}
if (urlParam) {
    window.localStorage.setItem("urlParam", urlParam);
}
if (pageName) {
    window.localStorage.setItem("pageName", pageName);
}
if (mediaType) {
    window.localStorage.setItem("mediaType", mediaType);
}

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
