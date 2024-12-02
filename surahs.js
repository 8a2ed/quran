// List of all surahs with their names and numbers
//    { number: , name: ''},
const surahs = [
    { number: 1, name: 'الفاتحة' },
    { number: 2, name: 'البقرة' },
    { number: 3, name: 'ال عمران' },
    { number: 4, name: 'النساء' },
    { number: 5, name: 'المائدة' },
    { number: 6, name: 'الأنعام' },
    { number: 7, name: 'الأعراف' },
    { number: 8, name: 'الأنفال' },
    { number: 9, name: 'التوبة' },
    { number: 10, name: 'يونس' },
    { number: 11, name: 'هود'},
    { number: 12, name: 'يوسف'},
    { number: 13, name: 'الرعد'},
    { number: 14, name: 'إبراهيم'},
    { number: 15, name: 'الحجر'},
    { number: 16, name: 'النحل'},
    { number: 17, name: 'الإسراء'},
    { number: 18, name: 'الكهف'},
    { number: 114, name: 'الناس' },
];

// Display surahs dynamically
function displaySurahs() {
    const reciter = JSON.parse(sessionStorage.getItem('selectedReciter'));

    if (!reciter) {
        alert('لم يتم اختيار قارئ سيتم توجيهك للصفحة الرئيسية');
        window.location.href = 'index.html';
        return;
    }

    const surahList = document.getElementById('surah-list');
    surahs.forEach(surah => {
        const button = document.createElement('button');
        button.className = 'surah';
        button.innerText = `${surah.number}. ${surah.name}`;
        button.onclick = () => playSurah(reciter, surah.number, surah);
        surahList.appendChild(button);
    });
}

// Play the selected surah audio
function playSurah(reciter, surahNumber, surah) {
    console.log(reciter)
    const audioPlayer = document.getElementById('quran-audio');
    
    // Ensure surah number is formatted as 3 digits, e.g., 001, 002, 114
    const formattedSurahNumber = String(surahNumber).padStart(3, '0');
    const surahURL = `${reciter.moshaf[0].server}/${formattedSurahNumber}.mp3`;

    audioPlayer.src = surahURL;

    // Check if the audio URL is valid
    audioPlayer.onloadeddata = () => {
        audioPlayer.play();
        document.getElementById('current-surah').innerText = `يتم تشغيل: سورة ${surah.name}`;
    };

    // Handle errors if the URL is invalid
    audioPlayer.onerror = () => {
        alert('تعذر تشغيل السورة يرجي اختيار قارئ اخر او التأكد من اتصالك بالإنترنت');
        document.getElementById('current-surah').innerText = 'Error: Failed to load the surah.';
    };
}


// Initialize surah page
document.addEventListener('DOMContentLoaded', displaySurahs);
