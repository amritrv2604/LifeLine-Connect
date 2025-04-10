document.querySelector(".close-icon").addEventListener("click", function (e) {
  e.preventDefault();
  document.getElementById("about").classList.add("fade-out");
  setTimeout(() => {
    window.location.href = this.getAttribute("href");
  }, 200); // 0.2s = fadeOut duration
});

document.addEventListener("DOMContentLoaded", () => {
  const closeBtn = document.querySelector(".close-btn");
  closeBtn.addEventListener("click", () => {
    window.location.href = "index.html";
  });

  // Testimonial Slider
  const testimonials = document.querySelectorAll(".testimonial");
  let currentIndex = 0;

  function showTestimonial(index) {
    testimonials.forEach((t, i) => {
      t.style.display = i === index ? "block" : "none";
    });
  }

  document.getElementById("prevTestimonial").addEventListener("click", () => {
    currentIndex =
      (currentIndex - 1 + testimonials.length) % testimonials.length;
    showTestimonial(currentIndex);
  });

  document.getElementById("nextTestimonial").addEventListener("click", () => {
    currentIndex = (currentIndex + 1) % testimonials.length;
    showTestimonial(currentIndex);
  });

  showTestimonial(currentIndex);
});

const testimonials = document.querySelectorAll(".testimonial");
const prevBtn = document.getElementById("prevTestimonial");
const nextBtn = document.getElementById("nextTestimonial");

let currentTestimonial = 0;

function showTestimonial(index) {
  testimonials.forEach((el, i) => {
    el.classList.remove("show");
    el.style.display = "none";
  });
  testimonials[index].style.display = "block";
  setTimeout(() => testimonials[index].classList.add("show"), 50); // for fade-in
}

// Initial call
showTestimonial(currentTestimonial);

nextBtn.addEventListener("click", () => {
  currentTestimonial = (currentTestimonial + 1) % testimonials.length;
  showTestimonial(currentTestimonial);
});

prevBtn.addEventListener("click", () => {
  currentTestimonial =
    (currentTestimonial - 1 + testimonials.length) % testimonials.length;
  showTestimonial(currentTestimonial);
});
