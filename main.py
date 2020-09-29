
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
from flask.helpers import make_response

from notion.client import NotionClient
from notion.block import CodeBlock
from notion.block import PageBlock

from ModuloLogica.Logica import ManagerLogica
managerlogica = ManagerLogica()

app = Flask(__name__)
# CORS(app,  supports_credentials=True, resources={r"/api/*": {"origins": "*"}})
#  resources={r"/api": {"origins": "*"}}
CORS(app)

@app.route("/", methods=["get"])
def home():
    return Response("Perct")


@app.route("/api", methods=["get"])
def api_get():
    return redirect(url_for("home"))


@app.route("/api", methods=["post"])
@cross_origin(origin="localhost", headers=["Content- Type","Authorization"])
def api_post():

    if ("apiToken" in request.form and "idPage" in request.form):
        if request.form["apiToken"] == "" or request.form["apiToken"] == "":
            return jsonify({"resultado": "error"})

        uuid = managerlogica.getUUIdPage(request.form["idPage"])
        if uuid == None:
            return jsonify({"resultado": "error"})

        client = NotionClient(request.form["apiToken"])

        # uuid
        # page = client.get_block(uuid)
        # token = "e90da1e31347b2b61836546b0af4378b6076d67a72a82804996450eb3ece399a12bc39fd89a81dd0592593ed556043b0cbf6dcea765da4416ebeaec81e43141f7aa6d25d2423cb7f163e109da8f2"
        # url

        url = "https://www.notion.so/cecf1c9de960437c80f4f3b9940a5a6c"
        page = client.get_block(url)

        print("titulo antiguo" + page.title)

        page.title += " (Cambiado)"
        bloquecodigo = page.children.add_new(CodeBlock, title="hooollaaa")
        response = make_response()

        if bloquecodigo.id != None:
            response = jsonify({"resultado": "ok"})
        else:
            response = jsonify({"resultado": "error"})

        response.headers.add("Access-Control-Allow-Origin", "*")
        return response

    return redirect(url_for("home"))