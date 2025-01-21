// mapowanie klas CSS zaleznie od detailsow
// detail : klasa css
const detailsClasses = {
    "Visa not required": "visa-free",
    "Visa-free": "visa-free",
    "Visa required": "visa-required",
    "Visa on arrival": "visa-on-arrival",
    "eVisa": "evisa",
    "Freedom of movement": "freedom-of-movement",
    "Admission refused": "admission-refused",
    "ESTA required": "other-requirements",
    "ETIAS required": "other-requirements"
};

// dane z pliku
fetch('visa_data.json')
    .then(response => response.json())
    .then(data => {
        const countrySelect = document.getElementById('country-select');
        const visaResults = document.getElementById('visa-results');

        // kraje / jakim citizenem jestes
        const countries = Object.keys(data);
        countries.forEach(country => {
            const option = document.createElement('option');
            option.value = country;
            option.textContent = country.replace(/Visa requirements for /, '');
            countrySelect.appendChild(option);
        });

        // wyswietlanie
        const displayVisaInfo = (selectedCountry) => {
            visaResults.innerHTML = '';

            const visas = data[selectedCountry] || [];
            visas.forEach(visa => {

                const card = document.createElement('div');

                // klasa CSSowa zaleznie od detailsow
                const cardClass = Object.keys(detailsClasses).find(key => visa.details.includes(key));

                card.className = `card ${cardClass ? detailsClasses[cardClass] : ''}`;

                card.innerHTML = `
                    <h2>${visa.destination}</h2>
                    <p class="details">${visa.details}</p>
                    ${visa.notes && visa.notes !== "N/A" ? `<p class="notes">${visa.notes}</p>` : ''}
                `;
                visaResults.appendChild(card);
            });
        };

        countrySelect.addEventListener('change', () => {
            const selectedCountry = countrySelect.value;
            displayVisaInfo(selectedCountry);
        });

        // domyslnie 1 kraj
        if (countries.length > 0) {
            countrySelect.value = countries[0];
            displayVisaInfo(countries[0]);
        }
    })
    .catch(error => console.error('Error loading visa data:', error));
