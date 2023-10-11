from flask import Flask, render_template, request, jsonify
import requests
import json

app = Flask(__name__)

@app.route('/enter-data', methods=['GET'])
def enter_data():
    return render_template('enter_data.html')

@app.route('/api/add-post', methods=['POST'])
def add_post():
    data = {
        "userID": request.form['userID'],
        "title": request.form['title'],
        "postText": request.form['postText']
    }
    response = requests.post("http://localhost:8080/api/add-post", json=data)
    if response.status_code == 201:
        return "Data entered successfully!"
    else:
        return f"Failed to enter data. Error: {response.text}"

if __name__ == "__main__":
    app.run(debug=True)
