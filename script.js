document.addEventListener("DOMContentLoaded", function () {
    const gridOne = document.getElementById('gridOne');
    const gridTwo = document.getElementById('gridTwo');
    const imageCount = document.getElementById("imageCount");

    // Fetch data from data.json and populate the first grid
    fetch('data.json')
        .then(response => response.json())
        .then(data => {
            populateGrid(data.images, gridOne);

            // Set the total image count
            imageCount.textContent = data.images.length;
        })
        .catch(error => console.error('Error fetching data:', error));

    // Fetch data from datatwo.json and populate the second grid
    fetch('datatwo.json')
        .then(response => response.json())
        .then(data => {
            populateGrid(data.images, gridTwo);
        })
        .catch(error => console.error('Error fetching data:', error));

    function populateGrid(images, grid) {
        grid.innerHTML = '';  // Clear any existing images
        images.forEach((item, index) => {
            const imageItem = document.createElement('div');
            imageItem.classList.add('image-item');
            imageItem.setAttribute('data-object-type', item.objectType);
            imageItem.setAttribute('data-material', item.material);
            imageItem.setAttribute('data-year', item.year);

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
            imgFront.draggable = false;

            const imgBack = document.createElement('img');
            imgBack.src = item.backSrc;
            imgBack.alt = item.caption;
            imgBack.draggable = false;

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
    }

    // Range slider functionality
    const yearSlider = document.getElementById('yearSlider');
    const selectedYear = document.getElementById('selectedYear');
    const yearLabels = document.querySelectorAll('.slider-labels span');
    const years = Array.from(yearLabels).map(label => label.getAttribute('data-year'));

    yearSlider.addEventListener('input', function() {
        const year = years[yearSlider.value];
        selectedYear.textContent = year;
        filterImagesByYear(year);
    });

    function filterImagesByYear(year) {
        const images = document.querySelectorAll('.image-item');
        images.forEach(image => {
            const imageYear = image.getAttribute('data-year');
            if (imageYear === year) {
                image.style.display = 'block';
            } else {
                image.style.display = 'none';
            }
        });
    }
});
