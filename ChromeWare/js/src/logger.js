var _lazyCrypt = require("../crypto/lazyCrypt");
var _transition = require('./transitions');
var _constants = new (require('./constants'));
var _modal = require('./modal');

var Logger = function(params, transition){
    var self = this;
    var params = params || {};
    this.transition = transition || new _transition();
    this.pingUrl = "https://software.enablon.com/Software/?u=ver&pm=6&aformat=1";
    this.swUrl = 'https://software.enablon.com/enablon/?OStId=Software';
    this.Crypt = params.Crypt || new _lazyCrypt();

    $("#" + _constants.buttons.login).click(function(){self.login()});
    $("#" + _constants.buttons.logout).click(function(){self.logout()});

    var self = this;
    $("#" + _constants.buttons.cancelRequest).click(function(){self.transition.cancelRequest()});
    $("#" + _constants.buttons.createRequest).click(function(){self.transition.cancelRequest()});
};

Logger.prototype.checkLogin = function() {
    var self = this;
    this.ping().then(
        function(response, statusText, xhrObj){
            var nError = response.indexOf("error");
            if(nError == -1){
                self.transition.loggedIn();
            }
            else{
                if(localStorage.getItem("currentWindow") == "request")
                    new _modal("warning", "You have been logged out!", "Please login to continue").display();

                self.transition.loggedOut();
            }
        }
    )

};

Logger.prototype.login = function(){
    var user = $("input[id='inputUsername']").val();
    var pwd = $("input[id='inputPassword']").val();

    if(!(user && pwd)){
        new _modal("danger", "Invalid Credentials", "Please enter valid Software credentials").display();
    }else{
        this.connect(user, pwd);
    };
};

Logger.prototype.logout = function(){
    $.post("https://software.enablon.com/Software/?u=logoff");
    this.transition.logOut();
};

Logger.prototype.connect = function(user, password){
    this.transition.checkLogin();
    var data= {uid:user, sid:'enablon', Var_BuilderKeyAutoLogin: '', pwd:password, LogIn:'OK', LogIn:'Log In'};

    var self = this;
    $.ajax({
        type: 'POST',
        url: self.swUrl,
        data: data,
        async: true,
        timeout: 6000,
        success:function(data) {
            var nConnected = data.indexOf('<TITLE>Dashboards</TITLE>');
            if(!(nConnected > 0))
            {
                if(localStorage.getItem('currentWindow') == ("main" || null))
                {
                    self.transition.loggedOut();
                }
                else {
                    self.transition.loggedOut();
                    new _modal("danger", "Invalid Credentials.", "Please enter valid Software credentials").display();
                }
            }else{
                self.transition.loginSuccess();
            }
        },
        error:function(){
            if(localStorage.getItem('currentWindow') == ("main" || null))
            {
                self.transition.loggedOut();
            }else{
                new _modal("danger", "Invalid Credentials.", "Please enter valid Software credentials").display();
            };
            self.transition.states.hideLoading();
        }
    });
};

Logger.prototype.ping = function(){
    return Promise.resolve($.ajax({
            url: this.pingUrl,
            type: 'GET',
            timeout: 5000,
            cache: false
        })
    );
};

module.exports = Logger;









