import spacy
import logging
import json
from celery import Celery
from flask import Flask, jsonify, render_template
import sqlite3
from newsapi import NewsApiClient
from transformers import pipeline

API_KEY = "8f70f6588c4e4007aed2a2fa00ff970d"

# Konfiguracja logowania
logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s [%(levelname)s] %(message)s",
    handlers=[logging.StreamHandler()]
)
logger = logging.getLogger(__name__)

# Dozwolone kategorie
ALLOWED_CATEGORIES = ["business & economy", "politics", "local events", "immigration", "safety risks", "climate"]

# Konfiguracja Celery
app = Celery('news_pipeline', broker='pyamqp://guest@localhost//')

# Flask app
flask_app = Flask(__name__)

# Konfiguracja SQLite
DB_NAME = "news.db"

# Initialize spaCy for Named Entity Recognition (NER)
nlp = spacy.load("en_core_web_sm")

# Load the list of countries
with open("countries.json", "r", encoding="utf-8") as file:
    country_list = json.load(file)  # List of country names


def setup_database():
    logger.info("Setting up the database...")
    conn = sqlite3.connect(DB_NAME)
    cursor = conn.cursor()
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS news (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            title TEXT,
            summary TEXT,
            category TEXT,
            source TEXT,
            date TEXT,
            country TEXT
        )
    ''')
    conn.commit()
    conn.close()
    logger.info("Database setup completed.")


# Initialize NewsAPI client
newsapi = NewsApiClient(api_key=API_KEY)


@app.task
def fetch_news(queries, language='en', domains=None):
    """
    Fetch news articles for a list of queries.
    """
    logger.info(f"Fetching news with queries: {queries}, language: {language}")
    all_articles = []
    try:
        for query in queries:
            logger.info(f"Fetching articles for query: {query}")
            response = newsapi.get_everything(
                q=query,
                domains=domains,
                language=language,
                sort_by='relevancy',
                page_size=5
            )
            articles = response.get('articles', [])
            if not articles:
                logger.warning(f"No articles found for query: {query}")
            else:
                logger.info(f"Fetched {len(articles)} articles for query: {query}")
                all_articles.extend(articles)
        return all_articles
    except Exception as e:
        logger.error(f"Error fetching news: {e}")
        return []


@app.task
def extract_country_from_article(article):
    """Extract country using spaCy and match strictly against countries.json with fallback."""
    logger.info(f"Extracting country from article: {article.get('title', 'Unknown title')}")
    try:
        description = article.get('description', '')
        doc = nlp(description)

        # Extract GPEs using spaCy
        detected_countries = [ent.text for ent in doc.ents if ent.label_ == "GPE"]
        logger.info(f"Detected GPEs: {detected_countries}")

        # Match against countries.json
        for detected_country in detected_countries:
            for country in country_list:
                if detected_country.lower() == country.lower():
                    logger.info(f"Country matched: {country}")
                    return country

        # Fallback: Direct substring match in the description
        for country in country_list:
            if country.lower() in description.lower():
                logger.info(f"Country found via fallback: {country}")
                return country

        logger.warning("No country match found in JSON file.")
        return "unknown"
    except Exception as e:
        logger.error(f"Error extracting country: {e}")
        return "unknown"


@app.task
def translate_and_summarize(article):
    logger.info(f"Translating and summarizing article: {article.get('title', 'Unknown title')}")
    description = article.get('description', '')
    if not description or article.get('title', '').lower() == "[removed]":
        logger.warning("No description found in article or title marked as '[removed]'.")
        return None
    try:
        summarizer = pipeline("summarization", model="facebook/bart-large-cnn")
        summary = summarizer(description, max_length=50, min_length=20, do_sample=False)[0]['summary_text']
        logger.info("Translation and summarization completed.")
        return summary
    except Exception as e:
        logger.error(f"Error during translation/summarization: {e}")
        return None


@app.task
def save_to_database(title, summary, category, source, date, country):
    logger.info(f"Saving article to database: {title}")
    try:
        conn = sqlite3.connect(DB_NAME)
        cursor = conn.cursor()
        cursor.execute('''
            INSERT INTO news (title, summary, category, source, date, country)
            VALUES (?, ?, ?, ?, ?, ?)
        ''', (title, summary, category, source, date, country))
        conn.commit()
        conn.close()
        logger.info("Article saved to database successfully.")
    except Exception as e:
        logger.error(f"Error saving to database: {e}")


def process_and_save_news():
    """
    Fetch, process, and save news articles for specified queries.
    """
    # Define the list of queries
    queries = ["business & economy", "politics", "local events", "immigration", "safety risks", "climate"]

    for query in queries:
        logger.info(f"Processing articles for query: {query}")
        articles = fetch_news(queries=[query], domains='bbc.co.uk,techcrunch.com')
        for article in articles:
            if article.get('title', '').lower() == "[removed]":
                logger.info("Skipping article with title '[removed]'.")
                continue
            summary = translate_and_summarize(article)
            if not summary:
                continue
            country = extract_country_from_article(article)
            save_to_database(
                title=article.get('title', 'No Title'),
                summary=summary,
                category=query,  # Assign the query as the category
                source=article.get('source', {}).get('name', 'Unknown'),
                date=article.get('publishedAt', 'Unknown'),
                country=country
            )


@flask_app.route('/')
def home():
    logger.info("Rendering home page with latest news.")
    try:
        conn = sqlite3.connect(DB_NAME)
        cursor = conn.cursor()
        query = '''
            SELECT title, summary, category, source, date, country
            FROM news
            ORDER BY id DESC LIMIT 100
        '''
        cursor.execute(query)
        rows = cursor.fetchall()
        conn.close()

        if not rows:
            logger.warning("No articles found in the database.")
            return render_template('index.html', news=[])

        logger.info(f"Fetched {len(rows)} articles from the database.")
        news = []
        for row in rows:
            # Ensure the row has all expected fields
            if len(row) < 6:
                logger.warning(f"Incomplete row data: {row}")
                continue
            news.append({
                "title": row[0],
                "summary": row[1],
                "category": row[2],  # Include category
                "source": row[3],
                "date": row[4],
                "country": row[5]
            })

        return render_template('index.html', news=news)

    except Exception as e:
        logger.error(f"Error fetching news for home page: {e}")
        return jsonify({"error": "Could not fetch news"}), 500



if __name__ == '__main__':
    setup_database()
    process_and_save_news()
    logger.info("Starting Flask app...")
    flask_app.run(debug=True)
