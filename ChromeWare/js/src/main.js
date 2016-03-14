//var jQuery = require("../../vendor/jquery");
//
//window.buttons = {
//			logout: "btn-logout",
//			login: "signin",
//			request: "btn-createRequest",
//			cancelRequest: "btn-cancel",
//			createRequest: "btn-create",
//			screenshot: "btn-screenshot",
//			gotoRequest: "btn-gotoRequest",
//			quickLinks: "btn-quickLinks",
//			softwareRequest: "btn-softwareRequest",
//			softwareRequirement: "btn-softwareRequirement",
//			softwareTestFile: "btn-softwareTestFile",
//			softwareBack: "btn-softwareBack"
//		};
//window.ebYes = 2;
//window.ebNo = 1;
//window.priority = {
//			immediate: "1",
//			at_the_earliest: "2",
//			normal: "3",
//			later: "4"
//		};
//window.severity = {
//			severe: "1",
//			major: "2",
//			minor: "3"
//		};
//window.type = {
//			bug: "BG",
//			enhancement: "EV",
//			product_opening: "OR",
//			question: "QU"
//		};
//window.impactLayer = {
//			product: "2",
//			as: "1"
//		};
//
//window.validSites = [	"inno",
//						"inno2",
//						"innous",
//						"innous2",
//						"localhost",
//						"demo",
//						"demo2",
//						"demous",
//						"demous2",
//						"devus",
//						"devus1",
//						"devus2",
//						"devus3",
//						"devus4",
//						"rctus",
//						"rctus1",
//						"rctus2",
//						"rctus3",
//						"rctus4",
//						"rctus5"];
//
//window.invalidMsgTitle = "Invalid";
//window.invalidSiteMsg = "You cannot create a request for this site. The site domain must be one of the following: " + window.validSites.join(", ");


var _transition = require("./transitions");
var _requestFields = require("./requestFields");
var _url = require("./urlManagement");
var _contextMenu = require("./contextMenu");
var _logger = require("./logger");

window.onload = function(){
	console.log("Page Loaded!");
	//This is used to grab Release and Product Component from Software. Needs Request #95456
	var url = new _url();
	url.storeSoftwareData();
	//url.storeTempSoftwareData();
	var transition = new _transition();
	transition.initialize();

	var requestFields = new _requestFields(transition);
	requestFields.initialize();

	var logger = new _logger(null, transition);
	logger.initialize();// check and log if needed

	var contextMenu = new _contextMenu(transition);
	contextMenu.initInWindow();
	contextMenu.quickLinksEvents();
};