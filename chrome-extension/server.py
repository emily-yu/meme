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

if __name__ == '__main__':
        app.run()