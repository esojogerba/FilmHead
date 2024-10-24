"use strict";

// Retrieves main from page
main = document.querySelector("main");

buildPopUp();

// Build the Filter pop up
function buildPopUp() {
    // Create Filter <div>
    const filter = document.createElement("div");
    filter.classList.add("filter-pop-up");
    filter.ariaLabel = "Filter";

    // Add inner html
    filter.innerHTML = `
        <div class="filter-header">
            <a
                class="pop-up-close-btn"
                onclick='closePopUp(".filter-pop-up")'
                ><img
                    id="pop-up-close-img"
                    src="/assets/images/icon-close.svg"
                    alt=""
            /></a>
            <svg class="material-icon" id="filter-pop-up-svg">
                <use xlink:href="/assets/images/icons.svg#filter" />
            </svg>
            <h3 class="header-title">Sort & Filter</h3>
        </div>

        <a
            onclick="filterDropdown('sort-by')"
            class="filter-dropdown-btn"
            id="sort-by"
            ><span>Sort By</span>
            <img src="/assets/images/dropdown-arrow.png" />
        </a>
        <div class="sort-by-dropdown">
            <div class="sort-by-scroll-item">
                <a class="add-to-folder-scroll-btn" href=""></a>
                <span>Name (A to Z)</span>
            </div>
            <div class="sort-by-scroll-item">
                <a class="add-to-folder-scroll-btn" href=""></a>
                <span>Name (Z to A)</span>
            </div>
            <div class="sort-by-scroll-item">
                <a class="add-to-folder-scroll-btn" href=""></a>
                <span>Date Added (New to Old)</span>
            </div>
            <div class="sort-by-scroll-item">
                <a class="add-to-folder-scroll-btn" href=""></a>
                <span>Date Added (Old to New)</span>
            </div>
        </div>

        <a
            onclick="filterDropdown('filter-by')"
            class="filter-dropdown-btn"
            id="filter-by"
            ><span>Filter By</span>
            <img src="/assets/images/dropdown-arrow.png"
        /></a>
        <div class="filter-by-dropdown">
            <a
                onclick="filterDropdown('filter-movie-genres')"
                class="filter-dropdown-btn"
                id="filter-movie-genres"
                ><span>Movie Genres</span>
                <img src="/assets/images/dropdown-arrow.png"
            /></a>
            <div class="movie-genres-scroll">
                <div class="filter-by-scroll-item">
                    <a class="add-to-folder-scroll-btn" href=""></a>
                    <span>Adventure</span>
                </div>
                <div class="filter-by-scroll-item">
                    <a class="add-to-folder-scroll-btn" href=""></a>
                    <span>Fantasy</span>
                </div>
                <div class="filter-by-scroll-item">
                    <a class="add-to-folder-scroll-btn" href=""></a>
                    <span>Animation</span>
                </div>
                <div class="filter-by-scroll-item">
                    <a class="add-to-folder-scroll-btn" href=""></a>
                    <span>Drama</span>
                </div>
                <div class="filter-by-scroll-item">
                    <a class="add-to-folder-scroll-btn" href=""></a>
                    <span>Adventure</span>
                </div>
                <div class="filter-by-scroll-item">
                    <a class="add-to-folder-scroll-btn" href=""></a>
                    <span>Fantasy</span>
                </div>
                <div class="filter-by-scroll-item">
                    <a class="add-to-folder-scroll-btn" href=""></a>
                    <span>Animation</span>
                </div>
                <div class="filter-by-scroll-item">
                    <a class="add-to-folder-scroll-btn" href=""></a>
                    <span>Drama</span>
                </div>
            </div>
            <a
                onclick="filterDropdown('filter-show-genres')"
                class="filter-dropdown-btn"
                id="filter-show-genres"
                ><span>Show Genres</span>
                <img src="/assets/images/dropdown-arrow.png"
            /></a>
            <div class="show-genres-scroll">
                <div class="filter-by-scroll-item">
                    <a class="add-to-folder-scroll-btn" href=""></a>
                    <span>Adventure</span>
                </div>
                <div class="filter-by-scroll-item">
                    <a class="add-to-folder-scroll-btn" href=""></a>
                    <span>Fantasy</span>
                </div>
                <div class="filter-by-scroll-item">
                    <a class="add-to-folder-scroll-btn" href=""></a>
                    <span>Animation</span>
                </div>
                <div class="filter-by-scroll-item">
                    <a class="add-to-folder-scroll-btn" href=""></a>
                    <span>Drama</span>
                </div>
            </div>
            <a
                onclick="filterDropdown('filter-streaming')"
                class="filter-dropdown-btn"
                id="filter-streaming"
                ><span>Streaming Platforms</span>
                <img src="/assets/images/dropdown-arrow.png"
            /></a>
            <div class="streaming-scroll">
                <div class="filter-by-scroll-item">
                    <a class="add-to-folder-scroll-btn" href=""></a>
                    <span>Netflix</span>
                </div>
                <div class="filter-by-scroll-item">
                    <a class="add-to-folder-scroll-btn" href=""></a>
                    <span>Hulu</span>
                </div>
                <div class="filter-by-scroll-item">
                    <a class="add-to-folder-scroll-btn" href=""></a>
                    <span>Max</span>
                </div>
                <div class="filter-by-scroll-item">
                    <a class="add-to-folder-scroll-btn" href=""></a>
                    <span>Tubi</span>
                </div>
            </div>
        </div>

        <a class="btn" onclick="">Done</a>
    `;

    // Insert filter pop up into page
    main.appendChild(filter);
}
