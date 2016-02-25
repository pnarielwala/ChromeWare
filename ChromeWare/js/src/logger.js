var Logger = function(params){
    var params = params || {};
    this.pingUrl = "https://software.enablon.com/Software/?u=ver&pm=6&aformat=1";
    this.swUrl = 'https://software.enablon.com/enablon/?OStId=Software';
    this.Crypt = params.Crypt || new LazyCrypt();
}

Logger.prototype.getConnectToSW = function(){
    var self = this;
    return function () {
        myTransitions.checkLogin();
        var swLogin = $("input[id='inputUsername']").val();
        var swPwd = $("input[id='inputPassword']").val();
        if(!(swLogin && swPwd)){
            console.log("Login and Password must contain a value");
        }
        else{
            self.connectToSW(swLogin, swPwd);
            if($("input[name='rememberPWD']").is(':checked')){
                self.saveSWCred(swLogin, swPwd);
            };
        }
    }
}

Logger.prototype.logoutFromSW = function(){
    $.post("https://software.enablon.com/Software/?u=logoff");
    myTransitions.logOut();
}

Logger.prototype.saveSWCred = function(swLogin, swPwd){
    if(!(swLogin && swPwd)){
        localStorage.removeItem("swLogin");
        this.Crypt.clearStorage();
    }
    else {
        localStorage["swLogin"] = swLogin;
        this.Crypt.encrypt({pass:swPwd});
    }
}

Logger.prototype.loginToSW = function()
{
    //get credential
    myTransitions.checkLogin();
    var loginPwdArray = this.getSWCred();
    var swLogin = loginPwdArray[0];
    var swPwd = loginPwdArray[1];
    if(!(swLogin == null || swPwd == null)){
        this.connectToSW(swLogin, swPwd);
    }
    else {
        if(localStorage.getItem('currentWindow') == ("main" || null))
        {
            //todo: implement a quick login popup
            myTransitions.loggedOut();
        }

    }
}

Logger.prototype.getSWCred = function()
{
    // to refactor to merge with the code in option.js
    var swLogin = localStorage["swLogin"];
    var swPwd = this.Crypt.decrypt();
    return [swLogin, swPwd];
}


Logger.prototype.connectToSW = function(swLogin, swPwd)
{
    var self = this;
    console.log("connectToSW");
    var data= {uid:swLogin, sid:'enablon', Var_BuilderKeyAutoLogin: '', pwd:swPwd, LogIn:'OK', LogIn:'Log In'};
    $.ajax({
        type: 'POST',
        url: self.swUrl,
        data: data,
        async: true,
        timeout: 6000,
        success:function(data) {
            nConnected = data.indexOf('<TITLE>Dashboards</TITLE>');
            if(!(nConnected > 0))
            {
                if(localStorage.getItem('currentWindow') == ("main" || null))
                {
                    console.log("test1");
                    myTransitions.loggedOut();
                }
                else {
                    //todo: need to implement user alerts
                    //displayAlert("You are not logged to software", 'alert-warning');
                    myTransitions.loggedOut();
                    new Modal("danger", "Invalid User ID/Password.", "Please enter your correct credentials").display();
                }
            }else{
                myTransitions.loginSuccess();
            }
        },
        error:function(){
            //todo: need to implement user alerts
            //displayAlert("failed to connect to SW");
            if(localStorage.getItem('currentWindow') == ("main" || null))
            {
                myTransitions.loggedOut();
            }else{
                new Modal("danger", "Invalid User ID/Password.", "Please enter your correct credentials").display();
            };
            console.log("failed to connect to SW");
            myTransitions.hideLoading();
        }
    });
}


Logger.prototype.initialize = function()
{
    console.log("initialize");
    var self = this;
    var loginPwdArray = this.getSWCred();
    var swLogin = loginPwdArray[0];
    var swPwd = loginPwdArray[1];
    if(swLogin == null || swPwd == null){
        //No saved log pwd
        console.log("before");
        var checkSWConnection = this.checkSWConnection();

        if(localStorage.getItem('currentWindow') == ("main" || null))
        {
            checkSWConnection.then(
                function(response, statusText, xhrObj){
                    console.log("after " + this.pingUrl);
                    var nError = response.indexOf("error");
                    console.log("nError: " + nError);
                    if(nError == -1){
                        //console.log("not connected so let's try 1");
                        myTransitions.loggedIn();
                    }
                    else{
                        myTransitions.loggedOut();
                    }
                }
            )
        }
        else
        {
            //var checkSWConnection = this.checkSWConnection();
            checkSWConnection.then(
                function(response, statusText, xhrObj) {
                    var nError = response.indexOf("error");
                    if(nError > 0){
                        //console.log("not connected so let's try 1");
                        //todo: need to implement user alerts
                        //displayAlert("You are not logged to software", 'alert-warning');
                        console.log("else");
                        myTransitions.loggedOut();
                    }
                    else{
                        myTransitions.loggedIn();
                        console.log('you are connected');
                    }
                },
                function(xhrObj, textStatus, err) {
                    //todo: need to implement user alerts
                    //displayAlert("You are not logged to software", 'alert-warning');
                    myTransitions.loggedOut();
                    console.log("l 149");
                }
            );
        }
    }
    else
    {
        var checkSWConnection = this.checkSWConnection();
        checkSWConnection.then(
            function(response, statusText, xhrObj) {
                console.log("done done done:)" + response + '_' +statusText);
                $( ".waitingForSW").hide();
                var nError = response.indexOf("error");
                if(nError > 0){
                    console.log("not connected so let's try");
                    self.loginToSW();
                }
                else{
                    myTransitions.loggedIn();
                    console.log('we are logged and return should  be true');
                }
            },
            function(xhrObj, textStatus, err) {
                console.log('Error occured in checkSWConnection: ' + textStatus + "_" + err);
                //todo: need to implement user alerts
                //displayAlert("Cannot connect to software: " + err);
                //$("#alertMsg").text("Can't connect to software");
                myTransitions.loggedOut();
            }
        );
    }
}

Logger.prototype.checkSWConnection = function()
{
    var self = this;
    var data;
    return Promise.resolve($.ajax({
            url: this.pingUrl,
            type: 'GET',
            timeout: 5000,
            cache: false
        })
    );
}










