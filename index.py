
from flask import Flask, Response
import os
# configuracion de puertos, path, etc...
# import settings

# from datetime import datetime, timedelta
# import calendar

from flask import Flask
from flask_cors import CORS
from flask import render_template
from flask import request
from flask import redirect
from flask import url_for
from flask import session
from flask.json import jsonify



app = Flask(__name__)

@app.route("/", methods=["get"])
def home():
    return Response("Perct")

@app.route("/api", methods=["get"])
def api():
    return jsonify({"resultado": "ok"})


# @app.route('/', defaults={'path': ''})
# @app.route('/<path:path>')
# def catch_all(path):
#     return Response("<h1>Flask</h1><p>You visited: /%s</p>" % (path), mimetype="text/html")