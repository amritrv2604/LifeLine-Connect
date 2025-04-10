document.getElementById("message").addEventListener("input", function () {
  let count = this.value.length;
  document.getElementById("charCount").innerText = count + " / 250";
});

// Email validation
const emailInput = document.getElementById("email");
emailInput.addEventListener("input", function () {
  if (!this.checkValidity()) {
    this.style.border = "2px solid #ff4444";
  } else {
    this.style.border = "none";
  }
});

// Name validation (allows only letters/spaces)
document.getElementById("name").addEventListener("input", function () {
  this.value = this.value.replace(/[^a-zA-Z\s]/g, "");
});

// Form Submission with Success Animation
document
  .getElementById("contactForm")
  .addEventListener("submit", async function (event) {
    event.preventDefault();

    const button = this.querySelector("button");
    button.innerHTML = '<div class="spinner"></div>';
    button.disabled = true;

    try {
      // Direct form submission to FormSubmit
      const formData = new FormData(this);

      const response = await fetch(this.action, {
        method: "POST",
        body: formData,
        headers: {
          Accept: "application/json",
        },
      });

      if (response.ok) {
        // Show success message
        document.getElementById("userName").innerText =
          document.getElementById("name").value;
        document.getElementById("userEmail").innerText =
          document.getElementById("email").value;
        document.getElementById("successMessage").classList.remove("hidden");
        this.reset();
        document.getElementById("charCount").innerText = "0 / 250";
      } else {
        throw new Error("Form submission failed");
      }
    } catch (error) {
      alert("❌ Message failed to send. Please try again later.");
    } finally {
      button.innerHTML = "Send";
      button.disabled = false;
    }
  });

// closing animation for the close icon
document.querySelector(".close-icon").addEventListener("click", function (e) {
  e.preventDefault(); // Default close action rokega
  const contactPage = document.getElementById("contact");

  // Fade-out animation start karo
  contactPage.classList.add("fade-out");

  // Animation khatam hone ke baad redirect karo
  setTimeout(() => {
    window.location.href = this.getAttribute("href"); // Close icon ka link
  }, 200); // 0.2s = animation duration
});
