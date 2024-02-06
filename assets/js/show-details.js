"use strict";

// Imports
import { API_KEY, imageBaseURL, fetchDataFromAPI } from "./api.js";
import { createMediaCard } from "./media-card.js";

// Retrieves the saved showId of the show selected from local storage.
const showId = window.localStorage.getItem("showId");

console.log(showId);

// Retrieves the page's content.
const pageContent = document.querySelector("[page-content]");

// Returns the movie's genres separated by a '·'.
const getGenres = function (genreList) {
    const newGenreList = [];

    // Pushes the names of the movie's genres into newGenreList.
    for (const { name } of genreList) newGenreList.push(name);

    return newGenreList.join(" · ");
};

// Retrieves show details using the provided showId.
fetchDataFromAPI(
    `https://api.themoviedb.org/3/tv/${showId}?api_key=${API_KEY}&append_to_response=credits,videos,images,content_ratings`,
    function (show) {
        // Stores data for current show into show.
        const {
            backdrop_path,
            poster_path,
            name,
            number_of_episodes,
            number_of_seasons,
            first_air_date,
            content_ratings: {
                results: [{ rating }],
            },
            vote_average,
            genres,
            overview,
            credits: { cast },
            created_by,
            videos: { results: videos },
        } = show;

        // Sets document title to show title.
        document.title = `${name} - FilmHead`;

        // Create details-banner <section>
        const detailsBanner = document.createElement("section");
        detailsBanner.classList.add("banner", "details-banner");

        // Sets details-banner <section> HTML.
        // Uses template literals to inject show data retrieved from API into the HTML.
        // TODO : Add link to Add To Folder button.
        detailsBanner.innerHTML = `
            <div class="backdrop-image" style="background-image: linear-gradient(var(--details-overlay)), url('${imageBaseURL}w1280${backdrop_path}');"></div>

            <div class="banner-columns">
                <div class="banner-left-column">
                    <figure class="poster-box details-poster">
                        <img
                            src="${imageBaseURL}w342${poster_path}"
                            alt="${name}"
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
                        ${name}
                    </h2>

                    <div class="details-meta">
                        <div class="meta-list">
                            <div class="meta-item">${
                                first_air_date.split("-")[0]
                            }</div>

                            <div class="meta-item card-badge">${rating}</div>

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

                        <div class="meta-list">
                            <div class="meta-item">${number_of_seasons} Season(s)</div>

                            <div class="meta-item">${number_of_episodes} Episodes</div>
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
                            cast
                        </p>
                    </div>

                    <div class="details-director">
                        <p class="director-title">Directed By</p>

                        <p class="director-body">
                            director
                        </p>
                    </div>
                </div>
            </div>
        `;

        // Pushes the completed details section into the page.
        pageContent.appendChild(detailsBanner);
    }
);
