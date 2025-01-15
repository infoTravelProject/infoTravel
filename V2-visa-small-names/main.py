import json
import requests
import re
from bs4 import BeautifulSoup

BASE_URL = "https://en.wikipedia.org"
START_URL = "/wiki/Category:Visa_requirements_by_nationality"
HEADERS = {'User-Agent': 'Mozilla/5.0'}

# Mapowanie nietypowych nazw krajów
COUNTRY_ADJECTIVE_MAP = {
    "afghan": "afghanistan",
    "albanian": "albania",
    "algerian": "algeria",
    "american": "united states",
    "andorran": "andorra",
    "angolan": "angola",
    "antiguan and barbudan": "antigua and barbuda",
    "argentine": "argentina",
    "armenian": "armenia",
    "australian": "australia",
    "austrian": "austria",
    "azerbaijani": "azerbaijan",
    "bahamian": "bahamas",
    "bahraini": "bahrain",
    "bangladeshi": "bangladesh",
    "barbadian": "barbados",
    "belarusian": "belarus",
    "belgian": "belgium",
    "belizean": "belize",
    "beninese": "benin",
    "bhutanese": "bhutan",
    "bolivian": "bolivia",
    "bosnian and herzegovinian": "bosnia and herzegovina",
    "botswanan": "botswana",
    "brazilian": "brazil",
    "british": "united kingdom",
    "bruneian": "brunei",
    "bulgarian": "bulgaria",
    "burkinabe": "burkina faso",
    "burmese": "myanmar",
    "burundian": "burundi",
    "cambodian": "cambodia",
    "cameroonian": "cameroon",
    "canadian": "canada",
    "cape verdean": "cape verde",
    "central african": "central african republic",
    "chadian": "chad",
    "chilean": "chile",
    "chinese": "china",
    "colombian": "colombia",
    "comoran": "comoros",
    "congolese": "congo",
    "costa rican": "costa rica",
    "croatian": "croatia",
    "cuban": "cuba",
    "cypriot": "cyprus",
    "czech": "czech republic",
    "danish": "denmark",
    "djiboutian": "djibouti",
    "dominican": "dominican republic",
    "dutch": "netherlands",
    "east timorese": "timor-leste",
    "ecuadorean": "ecuador",
    "egyptian": "egypt",
    "emirati": "united arab emirates",
    "equatorial guinean": "equatorial guinea",
    "eritrean": "eritrea",
    "estonian": "estonia",
    "ethiopian": "ethiopia",
    "fijian": "fiji",
    "filipino": "philippines",
    "finnish": "finland",
    "french": "france",
    "gabonese": "gabon",
    "gambian": "gambia",
    "georgian": "georgia",
    "german": "germany",
    "ghanaian": "ghana",
    "greek": "greece",
    "grenadian": "grenada",
    "guatemalan": "guatemala",
    "guinean": "guinea",
    "guinea-bissauan": "guinea-bissau",
    "guyanese": "guyana",
    "haitian": "haiti",
    "honduran": "honduras",
    "hungarian": "hungary",
    "icelandic": "iceland",
    "indian": "india",
    "indonesian": "indonesia",
    "iranian": "iran",
    "iraqi": "iraq",
    "irish": "ireland",
    "israeli": "israel",
    "italian": "italy",
    "ivorian": "ivory coast",
    "jamaican": "jamaica",
    "japanese": "japan",
    "jordanian": "jordan",
    "kazakh": "kazakhstan",
    "kenyan": "kenya",
    "kittitian and nevisian": "saint kitts and nevis",
    "kuwaiti": "kuwait",
    "kyrgyz": "kyrgyzstan",
    "laotian": "laos",
    "latvian": "latvia",
    "lebanese": "lebanon",
    "liberian": "liberia",
    "libyan": "libya",
    "liechtenstein citizen": "liechtenstein",
    "lithuanian": "lithuania",
    "luxembourgish": "luxembourg",
    "macedonian": "north macedonia",
    "malagasy": "madagascar",
    "malawian": "malawi",
    "malaysian": "malaysia",
    "maldivian": "maldives",
    "malian": "mali",
    "maltese": "malta",
    "marshallese": "marshall islands",
    "mauritanian": "mauritania",
    "mauritian": "mauritius",
    "mexican": "mexico",
    "micronesian": "micronesia",
    "moldovan": "moldova",
    "monacan": "monaco",
    "mongolian": "mongolia",
    "montenegrin": "montenegro",
    "moroccan": "morocco",
    "mozambican": "mozambique",
    "namibian": "namibia",
    "nauruan": "nauru",
    "nepalese": "nepal",
    "new zealander": "new zealand",
    "nicaraguan": "nicaragua",
    "nigerien": "niger",
    "nigerian": "nigeria",
    "north korean": "north korea",
    "norwegian": "norway",
    "omani": "oman",
    "pakistani": "pakistan",
    "palauan": "palau",
    "palestinian": "palestine",
    "panamanian": "panama",
"papua new guinean": "papua new guinea",
    "paraguayan": "paraguay",
    "peruvian": "peru",
    "philippine": "philippines",
    "polish": "poland",
    "portuguese": "portugal",
    "qatari": "qatar",
    "romanian": "romania",
    "russian": "russia",
    "rwandan": "rwanda",
    "saint lucian": "saint lucia",
    "samoan": "samoa",
    "sao tomean": "sao tome and principe",
    "saudi": "saudi arabia",
    "senegalese": "senegal",
    "serbian": "serbia",
    "seychellois": "seychelles",
    "sierra leonean": "sierra leone",
    "singaporean": "singapore",
    "slovak": "slovakia",
    "slovenian": "slovenia",
    "solomon islander": "solomon islands",
    "somali": "somalia",
    "south african": "south africa",
    "south korean": "south korea",
    "spanish": "spain",
    "sri lankan": "sri lanka",
    "sudanese": "sudan",
    "surinamese": "suriname",
    "swazi": "eswatini",
    "swedish": "sweden",
    "swiss": "switzerland",
    "syrian": "syria",
    "taiwanese": "taiwan",
    "tajik": "tajikistan",
    "tanzanian": "tanzania",
    "thai": "thailand",
    "togolese": "togo",
    "tongan": "tonga",
    "trinidadian and tobagonian": "trinidad and tobago",
    "tunisian": "tunisia",
    "turkish": "turkey",
    "turkmen": "turkmenistan",
    "tuvaluan": "tuvalu",
    "ugandan": "uganda",
    "ukrainian": "ukraine",
    "uruguayan": "uruguay",
    "uzbek": "uzbekistan",
    "vanuatuan": "vanuatu",
    "vatican citizen": "vatican city",
    "venezuelan": "venezuela",
    "vietnamese": "vietnam",
    "yemeni": "yemen",
    "zambian": "zambia",
    "zimbabwean": "zimbabwe"
}

