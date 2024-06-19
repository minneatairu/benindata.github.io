document.addEventListener("DOMContentLoaded", function () {
    const grid = document.querySelector(".image-grid");
    const yearSlider = document.getElementById('yearSlider');
    const selectedYear = document.getElementById('selectedYear');
    const yearLabels = document.querySelectorAll('.slider-labels span');
    const years = Array.from(yearLabels).map(label => label.getAttribute('data-year'));

    // Fetch data from data.json and populate the grid
    fetch('data.json')
        .then(response => response.json())
        .then(data => {
            populateGrid(data.images);

            // Attach the slider change event
            yearSlider.addEventListener('input', function() {
                const year = years[yearSlider.value];
                selectedYear.textContent = year;
                filterImagesByYear(data.images, year);
            });
        })
        .catch(error => console.error('Error fetching data:', error));

    function populateGrid(images) {
        grid.innerHTML = ''; // Clear the grid
        images.forEach((item, index) => {
            const imageItem = document.createElement('div');
            imageItem.classList.add('image-item');
            imageItem.setAttribute('data-year', item.year);
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
            imgFront.draggable = false; // Disable dragging

            const imgBack = document.createElement('img');
            imgBack.src = item.backSrc;
            imgBack.alt = item.caption;
            imgBack.draggable = false; // Disable dragging

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

    function filterImagesByYear(images, year) {
        const filteredImages = images.filter(image => image.year === year);
        populateGrid(filteredImages);
    }

    // Drag functionality
    let isDown = false;
    let startX;
    let scrollLeft;

    function handleMouseDown(e) {
        isDown = true;
        grid.classList.add('active');
        startX = e.pageX - grid.offsetLeft;
        scrollLeft = grid.scrollLeft;
    }

    function handleMouseLeave() {
        isDown = false;
        grid.classList.remove('active');
    }

    function handleMouseUp() {
        isDown = false;
        grid.classList.remove('active');
    }

    function handleMouseMove(e) {
        if (!isDown) return;
        e.preventDefault();
        const x = e.pageX - grid.offsetLeft;
        const walk = (x - startX); // Adjust this value to change the drag speed
        grid.scrollLeft = scrollLeft - walk;
    }

    grid.addEventListener('mousedown', handleMouseDown);
    grid.addEventListener('mouseleave', handleMouseLeave);
    grid.addEventListener('mouseup', handleMouseUp);
    grid.addEventListener('mousemove', handleMouseMove);
});
