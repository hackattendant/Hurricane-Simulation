function previewFile() {
	const preview = document.querySelector('img');
	const file = document.querySelector('input[type').files[0];
	const reader = new FileReader();

	reader.addEventListener("load", function () {
		// convert image file to base 64 string
		preview.src = reader.result;
	}, false);

	if (file) {
		reader.readAsDataURL(file);
	}
}