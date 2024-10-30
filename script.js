let city = "Mumbai";
let currentLanguage = 'en';

const translations = {
    en: {
        placeholder: "Enter city",
        search: "Search",
        enterCity: "Please enter a valid city!",
        humidity: "Humidity:",
        pressure: "Pressure:",
        windSpeed: "Wind Speed:",
        temperature: "Current Temperature: ",
        SunRise: "Sunrise:",
        sunset: "Sunset:"
    },
    hi: {
        placeholder: "शहर दर्ज करें",
        search: "खोजें",
        enterCity: "कृपया एक मान्य शहर दर्ज करें!",
        humidity: "आर्द्रता:",
        pressure: "दबाव:",
        windSpeed: "हवा की गति:",
        temperature: "तापमान: ",
        SunRise: "सूर्योदय:",
        sunset: "सूर्यास्त:"
    },
    mr: {
        placeholder: "शहर प्रविष्ट करा",
        search: "शोधा",
        enterCity: "कृपया वैध शहर प्रविष्ट करा!",
        humidity: "आर्द्रता:",
        pressure: "दबाव:",
        windSpeed: "हवेमान:",
        temperature: "तापमान: ",
        SunRise: "सूर्योदय:",
        sunset: "सूर्यास्त:"
    },
    pa: {
        placeholder: "ਸ਼ਹਿਰ ਦਾਖਲ ਕਰੋ",
        search: "ਖੋਜੋ",
        enterCity: "ਕਿਰਪਾ ਕਰਕੇ ਇੱਕ ਵੈਧ ਸ਼ਹਿਰ ਦਾਖਲ ਕਰੋ!",
        humidity: "ਨਮੀ:",
        pressure: "ਦਬਾਅ:",
        windSpeed: "ਹਵਾ ਦੀ ਗਤੀ:",
        temperature: "ਤਾਪਮਾਨ: ",
        sunrise: "ਸੂਰਜ ਉਗਣ ਦਾ ਸਮਾਂ:",
        sunset: "ਸੂਰਜ ਡੁੱਬਣ ਦਾ ਸਮਾਂ:"
    },
    te: {
        placeholder: "నగరం నమోదు చేయండి",
        search: "శోధన",
        enterCity: "దయచేసి చెల్లుబాటు అయ్యే నగరం నమోదు చేయండి!",
        humidity: "ఆర్ద్రత:",
        pressure: "పీడనం:",
        windSpeed: "గాలి వేగం:",
        temperature: "ఉష్ణోగ్రత: ",
        sunrise: "సూర్యోదయం:",
        sunset: "సూర్యాస్తమయం:"
    },
    ta: {
        placeholder: "நகரம் சேர்க்கவும்",
        search: "தேடுக",
        enterCity: "சரியான நகரத்தை உள்ளிடவும்!",
        humidity: "ஆர்த்திரம்:",
        pressure: "அழுத்தம்:",
        windSpeed: "காற்றின் வேகம்:",
        temperature: "அருகு வெப்பநிலை: ",
        sunrise: "சூரிய உதயம்:",
        sunset: "சூரிய இறக்கம்:"
    },
    gu: {
        placeholder: "શહેર દાખલ કરો",
        search: "શોધો",
        enterCity: "કૃપા કરીને માન્ય શહેર દાખલ કરો!",
        humidity: "આર્ધ્રતા:",
        pressure: "દબાણ:",
        windSpeed: "હવા નો ઝડપ:",
        temperature: "તાપમાન: ",
        sunrise: "સૂર્યોદય:",
        sunset: "સૂર્યાસ્ત:"
    }
};

// Function to update texts based on selected language
function updateTexts() {
    const lang = translations[currentLanguage];
    document.getElementById('city').placeholder = lang.placeholder;
    document.getElementById('Search').innerText = lang.search;
    document.getElementById("humidityLabel").innerText = lang.humidity;
    document.getElementById("pressureLabel").innerText = lang.pressure;
    document.getElementById("windSpeedLabel").innerText = lang.windSpeed;
    document.getElementById("tempLabel").innerText = lang.temperature;
    document.getElementById("riseLabel").innerText = lang.sunrise;
    document.getElementById("setLabel").innerText = lang.sunset;
}

// Language change handler
document.getElementById('language').addEventListener('change', function () {
    currentLanguage = this.value;
    updateTexts();
});

// Get current time in IST
function updateTime() {
    const options = { timeZone: 'Asia/Kolkata', hour: 'numeric', minute: 'numeric', hour12: true };
    const currentTime = new Date().toLocaleString('en-US', options);
    const [time, ampm] = currentTime.split(' ');
    document.getElementById('time').innerText = time;
    document.getElementById('ampm').innerText = ampm;
}

// Get weather data
function getWeather() {
    const cityName = document.getElementById('city').value;
    if (!cityName) {
        alert(translations[currentLanguage].enterCity);
        return;
    }

    // Example API call for weather data (Replace with your API key and URL)
    const apiKey = '84b0c17dea52cc61d0f19714f5e81597'; // Replace with your actual API key
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=metric`;

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => appendsData(data))
        .catch(error => console.error('Error fetching weather data:', error));

    // Update map
    document.getElementById('map1').src = `https://maps.google.com/maps?q=${cityName}&t=&z=13&ie=UTF8&iwloc=&output=embed`;
}

// Function to display weather data
function appendsData(data) {
    document.getElementById("cityName").innerText = data.name;
    document.getElementById("temp").innerText = Math.round(data.main.temp); // Use Math.round for temperature
    document.getElementById("humidity").innerText = data.main.humidity;
    document.getElementById("pressure").innerText = data.main.pressure;
    document.getElementById("wind").innerText = data.wind.speed;
    document.getElementById("rise").innerText = moment(data.sys.sunrise * 1000).format('h:mm a');
    document.getElementById("set").innerText = moment(data.sys.sunset * 1000).format('h:mm a');

    // Fetch and display forecast
    let lat = data.coord.lat;
    let lon = data.coord.lon;
    fetchForecast(lat, lon);
}

// Initialize the app
updateTexts(); // Set initial texts
updateTime(); // Set initial time
setInterval(updateTime, 1000); // Update time every second
