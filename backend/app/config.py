import os
from dataclasses import dataclass
from dotenv import load_dotenv

load_dotenv()

@dataclass
class Settings:
    gemini_api_key: str = os.getenv("GEMINI_API_KEY", "")
    cors_origins: str = os.getenv("CORS_ORIGINS", "http://localhost:3000")

settings = Settings()