def clean_text(text):
    """Czyszczenie tekstu HTML."""
    text = BeautifulSoup(text, "html.parser").get_text(separator=" ")
    text = re.sub(r'\[.*?\]', '', text)
    return ' '.join(text.split()).strip()

def clean_country_name(raw_country_name):
    """
    Wyczyść nazwę kraju z nagłówka Wikipedii.
    Usuwa prefiks, sufiks i mapuje nazwy przymiotnikowe.
    """
    country_name = re.sub(r'^Visa requirements for ', '', raw_country_name)
    country_name = re.sub(r' citizens$', '', country_name).strip().lower()  # Na małe litery
    return COUNTRY_ADJECTIVE_MAP.get(country_name, country_name)

def get_page_links():
    """Pobierz linki do stron krajów."""
    links = []
    next_page = START_URL
    while next_page:
        response = requests.get(BASE_URL + next_page, headers=HEADERS)
        soup = BeautifulSoup(response.content, 'html.parser')

        # Linki do artykułów
        country_links = soup.select(".mw-category-group a")
        for link in country_links:
            href = link['href']
            if "Template" not in href and "Category" not in href:
                links.append(BASE_URL + href)

        # Sprawdź, czy istnieje kolejna strona
        next_page_link = soup.find('a', string="next page")
        next_page = next_page_link['href'] if next_page_link else None

    return links

def get_visa_info(country_url):
    """Pobierz dane wizowe dla kraju."""
    response = requests.get(country_url, headers=HEADERS)
    soup = BeautifulSoup(response.content, 'html.parser')

    # Pobierz nagłówek strony
    raw_country_name = clean_text(soup.find('h1', {"id": "firstHeading"}).get_text(strip=True))
    country_name = clean_country_name(raw_country_name)

    visa_info = []

    # Parsowanie tabeli wizowej
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
    """Zapisz dane do pliku JSON."""
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
