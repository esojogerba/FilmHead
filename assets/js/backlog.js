"use strict";

// Retrieves page-content <article> from backlog page.
const pageContent = document.querySelector("[page-content]");

// Retrieve folders from localStorage
const folderList = window.Backend.getFolders();

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
            <div class="folder">
                <div class="folder-posters">
                    <figure class="poster-box folder-poster">
                        <img
                            src="/assets/images/Blade Runner Poster.png"
                            alt="Blade Runner"
                            class="img-cover"
                            loading="lazy"
                        />
                    </figure>
                    <figure class="poster-box folder-poster">
                        <img
                            src="/assets/images/Blade Runner Poster.png"
                            alt="Blade Runner"
                            class="img-cover"
                            loading="lazy"
                        />
                    </figure>
                    <figure class="poster-box folder-poster">
                        <img
                            src="/assets/images/Blade Runner Poster.png"
                            alt="Blade Runner"
                            class="img-cover"
                            loading="lazy"
                        />
                    </figure>
                </div>

                <div class="folder-details">
                    <h3 class="folder-title">Folder Name</h3>

                    <p class="folder-entry-count">15 Entries</p>
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
            </div>
        </div>
    `;
}
