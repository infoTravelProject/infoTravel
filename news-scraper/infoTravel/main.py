from fastapi import FastAPI, Request
from fastapi.templating import Jinja2Templates
from fastapi.staticfiles import StaticFiles
from fastapi.responses import HTMLResponse
from news_analyzer import NewsAnalyzer
from news_aggregator import NewsAggregator
import logging

# Konfiguracja logowania
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(levelname)s - %(message)s',
    handlers=[
        logging.FileHandler('news.log', encoding='utf-8'),
        logging.StreamHandler()
    ]
)
logger = logging.getLogger(__name__)


# Inicjalizacja FastAPI
app = FastAPI(title="InfoTravel News")

# Konfiguracja statycznych plików i szablonów
app.mount("/static", StaticFiles(directory="static"), name="static")
templates = Jinja2Templates(directory="templates")

# Inicjalizacja komponentów
analyzer = NewsAnalyzer()
aggregator = NewsAggregator()

# Lista dostępnych kategorii
CATEGORIES = [
    "health",
    "immigration",
    "business & economy",
    "politics",
    "safety",
    "tourism"
]


@app.get("/", response_class=HTMLResponse)
async def home(request: Request):
    try:
        articles = aggregator.load_articles()
        logger.info(f"Loaded {len(articles)} articles")

        # Upewnij się, że każdy artykuł ma kategorię
        for article in articles:
            article['category'] = article.get('category', 'general')

        return templates.TemplateResponse(
            "index.html",
            {
                "request": request,
                "articles": articles,
                "categories": CATEGORIES
            }
        )
    except Exception as error:
        logger.error(f"Error loading homepage: {error}")
        return templates.TemplateResponse(
            "error.html",
            {
                "request": request,
                "error": str(error)
            },
            status_code=500
        )


@app.get("/debug/articles")
async def debug_articles():
    """Debug endpoint dla artykułów"""
    try:
        articles = aggregator.load_articles()
        return {
            "total_articles": len(articles),
            "first_article": articles[0] if articles else None,
            "categories": set(a.get('category', 'general') for a in articles)
        }
    except Exception as error:
        logger.error(f"Error in debug: {error}")
        return {"error": str(error)}, 500


if __name__ == "__main__":
    import uvicorn

    uvicorn.run("main:app", host="127.0.0.1", port=8000, reload=True)
