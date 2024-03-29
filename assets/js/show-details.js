"use strict";

// Imports
import { API_KEY, imageBaseURL, fetchDataFromAPI } from "./api.js";
import { createMediaCard } from "./media-card.js";

// Retrieves the saved showId of the show selected from local storage.
const showId = window.localStorage.getItem("showId");

console.log(showId);

// Retrieves the page's content.
const pageContent = document.querySelector("[page-content]");

// Fetch all genres. Example: [ { "id": "123", "name": "Action" } ]
// Then change genre format to {123: "Action"}
const genreList = {
    // Assign correct genre string to each genre_id provided. Example: [23 , 43] = "Action, Romance".
    asString(genreIdList) {
        // Will hold list of genre strings.
        let newGenreList = [];

        for (const genreId of genreIdList) {
            // If current genreId exists in genreList, push it to newGenreList.
            // this == genreList
            this[genreId] && newGenreList.push(this[genreId]);
        }
        return newGenreList.join(" · ");
    },
};

// Retrieves all TV genres from API.
fetchDataFromAPI(
    `https://api.themoviedb.org/3/genre/tv/list?api_key=${API_KEY}`,

    function ({ genres }) {
        for (const { id, name } of genres) {
            genreList[id] = name;
        }
    }
);

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
            <div class="backdrop-image" style="background-image: linear-gradient(var(--details-overlay)), 
            url('${
                poster_path != null
                    ? imageBaseURL + "w1280" + backdrop_path
                    : "#"
            }');"></div>

            <div class="banner-columns">
                <div class="banner-left-column">
                    <figure class="poster-box details-poster">
                        <img
                            src="${
                                poster_path != null
                                    ? imageBaseURL + "w342" + poster_path
                                    : "#"
                            }"
                            alt="${name}"
                            class="img-cover"
                            onerror='this.style.display = "none"'
                        />
                    </figure>

                    <a
                        class="btn btn-text-icon"
                        onclick='openPopUp(".add-to-folder")'
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

        // Adds Available On <section>.
        fetchDataFromAPI(
            `https://api.themoviedb.org/3/tv/${showId}/watch/providers?api_key=${API_KEY}`,
            watchPlatforms
        );
    }
);

