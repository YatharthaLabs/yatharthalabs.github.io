// Shrink header on scroll
window.addEventListener("scroll", function () {
  let header = document.querySelector("header");
  if (window.scrollY > 40) {
    header.classList.add("shrink");
  } else {
    header.classList.remove("shrink");
  }
});
// Mobile menu toggle
document.querySelector(".menu-btn").addEventListener("click", function () {
  document.querySelector("nav").classList.toggle("active");
});
