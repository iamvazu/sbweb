import os
import logging
from dotenv import load_dotenv
from anthropic import Anthropic
import google.generativeai as genai

load_dotenv()
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger("model_check")

def test_model_generation(model_name):
    """Attempt a small generation to confirm if the model is actually usable."""
    try:
        model = genai.GenerativeModel(model_name)
        response = model.generate_content("ping", generation_config={"max_output_tokens": 5})
        logger.info(f"✅ Success: Model '{model_name}' is fully functional.")
        return True
    except Exception as e:
        logger.error(f"❌ Failed: Model '{model_name}' is NOT usable: {e}")
        return False

def check_anthropic():
    key = os.environ.get("ANTHROPIC_API_KEY")
    if not key:
        return
    
    try:
        client = Anthropic(api_key=key)
        # Try haiku since everything else 404'd
        response = client.messages.create(
            model="claude-3-haiku-20240307",
            max_tokens=1,
            messages=[{"role": "user", "content": "p"}]
        )
        logger.info("✅ Success: Anthropic Claude 3 Haiku is working.")
    except Exception as e:
        logger.error(f"❌ Anthropic test failed: {e}")

def check_gemini():
    key = os.environ.get("GEMINI_API_KEY")
    if not key:
        return
    
    try:
        genai.configure(api_key=key)
        logger.info("--- STARTING GEMINI FUNCTIONAL TEST ---")
        
        # Test specific models from the user's previous list
        test_queue = [
            "gemini-2.5-flash",
            "gemini-2.0-flash",
            "gemini-1.5-flash"
        ]
        
        results = []
        for m_name in test_queue:
            if test_model_generation(m_name):
                results.append(m_name)
        
        if not results:
            logger.warning("No standard Gemini models passed. Listing all available models for lookup...")
            for m in genai.list_models():
                if 'generateContent' in m.supported_generation_methods:
                    logger.info(f"Catalog Model: {m.name}")
                    
    except Exception as e:
        logger.error(f"Gemini global error: {e}")

if __name__ == "__main__":
    check_anthropic()
    check_gemini()
