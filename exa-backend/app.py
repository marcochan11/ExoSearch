from flask import Flask, request, jsonify
from flask_cors import CORS 
from exa_py import Exa
from dotenv import load_dotenv
import os

load_dotenv()

app = Flask(__name__)
CORS(app) 

exa = Exa('EXA_API_KEY')

def home():
    return "Hello Flask"

@app.route('/search', methods=['POST'])
def search():
    data = request.get_json()
    query = data.get('query', '')

    response = exa.search(
        query,
        num_results=5,
        type='keyword',
        include_domains=['https://www.tiktok.com'],
    )

    results = [{'title': r.title, 'url': r.url} for r in response.results]

    return jsonify(results)


if __name__ == '__main__':
    app.run(debug=True, use_reloader=False)