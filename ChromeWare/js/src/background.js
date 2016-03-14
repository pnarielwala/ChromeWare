//var _dechromeify = require('../../../node_modules/chrome-tool/spec/helpers/ChromeApi');
var _contextMenu = require('./contextMenu');

chrome.browserAction.setBadgeText({text: "Dev"});

var _contextMenu = new _contextMenu();
_contextMenu.initialize();
