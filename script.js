document.addEventListener("DOMContentLoaded", function () {
    const container = document.querySelector(".image-container");
    const rows = document.querySelectorAll(".image-row");

    rows.forEach(row => {
        // Clone the row to create the infinite effect
        const clone = row.cloneNode(true);
        container.appendChild(clone);

        // Get the width of the row
        const rowWidth = row.scrollWidth;

        // Start the animation
        function animate() {
            row.style.transition = `transform ${rowWidth / 100}px linear`;
            row.style.transform = `translate3d(-${rowWidth}px, 0, 0)`;
            clone.style.transition = `transform ${rowWidth / 100}px linear`;
            clone.style.transform = `translate3d(-${rowWidth}px, 0, 0)`;
        }

        // Reset the position when animation ends
        row.addEventListener("transitionend", () => {
            row.style.transition = 'none';
            row.style.transform = 'translate3d(0, 0, 0)';
            setTimeout(animate, 50); // Slight delay to ensure smooth reset
        });

        clone.addEventListener("transitionend", () => {
            clone.style.transition = 'none';
            clone.style.transform = 'translate3d(0, 0, 0)';
            setTimeout(animate, 50); // Slight delay to ensure smooth reset
        });

        // Start the initial animation
        animate();
    });
});
