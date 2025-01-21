fetch('attractions_data.json')
    .then(response => response.json())
    .then(data => {
        const countrySelect = document.getElementById('country-select');
        const attractionsContainer = document.getElementById('attractions');

        //lista krajow
        const countries = Object.keys(data);
        countries.forEach(country => {
            const option = document.createElement('option');
            option.value = country;
            option.textContent = country.replace(/-/g, ' ').toUpperCase(); // Formatowanie nazw krajów
            countrySelect.appendChild(option);
        });

        // atrakcja dla danego kraju
        const displayAttractions = (country) => {
            attractionsContainer.innerHTML = '';
            const attractions = data[country].slice(0, 30);

            attractions.forEach(attraction => {
                const card = document.createElement('div');
                card.className = 'attraction-card';

                card.innerHTML = `
                    <img src="${attraction.image || 'placeholder.jpg'}" alt="${attraction.name}">
                    <div class="content">
                        <h2>${attraction.name || 'Unknown Name'}</h2>
                        <p><strong>Location:</strong> ${attraction.location || 'Unknown Location'}</p>
                        <p>${attraction.description || 'No description available.'}</p>
                    </div>
                `;

                attractionsContainer.appendChild(card);
            });
        };

        countrySelect.addEventListener('change', () => {
            const selectedCountry = countrySelect.value;
            displayAttractions(selectedCountry);
        });

        // domyslnie 1 kraj
        displayAttractions(countries[0]);
    })
    .catch(error => console.error('Error loading data:', error));
