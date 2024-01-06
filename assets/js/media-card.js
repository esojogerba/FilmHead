"user strict";

// Imports
import { imageBaseURL } from "./api";

// Creates a media card using the data collected from the API.
// TODO: add show path.
export function createMediaCard(type, mediaData, genreList) {
    if (type == "movie") {
        // Stores data for the current movie
        const { poster_path, title, vote_average, release_date, id } =
            mediaData;

        // Creates media card <div>.
        const card = document.createElement("div");
        card.classList.add("media-card");

        // Sets media-card <div> HTML.
        // Uses template literals to inject movie data retrieved from API into the HTML.
        // TODO: Add genres to card.
        // TODO: Add button link and functionality.
        // TODO: Add movie details link functionality.
        card.innerHTML = `
            <figure class="poster-box card-poster">
                <img
                    src="${imageBaseURL}w342${poster_path}"
                    alt="${title}"
                    class="img-cover"
                    loading="lazy"
                />

                <a href="" class="media-card-add-btn">
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
                Science Fiction · Drama · Thriller
            </p>

            <a
                href=""
                class="card-btn"
                title="${title}"
                onclick=""
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
        // Uses template literals to inject movie data retrieved from API into the HTML.
        // TODO: Add button link and functionality.
        // TODO: Add movie details link functionality.
        card.innerHTML = `
            <figure class="poster-box card-poster">
                <img
                    src="${imageBaseURL}w342${poster_path}"
                    alt="${name}"
                    class="img-cover"
                    loading="lazy"
                />

                <a href="" class="media-card-add-btn">
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
                href=""
                class="card-btn"
                title="${name}"
                onclick=""
            ></a>
        `;

        return card;
    }
}
