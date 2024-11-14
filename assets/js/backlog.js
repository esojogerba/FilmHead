"use strict";

// Retrieves page-content <article> from backlog page.
const pageContent = document.querySelector("[page-content]");

const imageBaseURL = "http://image.tmdb.org/t/p/";

// Calls the build function
buildBacklog();

// Builds the backlog page
function buildBacklog() {
    // Creates container <section>.
    const backlog = document.createElement("section");
    backlog.classList.add("container");
    backlog.ariaLabel = "Backlog";

    backlog.innerHTML = `
        <div class="backlog-header">
            <svg class="material-icon" id="backlog-svg">
                <use
                    xlink:href="/assets/images/icons.svg#backlog"
                />
            </svg>
            <h1 id="backlog-title">Backlog</h1>
        </div>

        <div class="backlog-menu">
            <input
                class="backlog-search-field"
                type="search"
                placeholder="Search..."
            />

            <a
                class="btn-icon"
                onclick="openPopUp('.create-folder')"
                id="backlog-add-btn"
            >
                <svg class="material-icon" id="add-svg">
                    <use
                        xlink:href="/assets/images/icons.svg#add-icon"
                    />
                </svg>
            </a>
        </div>

        <div class="backlog-grid">
        </div>
    `;

    if (window.Backend.folderList) {
        for (const folder of window.Backend.folderList) {
            // Create folder
            const newFolder = document.createElement("div");
            newFolder.classList.add("folder");

            // Add inner HTML for folder
            // Uses template literals to inject folder data from localStorage into the HTML.
            newFolder.innerHTML = `
                <div class="folder-posters">
                    <figure class="poster-box folder-poster">
                        <img
                            src="${
                                folder.poster_urls &&
                                folder.poster_urls[0] != null
                                    ? imageBaseURL + "w342" + poster_path
                                    : "#"
                            }"
                            class="img-cover"
                            loading="lazy"
                            onerror='this.style.display = "none"'
                        />
                    </figure>
                    <figure class="poster-box folder-poster">
                        <img
                            src="${
                                folder.poster_urls &&
                                folder.poster_urls[1] != null
                                    ? imageBaseURL + "w342" + poster_path
                                    : "#"
                            }"
                            class="img-cover"
                            loading="lazy"
                            onerror='this.style.display = "none"'
                        />
                    </figure>
                    <figure class="poster-box folder-poster">
                        <img
                            src="${
                                folder.poster_urls &&
                                folder.poster_urls[2] != null
                                    ? imageBaseURL + "w342" + poster_path
                                    : "#"
                            }"
                            class="img-cover"
                            loading="lazy"
                            onerror='this.style.display = "none"'
                        />
                    </figure>
                </div>

                <div class="folder-details">
                    <h3 class="folder-title">${folder.name}</h3>

                    <p class="folder-entry-count">${folder.entries}</p>
                </div>

                <a
                    class="btn-icon"
                    onclick="openPopUp('.delete-folder')"
                    id="backlog-trash-btn"
                >
                    <svg class="material-icon" id="trash-svg">
                        <use
                            xlink:href="/assets/images/icons.svg#trash"
                        />
                    </svg>
                </a>

                <a
                    href="/html/folder.html"
                    class="folder-btn"
                    title=""
                    onclick=""
                ></a>
            `;

            backlog.querySelector(".backlog-grid").appendChild(newFolder);
        }
    } else {
        const backlogGrid = backlog.querySelector(".backlog-grid");
        backlogGrid.style.minHeight = "500px";
    }

    pageContent.appendChild(backlog);
}
