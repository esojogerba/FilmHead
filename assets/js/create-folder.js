"use strict";

// Retrieves page-content <article> from movies page
const main = document.querySelector("main");

// Build the Create Folder pop up
function buildPopUp() {
    // Create create-folder <div>
    const createFolder = document.createElement("div");
    createFolder.classList.add("create-folder");
    createFolder.ariaLabel = "Create Folder";
}
