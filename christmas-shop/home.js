
const leftArrow = document.querySelector('.slider-left');
const rightArrow = document.querySelector('.slider-right');
const carouselItems = document.querySelector('.carousel'); 
let currentIndex = 0; 
const totalItems = document.querySelectorAll('.carousel').length; 

function updateArrows() {
    
    leftArrow.disabled = currentIndex === 0;

    rightArrow.disabled = currentIndex === totalItems - 1;
}


function moveCarousel(direction) {
    if (direction === 'left' && currentIndex > 0) {
        currentIndex--;
    } else if (direction === 'right' && currentIndex < totalItems - 1) {
        currentIndex++;
    }

    const offset = -currentIndex * 220; 
    carouselItems.style.transform = `translateX(${offset}px)`;

    
    updateArrows();
}


updateArrows();


leftArrow.addEventListener('click', () => moveCarousel('left'));
rightArrow.addEventListener('click', () => moveCarousel('right'));
