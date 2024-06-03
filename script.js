document.addEventListener("DOMContentLoaded", function () {
    const grid = document.querySelector(".image-grid");

    // Clone the images to create the infinite effect
    const images = Array.from(grid.children);
    images.forEach(image => {
        const clone = image.cloneNode(true);
        grid.appendChild(clone);
    });
        // Get the modal
        var modal = document.getElementById("myModal");

        // Get the <span> element that closes the modal
        var span = document.getElementsByClassName("close")[0];
    
        // When the user clicks on <span> (x), close the modal
        span.onclick = function() {
            modal.style.display = "none";
        }
});
