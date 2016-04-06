/**
 * Created by pnarielwala on 4/6/2016.
 */
var _modal = require('./modal');
var _constants = new (require('./constants'));

var Version = function(){
    function onInstall() {
        console.log("Extension Installed");
    }

    function onUpdate() {
        console.log("Extension Updated");
        var updateHTML =
            "<div>" +
                "<h4>Changes:</h4>" +
                "<ul class='errorList'>" +
                    "<li>Added Required fields</li>" +
                    "<li>Credentials are no longer saved</li>" +
                "</ul>" +
            "<div>";
        new _modal("success", "ChromeWare has Updated!", updateHTML, _constants.ebMsgHTML).display();
    }

    function getVersion() {
        var details = chrome.app.getDetails();
        return details.version;
    }

    // Check if the version has changed.
    var currVersion = getVersion();
    var prevVersion = localStorage['version']
    if (currVersion != prevVersion) {
        // Check if we just installed this extension.
        if (typeof prevVersion == 'undefined') {
            onInstall();
        } else {
            onUpdate();
        }
        localStorage['version'] = currVersion;
    }
};

module.exports = Version;