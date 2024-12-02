// Handle Dark Mode Toggle
document.addEventListener("DOMContentLoaded", () => {
  const toggleButton = document.getElementById("dark-mode-toggle");
  const body = document.body;

  // Apply saved dark mode preference
  if (localStorage.getItem("darkMode") === "enabled") {
    body.classList.add("dark-mode");
    toggleButton.textContent = "☀️"; // Sun icon for light mode toggle
  } else {
    toggleButton.textContent = "🌙"; // Moon icon for dark mode toggle
  }

  // Toggle dark mode on button click
  toggleButton.addEventListener("click", () => {
    body.classList.toggle("dark-mode");

    // Save the preference to localStorage
    if (body.classList.contains("dark-mode")) {
      localStorage.setItem("darkMode", "enabled");
      toggleButton.textContent = "☀️"; // Sun icon for light mode toggle
    } else {
      localStorage.setItem("darkMode", "disabled");
      toggleButton.textContent = "🌙"; // Moon icon for dark mode toggle
    }
  });
});
