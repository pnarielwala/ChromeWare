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
    this.invalidSiteMsg = "You cannot create a request for this site. The site domain must be one of the following: " + this.validSites.join(", ");
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

module.exports = new Constants();
