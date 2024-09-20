const form = document.getElementById('form');
const clearButton= document.getElementById('clearButton');
const submitButton = document.getElementById('submitButton');
const checkBox = document.getElementById('checkBox');


clearButton.addEventListener('click', (e) => {
    e.preventDefault();
    form.reset();
});

checkBox.addEventListener('change', (e) => {
    e.preventDefault();
    const formFields = form.querySelectorAll('input, select, textarea');
    if (checkBox.checked) {
        submitButton.disabled = false;
        formFields.forEach(field => {
            if (field !== checkBox) {
                field.disabled = true;
                field.value = '';
            }
        });
        console.log('hello check box checked');
    } else {
        submitButton.disabled = true;
        formFields.forEach(field => {
            field.disabled = false;
        });
        validateForm();
    }
});

form.addEventListener('input', validateForm);


submitButton.addEventListener('click', async (e) => {
    e.preventDefault();
    console.log('hi');
    const streetValue = document.getElementById('streetName').value;
    const cityValue = document.getElementById('cityName').value;
    const stateValue = document.getElementById('select-state').value;

    console.log('Street:', streetValue);
    console.log('City:', cityValue);
    console.log('State:', stateValue);
    await getFormattedAddress(streetValue, cityValue, stateValue);
});

function getFormData() {
    const street_value = document.getElementById('streetName').value;
    const city_value = document.getElementById('cityName').value;
    const state_value = document.getElementById('select-state').value;

    console.log('Street:', street_value);
    console.log('City:', city_value);
    console.log('State:', state_value);
    // getFormattedAddress(street_value, city_value, state_value);
}

async function getLocation() {
    const accessToken = ''; 

    try {
        const response = await fetch(`https://ipinfo.io/json?token=${accessToken}`);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        const [latitude, longitude] = data.loc.split(',');
        console.log('Latitude:', latitude, 'Longitude:', longitude);
    } catch (error) {
        console.error('Error fetching location data:', error);
    }
}

function validateForm() {
    const streetValue = document.getElementById('streetName').value;
    const cityValue = document.getElementById('cityName').value;
    const stateValue = document.getElementById('select-state').value;

    if (streetValue && cityValue && stateValue) {
        submitButton.disabled = false;
    } else {
        submitButton.disabled = true;
    }
}

async function getFormattedAddress(street_value, city_value, state_value) {
    const apiKey = ''; 
    const address = `${street_value}, ${city_value}, ${state_value}`;

    try {
        const response = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=${apiKey}`);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        if (data.results && data.results.length > 0) {
            const formattedAddress = data.results[0].formatted_address;
            const latitude = data.results[0].geometry.location.lat;
            const longitude = data.results[0].geometry.location.lng;
            console.log('Formatted Address:', formattedAddress);
            console.log('Latitude:', latitude);
            console.log('Longitude:', longitude);
        } else {
            console.log('No results found');
        }
    } catch (error) {
        console.error('Error fetching geocode data:', error);
    }
}
