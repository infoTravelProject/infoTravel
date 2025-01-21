import json
import requests
import re
from bs4 import BeautifulSoup

BASE_URL = "https://en.wikipedia.org"
START_URL = "/wiki/Category:Visa_requirements_by_nationality"
HEADERS = {'User-Agent': 'Mozilla/5.0'}

def clean_text(text):

    # usuwanie rzeczy ktore przeszkadzaja
    text = BeautifulSoup(text, "html.parser").get_text(separator=" ")
    text = re.sub(r'\[.*?\]', '', text)
    return ' '.join(text.split()).strip()

def get_page_links():
    """linki do podstron"""
    links = []
    next_page = START_URL
    while next_page:
        response = requests.get(BASE_URL + next_page, headers=HEADERS)
        soup = BeautifulSoup(response.content, 'html.parser')

        # linki do artykolow
        country_links = soup.select(".mw-category-group a")
        for link in country_links:
            href = link['href']
            if "Template" not in href and "Category" not in href:
                links.append(BASE_URL + href)

        # czy istnieje next strona
        next_page_link = soup.find('a', string="next page")
        next_page = next_page_link['href'] if next_page_link else None

    return links

def get_visa_info(country_url):
    """info o wizach dla danego kraju"""
    response = requests.get(country_url, headers=HEADERS)
    soup = BeautifulSoup(response.content, 'html.parser')
    country_name = clean_text(soup.find('h1', {"id": "firstHeading"}).get_text(strip=True))
    visa_info = []

    table = soup.find('table', {'class': 'wikitable'})
    if table:
        rows = table.find_all('tr')[1:]
        for row in rows:
            cols = row.find_all(['td', 'th'])
            if len(cols) >= 2:
                destination = clean_text(str(cols[0]))
                details = clean_text(str(cols[1]))
                allowed_stay = clean_text(str(cols[2])) if len(cols) > 2 else "N/A"
                notes = clean_text(str(cols[3])) if len(cols) > 3 else "N/A"

                visa_info.append({
                    'destination': destination,
                    'details': details,
                    'allowed_stay': allowed_stay,
                    'notes': notes
                })

    return {country_name: visa_info}

def save_to_json(data, filename="visa_data.json"):
    """zapis do jsona"""
    with open(filename, "w", encoding="utf-8") as file:
        json.dump(data, file, ensure_ascii=False, indent=4)
    print(f"Dane zostały zapisane do pliku: {filename}")

def main():
    all_data = {}
    print("Pobieranie linków...")
    country_links = get_page_links()

    print("Pobieranie danych o wizach...")
    for link in country_links:
        print(f"Przetwarzanie: {link}")
        visa_data = get_visa_info(link)
        all_data.update(visa_data)

    save_to_json(all_data)

if __name__ == "__main__":
    main()
