// Toggle dropdown menu when button is clicked.
function toggleDropdown() {
    document.querySelector(".dropdown-menu").classList.toggle("show-dropdown");
}

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
