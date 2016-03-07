/**
 * Created by pnarielwala on 2/26/2016.
 */
var _windows = require('../../ChromeWare/js/src/windows');

describe("windows.js", function() {
    describe("test initWindows function", function () {
        beforeEach(function(){
            jasmine.getFixtures().fixturesPath = '/base/ChromeWare/html';
            jasmine.Ajax.install();

            //Set up spys and expected values
            spyOn($, "get").and.returnValue({
                done: function (callback) {
                    callback({});
                    wasSuccessful = true;
                    return this;
                }
            });
            spyOn(_windows, 'setLoadingWindow');
            spyOn(_windows, 'setDefaultWindow');
            _windows.initWindows();

            this.numcalls = $.get.calls.all().length;
            var urls = [];
            $.get.calls.all().forEach(function(call){
                urls.push(call.args[0]);
            });
            this.urls = urls;
        });
        afterEach(function() {
            jasmine.Ajax.uninstall();
        });
        it("should initialize windows properly", function(){

            expect(this.numcalls).toBe(6);
            expect(this.urls).toContain('body.html');
            expect(this.urls).toContain('login.html');
            expect(this.urls).toContain('main.html');
            expect(this.urls).toContain('request.html');
            expect(this.urls).toContain('quickLinks.html');
            expect(this.urls).toContain('modal.html');
        });

    });
    describe("test setDefaultWindow function", function(){
        afterEach(function(){
            jasmine.getFixtures().clearCache();
            _windows.defaultId = undefined;
            _windows.loadingId = undefined;
        });
        it("should detect the default class on a tag", function(){
            jasmine.getFixtures().fixturesPath = '/base/ChromeWare/html';
            loadFixtures('body.html');

            _windows.setDefaultWindow();
            expect(_windows.defaultId).not.toBeNull();
        });
        it("should print out warning 1 in console", function(){
            jasmine.getFixtures().set("<html><p class='default'>Test 123</p></html>");

            spyOn(console, 'warn');

            _windows.setDefaultWindow();
            expect(_windows.defaultId).toBeUndefined();
            expect(console.warn).toHaveBeenCalledWith('Default window has no id assigned: undefined');
        });
        it("should print out warning 2 in console", function(){
            jasmine.getFixtures().set("<html><p>Test 123</p></html>");

            spyOn(console, 'warn');

            _windows.setDefaultWindow();
            expect(_windows.defaultId).toBeUndefined();
            expect(console.warn).toHaveBeenCalledWith('Default window has not been defined');
        });
    });
});
