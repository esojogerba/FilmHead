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

// Export functions to window.Backend
window.Backend = {
    initializeLocalStorage,
    getFolders,
};
