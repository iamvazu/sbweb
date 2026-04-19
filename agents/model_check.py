import os
import logging
from dotenv import load_dotenv
from anthropic import Anthropic
import google.generativeai as genai

load_dotenv()
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger("model_check")

def check_anthropic():
    key = os.environ.get("ANTHROPIC_API_KEY")
    if not key:
        logger.warning("No Anthropic key found.")
        return
    
    try:
        client = Anthropic(api_key=key)
        logger.info("--- ANTHROPIC MODELS ---")
        # List models isn't available in some versions, try a small call to verify haiku
        response = client.messages.create(
            model="claude-3-haiku-20240307",
            max_tokens=1,
            messages=[{"role": "user", "content": "ping"}]
        )
        logger.info("Successfully connected to Claude 3 Haiku.")
    except Exception as e:
        logger.error(f"Anthropic error: {e}")

def check_gemini():
    key = os.environ.get("GEMINI_API_KEY")
    if not key:
        logger.warning("No Gemini key found.")
        return
    
    try:
        genai.configure(api_key=key)
        logger.info("--- GEMINI MODELS ---")
        for m in genai.list_models():
            if 'generateContent' in m.supported_generation_methods:
                logger.info(f"Available Gemini Model: {m.name}")
    except Exception as e:
        logger.error(f"Gemini error: {e}")

if __name__ == "__main__":
    check_anthropic()
    check_gemini()
