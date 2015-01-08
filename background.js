chrome.runtime.onInstalled.addListener(function() {
	chrome.declarativeContent.onPageChanged.removeRules(undefined, function() {
		chrome.declarativeContent.onPageChanged.addRules([{
			conditions: [
				new chrome.declarativeContent.PageStateMatcher({
					css: ["ol[class*='comment']"]
				})
			],

			actions: [new chrome.declarativeContent.ShowPageAction() ]
		}]);
	});
});

var tabClicks = {};

chrome.pageAction.onClicked.addListener(function(tab) {
	var tabUrl = encodeURIComponent(tab.url);

	var clicks = tabClicks[tab.id] || 0;
	if (clicks == 0) {
		tabClicks[tab.id] = 1;
	} else {
		tabClicks[tab.id]++;
	}

	if (clicks % 2 == 1) {
		chrome.pageAction.setIcon({tabId: tab.id, path: "handshake.png"});
		chrome.tabs.executeScript(tab.id, {file: "deflame_delete_comments.js"});
	} else {
		chrome.pageAction.setIcon({tabId: tab.id, path: "next.png"});
		chrome.tabs.executeScript(tab.id, {file: "deflame_add_buttons.js"});
	}
});
