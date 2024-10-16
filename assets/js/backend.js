// //////////////////// BACKEND

// Initialize LocalStorage
function initializeLocalStorage() {
    if (!localStorage.getItem("folders")) {
        localStorage.setItem("folders", JSON.stringify([]));
        console.log("Folders created");
    }
    console.log("Folders exists");
}

// Export functions to window.Backend
window.Backend = {
    initializeLocalStorage,
};
