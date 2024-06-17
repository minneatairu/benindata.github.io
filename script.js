
document.addEventListener("DOMContentLoaded", function () {
    const grid = document.querySelector(".image-grid");

    // Fetch data from data.json and populate the grid
    fetch('data.json')
        .then(response => response.json())
        .then(data => {
            data.images.forEach(item => {
                const imageItem = document.createElement('div');
                imageItem.classList.add('image-item');
                
                const img = document.createElement('img');
                img.src = item.src;
                img.alt = item.caption;

                const caption = document.createElement('p');
                caption.textContent = item.caption;

                imageItem.appendChild(img);
                imageItem.appendChild(caption);
                grid.appendChild(imageItem);
            });

            // Clone the images to create the infinite effect
            const images = Array.from(grid.children);
            images.forEach(image => {
                const clone = image.cloneNode(true);
                grid.appendChild(clone);
            });
        })
        .catch(error => console.error('Error fetching data:', error));

    // Get the modal
    var modal = document.getElementById("myModal");

    // Get the button that opens the modal
    var btn = document.getElementById("modalBtn");

    // Get the <span> element that closes the modal
    var span = document.getElementsByClassName("close")[0];

    // JavaScript for category section toggle
    const searchBtn = document.getElementById("searchBtn");
    const categorySection = document.getElementById("categorySection");

    // Function to close the category section
    function closeCategorySection() {
        if (!categorySection.classList.contains('hidden')) {
            categorySection.classList.add('hidden');
        }
    }

    // Function to close the modal
    function closeModal() {
        if (modal.style.display === "block") {
            modal.style.display = "none";
        }
    }

    // When the user clicks on the button, open the modal
    btn.onclick = function() {
        closeCategorySection();
        modal.style.display = "block";
    }

    // When the user clicks on <span> (x), close the modal
    span.onclick = function() {
        modal.style.display = "none";
    }

    // When the user clicks anywhere outside of the modal, close it
    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    }

    searchBtn.onclick = function() {
        closeModal();
        categorySection.classList.toggle('hidden');
    }
});