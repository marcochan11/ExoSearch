from flask import Flask, request, jsonify
from flask_cors import CORS 
from exa_py import Exa
from urllib.parse import urlparse
from dotenv import load_dotenv
import os

load_dotenv()

app = Flask(__name__)
CORS(app) 

exa = Exa(api_key=os.getenv('EXA_API_KEY'))

def home():
    return "Hello Flask"

@app.route('/search', methods=['POST'])
def search():
    data = request.get_json()
    query = data.get('query', '')

    response = exa.search(
        query,
        num_results=7,
        type='keyword',
        include_domains=[
            'https://www.tiktok.com',
            'https://www.google.com',
            'https://www.youtube.com',
            'https://en.wikipedia.org',
            'https://www.reddit.com',
            'https://www.instagram.com',
        ]
    )

    results = []
    for r in response.results:
        parsed_url = urlparse(r.url)
        domain = parsed_url.netloc.replace('www.', '')  # Clean domain without www.
        results.append({
            'title': r.title,
            'url': r.url,
            'domain': domain
        })

    return jsonify(results)


if __name__ == '__main__':
    app.run(debug=True, use_reloader=False)