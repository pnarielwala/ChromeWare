var _dechromeify = require('../../../node_modules/chrome-tool/spec/helpers/ChromeApi');
var _contextMenu = require('../../../ChromeWare/js/src/contextMenu');

chrome.browserAction.setBadgeText({text: "Dev"});

//var startContextMenu = new _contextMenu();
_contextMenu.initialize();