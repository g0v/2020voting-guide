from os import environ, path

from transform import transform
from crawl_legislator_info import crawl_all


FILE_DIR = path.dirname(path.abspath(__file__))
OUTPUT_DIR = environ.get('OUTPUT_DIR', f'{FILE_DIR}/../../data/raw')
TRANSFORM_DIR = f'{FILE_DIR}/../../data/organized'


if __name__ == "__main__":
    crawl_all(output_dir=OUTPUT_DIR)
    transform(raw_dir=OUTPUT_DIR, output_dir=TRANSFORM_DIR)
