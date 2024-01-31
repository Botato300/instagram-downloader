from yt_dlp import YoutubeDL

def download_video(url):
	ydlp_config = {
		"outtmpl": f"/storage/%(title)s.%(ext)s"
	}

	with YoutubeDL(ydlp_config) as ydl:
		info = ydl.extract_info(url, download=True)
		fileName = f"{info['title']}.{info['ext']}"
		return f"/api/get_video/{fileName}"

