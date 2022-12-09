from bs4 import BeautifulSoup
import pandas as pd
import re

with open('D:/Developer/assemblyai_hackathon/full_midjourney2.html', 'r', encoding="utf-8") as f:
    actual_html = f.read()

print(type(actual_html))

soup = BeautifulSoup(actual_html, "html.parser")

#########################

all_subhtmls = re.finditer('<div class="tgme_widget_message_author accent_color"><a class="tgme_widget_message_owner_name" href="https://t.me/midjourney_42"><span dir="auto">MidJourney Collections</span></a></div>', actual_html)
all_texts = []
all_images = []
partition = []
starting = 0
for n, subhtmls in enumerate(all_subhtmls):
    ending = subhtmls.start()
    partition = actual_html[0+starting:ending]
    starting = subhtmls.start()
    if n > 9:
        if ('poll_option' in partition) or ('August 6' in partition) or ('video src' in partition) or ('Музична Шкатулка' in partition):
            continue

        soup = BeautifulSoup(partition, "html.parser")
        img_list = []

        soup_text = soup.find_all("div", {"class": "tgme_widget_message_text"})
        # if (text !='MidJourney Collections pinned Deleted message') and (text != 'MidJourney Collections pinned a photo'):
        if soup_text == []:

            # Here we fix for text
            print("Problem with text, see below for debugging")
            print(partition)
            break

        images = soup.find_all("a", {"class": "tgme_widget_message_photo_wrap"})

        if images == []:
            # Here we fix for images
            print('Problem with images, see below for debugging')
            print(partition)
            break

        for image in images:
            link = image.get("style")
            if re.search("https(.+?)\.jpg", link) is not None:
                img_list.append("https"+ re.search("https(.+?)\.jpg", link).group(1)+'.jpg')

        text = soup_text[0].get_text()
        all_texts.append(text)
        all_images.append(img_list)


print(len(all_texts), len(all_images))
########################

max_cols = max([len(elements) for elements in all_images])
headers = ["Prompt"]
headers = headers + ["Image link "+str(n+1) for n in range(max_cols)]
df = pd.DataFrame(columns=headers)
# Due to 502 prompts and 499 set of images mismatch, manual deletion required. Hard to do this programtically
df['Prompt'] = all_texts
idx = 0
for sublist in all_images:
    for n, _ in enumerate(sublist):
        df.at[idx, "Image link "+str(n+1)] = sublist[n]
    idx += 1

df.to_excel('D:/Developer/assemblyai_hackathon/full_midjourney2.xlsx')
