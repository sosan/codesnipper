from flask import Flask, Response
app = Flask(__name__)


# @app.route('/', defaults={'path': ''})
@app.route("/", methods=["get"])
def home():
    return Response("<h1>Flask</h1><p>You visited:</p>")
