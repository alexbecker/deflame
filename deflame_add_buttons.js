function deflame() {
	// get comment authors
	var authorNodes = document.evaluate("//cite|//*[@class='fn']|//*[@class='comment_author']|//*[@class='comment-author']//span[@itemprop='name']", document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
	var authors = [];

	// avoid adding forms twice for same comment
	var added = new WeakMap();

	for (var i=0; i<authorNodes.snapshotLength; i++) {
		var authorNode = authorNodes.snapshotItem(i);

		// get innermost comment node
descent:
		while (authorNode.hasChildNodes()) {
			var children = authorNode.children;
			for (var j=0; j<children.length; j++) {
				for (var k=0; k<authorNodes.snapshotLength; k++) {
					if (children[j].isEqualNode(authorNodes.snapshotItem(k))) {
						authorNode = children[j];
						continue descent;
					}
				}
			}
			break;
		}

		// avoid adding form twice
		if (added.get(authorNode)) {
			continue;
		}
		added.set(authorNode, true);

		var author = authorNode.textContent.replace("Pingback:", "").replace(/'/g,"").trim();
		authors[authors.length] = author;

		var radioButtons = document.createElement("form");
		radioButtons.setAttribute("class", "deflame_form");
		radioButtons.setAttribute("name", "deflame_form_" + author);

		var agreeButtonLabel = document.createElement("label");
		agreeButtonLabel.appendChild(document.createTextNode(" Agree"));

		var agreeButton = document.createElement("input");
		agreeButton.setAttribute("type", "radio");
		agreeButton.setAttribute("name", "deflame_radio_" + author);
		agreeButton.setAttribute("value", "a");
		agreeButton.addEventListener("click", checkAll);

		agreeButtonLabel.appendChild(agreeButton);
		radioButtons.appendChild(agreeButtonLabel);

		var disagreeButtonLabel = document.createElement("label");
		disagreeButtonLabel.appendChild(document.createTextNode(" Disagree"));

		var disagreeButton = document.createElement("input");
		disagreeButton.setAttribute("type", "radio");
		disagreeButton.setAttribute("name", "deflame_radio_" + author);
		disagreeButton.setAttribute("value", "d");
		disagreeButton.addEventListener("click", checkAll);

		disagreeButtonLabel.appendChild(disagreeButton);
		radioButtons.appendChild(disagreeButtonLabel);

		var ignoreButtonLabel = document.createElement("label");
		ignoreButtonLabel.appendChild(document.createTextNode(" Ignore"));

		var ignoreButton = document.createElement("input");
		ignoreButton.setAttribute("type", "radio");
		ignoreButton.setAttribute("name", "deflame_radio_" + author);
		ignoreButton.setAttribute("value", "ignore");
		ignoreButton.setAttribute("checked", "true");
		ignoreButton.addEventListener("click", checkAll);

		ignoreButtonLabel.appendChild(ignoreButton);
		radioButtons.appendChild(ignoreButtonLabel);

		// add form just after authorNode
		authorNode.parentNode.insertBefore(radioButtons, authorNode.nextSibling);
	}
}

function checkAll(evt) {
	var targetName = evt.target.name;
	var targetValue = evt.target.value;

	var radioButtons = document.getElementsByName(targetName);

	for (var i=0; i<radioButtons.length; i++) {
		if (radioButtons[i].value == targetValue) {
			radioButtons[i].checked = true;
		}
	}
}

try {
	deflame();
} catch (e) {
	alert("Oops! This website isn't supported. Contact me at acbecker@uchicago.edu if you want support added.");
}
