var Modal = require('../../ChromeWare/js/src/modal');

describe("modal.js", function(){
    describe("initialize modal object", function(){
        it("should have object variables set correctly", function(){
            var myModal = new Modal("success", "title", "message");
            expect(myModal.type).not.toBe(null);
            expect(myModal.title).not.toBe(null);
            expect(myModal.message).not.toBe(null);
            expect(myModal.modalData).not.toBe(null);
        });
    });
    describe("test setType function", function() {
        beforeEach(function () {
            jasmine.getFixtures().fixturesPath = '/base/ChromeWare/html';
            loadFixtures('modal.html');
        });
        it("should set success as type", function () {
            var myModal = new Modal("success", "title", "message");
            myModal.setType();
            expect($(".modal-content")).toHaveClass("success");
        });
        it("should set warning as type", function () {
            var myModal = new Modal("warning", "title", "message");
            myModal.setType();
            expect($(".modal-content")).toHaveClass("warning");
        });
        it("should set danger as type", function () {
            var myModal = new Modal("danger", "title", "message");
            myModal.setType();
            expect($(".modal-content")).toHaveClass("danger");
        });
    });
    describe("test setTitle function", function(){
        beforeEach(function () {
            jasmine.getFixtures().fixturesPath = '/base/ChromeWare/html';
            loadFixtures('modal.html');
        });
        it("should set title correctly", function () {
            var myModal = new Modal("success", "title", "message");
            myModal.setTitle();
            expect($(".modal-title")).toContainText("title");
        });
    });
    describe("test setMessage function", function(){
        beforeEach(function () {
            jasmine.getFixtures().fixturesPath = '/base/ChromeWare/html';
            loadFixtures('modal.html');
        });
        it("should set message correctly", function () {
            var myModal = new Modal("success", "title", "message");
            myModal.setMessage();
            expect($(".modal-body")).toContainText("message");
        });
    });
    describe("test display function", function(){
        beforeEach(function () {
            jasmine.getFixtures().fixturesPath = '/base/ChromeWare/html';
            loadFixtures('modal.html');
            this.myModal = new Modal("success", "title", "message");
            spyOn(this.myModal, 'setType');
            spyOn(this.myModal, 'setTitle');
            spyOn(this.myModal, 'setMessage');
            spyOn(this.myModal.modalData, 'modal');
        });
        it("should display modal correctly", function () {
            this.myModal.display();
            expect(this.myModal.setType).toHaveBeenCalled();
            expect(this.myModal.setTitle).toHaveBeenCalled();
            expect(this.myModal.setMessage).toHaveBeenCalled();
            expect(this.myModal.modalData.modal).toHaveBeenCalled();
        });
    });
});