const watchPlatforms = function (watchData) {
    // Creates the Available On <section>.
    const availableOn = document.createElement("section");
    availableOn.classList.add("media-scroll", "container");

    // Sets Available On <section> HTML.
    availableOn.innerHTML = `
                <div class="media-scroll-title-wrapper">
                    <h3 class="media-scroll-title">Available On (US)</h3>
                </div>

                <div class="media-slider-list">
                    <div class="slider-list-inner watch-col">
                    </div>
                </div>
            `;

    // Get US results for watch providers.
    if ("US" in watchData.results) {
        // Store the US results.
        const watchResults = watchData.results.US;

        // Slider-list-inner
        const sliderListInner = availableOn.querySelector(".slider-list-inner");

        // Check if US watchResults have a "flatrate" section.
        if ("flatrate" in watchResults) {
            // Store flatrate results
            const streamingResults = watchResults.flatrate;

            // Create watch-stream-col <div>
            const streamingCol = document.createElement("div");
            streamingCol.classList.add("watch-stream-col");

            // Set streamingCol HTML.
            streamingCol.innerHTML = `
                        <h4 class="watch-header">Stream</h4>
                        <div class="watch-platforms-row">
                        </div>
                    `;

            // Select watch-platforms-row <div> to insert logos into.
            const watchRow = streamingCol.querySelector(".watch-platforms-row");

            // Iterate through each entry in flatrate.
            for (let entry of streamingResults) {
                // Create watch-logo <img>
                const watchLogo = document.createElement("img");
                watchLogo.classList.add("watch-logo");
                // Set watch-logo <img> src using the provided logo path of the current entry.
                watchLogo.src = imageBaseURL + "w500" + entry.logo_path;

                // Append the new watch-logo <img> to watchRow
                watchRow.appendChild(watchLogo);
            }

            // Append watch-stream-col <div> into sliderListInner.
            sliderListInner.appendChild(streamingCol);
        }

        // Check if US watchResults have a "rent" section.
        if ("rent" in watchResults) {
            // Store rent results
            const rentResults = watchResults.rent;

            // Create watch-rent-col <div>
            const rentCol = document.createElement("div");
            rentCol.classList.add("watch-rent-col");

            // Set rentCol HTML.
            rentCol.innerHTML = `
                        <h4 class="watch-header">Rent</h4>
                        <div class="watch-platforms-row">
                        </div>
                    `;

            // Select watch-platforms-row <div> to insert logos into.
            const watchRow = rentCol.querySelector(".watch-platforms-row");

            // Iterate through each entry in rent.
            for (let entry of rentResults) {
                // Create watch-logo <img>
                const watchLogo = document.createElement("img");
                watchLogo.classList.add("watch-logo");
                // Set watch-logo <img> src using the provided logo path of the current entry.
                watchLogo.src = imageBaseURL + "w500" + entry.logo_path;

                // Append the new watch-logo <img> to watchRow
                watchRow.appendChild(watchLogo);
            }

            // Append watch-rent-col <div> into sliderListInner.
            sliderListInner.appendChild(rentCol);
        }

        // Check if US watchResults have a "buy" section.
        if ("buy" in watchResults) {
            // Store buy results
            const buyResults = watchResults.buy;

            // Create watch-buy-col <div>
            const buyCol = document.createElement("div");
            buyCol.classList.add("watch-buy-col");

            // Set buyCol HTML.
            buyCol.innerHTML = `
                        <h4 class="watch-header">Buy</h4>
                        <div class="watch-platforms-row">
                        </div>
                    `;

            // Select watch-platforms-row <div> to insert logos into.
            const watchRow = buyCol.querySelector(".watch-platforms-row");

            // Iterate through each entry in buy.
            for (let entry of buyResults) {
                // Create watch-logo <img>
                const watchLogo = document.createElement("img");
                watchLogo.classList.add("watch-logo");
                // Set watch-logo <img> src using the provided logo path of the current entry.
                watchLogo.src = imageBaseURL + "w500" + entry.logo_path;

                // Append the new watch-logo <img> to watchRow
                watchRow.appendChild(watchLogo);
            }

            // Append watch-buy-col <div> into sliderListInner.
            sliderListInner.appendChild(buyCol);
        }
    } else {
        // Slider-list-inner
        const sliderListInner = availableOn.querySelector(".slider-list-inner");

        sliderListInner.innerHTML = `
                    <h4 class="watch-header">Not Available Online in US</h4>
                `;
    }

    // Append Available On <section> into the page content.
    pageContent.appendChild(availableOn);

    // Adds the You May Also Like <section>
    fetchDataFromAPI(
        `https://api.themoviedb.org/3/tv/${showId}/recommendations?api_key=${API_KEY}&page=1`,
        addSuggestedShows
    );
};

// Creates scrollable show list for suggested shows.
const addSuggestedShows = function ({ results: showList }) {
    console.log(showList.length);

    if (showList.length != 0) {
        // Creates You May Also Like <section>
        const suggestedShows = document.createElement("section");
        suggestedShows.classList.add("media-scroll", "container");

        // TODO: Add View More link.
        suggestedShows.innerHTML = `
        <div class="media-scroll-title-wrapper">
            <h3 class="media-scroll-title">You May Also Like</h3>

            <a href="" class="view-more-link">View More</a>
        </div>

        <div class="media-slider-list">
            <div class="slider-list-inner">
            </div>
        </div>
    `;

        // Creates a media card for each show in showList.
        for (const show of showList) {
            // Imported from media-card.js
            const showCard = createMediaCard("show", show, genreList);

            // Adds the new media card into the media slider list.
            suggestedShows
                .querySelector(".slider-list-inner")
                .appendChild(showCard);
        }

        pageContent.appendChild(suggestedShows);
    }
};
