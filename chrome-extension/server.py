from flask import Flask, request, render_template, send_file
import urllib.request
import requests
import string
import re
import json
import base64
import csv
import codecs
import os, errno
from werkzeug.utils import secure_filename
from flask_cors import CORS
import stripe
import json
from paypalrestsdk import Invoice

app = Flask(__name__)
CORS(app)

import os
os.environ["GOOGLE_APPLICATION_CREDENTIALS"]="hackuci-whitespace-4ac757eb6a08.json"

@app.route("/")
def hello():
    return 'hello'

@app.route('/charge')
def charge(): # send invoice through paypal
    invoice = Invoice({
    'merchant_info': {
        "email": "sb-9wfb04949523@business.example.com",
    },
    "billing_info": [{
        "email": "sb-dkjk24947849@personal.example.com"
    }],
    "items": [{
        "name": "Widgets",
        "quantity": 20,
        "unit_price": {
            "currency": "USD",
            "value": 2
        }
        }],
    })

    response = invoice.create()
    response = invoice.send()
    return str(response)

@app.route('/stats')
def net_stats(): # get stats for all timestamps for summary of meeting
    meetingid = request.args.get("id")
    return 'asdf'

@app.route('/imgprocess')
def asdf():
    path = request.args.get('path')
    # import argparse
    # import io

    from google.cloud import vision

    # """Returns web annotations given the path to an image."""
    client = vision.ImageAnnotatorClient()

    # if path.startswith('http') or path.startswith('gs:'):
    #     image = vision.Image()
    #     image.source.image_uri = path

    # else:
    #     with io.open(path, 'rb') as image_file:
    #         content = image_file.read()

    # image = vision.Image(content=base64.b64encode(path).decode())
    image = vision.Image(content=base64.b64encode(path))
    web_detection = client.web_detection(image=image).web_detection

    return web_detection
if __name__ == '__main__':
        app.run()