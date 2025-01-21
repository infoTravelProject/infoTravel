import os

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
DATA_DIR = os.path.join(BASE_DIR, 'data')
ARTICLES_FILE = os.path.join(DATA_DIR, 'articles.json')
COUNTRIES_FILE = os.path.join(DATA_DIR, 'countries.json')
from pathlib import Path

# Ścieżki
BASE_DIR = Path(__file__).parent
DATA_DIR = BASE_DIR / "data"
STATIC_DIR = BASE_DIR / "static"
TEMPLATE_DIR = BASE_DIR / "templates"

# API keys
OPENAI_API_KEY = "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"
