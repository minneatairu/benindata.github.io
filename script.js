document.addEventListener("DOMContentLoaded", function () {
    const grid = document.querySelector(".image-grid");

    // Clone the images to create the infinite effect
    const images = Array.from(grid.children);
    images.forEach(image => {
        const clone = image.cloneNode(true);
        grid.appendChild(clone);
    });
});
