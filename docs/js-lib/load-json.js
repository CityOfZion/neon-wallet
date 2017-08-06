function loadJson(url, callbackFn) {
	$.ajaxSetup({
		beforeSend : function(xhr) {
			if (xhr.overrideMimeType) {
				xhr.overrideMimeType("application/json");
			}
		}
	});
	$.getJSON(url, callbackFn);
}