import json
import logging
from typing import List, Dict
import os
from news_analyzer import NewsAnalyzer

logger = logging.getLogger(__name__)


class NewsAggregator:
    def __init__(self):
        self.analyzer = NewsAnalyzer()
        self.articles_file = "data/articles.json"

    def load_articles(self) -> List[Dict]:
        """Ładuje artykuły z pliku JSON"""
        try:
            if not os.path.exists(self.articles_file):
                logger.error(f"Articles file not found at {self.articles_file}")
                return []

            with open(self.articles_file, 'r', encoding='utf-8') as f:
                all_articles = json.load(f)

            # Filtruj nieprawidłowe artykuły
            valid_articles = [a for a in all_articles if self._is_valid_article(a)]

            # Analizuj artykuły, które tego wymagają
            processed_articles = []
            for article in valid_articles:
                if not article.get('category') or not article.get('country'):
                    try:
                        analyzed = self.analyzer.analyze_article(article)
                        processed_articles.append(analyzed)
                    except Exception as error:
                        logger.error(f"Error analyzing article: {error}")
                        article['category'] = 'general'
                        article['country'] = 'World'
                        processed_articles.append(article)
                else:
                    processed_articles.append(article)

            logger.info(f"Processed {len(processed_articles)} articles out of {len(all_articles)} total")

            # Zapisz przetworzone artykuły
            self.save_articles(processed_articles)
            return processed_articles

        except Exception as error:
            logger.error(f"Error loading articles: {error}")
            return []

    def _is_valid_article(self, article: Dict) -> bool:
        """Sprawdza czy artykuł jest prawidłowy"""
        # Sprawdź czy artykuł ma tytuł i opis
        if not article.get('title') or not article.get('description'):
            return False

        # Pomiń timestampy
        if 'GMT' in article['title'] and any(str(i).zfill(2) in article['title'] for i in range(1, 32)):
            return False

        return True

    def save_articles(self, articles: List[Dict]):
        """Zapisuje artykuły do pliku JSON"""
        try:
            os.makedirs(os.path.dirname(self.articles_file), exist_ok=True)
            with open(self.articles_file, 'w', encoding='utf-8') as f:
                json.dump(articles, f, indent=2, ensure_ascii=False)
            logger.info(f"Saved {len(articles)} articles")
        except Exception as error:
            logger.error(f"Error saving articles: {error}")