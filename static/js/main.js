const downloadForm = document.getElementById("form__container");
const formInput = document.getElementById("form__input");
const btnDownload = document.getElementById("form__btn");

downloadForm.addEventListener("submit", async (event) => {
	try {
		event.preventDefault();
		hideStatusMessage();

		const urlForm = formInput.value;

		btnDownload.disabled = true;
		await downloadVideo(urlForm);
		showStatusMessage("Su video se descargó con éxito.");

	} catch (error) {
		console.error(error);
		showStatusMessage("No se pudo descargar el video.");
	}
	finally {
		btnDownload.disabled = false;
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
	console.log(reqContent);
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