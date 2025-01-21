fetch('attractions_japan.json')
    .then(response => response.json())
    .then(data => {
        const countrySelect = document.getElementById('country-select');
        const attractionsContainer = document.getElementById('attractions');

        // Lista krajów
        const countries = Object.keys(data);
        countries.forEach(country => {
            const option = document.createElement('option');
            option.value = country;
            option.textContent = country.replace(/-/g, ' ').toUpperCase(); // Formatowanie nazw krajów
            countrySelect.appendChild(option);
        });

        // Funkcja do wyświetlania atrakcji dla wybranego kraju
        const displayAttractions = (country) => {
            attractionsContainer.innerHTML = '';
            const attractions = data[country];

            attractions.forEach(attraction => {
                const card = document.createElement('div');
                card.className = 'attraction-card';

                card.innerHTML = `
                    <img src="${attraction.image || 'placeholder.jpg'}" alt="${attraction.name}">
                    <div class="content">
                        <h2>${attraction.name || 'Unknown Name'}</h2>
                        <p><strong>Location:</strong> ${attraction.location || 'Unknown Location'}</p>
                        <p><strong>Short Description:</strong> ${attraction.short_description || 'No short description available.'}</p>
                        <p><strong>Full Description:</strong> ${attraction.full_description || 'No full description available.'}</p>
                    </div>
                `;

                attractionsContainer.appendChild(card);
            });
        };

        // Obsługa zmiany kraju
        countrySelect.addEventListener('change', () => {
            const selectedCountry = countrySelect.value;
            displayAttractions(selectedCountry);
        });

        // Wyświetl domyślnie pierwszy kraj
        displayAttractions(countries[0]);
    })
    .catch(error => console.error('Error loading data:', error));
