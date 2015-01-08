function submitForms() {
	var request = "http://defla.me/deflamed.php?url=" + encodeURIComponent(document.URL) + "&good_authors=";

	var radioButtonForms = document.getElementsByClassName("deflame_form");

	// get all authors
	var authors = [];
	for (var i=0; i<radioButtonForms.length; i++) {
		authors[i] = radioButtonForms[i].name.substring(13);
	}

	// alert if no authors
	if (authors.length == 0) {
		alert("No comments found.");
		return;
	}

	// find unique representatives
	var authorsCopy = authors.slice(0);
	authorsCopy.sort();
	var uniqueAuthors = [authorsCopy[0]];
	var j = 0;
	for (var i=1; i<authorsCopy.length; i++) {
		if (authorsCopy[i] != uniqueAuthors[j]) {
			uniqueAuthors[++j] = authorsCopy[i];
		}
	}

	// make lookup table
	var lookup = {};
	for (var i=0; i<uniqueAuthors.length; i++) {
		lookup[uniqueAuthors[i]] = i;
	}

	// send request
	for (j=0; j<radioButtonForms.length; j++) {
		// only use each other once
		if (lookup[authors[j]] !== undefined) {
			delete lookup[authors[j]];
		} else {
			continue;
		}

		for (var i=0; i<3; i++) {
			var button = radioButtonForms[j].childNodes[i].children[0];

			if (button.checked && button.value != "ignore") {
				request += encodeURIComponent(authors[j]) + ":" + button.value + ";";
			}
		}
	}

	window.location = request;
}

submitForms();
