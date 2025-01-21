from newsapi import NewsApiClient
import json

def fetch_articles(api_key):
    newsapi = NewsApiClient(api_key=api_key)
    all_articles = []
    total_requests = 99  # limit zapytań
    page = 1  # zaczynamy od pierwszej strony

    while total_requests > 0:
        try:
            response = newsapi.get_everything(sources='bbc-news,cnn,google-news-in',
                                              from_param='2025-01-18',
                                              to='2025-01-20',
                                              language='en',
                                              sort_by='relevancy',
                                              page=page)
            if response['status'] == 'ok' and response['articles']:
                all_articles.extend(response['articles'])
                page += 1
                total_requests -= 1
                print(f"Pobrano stronę {page-1}, pozostało zapytań: {total_requests}")
            else:
                break
        except Exception as e:
            print("Wystąpił błąd podczas pobierania danych:", e)
            break

    return all_articles

def save_to_json(data, filename='articles.json'):
    with open(filename, 'w') as file:
        json.dump(data, file, indent=4)

def main():
    api_key = '8f70f6588c4e4007aed2a2fa00ff970d'
    articles = fetch_articles(api_key)
    if articles:
        save_to_json(articles)
        print("Dane zostały zapisane do pliku articles.json")
    else:
        print("Brak danych do zapisania.")

if __name__ == "__main__":
    main()
