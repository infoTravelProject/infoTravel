from config import OPENAI_API_KEY
from openai import OpenAI
import json
import logging
from typing import Dict, List, Optional

logger = logging.getLogger(__name__)


class NewsAnalyzer:
    def __init__(self):
        self.client = OpenAI(api_key=OPENAI_API_KEY)
        self.countries = self.load_countries()

    @staticmethod
    def load_countries() -> List[str]:
        """Ładuje listę krajów z JSON"""
        try:
            with open('data/countries.json', 'r', encoding='utf-8') as f:
                return json.load(f)
        except Exception as error:
            logger.error(f"Error loading countries: {error}")
            return []

    def analyze_article(self, article: Dict) -> Optional[Dict]:
        """Analizuje artykuł używając OpenAI dla wszystkich klasyfikacji"""
        try:
            text = f"{article.get('title', '')} {article.get('description', '')}"

            prompt = f"""Analyze this news article and provide:
            1. The exact country this news is about. Use ONLY countries from this list: {', '.join(self.countries)}. If no country matches, respond with "World"
            2. The most appropriate category (select only one):
               - health: medical news, healthcare, diseases, medical research
               - immigration: migration, refugees, border control, visas
               - business & economy: finance, trade, companies, markets
               - politics: government, elections, political events, policy
               - safety: crime, accidents, security, public safety
               - tourism: travel, tourism industry, destinations, hotels

            Article:
            Title: {article.get('title', '')}
            Description: {article.get('description', '')}

            Look for specific country mentions from the provided list and consider the context.

            Respond in this exact JSON format:
            {{
                "category": "one of the categories listed above",
                "country": "country from the provided list or World",
                "summary": "2-3 sentence summary of the article"
            }}"""

            completion = self.client.chat.completions.create(
                model="gpt-3.5-turbo",
                messages=[
                    {
                        "role": "system",
                        "content": "You are a precise news classifier. Use only provided country names and categories."
                    },
                    {"role": "user", "content": prompt}
                ],
                temperature=0.3
            )

            analysis = json.loads(completion.choices[0].message.content)

            # Walidacja kategorii i kraju
            valid_categories = [
                "health", "immigration", "business & economy",
                "politics", "safety", "tourism"
            ]

            if analysis.get('category') not in valid_categories:
                analysis['category'] = 'general'

            if analysis.get('country') not in self.countries:
                analysis['country'] = 'World'

            # Aktualizuj artykuł
            article.update({
                'category': analysis['category'],
                'country': analysis['country'],
                'summary': analysis.get('summary', article.get('description', ''))
            })

            logger.info(f"Classified article: {article['title']} -> {article['category']} ({article['country']})")
            return article

        except Exception as error:
            logger.error(f"Error analyzing article: {error}")
            article.update({
                "category": "general",
                "country": "World",
                "summary": article.get('description', '')[:200] + "..."
            })
            return article