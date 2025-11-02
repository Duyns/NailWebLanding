// Sticky header
document.addEventListener("DOMContentLoaded", function () {
  const header = document.querySelector(".header");
});

window.addEventListener("scroll", function () {
  const header = document.querySelector(".header");
  if (window.scrollY > 8) {
    header.classList.add("sticky");
  } else {
    header.classList.remove("sticky");
  }
});

// Popup reference
const galleryPopup = document.querySelector(".nail-reference-popup");
const popupContent = document.querySelector(".popup__content");
const openBtns = document.querySelectorAll(".btn-more-nail");
const closeBtn = document.querySelector(".popup__close");
const tabs = document.querySelectorAll(".popup__tab");
const grids = document.querySelectorAll(".popup__grid");

const resetTabs = (activeTab = tabs[0]) => {
  tabs.forEach((t) => t.classList.remove("active"));
  grids.forEach((g) => g.classList.remove("active"));
  activeTab.classList.add("active");
  document
    .getElementById(`tab-${activeTab.dataset.tab}`)
    ?.classList.add("active");
};

openBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    galleryPopup.style.display = "flex";
    document.body.classList.add("no-scroll");
    requestAnimationFrame(() => {
      galleryPopup.classList.add("show");
      resetTabs();
      getImagesInTab();
    });
  });
});

const closePopup = () => {
  galleryPopup.classList.remove("show");
  setTimeout(() => {
    galleryPopup.style.display = "none";
    document.body.classList.remove("no-scroll");
    resetTabs();
  }, 200);
};

closeBtn.addEventListener("click", closePopup);
window.addEventListener(
  "click",
  (e) => e.target === galleryPopup && closePopup()
);

tabs.forEach((tab) =>
  tab.addEventListener("click", () => {
    resetTabs(tab);
    getImagesInTab();
  })
);

//Popup image scale
const imgPopup = document.querySelector(".popup-image");
const imgPopupContent = document.getElementById("popup-img");
const imgPopupClose = imgPopup.querySelector(".popup__close");
const imgPrev = imgPopup.querySelector(".popup__prev");
const imgNext = imgPopup.querySelector(".popup__next");

var currentImageIndex = 0;
var imagesInTab;

function getImagesInTab() {
  imagesInTab = Array.from(
    document.querySelectorAll(".popup__grid.active img")
  );
  currentImageIndex = 0;
  imagesInTab.forEach((img, index) => {
    img.removeEventListener("click", () => {});
    img.addEventListener("click", () => {
      currentImageIndex = index;
      openImage(currentImageIndex);
    });
  });
}

function openImage(index) {
  imgPopup.style.display = "flex";
  imgPopupContent.src = imagesInTab[index].src;

  document.body.classList.add("no-scroll");
  imgPrev.style.visibility = currentImageIndex === 0 ? "hidden" : "visible";
  imgNext.style.visibility =
    currentImageIndex === imagesInTab.length - 1 ? "hidden" : "visible";
}

imgPopupClose.addEventListener("click", closeImage);
imgPopup.addEventListener("click", (e) => {
  if (e.target === imgPopup) closeImage();
});

function closeImage() {
  imgPopup.style.display = "none";
  document.body.classList.remove("no-scroll");
}

imgPrev.addEventListener("click", () => {
  if (currentImageIndex === 0) return;
  currentImageIndex -= 1;
  openImage(currentImageIndex);
});

imgNext.addEventListener("click", () => {
  if (currentImageIndex === imagesInTab.length - 1) return;
  currentImageIndex += 1;
  openImage(currentImageIndex);
});

document.addEventListener("keydown", (e) => {
  if (imgPopup.style.display === "flex") {
    if (e.key === "ArrowLeft") imgPrev.click();
    if (e.key === "ArrowRight") imgNext.click();
    if (e.key === "Escape") closeImage();
  }
});
