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
            localStorage.setItem("currentWindow", "main");
            break;
        case "request":
            this.states.hideLoading();
            this.states.hideWindowNow("loginWindow", "slideOutLeft");
            this.states.hideWindowNow("quickLinks", "slideOutRight");
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

module.exports = Transitions;