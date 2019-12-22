import re


def transform(pages_links):
    def classify_links(page):
        return {
            'title': page['title'],
            'facebook': [link for link in page.get('externallinks', []) if re.match(r'^https://www.facebook.com/[^/]+/?$', link)],
            'youtube': [
                link for link in page.get('externallinks', [])
                if re.match(r'^https://www.youtube.com/user/[^/]+/?$', link) or re.match(r'^https://www.youtube.com/channel/[^/]+/?$', link)
            ],
            'instagram': [link for link in page.get('externallinks', []) if re.match(r'^https://www.instagram.com/[^/]+/?$', link)]
        }

    return [classify_links(page) for page in pages_links]
