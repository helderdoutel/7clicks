import os
import requests
from flask import Flask, render_template, request
import re

app = Flask(__name__)

HEAD = """
    <script type="text/javascript" src="/static/game_controller.js"></script>
    <link rel="stylesheet" href="/static/stylesheet.css"/>
    """

@app.route("/pagina")
def rende_pagina():
    url = request.args.get(
        'url', 'https://pt.wikipedia.org/wiki/Especial:Aleat%C3%B3ria')
    r = None
    if re.match(r'http(s)+://\w\w.wikipedia.org/(\S+|)+', url):
        r = requests.get(url)
    if r:
        return frame(pagina=r.text.replace('href="/', 'href="https://pt.wikipedia.org/'))
    return "Ops"

@app.route("/")
def home():
    return frame()

def frame(pagina=None):
    header = """
    <div>
        <div class='header'>
            <h1 class='title'>Sete cliques para as estrelas!</h1>
            <div>
                <input type='text' id='pagina_inicio' placeholder='pagina inicial' name='inicio'>
                <input type='text' id='pagina_destino' placeholder='pagina destino' name='destino'>
                <input type='submit' value='Come&ccedil;ar' onClick='comecar_jogo()'>
            </div>
        </div>
        <div class="page">
    """
    footer = "</div></div>"
    
    default = "<div class='start'><input type='submit' value='Me surpreenda!' onClick='comecar_jogo()'></div>"

    result = (pagina is not None) and (header + HEAD) + pagina + footer or (header + HEAD) + default + footer
    return  result

if __name__ == "__main__":
    port = int(os.environ.get("PORT", 5000))
    app.run(host='0.0.0.0', port=port)
