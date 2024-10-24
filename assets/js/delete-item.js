"use strict";

// Retrieves main from page
main = document.querySelector("main");

buildPopUp();

// Build the Delete Item pop up
function buildPopUp() {
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
            <h3 class="header-title">Remove from folder?</h3>
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
