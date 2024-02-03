"use strict";

// Imports
import { API_KEY, imageBaseURL, fetchDataFromAPI } from "./api.js";
import { createMediaCard } from "./media-card.js";

// Retrieves the saved movieId of the movie selected from local storage.
const movieId = window.localStorage.getItem("movieId");

console.log(movieId);

// Retrieves the page's content.
const pageContent = document.querySelector("[page-content]");

// Calculates hours in runtime.
const calcRuntimeHours = function (runtime) {
    const hours = Math.floor(parseInt(runtime) / 60);

    if (hours == 0) {
        return "";
    } else {
        return hours.toString() + "h";
    }
};

// Calculates remaining minutes in runtime.
const calcRuntimeMinutes = function (runtime) {
    const minutes = parseInt(runtime) % 60;

    return " " + minutes.toString() + "m";
};

// Returns the movie's genres separated by a '·'.
const getGenres = function (genreList) {
    const newGenreList = [];

    // Pushes the names of the movie's genres into newGenreList.
    for (const { name } of genreList) newGenreList.push(name);

    return newGenreList.join(" · ");
};

// Returns the movie's cast list separated by a ','.
// Ten cast members is the max length of the list.
const getCasts = function (castList) {
    const newCastList = [];

    // Pushes cast names into newCastList.
    // A maximum of 10 names can be pushed.
    for (let i = 0, len = castList.length; i < len && i < 10; i++) {
        const { name } = castList[i];
        newCastList.push(name);
    }

    return newCastList.join(", ");
};

const getDirectors = function (crewList) {
    //  Gets the directors from the crewList
    const directors = crewList.filter(({ job }) => job === "Director");

    const directorList = [];

    // Pushes all the names of the directors into directorList.
    for (const { name } of directors) directorList.push(name);

    return directorList.join(", ");
};

// Retrieves movie details using the provided movieId.
fetchDataFromAPI(
    `https://api.themoviedb.org/3/movie/${movieId}?api_key=${API_KEY}&append_to_response=casts,videos,images,releases`,
    function (movie) {
        // Stores data for current movie into movie.
        const {
            backdrop_path,
            poster_path,
            title,
            release_date,
            runtime,
            vote_average,
            releases: {
                countries: [{ certification }],
            },
            genres,
            overview,
            casts: { cast, crew },
            videos: { results: videos },
        } = movie;

        // Sets document title to movie title.
        document.title = `${title} - FilmHead`;

        // Create details-banner <section>
        const detailsBanner = document.createElement("section");
        detailsBanner.classList.add("banner", "details-banner");

        // Sets details-banner <section> HTML.
        // Uses template literals to inject movie data retrieved from API into the HTML.
        // TODO : Add link to Add To Folder button.
        // TODO : Directors
        detailsBanner.innerHTML = `
            <div class="backdrop-image" style="background-image: url('${imageBaseURL}w1280${backdrop_path}');"></div>

            <div class="banner-columns">
                <div class="banner-left-column">
                    <figure class="poster-box details-poster">
                        <img
                            src="${imageBaseURL}w342${poster_path}"
                            alt="${title}"
                            class="img-cover"
                        />
                    </figure>

                    <a
                        class="btn btn-text-icon"
                        href=""
                        onclick=""
                    >
                        <span>Add to Folder</span>

                        <svg class="material-icon" id="details-add-svg">
                            <use
                                xlink:href="/assets/images/icons.svg#add-icon"
                            />
                        </svg>
                    </a>
                </div>

                <div class="banner-right-column">
                    <h2 class="banner-heading details-heading">
                        ${title}
                    </h2>

                    <div class="details-meta">
                        <div class="meta-list">
                            <div class="meta-item">${
                                release_date.split("-")[0]
                            }</div>

                            <div class="meta-item">
                                ${calcRuntimeHours(runtime)}
                                ${calcRuntimeMinutes(runtime)}
                            </div>

                            <div class="meta-item card-badge">${certification}</div>

                            <div class="meta-item">
                                <img
                                    src="/assets/images/star-icon.svg"
                                    width="20"
                                    height="20"
                                    alt="Rating"
                                />

                                <span>${vote_average.toFixed(1)}</span>
                            </div>
                        </div>

                        <p class="details-genre">
                            ${getGenres(genres)}
                        </p>
                    </div>

                    <p class="details-text">
                        ${overview}
                    </p>

                    <div class="details-cast">
                        <p class="cast-title">Starring</p>

                        <p class="cast-body">
                            ${getCasts(cast)}
                        </p>
                    </div>

                    <div class="details-director">
                        <p class="director-title">Directed By</p>

                        <p class="director-body">
                            ${getDirectors(crew)}
                        </p>
                    </div>
                </div>
            </div>
        `;

        // Pushes the completed details section into the page.
        pageContent.appendChild(detailsBanner);
    }
);
