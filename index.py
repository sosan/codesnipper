
from flask import Flask, Response
import os
# configuracion de puertos, path, etc...
import settings
settings.readconfig()

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
env_produccion = os.getenv("FLASK_ENV", "production")

app.config("ENV", env_produccion)
# app.config("FLASK_APP", "index.py")

@app.route("/", methods=["get"])
def home():
    return Response("Perct {}" .format(env_produccion))

@app.route("/api", methods=["get"])
def api():
    return jsonify({"resultado": "ok"})
