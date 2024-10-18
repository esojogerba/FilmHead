"use strict";

// Retrieves page-content <article> from movies page
const main = document.querySelector("main");

// Retrieve folders from localStorage
var folders = window.Backend.getFolders();

console.log(folders);

buildPopUp();

// Build the Add To Folder pop up
function buildPopUp() {
    // Create add-to-folder <div>
    const addToFolder = document.createElement("div");
    addToFolder.classList.add("add-to-folder");
    addToFolder.ariaLabel = "Add To Folder";

    // Add inner html
    addToFolder.innerHTML = `
        <div class="add-to-folder-header">
            <a
                class="pop-up-close-btn"
                onclick='closePopUp(".add-to-folder")'
                ><img
                    id="pop-up-close-img"
                    src="/assets/images/icon-close.svg"
                    alt=""
            /></a>
            <h3 class="header-title">Save To Folder</h3>
            <input
                class="add-to-folder-search"
                type="search"
                placeholder="Search..."
                search-field
            />
            <a
                class="btn btn-text-icon"
                id="add-new-folder-btn"
                onclick="openPopUp('.create-folder')"
            >
                <svg class="material-icon" id="add-to-folder-svg">
                    <use
                        xlink:href="/assets/images/icons.svg#add-icon"
                    />
                </svg>
                <span>New Folder</span>
            </a>
        </div>

        <div class="add-to-folder-scroll">
        </div>

        <div class="add-to-folder-footer">
            <a
                class="btn btn-text-icon"
                id="add-to-folder-btn"
                onclick=""
            >
                <svg class="material-icon" id="add-to-folder-svg">
                    <use
                        xlink:href="/assets/images/icons.svg#add-icon"
                    />
                </svg>
                <span>Add</span>
            </a>
        </div>
    `;

    for (const folder of folders) {
        // Create folder list item
        const addToFolderScrollItem = document.createElement("div");
        addToFolderScrollItem.classList.add("add-to-folder-scroll-item");

        // Folder list item inner HTML
        addToFolderScrollItem.innerHTML = `
            <span>${folder.name}</span>
            <a class="add-to-folder-scroll-btn" href=""></a>
        `;

        // Add list item to the list
        addToFolder
            .querySelector(".add-to-folder-scroll")
            .appendChild(addToFolderScrollItem);
    }

    // Insert Add To Folder pop up into page
    main.appendChild(addToFolder);
}
