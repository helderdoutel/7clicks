import os
import requests
from flask import Flask

app = Flask(__name__)

@app.route("/")
def hello_world():
    r = requests.get('https://pt.wikipedia.org/wiki/Especial:Aleat%C3%B3ria')
    return r.text.replace('href="/', 'href="https://pt.wikipedia.org/')

if __name__ == "__main__":
    port = int(os.environ.get("PORT", 5000))
    app.run(host='0.0.0.0', port=port)
