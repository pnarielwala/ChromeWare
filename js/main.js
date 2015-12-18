buttons = {
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
			
window.onload = function(){

	//$(".MST2").next().children().find(".ATL")[0].textContent
	//on https://software.enablon.com/Software/go.aspx?u=/Referent/Config
	//to get user's full name
	
	//This is used to grab Release and Product Component from Software. Needs Request #95456
	//var test = new URLManagement();
	//test.storeSoftwareData();
	var url = new URLManagement();
	url.storeTempSoftwareData();
	
	//window.myWindows = ... to be more explicit that this is a global var
	myWindows = new Windows();
	myTransitions = new Transitions(myWindows);
	var logger = new Logger();
	logger.initialize();// check and log if needed

	//todo: put this somewhere. Redirects user to requests if enter is pressed
	$(document).keypress(function(e) {
		if(e.which == 13 && localStorage.getItem("currentWindow") == "quickLinks") {
			$("#" + buttons.softwareRequest).click();
		}
	});
	
	
	var contextMenu = new ContextMenu();
	contextMenu.initInWindow();
	contextMenu.quickLinksEvents();
	$("#" + buttons.login).click(logger.getConnectToSW());
	$("#" + buttons.logout).click(logger.logoutFromSW);
	$("#" + buttons.request).click(myTransitions.createRequest);
	$("#" + buttons.cancelRequest).click(myTransitions.cancelRequest);
	$("#" + buttons.createRequest).click(myTransitions.cancelRequest);

}