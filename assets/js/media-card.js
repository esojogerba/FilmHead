"user strict";

// Imports
import { imageBaseURL } from "./api";

// Creates a media card using the data collected from the API.
// TODO: add show path.
export function createMediaCard(type, mediaData, genreList, page) {
    if (type == "movie") {
        // Stores data for the current movie
        const { poster_path, title, genre_ids, release_date, id } = mediaData;

        // Creates media card <div>.
        const card = document.createElement("div");
        card.classList.add("media-card");

        // Sets media-card <div> HTML.
        // Uses template literals to inject movie data retrieved from API into the HTML.
        // TODO: Add button link and functionality.
        card.innerHTML = `
            <figure class="poster-box card-poster">
                <img
                    src="${
                        poster_path != null
                            ? imageBaseURL + "w342" + poster_path
                            : "#"
                    }"
                    alt="${title}"
                    class="img-cover"
                    loading="lazy"
                    onerror='this.style.display = "none"'
                />

                <a class="media-card-add-btn"
                    onclick='openPopUp(".add-to-folder")'
                >
                    <svg
                        class="material-icon"
                        id="card-add-svg"
                    >
                        <use
                            xlink:href="/assets/images/icons.svg#add-icon"
                        />
                    </svg>
                </a>
            </figure>

            <h4 class="media-card-title">
                ${title}
            </h4>

            <div class="meta-list media-card-meta">
                <div class="meta-list">
                    <div class="meta-item">${release_date.split("-")[0]}</div>
                </div>
            </div>

            <p class="media-card-genres">
                ${genreList.asString(genre_ids)}
            </p>

            <a
                href="movie-details.html"
                class="card-btn"
                title="${title}"
                onclick="getMovieDetails(${id})"
            ></a>
        `;

        return card;
    } else if (type == "show") {
        // Stores data for the current show
        const { poster_path, name, first_air_date, genre_ids, id } = mediaData;

        // Creates media card <div>.
        const card = document.createElement("div");
        card.classList.add("media-card");

        // Sets media-card <div> HTML.
        // Uses template literals to inject show data retrieved from API into the HTML.
        // TODO: Add button link and functionality.
        card.innerHTML = `
            <figure class="poster-box card-poster">
                <img
                    src="${
                        poster_path != null
                            ? imageBaseURL + "w342" + poster_path
                            : "#"
                    }"
                    alt="${name}"
                    class="img-cover"
                    loading="lazy"
                    onerror='this.style.display = "none"'
                />

                <a class="media-card-add-btn"
                    onclick='openPopUp(".add-to-folder")'
                >
                    <svg
                        class="material-icon"
                        id="card-add-svg"
                    >
                        <use
                            xlink:href="/assets/images/icons.svg#add-icon"
                        />
                    </svg>
                </a>
            </figure>

            <h4 class="media-card-title">
                ${name}
            </h4>

            <div class="meta-list media-card-meta">
                <div class="meta-list">
                    <div class="meta-item">${first_air_date.split("-")[0]}</div>
                </div>
            </div>

            <p class="media-card-genres">
                ${genreList.asString(genre_ids)}
            </p>

            <a
                href="show-details.html"
                class="card-btn"
                title="${name}"
                onclick="getShowDetails(${id})"
            ></a>
        `;

        return card;
    } else if (type == "grid-movie") {
        // Stores data for the current movie
        const { poster_path, title, genre_ids, release_date, id } = mediaData;

        // Creates grid card <div>.
        const card = document.createElement("div");
        card.classList.add("grid-card");

        // Sets grid-card <div> HTML.
        // Uses template literals to inject movie data retrieved from API into the HTML.
        // TODO: Add button link and functionality.
        card.innerHTML = `
            <figure class="poster-box grid-card-poster">
                <img
                    src="${
                        poster_path != null
                            ? imageBaseURL + "w342" + poster_path
                            : "#"
                    }"
                    alt="${title}"
                    class="img-cover"
                    loading="lazy"
                    onerror='this.style.display = "none"'
                />

                <a class="grid-card-add-btn"
                    onclick='openPopUp(".add-to-folder")'
                >
                    <svg
                        class="material-icon"
                        id="grid-card-add-svg"
                    >
                        <use
                            xlink:href="/assets/images/icons.svg#add-icon"
                        />
                    </svg>
                </a>
            </figure>

            <h4 class="media-card-title">${title}</h4>

            <div class="meta-list media-card-meta">
                <div class="meta-list">
                    <div class="meta-item">${release_date.split("-")[0]}</div>
                </div>
            </div>

            <a 
            href="${
                page == "home"
                    ? "/html/movie-details.html"
                    : "movie-details.html"
            }"  
            class="card-btn" title="" onclick="getMovieDetails(${id})"></a>
        `;

        return card;
    } else if (type == "grid-tv") {
        // Stores data for the current show
        const { poster_path, name, first_air_date, genre_ids, id } = mediaData;

        // Creates grid card <div>.
        const card = document.createElement("div");
        card.classList.add("grid-card");

        // Sets grid-card <div> HTML.
        // Uses template literals to inject show data retrieved from API into the HTML.
        // TODO: Add button link and functionality.
        card.innerHTML = `
            <figure class="poster-box grid-card-poster">
                <img
                    src="${
                        poster_path != null
                            ? imageBaseURL + "w342" + poster_path
                            : "#"
                    }"
                    alt="${name}"
                    class="img-cover"
                    loading="lazy"
                    onerror='this.style.display = "none"'
                />

                <a class="grid-card-add-btn"
                    onclick='openPopUp(".add-to-folder")'
                >
                    <svg
                        class="material-icon"
                        id="grid-card-add-svg"
                    >
                        <use
                            xlink:href="/assets/images/icons.svg#add-icon"
                        />
                    </svg>
                </a>
            </figure>

            <h4 class="media-card-title">${name}</h4>

            <div class="meta-list media-card-meta">
                <div class="meta-list">
                    <div class="meta-item">${first_air_date.split("-")[0]}</div>
                </div>
            </div>

            <a 
            href="${
                page == "home" ? "/html/show-details.html" : "show-details.html"
            }" 
            class="card-btn" title="" onclick="getShowDetails(${id})"></a>
        `;

        return card;
    }
}
