document.addEventListener("DOMContentLoaded", function () {
    const grid = document.querySelector(".image-grid");

    // Fetch data from data.json and populate the grid
    fetch('data.json')
        .then(response => response.json())
        .then(data => {
            data.images.forEach((item, index) => {
                const imageItem = document.createElement('div');
                imageItem.classList.add('image-item');
                imageItem.setAttribute('data-object-type', item.objectType);
                imageItem.setAttribute('data-material', item.material);

                const indexNumber = document.createElement('div');
                indexNumber.classList.add('index-number');
                indexNumber.textContent = index + 1;

                const flipCard = document.createElement('div');
                flipCard.classList.add('flip-card');

                const flipCardInner = document.createElement('div');
                flipCardInner.classList.add('flip-card-inner');

                const flipCardFront = document.createElement('div');
                flipCardFront.classList.add('flip-card-front');

                const flipCardBack = document.createElement('div');
                flipCardBack.classList.add('flip-card-back');

                const imgFront = document.createElement('img');
                imgFront.src = item.frontSrc;
                imgFront.alt = item.caption;

                const imgBack = document.createElement('img');
                imgBack.src = item.backSrc;
                imgBack.alt = item.caption;

                const caption = document.createElement('p');
                caption.classList.add('caption');
                caption.textContent = item.caption;

                flipCardFront.appendChild(imgFront);
                flipCardBack.appendChild(imgBack);

                flipCardInner.appendChild(flipCardFront);
                flipCardInner.appendChild(flipCardBack);

                flipCard.appendChild(flipCardInner);

                imageItem.appendChild(indexNumber);
                imageItem.appendChild(flipCard);
                imageItem.appendChild(caption);

                grid.appendChild(imageItem);
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

    // Category buttons click event
    const categoryButtons = document.querySelectorAll('.category-button');
    categoryButtons.forEach(button => {
        button.addEventListener('click', function () {
            this.classList.toggle('active');
            const filterType = this.getAttribute('data-filter-type');
            const tag = this.getAttribute('data-tag');
            filterImages(filterType, tag, this.classList.contains('active'));
        });
    });

    function filterImages(filterType, tag, isActive) {
        const images = document.querySelectorAll('.image-item');
        images.forEach(image => {
            const objectType = image.getAttribute('data-object-type');
            const material = image.getAttribute('data-material');
            if (isActive) {
                if ((filterType === 'objectType' && objectType === tag) ||
                    (filterType === 'material' && material === tag)) {
                    image.style.display = 'block';
                } else {
                    image.style.display = 'none';
                }
            } else {
                image.style.display = 'block'; // Reset display when deselected
            }
        });
    }

    // Search functionality
    const searchInput = document.getElementById('searchInput');
    const searchButton = document.getElementById('searchButton');

    searchButton.addEventListener('click', function () {
        const searchTerm = searchInput.value.toLowerCase();
        const images = document.querySelectorAll('.image-item');
        images.forEach(image => {
            const caption = image.querySelector('.caption').textContent.toLowerCase();
            if (caption.includes(searchTerm)) {
                image.style.display = 'block';
            } else {
                image.style.display = 'none';
            }
        });
    });
});
