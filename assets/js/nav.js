const navLinks = document.querySelector(".nav-links");
const navToggle = document.querySelector(".mobile-nav-toggle");

// When mobile nav toggle is clicked.
navToggle.addEventListener("click", () => {
    const visibility = navLinks.getAttribute("data-visible");

    // Toggle mobile nav visibility.
    navLinks.setAttribute(
        "data-visible",
        visibility === "true" ? "false" : "true"
    );

    // Toggle aria-expanded attribute.
    navToggle.setAttribute(
        "aria-expanded",
        visibility === "true" ? "false" : "true"
    );
});
