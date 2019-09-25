# -*- coding: utf-8 -*-
import os
import requests
from flask import Flask, render_template, request, session, jsonify
import re

app = Flask(__name__, template_folder='templates')

app.secret_key = str(os.urandom(32))


@app.route("/")
def home():
    # r = None
    # if re.match(r'http(s)+://\w\w.wikipedia.org/(\S+|)+', url):
    #     r = requests.get(url)
    # if r:
    #     r = r.text.replace('href="/', 'href="https://pt.wikipedia.org/')
    return render_template('index.html')


@app.route("/start", methods=["POST"])
def iniciar():
    page_start = request.form.get(
        'page_start', 'https://pt.wikipedia.org/wiki/Especial:Aleat%C3%B3ria')

    page_end = request.form.get(
        'page_end', 'https://pt.wikipedia.org/wiki/Especial:Aleat%C3%B3ria')

    if not page_start or\
            not re.match(r'http(s)+://\w\w.wikipedia.org/(\S+|)+', page_start):
        page_start = 'https://pt.wikipedia.org/wiki/Especial:Aleat%C3%B3ria'

    if not page_end or\
            not re.match(r'http(s)+://\w\w.wikipedia.org/(\S+|)+', page_end):
        page_end = 'https://pt.wikipedia.org/wiki/Especial:Aleat%C3%B3ria'

    page_start = requests.get(page_start)
    url_end = requests.get(page_end).url

    session['url_start'] = page_start.url
    session['url_end'] = url_end

    if page_start:
        text = page_start.text.replace(
            'href="/', 'href="https://pt.wikipedia.org/')

    return jsonify({"text": text, "destino": url_end})


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
