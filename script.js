document.addEventListener("DOMContentLoaded", function () {
    const container = document.querySelector(".image-container");
    const row = document.querySelector(".image-row");

    // Clone the row to create the infinite effect
    const clone = row.cloneNode(true);
    container.appendChild(clone);

    // Adjust the animation speed based on the number of images
    const imagesCount = row.children.length;
    const speed = imagesCount * 5; // Adjust the speed as needed
    row.style.animationDuration = `${speed}s`;
    clone.style.animationDuration = `${speed}s`;
});
