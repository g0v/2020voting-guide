import json
from os import makedirs

import requests

RAW = "../data/manual/fb-ad.jsonl"
STATIC_DATA_FOLDER = "../data/static/ad"

url = "https://gist.githubusercontent.com/ronnywang/dd781d031501d69f70ddba6a2bf88d9b/raw/29930a8246e73e92ad99646bb1f3ff4b0401a8c2/fb-ad.jsonl"
response = requests.get(url)

ads = [json.loads(ad) for ad in response.text.split("\n") if ad]
ads = [ad for ad in ads if "廣告詳情" in ad and "ad_creative_body" in ad.get("廣告詳情")]

# # file version
# with open(RAW) as fp:
# ads = [json.loads(ad) for ad in fp.readlines()]

for constituency, person in set((ad["選區"], ad["參選人"]) for ad in ads):
    print(constituency, person)
    person_ads = [ad for ad in ads if ad["選區"] == constituency and ad["參選人"] == person]
    makedirs(f"{STATIC_DATA_FOLDER}/{constituency}", exist_ok=True)
    with open(f"{STATIC_DATA_FOLDER}/{constituency}/{person}.json", "w") as fp:
        json.dump(person_ads, fp, ensure_ascii=False, indent=2)
