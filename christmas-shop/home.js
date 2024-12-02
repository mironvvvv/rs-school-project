const burgerMenu = document.querySelector('.burger-menu');
const navbar = document.querySelector('.navbar');
const overlay = document.querySelector('.overlay');
const header = document.querySelector('.header');
const body = document.body;

function toggleMenu() {
    burgerMenu.classList.toggle('active');
    navbar.classList.toggle('active');
    overlay.classList.toggle('active');
    body.classList.toggle("no-scroll");
    
    
    if (navbar.classList.contains('active')) {
        header.classList.add('header-active');
        body.style.overflow = 'hidden';
overlay.classList.add('active')
    } else {
        header.classList.remove('header-active');
        body.style.overflow = 'auto';
        overlay.classList.remove('active')
 
    }
}

function closeMenuOnResize() {
    if (window.innerWidth > 768) {
        
        burgerMenu.classList.remove('active');
        navbar.classList.remove('active');
        overlay.classList.remove('active');
        body.classList.remove("no-scroll");
        header.classList.remove('header-active');
    }
}
window.addEventListener('DOMContentLoaded', () => {
    burgerMenu.classList.remove('active');
    navbar.classList.remove('active');
    overlay.classList.remove('active');
    body.classList.remove('no-scroll');
    header.classList.remove('header-active');
});


burgerMenu.addEventListener('click', toggleMenu);
overlay.addEventListener('click', toggleMenu);
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', toggleMenu);
});
window.addEventListener('resize', closeMenuOnResize);


document.addEventListener("DOMContentLoaded", () => {
    console.log("DOM загружен!");
  
    const slider = document.getElementById('carousel');
    const slides = document.querySelectorAll('.card-carousel'); 
    const btnLeft = document.querySelector('.slider-left');
    const btnRight = document.querySelector('.slider-right');
  
    let currentIndex = 0;
    const slideWidth = 400; 
    const gap = 20; 
    const visibleWidth = 940; 
    let step = 135; 
    let clicksRequired = window.innerWidth >= 769 ? 3 : 6; 
    let maxIndex = slides.length - 1; 
  
    
    function updateSliderParameters() {
      clicksRequired = window.innerWidth >= 769 ? 3 : 6; 
      step = (visibleWidth - gap * (slides.length - 1)) / clicksRequired;
      console.log("Шаг прокрутки:", step);
      console.log("Необходимое количество кликов:", clicksRequired);
      maxIndex = slides.length - 1;
      updateSliderPosition(); 
    }
  
    
    function updateSliderPosition() {
      console.log("Позиция слайдера:", `translateX(-${currentIndex * step}px)`);
      slider.style.transform = `translateX(-${currentIndex * step}px)`; 
      console.log("Текущий индекс:", currentIndex);
  
      
      btnLeft.disabled = currentIndex === 0; 
      btnRight.disabled = currentIndex === maxIndex; 
  
     
      btnLeft.style.cursor = currentIndex === 0 ? "not-allowed" : "pointer";
      btnRight.style.cursor = currentIndex === maxIndex ? "not-allowed" : "pointer";
    }
  
    
    btnRight.addEventListener('click', () => {
      if (currentIndex < maxIndex) {
        currentIndex++;
        updateSliderPosition();
      }
    });
  
    btnLeft.addEventListener('click', () => {
      if (currentIndex > 0) {
        currentIndex--;
        updateSliderPosition();
      }
    });
  
    
    window.addEventListener('resize', updateSliderParameters);
    updateSliderParameters(); 
  });

  

  
function updateTimer() {
   
    const newYear = new Date('2025-01-01T00:00:00Z');
  
    
    const now = new Date();
  
   
    const remainingTime = newYear - now;
  
    
    const days = Math.floor(remainingTime / (1000 * 60 * 60 * 24));
    const hours = Math.floor((remainingTime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((remainingTime % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((remainingTime % (1000 * 60)) / 1000);
  
   
    document.getElementById("days").textContent = days;
    document.getElementById("hours").textContent = hours;
    document.getElementById("minutes").textContent = minutes;
    document.getElementById("seconds").textContent = seconds;
  }
  
 
  setInterval(updateTimer, 1000);
  
  
  updateTimer();

  

  document.addEventListener("DOMContentLoaded", function () {
   
    fetch('gifts.json')
      .then(response => response.json())
      .then(data => {
        
        const randomItems = getRandomItems(data, 4);
    
        populateBestGifts(randomItems);
      })
      .catch(error => console.error('Error fetching data:', error));
  });
  
  
  function getRandomItems(arr, num) {
    const shuffled = arr.sort(() => 0.5 - Math.random()); 
    return shuffled.slice(0, num); 
  }
  
  
  function populateBestGifts(items) {
    const cardsContainer = document.querySelector('.cards'); 
    cardsContainer.innerHTML = ''; 
  
    
    items.forEach(item => {
      
      const card = document.createElement('div');
      card.classList.add('card');
  
      
      card.innerHTML = `
        <img class="card-img" src="${item.imgSrc}" alt="${item.name}">
        <div class="best-content-text">
          <h4 class="header-4">${item.category}</h4>
          <h3 class="header-3-best">${item.name}</h3>
        </div>
      `;
      
      
      cardsContainer.appendChild(card);
    });
  }
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  




