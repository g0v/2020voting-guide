import json
from os import makedirs

RAW = "../data/manual/fb-ad.jsonl"
STATIC_DATA_FOLDER = "../data/static/ad"

with open(RAW) as fp:
    ads = [json.loads(ad) for ad in fp.readlines()]

for constituency, person in set((ad["選區"], ad["參選人"]) for ad in ads):
    print(constituency, person)
    person_ads = [ad for ad in ads if ad["選區"] == constituency and ad["參選人"] == person]
    makedirs(f"{STATIC_DATA_FOLDER}/{constituency}", exist_ok=True)
    with open(f"{STATIC_DATA_FOLDER}/{constituency}/{person}", "w") as fp:
        json.dump(person_ads, fp, ensure_ascii=False, indent=2)
