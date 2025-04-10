// Initialize Three.js Scene
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
const renderer = new THREE.WebGLRenderer({
  canvas: document.getElementById("3d-logo"),
  alpha: true,
});
renderer.setSize(300, 300);

function showPage(id) {
  document.getElementById("about").style.right = "-100%";
  document.getElementById("contact").style.right = "-100%";
  document.getElementById("motivational-tips").style.right = "-100%";

  document.getElementById(id).style.right = "0";
}

document.querySelectorAll("a").forEach((link) => {
  if (link.getAttribute("href").startsWith("#")) {
    link.addEventListener("click", function (e) {
      e.preventDefault();
      showPage(link.getAttribute("href").substring(1));
    });
  }
});

function toggleMenu(x) {
  x.classList.toggle("change");
  document.getElementById("navMenu").classList.toggle("show");
}

function closeMenu() {
  const hamburger = document.querySelector(".hamburger");
  const nav = document.getElementById("navMenu");
  if (hamburger.classList.contains("change")) {
    hamburger.classList.remove("change");
    nav.classList.remove("show");
  }
}

// Logo interaction effects
const logo = document.querySelector(".logo");

logo.addEventListener("mouseenter", () => {
  gsap.to(logo, {
    scale: 1.05,
    duration: 0.3,
  });
});

logo.addEventListener("mouseleave", () => {
  gsap.to(logo, {
    scale: 1,
    duration: 0.3,
  });
});

// Click effect
logo.addEventListener("click", () => {
  gsap.to(logo, {
    scale: 0.9,
    duration: 0.2,
    yoyo: true,
    repeat: 1,
  });
});
