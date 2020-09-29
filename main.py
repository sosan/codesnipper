# -*- coding: utf-8 -*-
"""
BACKEND NOTION

"""
import os
# configuracion de puertos, path, etc...
import settings

from datetime import datetime, timedelta
import calendar

from flask import Flask
from flask_cors import CORS
from flask import render_template
from flask import request
from flask import redirect
from flask import url_for
from flask import session

# logica app
from ModuloLogica.Logica import ManagerLogica

# instanciaciones e inicializciones web
app = Flask(__name__)
app.secret_key = os.urandom(42)
CORS(app)
managerlogica = ManagerLogica()


# ruta home
@app.route("/", methods=["get"])
def home():
    return render_template("index.html")


if __name__ == "__main__":
    settings.readconfig()
    env_port = int(os.getenv("PORT", 5000))
    env_debug = os.getenv("FLASK_DEBUG", True)
    produccion = os.getenv("FLASK_ENV", "production")
    app.config("ENV", produccion)
    
    app.run(host="0.0.0.0", port=env_port, debug=env_debug)