// Fetch reciters from the MP3 Quran API
async function fetchReciters() {
    const apiURL = 'https://mp3quran.net/api/v3/reciters'; // Correct API endpoint
    try {
        const response = await fetch(apiURL);
        const data = await response.json();

        if (data && data.reciters && data.reciters.length > 0) {
            displayReciters(data.reciters);
        } else {
            displayError('No reciters found. Please try again later.');
        }
    } catch (error) {
        console.error('Error fetching reciters:', error);
        displayError('تعذر تشغيل السورة يرجي اختيار قارئ اخر او التأكد من اتصالك بالإنترنت');

    }
}

// Display reciters dynamically on the homepage
function displayReciters(reciters) {
    const reciterList = document.getElementById('reciter-list');
    reciters.forEach(reciter => {
        const button = document.createElement('button');
        button.className = 'reciter';
        button.innerText = reciter.name;
        button.onclick = () => {
            sessionStorage.setItem('selectedReciter', JSON.stringify(reciter));
            window.location.href = 'surahs.html';
        };
        reciterList.appendChild(button);
    });
}

// Display error message
function displayError(message) {
    const reciterList = document.getElementById('reciter-list');
    reciterList.innerHTML = `<p style="color: red;">${message}</p>`;
}

// Initialize the app
document.addEventListener('DOMContentLoaded', fetchReciters);
