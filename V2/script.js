fetch('attractions_data.json')
    .then(response => response.json())
    .then(data => {
        const countrySelect = document.getElementById('country-select');
        const slider = document.getElementById('attractions-slider');

        // lista krajow
        const countries = Object.keys(data);
        countries.forEach(country => {
            const option = document.createElement('option');
            option.value = country;
            option.textContent = country.replace(/-/g, ' ').toUpperCase(); // Formatowanie nazw krajów
            countrySelect.appendChild(option);
        });

        // atrakcje dla kraju
        const displayAttractions = (country) => {
            slider.innerHTML = '';
            const attractions = data[country];

            // dodawanie do slidera
            attractions.forEach(attraction => {
                const item = document.createElement('div');
                item.className = 'slider-item';

                item.innerHTML = `
                    <img src="${attraction.image || 'placeholder.jpg'}" alt="${attraction.name}">
                    <div class="content">
                        <h2>${attraction.name || 'Unknown Name'}</h2>
                        <p><strong>Location:</strong> ${attraction.location || 'Unknown Location'}</p>
                        <p>${attraction.description || 'No description available.'}</p>
                    </div>
                `;

                slider.appendChild(item);
            });

            // smooth przewijanie
            const clone = slider.innerHTML;
            slider.innerHTML += clone;
        };

        countrySelect.addEventListener('change', () => {
            const selectedCountry = countrySelect.value;
            displayAttractions(selectedCountry);
        });

        // domyslnie 1 kraj
        displayAttractions(countries[0]);
    })
    .catch(error => console.error('Error loading data:', error));
