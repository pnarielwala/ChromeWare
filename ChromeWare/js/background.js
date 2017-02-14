(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
/**
 * Created by pnarielwala on 2/25/2016.
 */
var Constants = function(){
    this.buttons = {
        logout: "btn-logout",
        login: "signin",
        request: "btn-createRequest",
        cancelRequest: "btn-cancel",
        createRequest: "btn-create",
        screenshot: "btn-screenshot",
        gotoRequest: "btn-gotoRequest",
        quickLinks: "btn-quickLinks",
        softwareRequest: "btn-softwareRequest",
        softwareRequirement: "btn-softwareRequirement",
        softwareTestFile: "btn-softwareTestFile",
        softwareBack: "btn-softwareBack"
    };
    this.ebYes = 2;
    this.ebNo = 1;
    this.priority = {
        immediate: "1",
        at_the_earliest: "2",
        normal: "3",
        later: "4"
    };
    this.severity = {
        severe: "1",
        major: "2",
        minor: "3"
    };
    this.type = {
        bug: "BG",
        enhancement: "EV",
        product_opening: "OR",
        question: "QU"
    };
    this.impactLayer = {
        product: "2",
        as: "1"
    };

    this.validSites = [	"inno",
        "inno2",
        "innous",
        "innous2",
        "www29",
        "localhost",
        "demo",
        "demo2",
        "demous",
        "demous2",
        "devus",
        "devus1",
        "devus2",
        "devus3",
        "devus4",
        "rctus",
        "rctus1",
        "rctus2",
        "rctus3",
        "rctus4",
        "rctus5"];

    this.invalidMsgTitle = "Invalid";
    this.invalidSiteMsgTitle = "Not a valid site";
    this.invalidSiteMsg = "<p>You cannot create a request for this site. The site domain must be one of the following:</p><ul class='errorList'><li>" + this.validSites.join("<li>") + "</li></ul>";
    this.ebMsgHTML = 1;
};

Constants.prototype.getButtons = function(){
    return this.buttons;
};

Constants.prototype.getEbYes = function(){
    return this.ebYes
};

Constants.prototype.getEbNo = function(){
    return this.ebNo
};

Constants.prototype.getPriority = function(){
    return this.priority;
};

Constants.prototype.getSeverity = function(){
    return this.severity;
};

Constants.prototype.getImpactLayer = function(){
    return this.impactLayer;
};


module.exports = Constants;

},{}],2:[function(require,module,exports){
//var _dechromeify = require('../../../node_modules/chrome-tool/CustomContextMenuItem');
//var _dechromeify = require('../../../ChromeWare/vendor/chrome_extensions');
var _transition = require("./transitions");
var _constants = new (require("./constants"));

var ContextMenu = function(transition){
    this.transition = transition;
    this.requestURL = "https://software.enablon.com/Software/?u=%2FReferent%2FRqtes&rid=";
    this.requirementURL = "https://software.enablon.com/Software/?u=%2FReferent%2FProreq&rid=";
    this.testfileURL = "https://software.enablon.com/Software/?u=%2FReferent%2FFTs&rid=";

};

ContextMenu.prototype.initialize = function(){
    var title = "Find Software Request";
    var id = chrome.contextMenus.create({"title": title, "contexts":["selection"],
        "onclick": this.openRequest});

    var title = "Find Software Requirement";
    var id = chrome.contextMenus.create({"title": title, "contexts":["selection"],
        "onclick": this.openRequirement});

    var title = "Find Software Test File";
    var id = chrome.contextMenus.create({"title": title, "contexts":["selection"],
        "onclick": this.openTestFile});
};
ContextMenu.prototype.initInWindow = function(){
    if(this.validNumber(this.getClipboard().replace("FT", ""))){
        $("#inputSoftware").val(this.getClipboard());
        // $("#" + buttons.gotoRequest).attr("disabled","disabled");
    }
};
ContextMenu.prototype.validNumber = function(content){
    var number = content.replace(/"/g, "");
    return (parseInt(number, 10) > 0)
};
ContextMenu.prototype.openRequest = function(info, tab){
    var content = JSON.stringify(info.selectionText);
    var number = content.replace(/"/g, "");
    if(parseInt(number, 10) > 0)
        chrome.tabs.create({ url: "https://software.enablon.com/Software/?u=%2FReferent%2FRqtes&rid=" + number, index: (tab.index + 1), openerTabId: tab.id});
};
ContextMenu.prototype.openRequirement = function(info, tab){
    var content = JSON.stringify(info.selectionText);
    var number = content.replace(/"/g, "");
    if(parseInt(number, 10) > 0)
        chrome.tabs.create({ url: "https://software.enablon.com/Software/?u=%2FReferent%2FProreq&rid=" + number, index: (tab.index + 1), openerTabId: tab.id });
};
ContextMenu.prototype.openTestFile = function(info, tab){
    var content = JSON.stringify(info.selectionText);
    var number = content.replace(/"/g, "");
    if(number.indexOf("FT") >=0) {
        number = number.replace("FT", "");
        if (parseInt(number, 10) > 0)
            chrome.tabs.create({
                url: "https://software.enablon.com/Software/?u=%2FReferent%2FFTs&rid=" + number,
                index: (tab.index + 1),
                openerTabId: tab.id
            });
    };
};
ContextMenu.prototype.getClipboard = function(){
    var el = document.createElement('textarea');
    document.body.appendChild(el);
    el.focus();
    document.execCommand('paste');
    var value = el.value;
    document.body.removeChild(el)
    return value;
};
ContextMenu.prototype.clearClipboard = function(){
    var el = document.createElement('textarea');
    var text = document.createTextNode("\0");
    el.appendChild(text);
    document.body.appendChild(el);
    el.select();
    document.execCommand('copy');
    document.body.removeChild(el);
};
ContextMenu.prototype.gotoRequest = function(){
    var self = this;
    return function(){
        var number = $("#inputSoftware").val();
        if(self.validNumber(number)){
            var url = "https://software.enablon.com/Software/?u=%2FReferent%2FRqtes&rid=" + number;
            self.transition.hideQuickLinks();
            self.clearClipboard()
            chrome.tabs.query({currentWindow: true,active: true},function(tabs){chrome.tabs.create({ url: url, index: (tabs[0].index + 1), openerTabId: tabs[0].id });});
        }
    }
};
ContextMenu.prototype.gotoRequirement = function(){
    var self = this;
    return function(){
        var number = $("#inputSoftware").val();
        if(self.validNumber(number)){
            var url = "https://software.enablon.com/Software/?u=%2FReferent%2FProreq&rid=" + number;
            self.transition.hideQuickLinks();
            self.clearClipboard()
            chrome.tabs.query({currentWindow: true,active: true},function(tabs){chrome.tabs.create({ url: url, index: (tabs[0].index + 1), openerTabId: tabs[0].id });});
        }
    }
};
ContextMenu.prototype.gotoTestFile = function(){
    var self = this;
    return function(){
        var number = $("#inputSoftware").val();
        if(self.validNumber(number.replace("FT", ""))){
            var url = "https://software.enablon.com/Software/?u=%2FReferent%2FFTs&rid=" + number.replace("FT", "");
            self.transition.hideQuickLinks();
            self.clearClipboard()
            chrome.tabs.query({currentWindow: true,active: true},function(tabs){chrome.tabs.create({ url: url, index: (tabs[0].index + 1), openerTabId: tabs[0].id });});
        }
    }
};
ContextMenu.prototype.quickLinksEvents = function(){
    var self = this;
    //$("#" + buttons.gotoRequest).click(this.gotoRequest());
    $("#" + _constants.buttons.softwareRequest).click(this.gotoRequest());
    $("#" + _constants.buttons.softwareRequirement).click(this.gotoRequirement());
    $("#" + _constants.buttons.softwareTestFile).click(this.gotoTestFile());

    $("#software-clearField").click(function(){ self.clearClipboard(); $("#inputSoftware").val("")});
    $("#" + _constants.buttons.quickLinks).click(function(){ self.transition.showQuickLinks()});
    $("#" + _constants.buttons.softwareBack).click(function(){ self.transition.hideQuickLinks()});

    $(document).keypress(function(e) {
        if(e.which == 13 && localStorage.getItem("currentWindow") == "quickLinks") {
            $("#" + _constants.buttons.softwareRequest).click();
        }
    });
};

module.exports = ContextMenu;

},{"./constants":1,"./transitions":3}],3:[function(require,module,exports){
var _window = require('./windows');

var Transitions = function(){
    this.states = _window;
    this.states.initWindows();
};

Transitions.prototype.initialize = function(){
    var initialWindow = localStorage.getItem("currentWindow") == undefined ? this.states.defaultId : localStorage.getItem("currentWindow");
    switch (initialWindow) {
        case "loginWindow":
            this.states.hideLoading();
            this.states.showWindowNow(initialWindow, "slideInLeft");
            localStorage.setItem("currentWindow", initialWindow);
            break;
        case "main":
            this.states.hideLoading();
            this.states.hideWindowNow("loginWindow", "slideOutLeft");
            this.states.hideWindowNow("request", "slideOutRight");
            this.states.hideWindowNow("quickLinks", "slideOutRight");
            this.states.hideWindowNow("settings", "slideOutRight");
            localStorage.setItem("currentWindow", "main");
            break;
        case "request":
            this.states.hideLoading();
            this.states.hideWindowNow("loginWindow", "slideOutLeft");
            this.states.hideWindowNow("quickLinks", "slideOutRight");
            this.states.hideWindowNow("settings", "slideOutRight");
            localStorage.setItem("currentWindow", "request");
            break;
        case "quickLinks":
            this.states.hideLoading();
            this.states.hideWindowNow("loginWindow", "slideOutLeft");
            this.states.hideWindowNow("request", "slideOutRight");
            localStorage.setItem("currentWindow", "quickLinks");
            break;
        default:
            console.warn("showWindow has not been implemented for window: " + initialWindow);
            break;
    };
};
Transitions.prototype.loginSuccess = function(){
    this.states.hideLoading();
    if(localStorage.getItem("currentWindow") == "loginWindow"){
        this.states.hideWindow("loginWindow", "slideOutLeft");
        this.states.hideWindowNow("request", "slideOutRight");
        this.states.hideWindowNow("quickLinks", "slideOutRight");
        localStorage.setItem("currentWindow", "main");
    };
};
Transitions.prototype.checkLogin = function(){
    this.states.showLoading();
};
Transitions.prototype.loginFail = function(){
    this.states.hideLoading();
};
Transitions.prototype.loggedOut = function(){
    //Ideally we want to show a modal for this login instead of going to the orig login
    var initialWindow = localStorage.getItem("currentWindow");
    this.states.showWindowNow("loginWindow", "slideInLeft");
    this.states.hideLoading();
    if(initialWindow == "request"){
        localStorage.setItem("currentWindow", "request")
    }
};
Transitions.prototype.loggedIn = function(){
    this.states.hideLoading();
    this.states.hideWindowNow("loginWindow", "slideOutLeft");
    if(localStorage.getItem("currentWindow") == "loginWindow"){
        this.states.hideWindowNow("request", "slideOutRight");
        this.states.hideWindowNow("quickLinks", "slideOutRight");
        localStorage.setItem("currentWindow", "main");
    }
};
Transitions.prototype.logOut = function(){
    this.states.hideLoading();
    this.states.showWindow("loginWindow", "slideInLeft");
    localStorage.setItem("currentWindow", "loginWindow");
};
Transitions.prototype.createRequest = function(){
    this.states.showWindow("request", "slideInRight");
    localStorage.setItem("currentWindow", "request");
};
Transitions.prototype.cancelRequest = function(){
    this.states.showWindow("request", "slideOutRight");
    localStorage.setItem("currentWindow", "main");
};
Transitions.prototype.showQuickLinks = function(){
    this.states.showWindow("quickLinks", "slideInRight");
    localStorage.setItem("currentWindow", "quickLinks");
};
Transitions.prototype.hideQuickLinks = function(){
    this.states.showWindow("quickLinks", "slideOutRight");
    localStorage.setItem("currentWindow", "main");
};
Transitions.prototype.showSettings = function(){
    this.states.showWindow("settings", "slideInRight");
    localStorage.setItem("currentWindow", "settings");
};
Transitions.prototype.hideSettings = function(){
    this.states.showWindow("settings", "slideOutRight");
    localStorage.setItem("currentWindow", "main");
};

module.exports = Transitions;
},{"./windows":4}],4:[function(require,module,exports){
var Windows = function(){
    this.defaultId = undefined;
    this.loadingId = undefined;
};

Windows.prototype.initWindows = function(){
    jQuery.ajaxSetup({async:false});
    $.get("body.html")
        .done(function(data){
            $("#app").append(data)
        });
    $.get("login.html")
        .done(function(data){
            $("#loginWindow").append(data)
        });
    $.get("main.html")
        .done(function(data){
            $("#main").append(data)
        });
    $.get("request.html")
        .done(function(data){
            $("#request").append(data)
        });
    $.get("modal.html")
        .done(function(data){
            $("#modal").append(data)
        });
    $.get("quickLinks.html")
        .done(function(data){
            $("#quickLinks").append(data)
        });
    $.get("settings.html")
        .done(function(data){
            $("#settings").append(data)
        });
    jQuery.ajaxSetup({async:true});
    this.setLoadingWindow();
    this.setDefaultWindow();
};
Windows.prototype.setDefaultWindow = function(){
    if($(".default").length === 1){
        var defaultWindow = $(".default").attr("id");
        if(defaultWindow !== undefined && defaultWindow !== null){
            this.defaultId = defaultWindow;
        }else{
            console.warn("Default window has no id assigned: " + defaultWindow)
        }
    }else{
        console.warn("Default window has not been defined")
    }
};
Windows.prototype.setLoadingWindow = function(){
    if($(".loading-window").length === 1){
        var loadingWindow = $(".loading-window").attr("id");
        if(loadingWindow !== undefined && loadingWindow !== null){
            loadingId = loadingWindow;
        }else{
            console.warn("Loading window has no id assigned")
        }
    }else{
        console.warn("Loading window has not been defined")
    }
};
Windows.prototype.hideWindow = function(id, animation){
    this.removeClasses(id);
    $("#" + id).addClass("animated").addClass(animation);
};
Windows.prototype.hideWindowNow = function(id, animation){
    this.removeClasses(id);
    $("#" + id).addClass("animated-now").addClass(animation);
};
Windows.prototype.showWindow = function(id, animation){
    this.removeClasses(id);
    $("#" + id).addClass("animated").addClass(animation);
    localStorage.setItem("currentWindow", id);
};
Windows.prototype.showWindowNow = function(id, animation){
    this.removeClasses(id);
    $("#" + id).addClass("animated-now").addClass(animation);
    localStorage.setItem("currentWindow", id);
};
Windows.prototype.removeClasses = function(id){
    $("#" + id).removeClass("animated-now")
        .removeClass("animated")
        .removeClass("slideInLeft")
        .removeClass("slideInRight")
        .removeClass("slideOutLeft")
        .removeClass("slideOutRight");
};
Windows.prototype.showLoading = function(){
    $("#" + loadingId).show();
};
Windows.prototype.hideLoading = function(){
    $("#" + loadingId).hide();
};
Windows.prototype.loadCurrentWindow = function(){
    this.showWindow(localStorage.getItem("currentWindow") == undefined ? this.defaultId : localStorage.getItem("currentWindow"))
};

module.exports = new Windows();
},{}],5:[function(require,module,exports){
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

},{"./contextMenu":2}]},{},[5]);
