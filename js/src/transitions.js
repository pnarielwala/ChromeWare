
var Transitions = (function(windowsObj){
	var states = windowsObj;
	
	var ret = {
		initialize: function(){
				console.log("initialize");
				var initialWindow = localStorage.getItem("currentWindow") == undefined ? states.defaultId : localStorage.getItem("currentWindow");
				console.log("currentWindow: " + localStorage.getItem("currentWindow"));
				//todo: doublecheck if i can switch off of a string
				switch (true) {
					case /loginWindow/.test(initialWindow):
						states.hideLoading();
						states.showWindowNow(initialWindow, "slideInLeft");
						localStorage.setItem("currentWindow", initialWindow);
						break;
					case /main/.test(initialWindow):
						states.hideLoading();
						states.hideWindowNow("loginWindow", "slideOutLeft");
						states.hideWindowNow("request", "slideOutRight");
						states.hideWindowNow("quickLinks", "slideOutRight");
						localStorage.setItem("currentWindow", "main");
						break;
					case /request/.test(initialWindow):
						states.hideLoading();
						states.hideWindowNow("loginWindow", "slideOutLeft");
						states.hideWindowNow("quickLinks", "slideOutRight");
						// states.hideWindowNow("request", "slideInRight");
						localStorage.setItem("currentWindow", "request");
						break;
					case /quickLinks/.test(initialWindow):
						states.hideLoading();
						states.hideWindowNow("loginWindow", "slideOutLeft");
						states.hideWindowNow("request", "slideOutRight");
						localStorage.setItem("currentWindow", "quickLinks");
					default:
						console.warn("showWindow has not been implemented for window: " + initialWindow);
					break;
				};
			},
		loginSuccess: function(){
				console.log("loginSuccess");
				states.hideLoading();
				if(localStorage.getItem("currentWindow") == "loginWindow"){
					states.hideWindow("loginWindow", "slideOutLeft");
					states.hideWindowNow("request", "slideOutRight");
					states.hideWindowNow("quickLinks", "slideOutRight");
					localStorage.setItem("currentWindow", "main");
				};
			},
		checkLogin: function(){
				console.log("checkLogin");
				states.showLoading();
			},
		loginFail: function(){
				console.log("loginFail");
				states.hideLoading();
			},
		loggedOut: function(){
				//Ideally we want to show a modal for this login instead of going to the orig login
				var initialWindow = localStorage.getItem("currentWindow");
				states.showWindowNow("loginWindow", "slideInLeft");
				states.hideLoading();
				console.log("loggedOut currentWindow: " + localStorage.getItem("currentWindow"));
				if(initialWindow == "request"){
					localStorage.setItem("currentWindow", "request")
				}
			},
		loggedIn: function(){
				console.log("loggedIn");
				states.hideLoading();
				states.hideWindowNow("loginWindow", "slideOutLeft");
				if(localStorage.getItem("currentWindow") == "loginWindow"){
					states.hideWindowNow("request", "slideOutRight");
					states.hideWindowNow("quickLinks", "slideOutRight");
					localStorage.setItem("currentWindow", "main");
				}
					
			},
		logOut: function(){
				console.log("logOut");
				states.hideLoading();
				states.showWindow("loginWindow", "slideInLeft");
				localStorage.setItem("currentWindow", "loginWindow");
			},
		createRequest: function(){
				console.log("createRequest");
				states.showWindow("request", "slideInRight");
				localStorage.setItem("currentWindow", "request");
			},
		cancelRequest: function(){
				states.showWindow("request", "slideOutRight");
				localStorage.setItem("currentWindow", "main");
			},
		showQuickLinks: function(){
				states.showWindow("quickLinks", "slideInRight");
				localStorage.setItem("currentWindow", "quickLinks");
			},
		hideQuickLinks: function(){
				states.showWindow("quickLinks", "slideOutRight");
				localStorage.setItem("currentWindow", "main");
			},
				
		};
	ret.initialize();
	return ret;
})