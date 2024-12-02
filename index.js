// Fetch reciters and categorize them
async function fetchAndCategorizeReciters() {
  const apiURL = "https://mp3quran.net/api/v3/reciters"; // Correct API endpoint
  try {
    const response = await fetch(apiURL);
    const data = await response.json();

    if (data && data.reciters && data.reciters.length > 0) {
      const categorizedReciters = categorizeReciters(data.reciters);
      displayCategories(categorizedReciters);
    } else {
      displayError("No reciters found. Please try again later.");
    }
  } catch (error) {
    console.error("Error fetching reciters:", error);
    displayError("Failed to fetch reciters. Please check your connection.");
  }
}

// Categorize reciters by the first letter of their name
function categorizeReciters(reciters) {
  const categories = {};
  reciters.forEach((reciter) => {
    const firstLetter = reciter.name.charAt(0); // Get the first letter
    if (!categories[firstLetter]) {
      categories[firstLetter] = [];
    }
    categories[firstLetter].push(reciter);
  });
  return categories;
}

// Display clickable categories
function displayCategories(categories) {
  const reciterList = document.getElementById("reciter-list");
  reciterList.innerHTML = ""; // Clear any existing content

  Object.keys(categories)
    .sort() // Sort categories alphabetically
    .forEach((letter) => {
      // Create a button for each letter
      const button = document.createElement("button");
      button.className = "category";
      button.innerText = letter;
      button.onclick = () =>
        displayRecitersByCategory(letter, categories[letter]);
      reciterList.appendChild(button);
    });
}

// Display reciters under a specific category
function displayRecitersByCategory(letter, reciters) {
  const reciterList = document.getElementById("reciter-list");
  reciterList.innerHTML = ``;
  const harf = document.getElementById("harf");
  harf.innerHTML = `اختر قارئ`;

  reciters.forEach((reciter) => {
    const button = document.createElement("button");
    button.className = "reciter";
    button.innerText = reciter.name;
    button.onclick = () => {
      sessionStorage.setItem("selectedReciter", JSON.stringify(reciter));
      window.location.href = "surahs.html";
    };
    reciterList.appendChild(button);
  });

  // Add a back button to return to the categories
  const backButton = document.createElement("button");
  backButton.className = "back-button";
  backButton.innerText = "العودة إلي القائمة السابقة";
  backButton.onclick = async () => {
    await fetchAndCategorizeReciters(), (harf.innerHTML = ":اختر الحرف");
  };
  reciterList.appendChild(backButton);
}

// Display error message
function displayError(message) {
  const reciterList = document.getElementById("reciter-list");
  reciterList.innerHTML = `<p style="color: red;">${message}</p>`;
}

// Initialize the app
document.addEventListener("DOMContentLoaded", fetchAndCategorizeReciters);
