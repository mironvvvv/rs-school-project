const burgerMenu = document.querySelector(".burger-menu");
const navbar = document.querySelector(".navbar");
const overlay = document.querySelector(".overlay");
const header = document.querySelector(".header");
const body = document.body;

function toggleMenu() {
  burgerMenu.classList.toggle("active");
  navbar.classList.toggle("active");
  overlay.classList.toggle("active");
  body.classList.toggle("no-scroll");

  if (navbar.classList.contains("active")) {
    header.classList.add("header-active");
    body.style.overflow = "hidden";
    overlay.classList.add("active");
  } else {
    header.classList.remove("header-active");
    body.style.overflow = "auto";
    overlay.classList.remove("active");
  }
}

function closeMenuOnResize() {
  if (window.innerWidth > 768) {
    burgerMenu.classList.remove("active");
    navbar.classList.remove("active");
    overlay.classList.remove("active");
    body.classList.remove("no-scroll");
    header.classList.remove("header-active");
  }
}
window.addEventListener("DOMContentLoaded", () => {
  burgerMenu.classList.remove("active");
  navbar.classList.remove("active");
  overlay.classList.remove("active");
  body.classList.remove("no-scroll");
  header.classList.remove("header-active");
});

burgerMenu.addEventListener("click", toggleMenu);

overlay.addEventListener("click", toggleMenu);

document.querySelectorAll(".nav-link").forEach((link) => {
  link.addEventListener("click", function (event) {
    if (!link.classList.contains("disabled")) {
      toggleMenu();
    }
  });
});

document.querySelectorAll(".nav-link.disabled").forEach((link) => {
  link.addEventListener("click", function (event) {
    event.preventDefault();

    burgerMenu.classList.remove("active");
    navbar.classList.remove("active");
    overlay.classList.remove("active");
    body.classList.remove("no-scroll");
    header.classList.remove("header-active");
  });
});

window.addEventListener("resize", closeMenuOnResize);

function loadGifts() {
  fetch("../gifts.json")
    .then((response) => response.json())
    .then((gifts) => {
      displayGifts(gifts, "all");
      setupTabs(gifts);
    })
    .catch((error) => {
      console.error("Ошибка при загрузке данных:", error);
    });
}

function displayGifts(gifts, category) {
  const giftsContainer = document.querySelector(".gift-cards");
  giftsContainer.innerHTML = "";

  let filteredGifts =
    category === "all"
      ? [...gifts].sort(() => Math.random() - 0.5)
      : gifts.filter((gift) => gift.category === category);

  filteredGifts.forEach((gift) => {
    const card = document.createElement("div");
    card.classList.add("card");
    const categoryColor = gift.categoryColor;
    card.innerHTML = `
      <img class="card-img" src="${gift.imgSrc}" alt="${gift.name}">
      <div class="best-content-text">
         <h4 style="color: ${categoryColor};">${gift.category}</h4>
        <h3 class="header-3-best">${gift.name}</h3>
       
      </div>
    `;
    giftsContainer.appendChild(card);
  });
}

function setupTabs(gifts) {
  const tabs = document.querySelectorAll(".tabs-action");
  tabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      tabs.forEach((t) => t.classList.remove("active"));
      tab.classList.add("active");

      const category = tab.getAttribute("data-category");
      displayGifts(gifts, category);
    });
  });
}

window.onload = loadGifts;

document.addEventListener('DOMContentLoaded', () => {
    const scrollToTopBtn = document.getElementById('scrollToTop');

    
    window.addEventListener('scroll', () => {
        if (window.innerWidth <= 768 && window.scrollY > 300) {
            scrollToTopBtn.classList.add('show');
        } else {
            scrollToTopBtn.classList.remove('show');
        }
    });

    
    scrollToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
        
    });
    updateButtonVisibility();
});