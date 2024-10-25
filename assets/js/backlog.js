"use strict";

// Retrieves page-content <article> from backlog page.
const pageContent = document.querySelector("[page-content]");

// Retrieve folders from localStorage
const folderList = window.Backend.getFolders();
