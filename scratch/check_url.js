const { chromium } = require('playwright');

async function checkUrl() {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext();
  const page = await context.newPage();
  
  console.log("Navigating...");
  await page.goto("https://caleprocure.ca.gov/event/2720/38880", { waitUntil: 'networkidle' });
  await page.waitForTimeout(3000);
  
  const text = await page.evaluate(() => document.body.innerText);
  console.log("PAGE TEXT LENGTH:", text.length);
  console.log("PAGE TEXT SNIPPET:\n", text.substring(0, 500));
  console.log("Contains 38880?", text.includes("38880"));
  
  await browser.close();
}

checkUrl();
