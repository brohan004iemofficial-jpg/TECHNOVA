// TECHNOVA 2026 interactions: mobile menu, event countdown and demo registration validation.

const menuButton = document.getElementById("menuButton");
const nav = document.getElementById("nav");

menuButton.addEventListener("click", () => {
  const open = nav.classList.toggle("open");
  menuButton.setAttribute("aria-expanded", String(open));
  menuButton.textContent = open ? "×" : "☰";
});

nav.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    nav.classList.remove("open");
    menuButton.setAttribute("aria-expanded", "false");
    menuButton.textContent = "☰";
  });
});

// Event date: 15 October 2026 at 10:00 AM in the visitor's local time.
const eventDate = new Date(2026, 9, 15, 10, 0, 0);

function updateCountdown() {
  const now = new Date();
  let difference = eventDate.getTime() - now.getTime();

  if (difference <= 0) {
    document.getElementById("days").textContent = "00";
    document.getElementById("hours").textContent = "00";
    document.getElementById("minutes").textContent = "00";
    document.getElementById("seconds").textContent = "00";
    document.getElementById("countdownNote").textContent =
      now.toDateString() === eventDate.toDateString()
        ? "TECHNOVA day is here!"
        : "Thanks for being part of TECHNOVA 2026.";
    return;
  }

  const day = Math.floor(difference / (1000 * 60 * 60 * 24));
  const hour = Math.floor((difference / (1000 * 60 * 60)) % 24);
  const minute = Math.floor((difference / (1000 * 60)) % 60);
  const second = Math.floor((difference / 1000) % 60);

  document.getElementById("days").textContent = String(day).padStart(2, "0");
  document.getElementById("hours").textContent = String(hour).padStart(2, "0");
  document.getElementById("minutes").textContent = String(minute).padStart(2, "0");
  document.getElementById("seconds").textContent = String(second).padStart(2, "0");
}
updateCountdown();
setInterval(updateCountdown, 1000);

const form = document.getElementById("registrationForm");
const message = document.getElementById("message");

form.addEventListener("submit", (event) => {
  event.preventDefault();

  const name = document.getElementById("studentName").value.trim();
  const email = document.getElementById("studentEmail").value.trim();
  const department = document.getElementById("department").value;
  const activity = document.getElementById("activity").value;
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  message.className = "form-message";

  if (!name) {
    displayMessage("Please enter your full name.", "error");
    document.getElementById("studentName").focus();
    return;
  }
  if (!emailPattern.test(email)) {
    displayMessage("Please enter a valid email address.", "error");
    document.getElementById("studentEmail").focus();
    return;
  }
  if (!department) {
    displayMessage("Please select your department.", "error");
    document.getElementById("department").focus();
    return;
  }
  if (!activity) {
    displayMessage("Please select an activity.", "error");
    document.getElementById("activity").focus();
    return;
  }

  displayMessage(
    `Thank you, ${name}! Your interest in ${activity} has been checked successfully in this demo.`,
    "success"
  );
  form.reset();
});

function displayMessage(text, type) {
  message.textContent = text;
  message.classList.add(type);
}
