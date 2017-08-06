function loadArchCallback(response) {
	var data = response;

	var divList = document.getElementsByClassName("arch");
	for (let divIx = 0; divIx < divList.length; divIx++) {
		let div = divList[divIx];

		let divData = data[div.id];

		let cy = cytoscape({
			container : div,
			boxSelectionEnabled : false,
			autounselectify : true,
			layout : {
				name : "breadthfirst",
				directed : true,
				nodeDimensionsIncludeLabels : true
			},
			style : [ {
				selector : "node",
				style : {
					"height" : 20,
					"padding" : "5px",
					"padding-relative-to" : "width",
					"width" : "label",
					"background-color" : "#18e018",
					"text-valign" : "center",
					"text-halign" : "center",
					"shape" : "cutrectangle",
					"label" : "data(name)"
				},
			}, {
				selector : "edge",
				style : {
					"curve-style" : "haystack",
					"haystack-radius" : 0,
					"width" : 1,
					"opacity" : 0.5,
					"line-color" : "#000000",
					"text-max-width" : "100px",
					"text-wrap" : "none",
					"label" : "data(name)"
				}
			} ],
			elements : divData
		});
	}
};