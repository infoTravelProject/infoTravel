import json
import requests
import time
from bs4 import BeautifulSoup

HEADERS = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)'
}

BASE_URL = 'https://www.lonelyplanet.com'

# Lista krajów
COUNTRIES = [
    'egypt', 'ghana', 'kenya', 'madagascar', 'mauritius', 'morocco', 'namibia', 'south-africa', 'tanzania',
    'cambodia', 'india', 'japan', 'nepal', 'philippines', 'singapore', 'south-korea', 'sri-lanka', 'taiwan',
    'thailand', 'vietnam', 'australia', 'fiji', 'new-zealand', 'palau', 'samoa', 'the-bahamas', 'barbados',
    'bermuda', 'cuba', 'dominican-republic', 'jamaica', 'puerto-rico', 'st-lucia', 'belize', 'costa-rica',
    'el-salvador', 'guatemala', 'nicaragua', 'panama', 'croatia', 'czech-republic', 'england', 'france',
    'germany', 'greece', 'hungary', 'iceland', 'ireland', 'italy', 'malta', 'the-netherlands', 'portugal',
    'spain', 'israel', 'jordan', 'oman', 'pakistan', 'qatar', 'turkey', 'united-arab-emirates', 'canada',
    'mexico', 'usa', 'argentina', 'bolivia', 'brazil', 'chile', 'colombia', 'ecuador', 'peru', 'uruguay'
]


def get_content_with_retry(url, retries=3, delay=2):
    """Pobierz zawartość URL z mechanizmem ponawiania."""
    for attempt in range(retries):
        try:
            response = requests.get(url, headers=HEADERS)
            response.raise_for_status()
            return BeautifulSoup(response.content, 'html.parser')
        except requests.exceptions.HTTPError as e:
            print(f"HTTP error for {url}: {e}")
            if attempt < retries - 1:
                print(f"Retrying in {delay} seconds...")
                time.sleep(delay)
            else:
                print(f"Failed after {retries} attempts.")
                return None


def get_attraction_details(attraction_url):
    """Pobierz szczegóły atrakcji z podstrony."""
    soup = get_content_with_retry(attraction_url)
    if soup:
        # Znajdź div zawierający szczegóły
        content_div = soup.find('div', {"class": lambda x: x and "readMore_content" in x})
        if content_div:
            # Pobierz tytuły (h2) i paragrafy (p)
            titles = [h2.get_text(strip=True) for h2 in content_div.find_all('h2')]
            paragraphs = [p.get_text(strip=True) for p in content_div.find_all('p')]

            # Połącz tytuły i paragrafy w jeden opis
            full_description = "\n\n".join(titles + paragraphs)
            return full_description
    return None


def get_attractions():
    """Pobierz wszystkie atrakcje dla każdego kraju."""
    print('Starting to fetch attractions for all countries...')
    attractions_by_country = {}

    for country in COUNTRIES:
        print(f'Starting to fetch attractions for: {country}')
        attractions_by_country[country] = []
        country_url = f"{BASE_URL}/{country}/attractions"
        soup = get_content_with_retry(country_url)
        if not soup:
            print(f"Skipping {country} due to failed connection.")
            continue

        menu = soup.select('ul.md\\:grid.space-y-14.md\\:space-y-0.gap-x-6.gap-y-14.md\\:grid-cols-12 > '
                           'li.col-span-1.md\\:col-span-3.lg\\:col-span-3')

        for li in menu:
            image = li.find('img')
            name = li.find('span', {"class": "heading-05 font-semibold"})
            location = li.find('p', {"class": "text-sm font-semibold uppercase !mt-2"})
            description = li.find('p', {"class": "relative line-clamp-3"})
            link_tag = li.find('a')

            image_src = image['src'] if image else None
            name_text = name.get_text(strip=True) if name else None
            location_text = location.get_text(strip=True) if location else None
            short_description = description.get_text(strip=True) if description else None
            attraction_url = f"{BASE_URL}{link_tag['href']}" if link_tag and 'href' in link_tag.attrs else None

            full_description = None
            if attraction_url:
                print(f'Fetching details for attraction: {name_text}')
                full_description = get_attraction_details(attraction_url)

            attraction = {
                'image': image_src,
                'name': name_text,
                'location': location_text,
                'short_description': short_description,
                'full_description': full_description
            }
            if attraction:
                attractions_by_country[country].append(attraction)

    save_to_json(attractions_by_country, filename='attractions_all_countries.json')


def save_to_json(data, filename='attractions_data_full.json'):
    """Zapisz dane do pliku JSON."""
    with open(filename, 'w', encoding='utf-8') as json_file:
        json.dump(data, json_file, ensure_ascii=False, indent=4)
    print(f"Dane zostały zapisane w pliku {filename}")


def main():
    print("Rozpoczęcie procesu pobierania danych dla wszystkich krajów...")
    get_attractions()


if __name__ == '__main__':
    main()
