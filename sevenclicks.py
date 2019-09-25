import os
import requests
from flask import Flask, render_template, request
import re

app = Flask(__name__, template_folder='templates')


@app.route("/")
def home():
    url = request.args.get(
        'url', 'https://pt.wikipedia.org/wiki/Especial:Aleat%C3%B3ria')
    r = None
    if re.match(r'http(s)+://\w\w.wikipedia.org/(\S+|)+', url):
        r = requests.get(url)
    if r:
        r = r.text.replace('href="/', 'href="https://pt.wikipedia.org/')
    return render_template('index.html', text=r)


@app.route('/wiki/<page>')
def pagina_wiki(page):
    url = request.args.get(
        'url', 'https://pt.wikipedia.org/wiki/' + page)
    if re.match(r'http(s)+://\w\w.wikipedia.org/(\S+|)+', url):
        r = requests.get(url)
    if r:
        r = r.text.replace('href="/', 'href="https://pt.wikipedia.org/')
    return r

if __name__ == "__main__":
    port = int(os.environ.get("PORT", 5000))
    app.run(host='0.0.0.0', port=port, debug=True)
