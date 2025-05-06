document.querySelector(".close-icon").addEventListener("click", function (e) {
  e.preventDefault();
  document.querySelector(".features-container").classList.add("fade-out");
  setTimeout(() => {
    window.location.href = this.getAttribute("href");
  }, 200);
});
