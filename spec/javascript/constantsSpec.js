/**
 * Created by pnarielwala on 2/25/2016.
 */
var _constants = new (require('../../ChromeWare/js/src/constants'));

describe("constants.js", function() {
    describe("test getButtonId function", function () {
        it("should return button object with all the properties", function () {
            expect(_constants.getButtons().logout).toBe("btn-logout");

            expect(_constants.getButtons().login).toBe("signin");

            expect(_constants.getButtons().request).toBe("btn-createRequest");

            expect(_constants.getButtons().cancelRequest).toBe("btn-cancel");

            expect(_constants.getButtons().createRequest).toBe("btn-create");

            expect(_constants.getButtons().screenshot).toBe("btn-screenshot");

            expect(_constants.getButtons().gotoRequest).toBe("btn-gotoRequest");

            expect(_constants.getButtons().quickLinks).toBe("btn-quickLinks");

            expect(_constants.getButtons().softwareRequest).toBe("btn-softwareRequest");

            expect(_constants.getButtons().softwareRequirement).toBe("btn-softwareRequirement");

            expect(_constants.getButtons().softwareTestFile).toBe("btn-softwareTestFile");

            expect(_constants.getButtons().softwareBack).toBe("btn-softwareBack");
        });
    });
    describe("test ebYes function", function () {
        it("should return 2 and not fail", function () {
            expect(_constants.getEbYes()).toBe(2);
        });
    });
    describe("test ebNo function", function () {
        it("should return 1 and not fail", function () {
            expect(_constants.getEbNo()).toBe(1);
        });
    });
    describe("test getPriority function", function () {
        it("should return priority object with all the properties", function () {
            expect(_constants.getPriority().immediate).toBe("1");

            expect(_constants.getPriority().at_the_earliest).toBe("2");

            expect(_constants.getPriority().normal).toBe("3");

            expect(_constants.getPriority().later).toBe("4");
        });
    });
    describe("test getSeverity function", function () {
        it("should return severity object with all the properties", function () {
            expect(_constants.getSeverity().severe).toBe("1");

            expect(_constants.getSeverity().major).toBe("2");

            expect(_constants.getSeverity().minor).toBe("3");
        });
    });
    describe("test getImpactLayer function", function () {
        it("should return impactLayer object with all the properties", function () {
            expect(_constants.getImpactLayer().as).toBe("1");

            expect(_constants.getImpactLayer().product).toBe("2");
        });
    });
});