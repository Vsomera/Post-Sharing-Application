from flask import Flask, render_template, request, redirect, url_for

app = Flask(__name__)

users = {"username": "password"} 

@app.route("/", methods=["GET"])
def home():
    return redirect(url_for("login"))

@app.route("/login", methods=["GET", "POST"])
def login():
    if request.method == "POST":
        username = request.form["username"]
        password = request.form["password"]
        if username in users and users[username] == password:
            return redirect(url_for("welcome"))
        else:
            return "Invalid credentials, please try again."
    return render_template("login.html")

@app.route("/create-account", methods=["GET"])
def create_account():
    return redirect("http://localhost:5000/register")

@app.route("/welcome")
def welcome():
    return "Welcome, you are logged in!"

if __name__ == "__main__":
    app.run(debug=True)