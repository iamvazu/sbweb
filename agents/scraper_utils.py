import os
import time
import random
import logging
from typing import Optional
from playwright.sync_api import sync_playwright, Browser, Page, BrowserContext

# Setup basic logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s',
    handlers=[
        logging.FileHandler("pipeline.log"),
        logging.StreamHandler()
    ]
)
logger = logging.getLogger("scraper_utils")

def get_browser(p, headless: bool = True) -> Browser:
    """Initializes a Playwright browser with standard stealth-like config."""
    return p.chromium.launch(
        headless=headless,
        args=[
            '--disable-blink-features=AutomationControlled',
            '--no-sandbox',
            '--disable-setuid-sandbox'
        ]
    )

def create_context(browser: Browser) -> BrowserContext:
    """Creates a browser context with a realistic user agent."""
    return browser.new_context(
        user_agent='Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        viewport={'width': 1920, 'height': 1080}
    )

def navigate_with_retry(page: Page, url: str, wait_until: str = "networkidle", retries: int = 3):
    """Navigates to a URL with a simple retry mechanism."""
    for i in range(retries):
        try:
            logger.info(f"Navigating to {url} (Attempt {i+1}/{retries})")
            page.goto(url, wait_until=wait_until, timeout=60000)
            return True
        except Exception as e:
            logger.warning(f"Navigation failed: {e}")
            if i == retries - 1:
                return False
            time.sleep(random.uniform(2, 5))
    return False

def human_delay(min_s: float = 1.0, max_s: float = 3.0):
    """Adds a random delay to simulate human behavior."""
    time.sleep(random.uniform(min_s, max_s))
