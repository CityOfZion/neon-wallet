function loadText(url, callback) {
	jQuery.get(url, null, callback, "text");
}