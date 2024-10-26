// //////////////////// BACKEND

// Initialize LocalStorage
function initializeLocalStorage() {
    if (!localStorage.getItem("folders")) {
        localStorage.setItem("folders", JSON.stringify([]));
        console.log("Folders created");
    }
    console.log("Folders exists");
}

// Retrieve All Folders
function getFolders() {
    return JSON.parse(localStorage.getItem("folders"));
}

// Create a New Folder
function createFolder() {
    // Retrieve input and error messages
    const inputValue = document.querySelector(".create-folder-input").value;
    const error = document.querySelector(".folder-name-error");
    const emptyError = document.querySelector("#empty-error");

    console.log(inputValue);

    var folders = getFolders();

    // Prevent empty folder name
    if (!inputValue) {
        emptyError.classList.add("active");
        throw new Error("Folder name already exists.");
    }

    // Check to see if folder name is already taken
    if (folders.some((folder) => folder.name === inputValue)) {
        error.classList.add("active");
        throw new Error("Folder name already exists.");
    }

    const newFolder = {
        name: inputValue,
        entries: 0,
        percent_complete: "0%",
        poster_urls: [],
        media: [],
    };

    folders.push(newFolder);
    localStorage.setItem("folders", JSON.stringify(folders));

    closePopUp(".create-folder");

    folders = getFolders();

    document.querySelector(".add-to-folder").remove();
    window.addToFolderPopUp.buildPopUp(folders);
    openPopUp(".add-to-folder");
}

// Export functions to window.Backend
window.Backend = {
    initializeLocalStorage,
    getFolders,
    createFolder,
};
