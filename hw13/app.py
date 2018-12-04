from flask import Flask, render_template, redirect
from flask_pymongo import PyMongo
from scrape_mars import scrape



app = Flask(__name__)

app.config["MONGO_URI"] = "mongodb://localhost:27017/mars_db"
mongo = PyMongo(app)


@app.route("/")
def index():

    marsInfo = mongo.db.marsInfo.find_one()
    print(marsInfo)
    #return render_template("index.html", output=marsInfo)


@app.route("/scrape")
def scraper():
    print('starting')
    marsData = scrape()
    print(marsData)

    
    mongo.db.marsInfo.update({},marsData,upsert=True)

    #return redirect("/", code=302)


if __name__ == "__main__":
    app.run(debug=True)