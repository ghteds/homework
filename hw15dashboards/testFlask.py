# from flask import Flask


# from flask import Flask, jsonify, render_template
# from flask_sqlalchemy import SQLAlchemy
# app = Flask(__name__)
from flask import Flask

app = Flask(__name__)

# from app import routes

# @app.route('/')
# def hello_world():
#     return 'Hello, World!'

from app import app

@app.route('/')
@app.route('/index')
def index():
    return "Hello, World!"

if __name__ == "__main__":
    app.run(debug=True)