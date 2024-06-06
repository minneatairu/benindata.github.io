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

    // JavaScript for dragging functionality
    const imageContainer = document.querySelector('.image-container');
    const imageGrid = document.querySelector('.image-grid');

    let isDown = false;
    let startX;
    let scrollLeft;

    imageContainer.addEventListener('mousedown', (e) => {
        isDown = true;
        imageContainer.classList.add('active');
        startX = e.pageX - imageGrid.offsetLeft;
        scrollLeft = imageGrid.scrollLeft;
    });

    imageContainer.addEventListener('mouseleave', () => {
        isDown = false;
        imageContainer.classList.remove('active');
    });

    imageContainer.addEventListener('mouseup', () => {
        isDown = false;
        imageContainer.classList.remove('active');
    });

    imageContainer.addEventListener('mousemove', (e) => {
        if (!isDown) return;
        e.preventDefault();
        const x = e.pageX - imageContainer.offsetLeft;
        const walk = (x - startX) * 3; // Adjust the speed here
        imageGrid.scrollLeft = scrollLeft - walk;
    });
    var bookList = document.getElementById('bookList');
    if (bookList.style.display === 'none' || bookList.style.display === '') {
        bookList.style.display = 'block';
    } else {
        bookList.style.display = 'none';
    }
});
