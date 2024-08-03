from flask import Flask, request, jsonify
from flask_cors import CORS
import pandas as pd
import json
import os

app = Flask(__name__)
CORS(app)

@app.route('/api/upload', methods=['POST'])
def upload_file():
    if 'file' not in request.files:
        return jsonify({'error': 'No file part'}), 400

    file = request.files['file']
    if file.filename == '':
        return jsonify({'error': 'No selected file'}), 400

    if file:
        filepath = os.path.join('/tmp', file.filename)
        file.save(filepath)

        data = pd.read_excel(filepath, usecols='B:G', skiprows=2)
        data = data.drop(data.columns[3], axis=1)
        data.columns = ["Reg No", "Name", "Leetcode ID", "Codeforce ID", "CodeChef ID"]
        jsond = json.loads(data.to_json(orient='records'))

        return jsonify(jsond[1:])

app = app