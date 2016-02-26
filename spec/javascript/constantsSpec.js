/**
 * Created by pnarielwala on 2/25/2016.
 */
var _constants = require('../../ChromeWare/js/src/constants');

describe("constants.js", function() {
    describe("test getButtonId function", function () {
        it("should return buttonId for logout input", function () {
            var logoutBtn = _constants.getButtonId("logout");
            expect(logoutBtn).toBe("btn-logout");
        });
        it("should return buttonId for login input", function () {
            var logoutBtn = _constants.getButtonId("login");
            expect(logoutBtn).toBe("signin");
        });
        it("should return buttonId for request input", function () {
            var logoutBtn = _constants.getButtonId("request");
            expect(logoutBtn).toBe("btn-createRequest");
        });
        it("should return buttonId for cancelRequest input", function () {
            var logoutBtn = _constants.getButtonId("cancelRequest");
            expect(logoutBtn).toBe("btn-cancel");
        });
        it("should return buttonId for createRequest input", function () {
            var logoutBtn = _constants.getButtonId("createRequest");
            expect(logoutBtn).toBe("btn-create");
        });
        it("should return buttonId for screenshot input", function () {
            var logoutBtn = _constants.getButtonId("screenshot");
            expect(logoutBtn).toBe("btn-screenshot");
        });
        it("should return buttonId for gotoRequest input", function () {
            var logoutBtn = _constants.getButtonId("gotoRequest");
            expect(logoutBtn).toBe("btn-gotoRequest");
        });
        it("should return buttonId for quickLinks input", function () {
            var logoutBtn = _constants.getButtonId("quickLinks");
            expect(logoutBtn).toBe("btn-quickLinks");
        });
        it("should return buttonId for softwareRequest input", function () {
            var logoutBtn = _constants.getButtonId("softwareRequest");
            expect(logoutBtn).toBe("btn-softwareRequest");
        });
        it("should return buttonId for softwareRequirement input", function () {
            var logoutBtn = _constants.getButtonId("softwareRequirement");
            expect(logoutBtn).toBe("btn-softwareRequirement");
        });
        it("should return buttonId for softwareTestFile input", function () {
            var logoutBtn = _constants.getButtonId("softwareTestFile");
            expect(logoutBtn).toBe("btn-softwareTestFile");
        });
        it("should return buttonId for softwareBack input", function () {
            var logoutBtn = _constants.getButtonId("softwareBack");
            expect(logoutBtn).toBe("btn-softwareBack");
        });
        it("should throw an error if invalid buttonId input is given", function () {
            expect(function(){
                _constants.getButtonId("Test123");
            }).toThrow()
        });
    });
    describe("test ebYes function", function () {
        it("should return 2 and not fail", function () {
            expect(_constants.ebYes).not.toThrow();
            var ebYes = _constants.ebYes();
            expect(ebYes).toBe(2);
        });
    });
    describe("test ebNo function", function () {
        it("should return 1 and not fail", function () {
            expect(_constants.ebNo).not.toThrow();
            var ebNo = _constants.ebNo();
            expect(ebNo).toBe(1);
        });
    });
});