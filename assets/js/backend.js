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
function createFolder(name) {
    const inputValue = document.getElementsByClassName(
        "create-folder-input"
    ).value;

    const folders = getFolders();
    if (folders.some((folder) => folder.name === name)) {
        throw new Error("Folder name already exists.");
    }

    const newFolder = {
        name: name,
        entries: 0,
        percent_complete: "0%",
        poster_urls: [],
        media: [],
    };

    folders.push(newFolder);
    localStorage.setItem("folders", JSON.stringify(folders));
}

// Export functions to window.Backend
window.Backend = {
    initializeLocalStorage,
    getFolders,
    createFolder,
};
