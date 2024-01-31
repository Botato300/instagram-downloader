const downloadForm = document.getElementById("form__container");
const formInput = document.getElementById("form__input");
const btnDownload = document.getElementById("form__btn");

const GUI_STATE = {
	"INIT": Symbol(),
	"DOWNLOADING": Symbol(),
	"DOWNLOADED": Symbol()
}

downloadForm.addEventListener("submit", async (event) => {
	try {
		event.preventDefault();
		setGUIState(GUI_STATE.INIT);

		const urlForm = formInput.value;

		setGUIState(GUI_STATE.DOWNLOADING);
		await downloadVideo(urlForm);
		setGUIState(GUI_STATE.DOWNLOADED);

	} catch (error) {
		console.error(error);
		setGUIState(GUI_STATE.FAILURE);
	}
});

async function downloadVideo(url) {
	const response = await fetch("/api/download", {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify({
			url: url
		})
	});

	if (!response.ok) throw new Error("La petición devolvió un codigo http no exitoso.");

	const reqContent = await response.json();
	window.location.href = reqContent.downloadLink;
}

function showStatusMessage(message) {
	const downloadStatus = document.getElementById("downloadStatus");

	downloadStatus.style.display = "block";
	downloadStatus.textContent = message;
}

function hideStatusMessage() {
	const downloadStatus = document.getElementById("downloadStatus");

	downloadStatus.style.display = "none";
}

function setGUIState(newState) {
	switch (newState) {
		case GUI_STATE.INIT:
			hideStatusMessage();

			break;

		case GUI_STATE.DOWNLOADING:
			btnDownload.disabled = true;
			btnDownload.textContent = "Descargando...";

			break;

		case GUI_STATE.DOWNLOADED:
			showStatusMessage("Su video se descargó con éxito.");

			btnDownload.disabled = false;
			btnDownload.textContent = "Descargar";

			break;

		case GUI_STATE.FAILURE:
			showStatusMessage("No se pudo descargar el video.");

			btnDownload.disabled = false;
			btnDownload.textContent = "Descargar";

			break;
	}
}