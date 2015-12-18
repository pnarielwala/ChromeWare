
var ContextMenu = (function(){

	var ret = {
		requestURL: "https://software.enablon.com/Software/?u=%2FReferent%2FRqtes&rid=",
		requirementURL: "https://software.enablon.com/Software/?u=%2FReferent%2FProreq&rid=", 
		testfileURL: "https://software.enablon.com/Software/?u=%2FReferent%2FFTs&rid=",
		initialize: function(){
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
		initInWindow: function(){
			if(this.validNumber(this.getClipboard().replace("FT", ""))){
				$("#inputSoftware").val(this.getClipboard());
				// $("#" + buttons.gotoRequest).attr("disabled","disabled");
			}
		},
		validNumber: function(content){
			var number = content.replace(/"/g, "");
			return (parseInt(number, 10) > 0)
		},
		openRequest: function(info, tab){
			var content = JSON.stringify(info.selectionText);
			var number = content.replace(/"/g, "");
			if(parseInt(number, 10) > 0)
				chrome.tabs.create({ url: "https://software.enablon.com/Software/?u=%2FReferent%2FRqtes&rid=" + number });
		},
		openRequirement: function(info, tab){
			var content = JSON.stringify(info.selectionText);
			var number = content.replace(/"/g, "");
			if(parseInt(number, 10) > 0)
				chrome.tabs.create({ url: "https://software.enablon.com/Software/?u=%2FReferent%2FProreq&rid=" + number });
		},
		openTestFile: function(info, tab){
			var content = JSON.stringify(info.selectionText);
			var number = content.replace(/"/g, "");
			if(number.indexOf("FT") >=0){
				number = number.replace("FT", "");
				if(parseInt(number, 10) > 0)
					chrome.tabs.create({ url: "https://software.enablon.com/Software/?u=%2FReferent%2FFTs&rid=" + number });
			}
		},
		getClipboard: function() {    
			var el = document.createElement('textarea');
			document.body.appendChild(el);
			el.focus();
			document.execCommand('paste');
			var value = el.value;
			document.body.removeChild(el)
			return value;
		},
		gotoRequest: function(){
			var self = this;
			return function(){
				var number = $("#inputSoftware").val();
				if(self.validNumber(number)){
					var url = "https://software.enablon.com/Software/?u=%2FReferent%2FRqtes&rid=" + number;
					myTransitions.hideQuickLinks();
					chrome.tabs.create({ url: url });
				}
			}
		},
		gotoRequirement: function(){
			var self = this;
			return function(){
				var number = $("#inputSoftware").val();
				if(self.validNumber(number)){
					var url = "https://software.enablon.com/Software/?u=%2FReferent%2FProreq&rid=" + number;
					myTransitions.hideQuickLinks();
					chrome.tabs.create({ url: url });
				}
			}
		},
		gotoTestFile: function(){
			var self = this;
			return function(){
				var number = $("#inputSoftware").val();
				if(self.validNumber(number.replace("FT", ""))){
					var url = "https://software.enablon.com/Software/?u=%2FReferent%2FFTs&rid=" + number.replace("FT", "");
					myTransitions.hideQuickLinks();
					chrome.tabs.create({ url: url });
				}
			}
		},
		quickLinksEvents: function(){
			//$("#" + buttons.gotoRequest).click(this.gotoRequest());
			$("#" + buttons.softwareRequest).click(this.gotoRequest());
			$("#" + buttons.softwareRequirement).click(this.gotoRequirement());
			$("#" + buttons.softwareTestFile).click(this.gotoTestFile());
			
			
			$("#software-clearField").click(function(){$("#inputSoftware").val("")});
			$("#" + buttons.quickLinks).click(myTransitions.showQuickLinks);
			$("#" + buttons.softwareBack).click(myTransitions.hideQuickLinks);
			
		}
	};
	return ret;
});