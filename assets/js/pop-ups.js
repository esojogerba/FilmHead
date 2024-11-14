// Retrieves main from page
var main = document.querySelector("main");

// Build pop ups
buildAddToFolder(window.Backend.folderList);
buildCreateFolder();
buildDeleteFolder();
buildDeleteItem();
buildFilter();

// Build the Add To Folder pop up
function buildAddToFolder(folders) {
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

    // If folders is not empty, build folder list
    if (folders) {
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
    }

    // Insert Add To Folder pop up into page
    main.appendChild(addToFolder);
}

// Build the Create Folder pop up
function buildCreateFolder() {
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
        <h4 id="empty-error" class="folder-name-error">Invalid folder name</h4>

        <input
            class="create-folder-input"
            type="text"
            placeholder="Name"
            autocomplete="off"
        />

        <a class="btn" onclick="createFolder()">Done</a>
    `;

    // Insert createFolder pop up into page
    main.appendChild(createFolder);
}

// Build the Delete Folder pop up
function buildDeleteFolder() {
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

// Build the Delete Item pop up
function buildDeleteItem() {
    // Create delete-item <div>
    const deleteItem = document.createElement("div");
    deleteItem.classList.add("delete-item");
    deleteItem.ariaLabel = "Delete Item";

    // Add inner html
    deleteItem.innerHTML = `
        <div class="delete-item-header">
            <svg class="material-icon delete-svg">
                <use xlink:href="/assets/images/icons.svg#trash" />
            </svg>
            <h3 class="header-title">Delete Item?</h3>
        </div>

        <p class="pop-up-body">
            Are you sure you want to remove this entry from the folder?
        </p>

        <div class="confirm-cancel-btns">
            <a class="btn" onclick="">Confirm</a>
            <a class="btn" onclick='closePopUp(".delete-item")'
                >Cancel</a
            >
        </div>
    `;

    // Insert deleteItem pop up into page
    main.appendChild(deleteItem);
}

// Build the Filter pop up
function buildFilter() {
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

// For external use
window.addToFolderPopUp = {
    buildAddToFolder,
};
