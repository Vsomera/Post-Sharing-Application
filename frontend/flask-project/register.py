from flask import Flask, render_template, request, redirect, url_for

app = Flask(__name__)

# Instead of a dictionary, using a list of dictionaries to store user data
users = [
    {"username": "exampleuser", "password": "examplepass", "email": "example@email.com"}
]

@app.route("/", methods=["GET"])
def home():
    return redirect(url_for("register"))

@app.route("/register", methods=["GET", "POST"])
def register():
    if request.method == "POST":
        username = request.form["username"]
        password = request.form["password"]
        confirmPassword = request.form["confirmPassword"]
        email = request.form["email"]

        # Check if passwords match
        if password != confirmPassword:
            return "Passwords do not match!"

        # Check if user already exists
        if any(user["username"] == username for user in users):
            return "Username already exists!"

        # Register the new user
        users.append(
            {"username": username, "password": password, "email": email})
        return redirect(url_for("login"))

    return render_template("register.html")


@app.route("/login", methods=["GET", "POST"])
def login():
    if request.method == "POST":
        username = request.form["username"]
        password = request.form["password"]
        user = next(
            (user for user in users if user["username"] == username and user["password"] == password), None)

        if user:
            return redirect(url_for("welcome"))
        else:
            return "Invalid credentials, please try again."

    return render_template("login.html")



@app.route("/welcome")
def welcome():
    return "Welcome, you are logged in!"


if __name__ == "__main__":
    app.run(debug=True)
