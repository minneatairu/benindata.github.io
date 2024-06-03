document.addEventListener("DOMContentLoaded", function () {
    const container = document.querySelector(".image-container");
    const rows = document.querySelectorAll(".image-row");

    // Clone each row to create the infinite effect
    rows.forEach(row => {
        const clone = row.cloneNode(true);
        container.appendChild(clone);

        // Adjust the animation speed based on the number of images
        const imagesCount = row.children.length;
        const speed = imagesCount * 5; // Adjust the speed as needed
        row.style.animationDuration = `${speed}s`;
        clone.style.animationDuration = `${speed}s`;
    });
});
