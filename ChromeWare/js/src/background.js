//var _dechromeify = require('../../../node_modules/chrome-tool/spec/helpers/ChromeApi');
var _contextMenu = require('./contextMenu');

if(!('update_url' in chrome.runtime.getManifest())){
    chrome.browserAction.setBadgeText({text: "Dev"});
}else{
    var currVersion = chrome.app.getDetails().version;
    var prevVersion = localStorage['version'];
    if (currVersion != prevVersion) {
        // Check if we just installed this extension.
        if (typeof prevVersion == 'undefined') {
            null
        } else {
            chrome.browserAction.setBadgeText({text: "NEW"});
        }
    }
};

var _contextMenu = new _contextMenu();
_contextMenu.initialize();
