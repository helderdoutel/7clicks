import os
from flask import Flask

app = Flask(__name__)

@app.route("/")
def hello_world():
    return "Hello World! <strong>I am learning Flask</strong>", 200

if __name__ == "__main__":
    port = int(os.environ.get("PORT", 5000))
    app.run(host='127.0.0.1', port=port)
