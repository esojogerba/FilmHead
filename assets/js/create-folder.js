"use strict";

// Retrieves page-content <article> from movies page
const main = document.querySelector("main");

// Build the Create Folder pop up
function buildPopUp() {
    // Create create-folder <div>
    const createFolder = document.createElement("div");
    createFolder.classList.add("create-folder");
    createFolder.ariaLabel = "Create Folder";

    // Add inner html
    createFolder.innerHTML = `
        <div class="create-folder-header">
            <a
                class="pop-up-close-btn"
                onclick='closePopUp(".create-folder")'
                ><img
                    id="pop-up-close-img"
                    src="/assets/images/icon-close.svg"
                    alt=""
            /></a>
            <svg class="material-icon" id="create-folder-svg">
                <use xlink:href="/assets/images/icons.svg#folder" />
            </svg>
            <h3 class="header-title">Create Folder</h3>
        </div>

        <h4 class="folder-name-error">Folder name already exists</h4>

        <input
            class="create-folder-input"
            type="text"
            placeholder="Name"
            autocomplete="off"
        />

        <a class="btn" onclick="createFolder()">Done</a>
    `;
}
