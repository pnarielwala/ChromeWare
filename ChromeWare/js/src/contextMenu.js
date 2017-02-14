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
