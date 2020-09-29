
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

@app.route("/", methods=["get"])
def home():
    return Response("Perct")



@app.route("/api", methods=["post"])
def api():

    if ("apiToken" in request.form):
        pass
        # return jsonify({"resultado": "ok"})

    return redirect(url_for("home"))