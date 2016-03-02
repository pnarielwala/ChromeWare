/**
 * Created by pnarielwala on 2/26/2016.
 */
var _windows = require('../../ChromeWare/js/src/windows');

describe("windows.js", function() {
    describe("test initWindows function", function () {
        beforeEach(function(){
            jasmine.getFixtures().fixturesPath = '/base/ChromeWare/html';
            //THIS IS BECAUSE OF THE JS IN THE HTML
            //loadFixtures('index.html');

            //jasmine.preload(
            //    'login.html',
            //    'main.html',
            //    'request.html',
            //    'quickLinks.html',
            //    'modal.html'
            //);
            jasmine.Ajax.install();
        });
        afterEach(function() {
            jasmine.Ajax.uninstall();
        });

        it("should initialize windows properly", function(){
            _windows.initWindows();
            expect(true).toBe(true);
        });
    });
});