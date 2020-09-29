# from sanic import Sanic
# from sanic.response import json
# app = Sanic()


# @app.route('/')
# @app.route('/<path:path>')
# async def index(request, path=""):
#     return json({'hello': path})

from flask import Flask, Response
app = Flask(__name__)

@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
def catch_all(path):
    return Response("<h1>Flask</h1><p>You visited: /%s</p>" % (path), mimetype="text/html")