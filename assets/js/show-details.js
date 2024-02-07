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

// Returns the show's cast list separated by a ','.
// Ten cast members is the max length of the list.
const getCast = function (castList) {
    const newCastList = [];

    // Pushes cast names into newCastList.
    // A maximum of 10 names can be pushed.
    for (let i = 0, len = castList.length; i < len && i < 10; i++) {
        const { name } = castList[i];
        newCastList.push(name);
    }

    return newCastList.join(", ");
};

// Returns the movie's directors separated by a ','.
const getCreators = function (creators) {
    const creatorList = [];

    // Pushes creator names into creatorList.
    // A maximum of 10 names can be pushed.
    for (let i = 0, len = creators.length; i < len && i < 10; i++) {
        const { name } = creators[i];
        creatorList.push(name);
    }

    return creatorList.join(", ");
};

// Filter videos
const filterVideos = function (videoList) {
    // Returns all of the teasers and trailers from videoList that are hosted on YouTube as an array.
    return videoList.filter(
        ({ type, site }) =>
            (type === "Trailer" || type === "Teaser") && site === "YouTube"
    );
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
                            ${getCast(cast)}
                        </p>
                    </div>

                    <div class="details-director">
                        <p class="director-title">Directed By</p>

                        <p class="director-body">
                            ${getCreators(created_by)}
                        </p>
                    </div>
                </div>
            </div>
        `;

        // Pushes the completed details section into the page.
        pageContent.appendChild(detailsBanner);

        // Create trailers & clips <section>
        const clips = document.createElement("section");
        clips.classList.add("media-scroll", "container");

        clips.innerHTML = `
            <div class="media-scroll-title-wrapper">
                <h3 class="media-scroll-title">Trailers & Clips</h3>
            </div>

            <div class="media-slider-list">
                <div class="slider-list-inner">
                </div>
            </div>
         `;

        const clipsSliderInner = clips.querySelector(".slider-list-inner");

        // Creates videos section of the details page.
        for (const { key, name } of filterVideos(videos)) {
            // Creates video-card <div>.
            const videoCard = document.createElement("div");
            videoCard.classList.add("video-card");

            // Sets video-card <div> HTML.
            // Uses template literals to inject video data retrieved from API into the HTML.
            videoCard.innerHTML = `
                <iframe width="500"  height="294" 
                src="https://www.youtube.com/embed/${key}?theme=dark&color=white&rel=0" 
                frameborder="0" allowfullscreen="1" title="${name}" class="img-cover" 
                loading="lazy"></iframe>
            `;

            // Adds the completed video card into slider-inner.
            clipsSliderInner.appendChild(videoCard);
        }

        // Pushes the completed clips & trailers section into the page.
        pageContent.appendChild(clips);
    }
);
