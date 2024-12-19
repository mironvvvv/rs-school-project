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
  } else {
    header.classList.remove("header-active");
    body.style.overflow = "auto";
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

  const filteredGifts =
    category === "all"
      ? [...gifts].sort(() => Math.random() - 0.5)
      : gifts.filter((gift) => gift.category === category);

  filteredGifts.forEach((gift) => {
    const card = document.createElement("div");
    card.classList.add("card");
    const categoryColor = gift.categoryColor || "#000";
    card.innerHTML = `
      <img class="card-img" src="../${gift.imgSrc}" alt="${gift.name}">
      <div class="best-content-text">
         <h4 style="color: ${categoryColor};">${gift.category}</h4>
        <h3 class="header-3-best">${gift.name}</h3>
      </div>
    `;
    card.addEventListener("click", () => openModal(gift));
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

function openModal(gift) {
  const modal = document.createElement("div");
  const categoryColor = gift.categoryColor || "#000";
  modal.classList.add("modal-overlay");
  modal.innerHTML = `
     <div class="modal">
      <button class="modal-close"><svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 40 40" fill="none">
<path d="M30 10L10 30" stroke="#181C29" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M10 10L30 30" stroke="#181C29" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
</svg></button>
        <img src="../${gift.imgSrc}" alt="${gift.name}" class="card-img">
    
      <div class="modal-body">
      <div class="text-title">
      <h4 style="color: ${categoryColor};">${gift.category}</h4>
      <h3 class="header-3-best">${gift.name}</h3>
      <p class="modal-description">${gift.description}</p>
      </div>
      <div class="text-superpowers">
        <h4 class="superpowers-h4">Adds superpowers to:</h4>
        <ul class="modal-superpowers">
          ${Object.entries(gift.superpowers)
            .map(
              ([key, value]) => `
            <li>
              <span class="superpower-key">${capitalize(key)}:</span> 
              <span class="superpower-value">${value}</span>
              <div class="snowflakes">${generateSnowflakes(value)}</div>
            </li>
          `
            )
            .join("")}
        </ul>
      </div>
    </div>
    </div>
  `;

  document.body.appendChild(modal);
  body.style.overflow = "hidden";

  modal.addEventListener("click", (event) => {
    if (event.target === modal || event.target.closest(".modal-close")) {
      modal.remove();
      body.style.overflow = "auto";
    }
  });
}
function generateSnowflakes(value) {
  const fullSnowflakes = Math.floor(value / 100);
  const hasPartialSnowflake = value % 100 > 0;
  const totalSnowflakes = 5;

  return Array.from({ length: totalSnowflakes }, (_, i) => {
    if (i < fullSnowflakes) return getSnowflake("#FF4646");
    if (i === fullSnowflakes && hasPartialSnowflake)
      return getSnowflake("rgba(255, 70, 70, 0.5)");
    return getSnowflake("#CCCCCC");
  }).join("");
}

function getSnowflake(color) {
  return `
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
      <path d="M12.1959 9.88162L11.6482 9.56542L13.1158 9.17219L12.8732 8.26704L10.5005 8.90278L9.38146 8.25667C9.39689 8.17336 9.40538 8.08765 9.40538 7.99997C9.40538 7.91229 9.39692 7.82655 9.38146 7.74327L10.5005 7.09716L12.8732 7.7329L13.1158 6.82775L11.6482 6.43452L12.1959 6.11831L14.546 5.97725L14.8921 4.02063L13.0246 3.34203L11.7274 5.30677L11.1797 5.62297L11.5729 4.15545L10.6678 3.91293L10.032 6.28561L8.91226 6.93211C8.78247 6.82103 8.63242 6.73313 8.4683 6.67494V5.3828L10.2052 3.64586L9.5426 2.98325L8.46827 4.05755V3.42515L9.51792 1.32584L7.99976 0L6.48157 1.3259L7.53122 3.42521V4.05761L6.45689 2.98332L5.79429 3.64592L7.53119 5.38286V6.675C7.36708 6.73319 7.21702 6.82109 7.08724 6.93217L5.96746 6.28568L5.33171 3.91299L4.42656 4.15551L4.81979 5.62304L4.27213 5.30684L2.9749 3.34209L1.10742 4.02069L1.45349 5.97731L3.80362 6.11838L4.35128 6.43458L2.88375 6.82781L3.1263 7.73296L5.49898 7.09722L6.61807 7.74333C6.60264 7.82664 6.59414 7.91235 6.59414 8.00003C6.59414 8.08771 6.60261 8.17345 6.61807 8.25673L5.49898 8.90285L3.1263 8.2671L2.88375 9.17226L4.35128 9.56548L3.80362 9.88169L1.45349 10.0227L1.10742 11.9793L2.97493 12.6579L4.27216 10.6932L4.81985 10.377L4.42662 11.8445L5.33177 12.087L5.96752 9.71435L7.0873 9.06786C7.21708 9.17894 7.36714 9.26684 7.53125 9.32503V10.6172L5.79435 12.3541L6.45696 13.0167L7.53129 11.9424V12.5748L6.48163 14.6741L7.99983 16L9.51802 14.6741L8.46837 12.5748V11.9424L9.5427 13.0167L10.2053 12.3541L8.4684 10.6172V9.32503C8.63251 9.26684 8.78257 9.17894 8.91235 9.06786L10.0321 9.71435L10.6679 12.087L11.573 11.8445L11.1798 10.377L11.7275 10.6932L13.0247 12.6579L14.8922 11.9793L14.5462 10.0227L12.1959 9.88162Z" fill="${color}"/>
    </svg>

  `;
}

function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}
