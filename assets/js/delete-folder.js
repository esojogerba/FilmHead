"use strict";

// Retrieves main from page
main = document.querySelector("main");

buildPopUp();

// Build the Delete Folder pop up
function buildPopUp() {
    // Create delete-folder <div>
    const deleteFolder = document.createElement("div");
    deleteFolder.classList.add("delete-folder");
    deleteFolder.ariaLabel = "Delete Folder";

    // Add inner html
    deleteFolder.innerHTML = `
        <div class="delete-folder-header">
            <svg class="material-icon delete-svg">
                <use xlink:href="/assets/images/icons.svg#trash" />
            </svg>
            <h3 class="header-title">Delete Folder?</h3>
        </div>

        <p class="pop-up-body">
            Are you sure you want to permanently delete this folder?
        </p>

        <div class="confirm-cancel-btns">
            <a class="btn" onclick="">Confirm</a>
            <a class="btn" onclick='closePopUp(".delete-folder")'
                >Cancel</a
            >
        </div>
    `;

    // Insert deleteFolder pop up into page
    main.appendChild(deleteFolder);
}
