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
    link.addEventListener('click', function(event) {
       
        if (!link.classList.contains('disabled')) {
            toggleMenu();
        }
    });
});


document.querySelectorAll('.nav-link.disabled').forEach(link => {
    link.addEventListener('click', function(event) {
        
        event.preventDefault();
        
        burgerMenu.classList.remove('active');
        navbar.classList.remove('active');
        overlay.classList.remove('active');
        body.classList.remove("no-scroll");
        header.classList.remove('header-active');
    });
});

window.addEventListener('resize', closeMenuOnResize);