from yt_dlp import YoutubeDL
import os

def download_video(url):
	current_path = os.path.dirname(__file__)
	output_directory = f"{current_path}/../storage"

	ydlp_config = {
		"outtmpl": f"{output_directory}/%(title)s.%(ext)s",
		"cookiefile": "cookie.txt"
	}

	with YoutubeDL(ydlp_config) as ydl:
		info = ydl.extract_info(url, download=True)
		fileName = f"{info['title']}.{info['ext']}"
		return f"/api/get_video/{fileName}"

