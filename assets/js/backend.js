// //////////////////// BACKEND

// Initialize localStorage
function initializeLocalStorage() {
    if (!localStorage.getItem("folders")) {
        localStorage.setItem("folders", JSON.stringify([]));
        console.log("Folders created");
    }
    console.log("Folders exists");
}

// Retrieve all folders
function getFolders() {
    return JSON.parse(localStorage.getItem("folders"));
}

// Retrieve folders from localStorage
var folderList = getFolders();

// Create a new folder
function createFolder() {
    // Retrieve input and error messages
    const inputValue = document.querySelector(".create-folder-input").value;
    const error = document.querySelector(".folder-name-error");
    const emptyError = document.querySelector("#empty-error");
    const addToFolder = document.querySelector(".add-to-folder");

    // Retrieve folders from local storage
    var folders = getFolders();

    // Prevent empty folder name
    if (!inputValue) {
        emptyError.classList.add("active");
        throw new Error("Folder name already exists.");
    }

    // Check to see if folder name is already taken
    if (folderList.some((folder) => folder.name === inputValue)) {
        error.classList.add("active");
        throw new Error("Folder name already exists.");
    }

    // Create new folder using input as name
    const newFolder = {
        name: inputValue,
        entries: 0,
        percent_complete: "0%",
        poster_urls: [],
        media: [],
    };

    // Add new folder to localStorage
    folderList.push(newFolder);
    localStorage.setItem("folders", JSON.stringify(folderList));

    // Close create folder pop up after folder is created
    closePopUp(".create-folder");

    // Update folders variable
    folderList = getFolders();

    // Reload Add To Folder pop up with new folder if it was open
    if (addToFolder.classList.contains("active")) {
        document.querySelector(".add-to-folder").remove();
        window.addToFolderPopUp.buildAddToFolder(folderList);
        openPopUp(".add-to-folder");
    }
}

// Export functions to window.Backend
window.Backend = {
    initializeLocalStorage,
    getFolders,
    createFolder,
    folderList,
};
