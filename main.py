from flask import Flask, request, render_template, send_file
from services.download import download_video

app = Flask(__name__)

@app.errorhandler(404)
def not_found(error):
	return render_template("404.html"), 404

@app.route("/", methods=["GET"])
def home():
    return render_template("index.html")

@app.route("/api/download", methods=["POST"])
def download():
	url = request.json["url"]

	downloadLink = download_video(url)

	return {"downloadLink": downloadLink}

@app.route("/api/get-video/<fileName>", methods=["GET"])
def get_video(fileName):
	return send_file(f"storage/{fileName}", as_attachment=True)

if __name__ == "__main__":
    app.run(host='0.0.0.0')