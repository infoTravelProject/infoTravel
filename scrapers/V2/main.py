import json
import requests
from bs4 import BeautifulSoup

COUNTRY = ['egypt', 'ghana', 'kenya', 'madagascar', 'mauritius', 'morocco', 'namibia', 'south-africa', 'tanzania',
           'cambodia', 'india', 'japan', 'nepal', 'philippines', 'singapore', 'south-korea', 'sri-lanka', 'taiwan',
           'thailand', 'vietnam',
           'australia', 'fiji', 'new-zealand', 'palau', 'samoa',
           'the-bahamas', 'barbados', 'bermuda', 'cuba', 'dominican-republic', 'jamaica', 'puerto-rico', 'st-lucia',
           'belize', 'costa-rica', 'el-salvador', 'guatemala', 'nicaragua', 'panama',
           'croatia', 'czech-republic', 'england', 'france', 'germany', 'greece', 'hungary', 'iceland', 'ireland',
           'italy', 'malta', 'the-netherlands', 'portugal', 'spain',
           'israel', 'jordan', 'oman', 'pakistan', 'qatar', 'turkey', 'united-arab-emirates',
           'canada', 'mexico', 'usa',
           'argentina', 'bolivia', 'brazil', 'chile', 'colombia', 'ecuador', 'peru', 'uruguay']

HEADERS = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)'
}

BASE_URL = 'https://www.lonelyplanet.com/'


def get_content(url):
    response = requests.get(url, headers=HEADERS)
    response.raise_for_status()
    return BeautifulSoup(response.content, 'html.parser')


def get_attractions():
    print('Starting to fetch attractions:')
    attractions_by_country = {}
    for country in COUNTRY:
        print('Starting to fetch attractions for: ' + country)
        soup = get_content(BASE_URL + country + "/attractions")
        attractions_by_country[country] = []
        menu = soup.select('ul.md\\:grid.space-y-14.md\\:space-y-0.gap-x-6.gap-y-14.md\\:grid-cols-12 > '
                           'li.col-span-1.md\\:col-span-3.lg\\:col-span-3')

        for li in menu:
            image = li.find('img')
            name = li.find('span', {"class": "heading-05 font-semibold"})
            location = li.find('p', {"class": "text-sm font-semibold uppercase !mt-2"})
            description = li.find('p', {"class": "relative line-clamp-3"})

            image_src = image['src'] if image else None
            name_text = name.get_text().strip() if name else None
            location_text = location.get_text().strip() if location else None
            description_text = description.get_text().strip() if description else None

            attraction = {
                'image': image_src,
                'name': name_text,
                'location': location_text,
                'description': description_text
            }
            if attraction:
                attractions_by_country[country].append(attraction)
    save_to_json(attractions_by_country)


def save_to_json(data, filename='attractions_data.json'):
    with open(filename, 'w', encoding='utf-8') as json_file:
        json.dump(data, json_file, ensure_ascii=False, indent=4)
    print(f"Dane zostały zapisane w pliku {filename}")


def main():
    print("test")
    get_attractions()


if __name__ == '__main__':
    main()
