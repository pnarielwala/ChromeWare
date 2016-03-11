var Windows = function(){
    this.defaultId = undefined;
    this.loadingId = undefined;
};

Windows.prototype.initWindows = function(){
    jQuery.ajaxSetup({async:false});
    $.get("body.html")
        .done(function(data){
            $("#app").append(data)
        });
    $.get("login.html")
        .done(function(data){
            $("#loginWindow").append(data)
        });
    $.get("main.html")
        .done(function(data){
            $("#main").append(data)
        });
    $.get("request.html")
        .done(function(data){
            $("#request").append(data)
        });
    $.get("modal.html")
        .done(function(data){
            $("#modal").append(data)
        });
    $.get("quickLinks.html")
        .done(function(data){
            $("#quickLinks").append(data)
        });
    jQuery.ajaxSetup({async:true});
    this.setLoadingWindow();
    this.setDefaultWindow();
};
Windows.prototype.setDefaultWindow = function(){
    if($(".default").length === 1){
        var defaultWindow = $(".default").attr("id");
        if(defaultWindow !== undefined && defaultWindow !== null){
            this.defaultId = defaultWindow;
        }else{
            console.warn("Default window has no id assigned: " + defaultWindow)
        }
    }else{
        console.warn("Default window has not been defined")
    }
};
Windows.prototype.setLoadingWindow = function(){
    if($(".loading-window").length === 1){
        var loadingWindow = $(".loading-window").attr("id");
        if(loadingWindow !== undefined && loadingWindow !== null){
            loadingId = loadingWindow;
        }else{
            console.warn("Loading window has no id assigned")
        }
    }else{
        console.warn("Loading window has not been defined")
    }
};
Windows.prototype.hideWindow = function(id, animation){
    this.removeClasses(id);
    $("#" + id).addClass("animated").addClass(animation);
};
Windows.prototype.hideWindowNow = function(id, animation){
    this.removeClasses(id);
    $("#" + id).addClass("animated-now").addClass(animation);
};
Windows.prototype.showWindow = function(id, animation){
    this.removeClasses(id);
    $("#" + id).addClass("animated").addClass(animation);
    localStorage.setItem("currentWindow", id);
};
Windows.prototype.showWindowNow = function(id, animation){
    this.removeClasses(id);
    $("#" + id).addClass("animated-now").addClass(animation);
    localStorage.setItem("currentWindow", id);
};
Windows.prototype.removeClasses = function(id){
    $("#" + id).removeClass("animated-now")
        .removeClass("animated")
        .removeClass("slideInLeft")
        .removeClass("slideInRight")
        .removeClass("slideOutLeft")
        .removeClass("slideOutRight");
};
Windows.prototype.showLoading = function(){
    $("#" + loadingId).show();
};
Windows.prototype.hideLoading = function(){
    $("#" + loadingId).hide();
};
Windows.prototype.loadCurrentWindow = function(){
    this.showWindow(localStorage.getItem("currentWindow") == undefined ? this.defaultId : localStorage.getItem("currentWindow"))
};

module.exports = new Windows();