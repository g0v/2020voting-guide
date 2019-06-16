import requests
from spider import parse_content

params = {
    'action': 'query',
    'format': 'json',
    'rvprop': 'content',
    'prop': 'revisions',
    'titles': '陳建銘',
    'rvslots': 'main',
    'rvsection': '0',
    'utf8': ''
}
response = requests.get('https://zh.wikipedia.org/w/api.php', params)
assert response.status_code == 200

print(parse_content(response.text))
