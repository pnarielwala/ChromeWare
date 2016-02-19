var Modal = require('../js/modal');

describe("Modal", function(){
    describe("initialize Modal", function(){
        it("should have object variables set correctly", function(){
            var test = new Modal("success", "title", "message");
            expect(test.type).toBe("success");
            expect(test.title).toBe("title");
            expect(test.message).toBe("message");
        });
    });
    describe("Modal Functions", function(){
        var test = new Modal("success", "title", "message");
        beforeEach(function(){
            test.modalData = $("<div id='myModal' class='modal fade bs-example-modal-sm' tabindex='-1' role='dialog' aria-labelledby='mySmallModalLabel'>" +
                "<div class='modal-dialog modal-sm'>" +
                "<div class='modal-content'>"+
                "<div class='modal-header'>"+
                "<button type='button' class='close' data-dismiss='modal' aria-label='Close'><span aria-hidden='true'>&times;</span></button>"+
                "<h4 class='modal-title'>Modal title</h4>"+
                "</div>"+
                "<div class='modal-body'>"+
                "<p>One fine body&hellip;</p>"+
                "</div>"+
                "</div>"+
                "</div>"+
                "</div>");
            spyOn(test, 'setTitle').and.callThrough();
            spyOn(test, 'setMessage').and.callThrough();
            spyOn(test, 'setType').and.callThrough();
        });
        it("should insert the type", function(){
            var compare = $("<div id='myModal' class='modal fade bs-example-modal-sm' tabindex='-1' role='dialog' aria-labelledby='mySmallModalLabel'>" +
                "<div class='modal-dialog modal-sm'>" +
                "<div class='modal-content success'>"+
                "<div class='modal-header'>"+
                "<button type='button' class='close' data-dismiss='modal' aria-label='Close'><span aria-hidden='true'>&times;</span></button>"+
                "<h4 class='modal-title'>Modal title</h4>"+
                "</div>"+
                "<div class='modal-body'>"+
                "<p>One fine body&hellip;</p>"+
                "</div>"+
                "</div>"+
                "</div>"+
                "</div>");
            test.setType();
            expect(test.modalData[0]).toEqual(compare[0]);
        });
        it("should insert the message", function(){
            var compare = $("<div id='myModal' class='modal fade bs-example-modal-sm' tabindex='-1' role='dialog' aria-labelledby='mySmallModalLabel'>" +
                "<div class='modal-dialog modal-sm'>" +
                "<div class='modal-content'>"+
                "<div class='modal-header'>"+
                "<button type='button' class='close' data-dismiss='modal' aria-label='Close'><span aria-hidden='true'>&times;</span></button>"+
                "<h4 class='modal-title'>Modal title</h4>"+
                "</div>"+
                "<div class='modal-body'>"+
                "message"+
                "</div>"+
                "</div>"+
                "</div>"+
                "</div>");
            test.setMessage();
            expect(test.modalData).toEqual(compare);
        });
        it("should insert the title", function(){
            var compare = $("<div id='myModal' class='modal fade bs-example-modal-sm' tabindex='-1' role='dialog' aria-labelledby='mySmallModalLabel'>" +
                "<div class='modal-dialog modal-sm'>" +
                "<div class='modal-content'>"+
                "<div class='modal-header'>"+
                "<button type='button' class='close' data-dismiss='modal' aria-label='Close'><span aria-hidden='true'>&times;</span></button>"+
                "<h4 class='modal-title'>title</h4>"+
                "</div>"+
                "<div class='modal-body'>"+
                "<p>One fine body&hellip;</p>"+
                "</div>"+
                "</div>"+
                "</div>"+
                "</div>");
            test.setTitle();
            expect(test.modalData).toEqual(compare);
        });
        it("should display successfully", function(){
            test.setTitle.and.stub();
            test.setMessage.and.stub();
            test.setType.and.stub();
            expect(function(){test.display()}).not.toThrow();
            expect(test.setTitle).toHaveBeenCalled();
            expect(test.setMessage).toHaveBeenCalled();
            expect(test.setType).toHaveBeenCalled();
        });
        describe("testing jquery", function(){

            beforeEach(function(){
                jasmine.getFixtures().fixturesPath = 'http://localhost:9876/html';
                jasmine.getFixtures().load('index.html');
                $.get("",
                    function (data, status) {}
                );
            });
            it("should work?", function(){
                var Parth = new Modal("success", "title", "message");
                var label = Parth.myTest();
                console.log(label[0]);
                expect(label.attr('class')).toBe('eb-form-field-label');
            })
        })
    })
})