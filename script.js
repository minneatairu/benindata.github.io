document.addEventListener("DOMContentLoaded", function () {
    const gridOne = document.getElementById('gridOne');
    const gridTwo = document.getElementById('gridTwo');
    const yearSlider = document.getElementById('yearSlider');
    const selectedYear = document.getElementById('selectedYear');
    const yearLabels = document.querySelectorAll('.slider-labels span');
    const years = Array.from(yearLabels).map(label => label.getAttribute('data-year'));

    // Fetch data from both JSON files and populate the grids
    fetch('data.json')
        .then(response => response.json())
        .then(data => {
            populateGrid(data.images, gridOne);
        })
        .catch(error => console.error('Error fetching data from data.json:', error));

    fetch('datatwo.json')
        .then(response => response.json())
        .then(data => {
            populateGrid(data.images, gridTwo);
        })
        .catch(error => console.error('Error fetching data from datatwo.json:', error));

    yearSlider.addEventListener('input', function() {
        const year = years[yearSlider.value];
        selectedYear.textContent = year;
        filterImagesByYear(year);
    });

    function populateGrid(images, grid) {
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

    function filterImagesByYear(year) {
        const allImages = document.querySelectorAll('.image-item');
        allImages.forEach(image => {
            if (image.getAttribute('data-year') === year) {
                image.style.display = 'block';
            } else {
                image.style.display = 'none';
            }
        });
    }

    // Drag functionality
    let isDown = false;
    let startX;
    let scrollLeft;

    function handleMouseDown(e) {
        isDown = true;
        gridOne.classList.add('active');
        gridTwo.classList.add('active');
        startX = e.pageX - gridOne.offsetLeft;
        scrollLeft = gridOne.scrollLeft;
    }

    function handleMouseLeave() {
        isDown = false;
        gridOne.classList.remove('active');
        gridTwo.classList.remove('active');
    }

    function handleMouseUp() {
        isDown = false;
        gridOne.classList.remove('active');
        gridTwo.classList.remove('active');
    }

    function handleMouseMove(e) {
        if (!isDown) return;
        e.preventDefault();
        const x = e.pageX - gridOne.offsetLeft;
        const walk = (x - startX); // Adjust this value to change the drag speed
        gridOne.scrollLeft = scrollLeft - walk;
        gridTwo.scrollLeft = scrollLeft - walk;
    }

    gridOne.addEventListener('mousedown', handleMouseDown);
    gridOne.addEventListener('mouseleave', handleMouseLeave);
    gridOne.addEventListener('mouseup', handleMouseUp);
    gridOne.addEventListener('mousemove', handleMouseMove);

    gridTwo.addEventListener('mousedown', handleMouseDown);
    gridTwo.addEventListener('mouseleave', handleMouseLeave);
    gridTwo.addEventListener('mouseup', handleMouseUp);
    gridTwo.addEventListener('mousemove', handleMouseMove);
});
