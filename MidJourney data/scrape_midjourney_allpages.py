"""
The job of this script is to extract the full html data on the MidJourney telegram page

"""

import pandas as pd
from selenium import webdriver
import time

browser = webdriver.Chrome()
browser.get('https://t.me/s/midjourney_42')

items = 0
actual_html = ""
last_height = browser.execute_script("return document.body.scrollHeight")
# Incase we dont want to finish for FULL webpage scroll
itemTargetCount = 50000

while itemTargetCount > items:
    # Iterate upscrolling to load entire telegram page
    browser.execute_script("window.scrollTo(0, -document.body.scrollHeight);")
    time.sleep(2)
    new_height = browser.execute_script("return document.body.scrollHeight")
    if new_height == last_height:
        break
    last_height = new_height
    items += 1
    # break

item = browser.page_source
actual_html += item

# Save entire html page after fully scrolled up
with open('D:/Developer/assemblyai_hackathon/full_midjourney2.html', 'w', encoding="utf-8") as f:
    f.write(actual_html)
