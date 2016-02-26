/**
 * Created by pnarielwala on 2/25/2016.
 */
var Constants = function(){
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
    ebYes = 2;
    ebNo = 1;
    priority = {
        immediate: "1",
        at_the_earliest: "2",
        normal: "3",
        later: "4"
    };
    severity = {
        severe: "1",
        major: "2",
        minor: "3"
    };
    type = {
        bug: "BG",
        enhancement: "EV",
        product_opening: "OR",
        question: "QU"
    };
    impactLayer = {
        product: "2",
        as: "1"
    };

    validSites = [	"inno",
        "inno2",
        "innous",
        "innous2",
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

    invalidMsgTitle = "Invalid";
    invalidSiteMsg = "You cannot create a request for this site. The site domain must be one of the following: " + window.validSites.join(", ");
};

Constants.prototype.getButtonId = function(buttonId){
    var buttonIdValue = buttons[buttonId];
    if(buttonIdValue === undefined){
        throw("Invalid button id: " + buttonId)
    };
    return buttonIdValue;
};

Constants.prototype.ebYes = function(){
    if(ebYes == undefined){
        throw("ebYes has not been defined in object Constants")
    };
    return ebYes
};

Constants.prototype.ebNo = function(){
    if(ebNo == undefined){
        throw("ebNo has not been defined in object Constants")
    };
    return ebNo
};

module.exports = new Constants();
