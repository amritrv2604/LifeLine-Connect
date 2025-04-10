document.addEventListener("DOMContentLoaded", function () {
  const sosBoxes = document.querySelectorAll(".sos-box");

  sosBoxes.forEach((box) => {
    box.addEventListener("click", function () {
      const phoneNumber = this.getAttribute("data-phone"); // Get phone number from data attribute

      if (phoneNumber) {
        // Open WhatsApp chat with the number
        const whatsappURL = `https://wa.me/${phoneNumber}`;
        window.open(whatsappURL, "_blank");
      } else {
        alert("Phone number not available.");
      }
    });
  });
});
