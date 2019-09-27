# -*- coding: utf-8 -*-
import os
import requests
from flask import Flask, render_template, request, session, jsonify
import re
import urllib
from flask_talisman import Talisman

app = Flask(__name__, template_folder='templates')
app.secret_key = str(os.urandom(32))

Talisman(app, content_security_policy_report_only=True,
         content_security_policy_report_uri='')


@app.route("/")
def home():
    """Pagina inicial do site."""
    return render_template('index.html')


@app.route("/start", methods=["POST"])
def iniciar():
    """Funcao para iniciar o jogo."""
    mobile = int(request.form.get('mobile', 0))

    session['mobile'] = mobile

    if mobile:
        url_default = 'https://pt.wikipedia.org/wiki/Especial:Aleat%C3%B3ria'
    else:
        url_default = 'https://pt.m.wikipedia.org/wiki/Especial:Aleat%C3%B3ria'

    page_start = request.form.get('page_start', url_default)

    page_end = request.form.get('page_end', url_default)

    if not page_start or\
            not re.match(r'http(s)+://\w\w\.(|m\.)wikipedia.org/(\S+|)+',
                         page_start):
        page_start = url_default

    if not page_end or\
            not re.match(r'http(s)+://\w\w\.(|m\.)wikipedia.org/(\S+|)+',
                         page_end):
        page_end = url_default

    page_start = requests.get(page_start)
    url_start = urllib.parse.unquote(page_start.url)
    url_end = urllib.parse.unquote(requests.get(page_end).url)

    session['url_start'] = url_start
    session['url_end'] = url_end

    if page_start:
        if mobile:
            text = page_start.text.replace(
                'href="/', 'href="https://pt.m.wikipedia.org/')
        else:
            text = page_start.text.replace(
                'href="/', 'href="https://pt.wikipedia.org/')

    return jsonify({"text": text, "destino": url_end, 'inicio': url_start})


@app.route('/random',  methods=["POST", "GET"])
def pegar_aleatoria():
    """Retorna pagina aleatoria."""
    mobile = int(request.form.get('mobile', 0))

    session['mobile'] = mobile

    if mobile:
        url_default = 'https://pt.wikipedia.org/wiki/Especial:Aleat%C3%B3ria'
    else:
        url_default = 'https://pt.m.wikipedia.org/wiki/Especial:Aleat%C3%B3ria'

    page = requests.get(url_default)

    url = urllib.parse.unquote(page.url)
    return jsonify({"url": url})


@app.route('/wiki/<page>')
def pagina_wiki(page):
    """Busca a pagina do wikipedia do link clicado."""
    if 'mobile' in session and session['mobile'] == 1:
        url_default = 'https://pt.wikipedia.org/wiki/'
        url_sub = 'href="https://pt.wikipedia.org/'
    else:
        url_default = 'https://pt.m.wikipedia.org/wiki/'
        url_sub = 'href="https://pt.m.wikipedia.org/'

    url = request.args.get('url', url_default + page)
    if re.match(r'http(s)+://\w\w\.(|m\.)wikipedia.org/(\S+|)+', url):
        r = requests.get(url)
    if r:
        r = r.text.replace('href="/', url_sub)

    if url == session['url_end']:
        end = 1
    else:
        end = 0

    return jsonify({"text": r, "atingiu_destino": end})


if __name__ == "__main__":
    port = int(os.environ.get("PORT", 5000))
    app.run(host='0.0.0.0', port=port)
