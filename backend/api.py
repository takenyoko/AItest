from flask import Flask, request, jsonify
from flask_cors import CORS
import requests

app = Flask(__name__)
CORS(app)

GEMINI_API_KEY = "AIzaSyCk5WKfTe8oGK2nEbSVYoiZjFeaqvndYLo"  # ここに本物のAPIキーを入力

@app.route('/ask', methods=['POST'])
def ask_gemini():
    data = request.get_json()
    question = data.get('question', '')
    response = requests.post(
        "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent",
        params={"key": GEMINI_API_KEY},
        json={
            "contents": [{"parts": [{"text": question}]}]
        }
    )
    return jsonify(response.json())

if __name__ == '__main__':
    app.run(host="0.0.0.0", port=8000, debug=True)