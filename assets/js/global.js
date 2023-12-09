// Toggle dropdown menu when button is clicked.
function toggleDropdown() {
    document.querySelector(".dropdown-menu").classList.toggle("show-dropdown");
}

// Adds event on multiple elements.
const addEventOnElements = function (elements, eventType, callback) {
    for (const elem of elements) elem.addEventListener(eventType, callback);
};

// Closes dropdown menu when user clicks outside of it.
window.onclick = function (event) {
    if (!event.target.matches(".dropdown-btn")) {
        var dropdowns = document.getElementsByClassName("dropdown-menu");
        var i;
        for (i = 0; i < dropdowns.length; i++) {
            var openDropdown = dropdowns[i];
            if (openDropdown.classList.contains("show-dropdown")) {
                openDropdown.classList.remove("show-dropdown");
            }
        }
    }
};
