/**
 * Created by pnarielwala on 3/10/2016.
 */
var _transitions = require('../../ChromeWare/js/src/transitions');

describe("transitions.js", function(){
    beforeEach(function(){
        spyOn(console, 'log');
        spyOn(console, 'warn');

        var localStorageMock = {};
        spyOn(localStorage, 'getItem').and.callFake(function(key){
            return localStorageMock[key]
        });
        spyOn(localStorage, 'setItem').and.callFake(function(key, value){
            return localStorageMock[key] = value;
        });
        spyOn(localStorage, 'clear').and.callFake(function(){
            return localStorageMock = {};
        });

        spyOn(_transitions.states, "hideLoading");
        spyOn(_transitions.states, "showLoading");
        spyOn(_transitions.states, "hideWindow");
        spyOn(_transitions.states, "hideWindowNow");
        spyOn(_transitions.states, "showWindow");
        spyOn(_transitions.states, "showWindowNow");
    });
    afterEach(function(){
        localStorage.clear();
    });
    describe("test initialize function", function(){
        beforeAll(function(){
            _transitions.states.defaultId = "loginWindow";
        });
        afterAll(function(){
            _transitions.states.defaultId = undefined;
        });
        it("should set top window to the default window, loginWindow", function(){
            _transitions.initialize();
            expect(_transitions.states.hideLoading).toHaveBeenCalled();
            expect(_transitions.states.showWindowNow).toHaveBeenCalledWith("loginWindow", "slideInLeft");
            expect(localStorage.getItem("currentWindow")).toBe("loginWindow");
        });
        it("should set top window to the main window", function(){
            localStorage.setItem("currentWindow", "main");

            _transitions.initialize();
            expect(_transitions.states.hideLoading).toHaveBeenCalled();
            expect(_transitions.states.hideWindowNow).toHaveBeenCalledWith("loginWindow", "slideOutLeft");
            expect(_transitions.states.hideWindowNow).toHaveBeenCalledWith("request", "slideOutRight");
            expect(_transitions.states.hideWindowNow).toHaveBeenCalledWith("quickLinks", "slideOutRight");
            expect(localStorage.getItem("currentWindow")).toBe("main");
        });
        it("should set top window to the request window", function(){
            localStorage.setItem("currentWindow", "request");
            _transitions.initialize();
            expect(_transitions.states.hideLoading).toHaveBeenCalled();
            expect(_transitions.states.hideWindowNow).toHaveBeenCalledWith("loginWindow", "slideOutLeft");
            expect(_transitions.states.hideWindowNow).toHaveBeenCalledWith("quickLinks", "slideOutRight");
            expect(localStorage.getItem("currentWindow")).toBe("request");
        });
        it("should set top window to the quick links window", function(){
            localStorage.setItem("currentWindow", "quickLinks");
            _transitions.initialize();
            expect(_transitions.states.hideLoading).toHaveBeenCalled();
            expect(_transitions.states.hideWindowNow).toHaveBeenCalledWith("loginWindow", "slideOutLeft");
            expect(_transitions.states.hideWindowNow).toHaveBeenCalledWith("request", "slideOutRight");
            expect(localStorage.getItem("currentWindow")).toBe("quickLinks");
        });
        it("should throw warning if defaultId isn't set and localStorage is empty", function(){
            _transitions.states.defaultId = undefined;
            _transitions.initialize();
            expect(localStorage.getItem("currentWindow")).toBeUndefined();
            expect(console.warn).toHaveBeenCalledWith("showWindow has not been implemented for window: " + undefined);;
        });
    });
    describe("test loginSuccess function", function(){
        it("should execute all lines", function(){
            localStorage.setItem("currentWindow", "loginWindow");

            _transitions.loginSuccess();

            expect(_transitions.states.hideLoading).toHaveBeenCalled();
            expect(_transitions.states.hideWindow).toHaveBeenCalledWith("loginWindow", "slideOutLeft");
            expect(_transitions.states.hideWindowNow).toHaveBeenCalledWith("request", "slideOutRight");
            expect(_transitions.states.hideWindowNow).toHaveBeenCalledWith("quickLinks", "slideOutRight");
            expect(localStorage.getItem("currentWindow")).toBe("main");
        });
        it("should not try to hide loginWindow", function(){
            _transitions.loginSuccess();

            expect(_transitions.states.hideLoading).toHaveBeenCalled();
            expect(_transitions.states.hideWindow).not.toHaveBeenCalled();
            expect(_transitions.states.hideWindowNow).not.toHaveBeenCalled();
            expect(localStorage.getItem("currentWindow")).toBeUndefined();
        });
    });
    describe("test checkLogin function", function(){
        it("should just show the loading icon because this is ran before system checks login", function(){
            _transitions.checkLogin();
            expect(_transitions.states.showLoading).toHaveBeenCalled();
        });
    });
    describe("test loginFail function", function(){
        it("should just hide the loading icon because this is ran after login check fails", function(){
            _transitions.loginFail();
            expect(_transitions.states.hideLoading).toHaveBeenCalled();
        });
    });
});