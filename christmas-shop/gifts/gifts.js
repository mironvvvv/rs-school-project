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
    
    // Добавляем класс к header при активации меню
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
        // Убираем все активные классы при расширении экрана
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

// Обработчик клика на оверлей для закрытия меню
overlay.addEventListener('click', toggleMenu);

// Обработчик клика на навигационные ссылки
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', function(event) {
        // Если ссылка активна, закрыть меню
        if (!link.classList.contains('disabled')) {
            toggleMenu();
        }
    });
});

// Обработчик для неактивных ссылок (disabled), чтобы предотвратить их поведение и закрыть меню
document.querySelectorAll('.nav-link.disabled').forEach(link => {
    link.addEventListener('click', function(event) {
        // Предотвращаем стандартное поведение ссылки
        event.preventDefault();
        // Закрываем меню, даже если ссылка неактивна
        burgerMenu.classList.remove('active');
        navbar.classList.remove('active');
        overlay.classList.remove('active');
        body.classList.remove("no-scroll");
        header.classList.remove('header-active');
    });
});

window.addEventListener('resize', closeMenuOnResize);