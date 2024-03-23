from yt_dlp import YoutubeDL
import os
import random
import string

def download_video(url):
	current_path = os.path.dirname(__file__)
	output_directory = f"{current_path}/../storage"

	fileName = generateRandomString()

	ydlp_config = {
		"outtmpl": f"{output_directory}/{fileName}.%(ext)s"
	}

	with YoutubeDL(ydlp_config) as ydl:
		info = ydl.extract_info(url, download=True)
		fileName = f"{fileName}.{info['ext']}"
		return f"/api/get-video/{fileName}"

def generateRandomString():
    characters = string.ascii_letters + string.digits
    length = 10
    random_string  = ''.join(random.choice(characters) for _ in range(length))
    return random_string 