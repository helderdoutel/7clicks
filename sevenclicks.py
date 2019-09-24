import os
import requests
from flask import Flask, render_template, request
import re

app = Flask(__name__)

@app.route("/pagina")
def rende_pagina():
    url = request.args.get(
        'url', 'https://pt.wikipedia.org/wiki/Especial:Aleat%C3%B3ria')
    r = None
    if re.match(r'http(s)+://\w\w.wikipedia.org/(\S+|)+', url):
        r = requests.get(url)
    if r:
        return r.text.replace('href="/', 'href="https://pt.wikipedia.org/')
    return "Ops"

@app.route("/")
def home():
    return "Calmaa!"

if __name__ == "__main__":
    port = int(os.environ.get("PORT", 5000))
    app.run(host='0.0.0.0', port=port)
