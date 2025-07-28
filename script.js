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
