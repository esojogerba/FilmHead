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
    const inputValue = document.querySelector(".create-folder-input").value;
    const error = document.querySelector(".folder-name-error");

    console.log(inputValue);

    const folders = getFolders();
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
}

// Export functions to window.Backend
window.Backend = {
    initializeLocalStorage,
    getFolders,
    createFolder,
};
