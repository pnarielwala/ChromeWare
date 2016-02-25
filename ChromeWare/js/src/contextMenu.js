
var ContextMenu = (function(){

    var ret = {
        requestURL: "https://software.enablon.com/Software/?u=%2FReferent%2FRqtes&rid=",
        requirementURL: "https://software.enablon.com/Software/?u=%2FReferent%2FProreq&rid=",
        testfileURL: "https://software.enablon.com/Software/?u=%2FReferent%2FFTs&rid=",
        initialize: function initialize(){
            var title = "Find Software Request";
            var id = chrome.contextMenus.create({"title": title, "contexts":["selection"],
                "onclick": this.openRequest});

            var title = "Find Software Requirement";
            var id = chrome.contextMenus.create({"title": title, "contexts":["selection"],
                "onclick": this.openRequirement});

            var title = "Find Software Test File";
            var id = chrome.contextMenus.create({"title": title, "contexts":["selection"],
                "onclick": this.openTestFile});

        },
        initInWindow: function initInWindow(){
            if(this.validNumber(this.getClipboard().replace("FT", ""))){
                $("#inputSoftware").val(this.getClipboard());
                // $("#" + buttons.gotoRequest).attr("disabled","disabled");
            }
        },
        validNumber: function validNumber(content){
            var number = content.replace(/"/g, "");
            return (parseInt(number, 10) > 0)
        },
        openRequest: function openRequest(info, tab){
            var content = JSON.stringify(info.selectionText);
            var number = content.replace(/"/g, "");
            if(parseInt(number, 10) > 0)
                chrome.tabs.create({ url: "https://software.enablon.com/Software/?u=%2FReferent%2FRqtes&rid=" + number, index: (tab.index + 1), openerTabId: tab.id});
        },
        openRequirement: function openRequirement(info, tab){
            var content = JSON.stringify(info.selectionText);
            var number = content.replace(/"/g, "");
            if(parseInt(number, 10) > 0)
                chrome.tabs.create({ url: "https://software.enablon.com/Software/?u=%2FReferent%2FProreq&rid=" + number, index: (tab.index + 1), openerTabId: tab.id });
        },
        openTestFile: function openTestFile(info, tab){
            var content = JSON.stringify(info.selectionText);
            var number = content.replace(/"/g, "");
            if(number.indexOf("FT") >=0){
                number = number.replace("FT", "");
                if(parseInt(number, 10) > 0)
                    chrome.tabs.create({ url: "https://software.enablon.com/Software/?u=%2FReferent%2FFTs&rid=" + number, index: (tab.index + 1), openerTabId: tab.id });
            }
        },
        getClipboard: function getClipboard() {
            var el = document.createElement('textarea');
            document.body.appendChild(el);
            el.focus();
            document.execCommand('paste');
            var value = el.value;
            document.body.removeChild(el)
            return value;
        },
        clearClipboard: function clearClipboard(){
            var el = document.createElement('textarea');
            var text = document.createTextNode("\0");
            el.appendChild(text);
            document.body.appendChild(el);
            el.select();
            document.execCommand('copy');
            document.body.removeChild(el);
        },
        gotoRequest: function gotoRequest(){
            var self = this;
            return function(){
                var number = $("#inputSoftware").val();
                if(self.validNumber(number)){
                    var url = "https://software.enablon.com/Software/?u=%2FReferent%2FRqtes&rid=" + number;
                    myTransitions.hideQuickLinks();
                    self.clearClipboard()
                    chrome.tabs.query({currentWindow: true,active: true},function(tabs){chrome.tabs.create({ url: url, index: (tabs[0].index + 1), openerTabId: tabs[0].id });});
                }
            }
        },
        gotoRequirement: function gotoRequirement(){
            var self = this;
            return function(){
                var number = $("#inputSoftware").val();
                if(self.validNumber(number)){
                    var url = "https://software.enablon.com/Software/?u=%2FReferent%2FProreq&rid=" + number;
                    myTransitions.hideQuickLinks();
                    self.clearClipboard()
                    chrome.tabs.query({currentWindow: true,active: true},function(tabs){chrome.tabs.create({ url: url, index: (tabs[0].index + 1), openerTabId: tabs[0].id });});
                }
            }
        },
        gotoTestFile: function gotoTestFile(){
            var self = this;
            return function(){
                var number = $("#inputSoftware").val();
                if(self.validNumber(number.replace("FT", ""))){
                    var url = "https://software.enablon.com/Software/?u=%2FReferent%2FFTs&rid=" + number.replace("FT", "");
                    myTransitions.hideQuickLinks();
                    self.clearClipboard()
                    chrome.tabs.query({currentWindow: true,active: true},function(tabs){chrome.tabs.create({ url: url, index: (tabs[0].index + 1), openerTabId: tabs[0].id });});
                }
            }
        },
        quickLinksEvents: function quickLinksEvents(){
            var self = this;
            //$("#" + buttons.gotoRequest).click(this.gotoRequest());
            $("#" + buttons.softwareRequest).click(this.gotoRequest());
            $("#" + buttons.softwareRequirement).click(this.gotoRequirement());
            $("#" + buttons.softwareTestFile).click(this.gotoTestFile());

            $("#software-clearField").click(function(){ self.clearClipboard(); $("#inputSoftware").val("")});
            $("#" + buttons.quickLinks).click(myTransitions.showQuickLinks);
            $("#" + buttons.softwareBack).click(myTransitions.hideQuickLinks);

            $(document).keypress(function(e) {
                if(e.which == 13 && localStorage.getItem("currentWindow") == "quickLinks") {
                    $("#" + buttons.softwareRequest).click();
                }
            });
        }
    };
    return ret;
});