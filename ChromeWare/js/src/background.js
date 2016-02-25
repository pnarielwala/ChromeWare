//var chrome = require("../../ChromeWare/vendor/chrome_extensions");
chrome.browserAction.setBadgeText({text: "Dev"});

var startContextMenu = new ContextMenu();
startContextMenu.initialize();