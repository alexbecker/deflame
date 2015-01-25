function goodAuthors() {
	var radioButtonForms = document.getElementsByClassName("deflame_form");

	// get good authors
	var used_author = {};
	var good_authors = [];
	var k = 0;
	for (i=0; i<radioButtonForms.length; i++) {
		var author = radioButtonForms[i].name.substring(13);

		if (used_author[author]) {
			continue;
		} else {
			used_author[author] = true;
		}

		for (var j=0; j<3; j++) {
			var button = radioButtonForms[i].childNodes[j].children[0];

			if (button.checked && button.value != "ignore") {
				good_authors[k++] = [author, button.value];
			}
		}
	}

	// delete radio buttons
	while (radioButtonForms.length) {
		radioButtonForms[0].parentNode.removeChild(radioButtonForms[0]);
	}

	return good_authors;
}

function contains(array, searchElement) {
	var minIndex = 0;
	var maxIndex = array.length - 1;
	var currentIndex;
	var currentElement;

	while (minIndex <= maxIndex) {
		currentIndex = (minIndex + maxIndex) / 2 | 0;
		currentElement = array[currentIndex];

		if (currentElement < searchElement) {
			minIndex = currentIndex + 1;
		}
		else if (currentElement > searchElement) {
			maxIndex = currentIndex - 1;
		}
		else {
			return true;
		}
	}

	return false;
}

function isCommentList(node) {
	if (!node) {
		return false;
	}

	var cls = node.getAttribute("class");
	var name = node.nodeName;
	var id = node.getAttribute("id");

	if ((cls && cls.substr(0, 11) == "commentlist") || cls == "comment-list" || cls == "sitetable" || (id && id.substr(0, 11) == "commentlist") || id == "comment-list" || (name == "div" && id == "comments")) {
		return true;
	}

	return false;
}

function deleteComments(good_authors) {
	// for portability & compatibility with Server-Side version
	good_authors.sort();

	// seperate into agree and disagree
	var agree =[];
	var disagree = [];
	var all = [];
	for (var i=0; i<good_authors.length; i++) {
		var author = good_authors[i][0];
		all[i] = author;
		var value = good_authors[i][1];

		if (value == "a") {
			agree[agree.length] = good_authors[i];
		} else if (value == "b") {	// portability for versions with more than two options
			disagree[agree.length] = good_authors[i];
		}
	}

	// create header source string
	var headerSrc = "http://defla.me/header.php?url=" + encodeURIComponent(document.URL) + "&good_authors=";
	for (var i=0; i<good_authors.length; i++) {
		headerSrc += encodeURIComponent(good_authors[i][0] + ":" + good_authors[i][1] + ";");
	}

	// add header
	var body = document.evaluate("//body", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
	var header = document.createElement("iframe");
	header.setAttribute("id", "deflame_frame");
	header.setAttribute("style", "position: relative; top: 0px; z-index: 1000");
	header.setAttribute("width", "100%");
	header.setAttribute("height", 125 + 35 * Math.max(agree.length, disagree.length));
	header.setAttribute("frameborder", "0");
	header.setAttribute("scrolling", "yes");
	header.setAttribute("src", headerSrc);
	body.insertBefore(header, body.firstChild);

	// get all authors
	// for compatibility with Server-Side version
	var authorNodes = document.evaluate("//cite|//*[@class='fn']|//*[@class='comment_author']|//*[@class='comment-author']//span[@itemprop='name']", document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);

	// get innermost comment list node
	var commentList = document.evaluate("//*[starts-with(@class,'commentlist')]|//*[starts-with(@id,'commentlist')]|//*[@class='comment-list']|//*[@id='comment-list']", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
	for (var i=0; i<commentList.children.length; i++) {
		if (isCommentList(commentList.children[i])) {
			commentList = commentList.children[i];
			i = -1;
		}
	}

	// delete all comments
	while (commentList.hasChildNodes()) {
		commentList.removeChild(commentList.firstChild);
	}

	// avoid double-adds
	var added = new WeakMap();

outer:
	for (var i=0; i<authorNodes.snapshotLength; i++) {
		var authorNode = authorNodes.snapshotItem(i);
		var author = authorNode.textContent.replace("Pingback:","").replace(/'/g,"").trim();

		if (contains(all, author)) {
			// get outermost comment element
			while (authorNode.parentNode) {
				authorNode = authorNode.parentNode;

				// avoid double-adds
				if (added.get(authorNode)) {
					continue outer;
				}
			}

			// add back comment element
			added.set(authorNode, true);
			commentList.appendChild(authorNode);
		}
	}
}

var good_authors = goodAuthors();
deleteComments(good_authors);
