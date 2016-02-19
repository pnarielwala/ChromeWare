

var Windows = (function(){

    var obj = {
        loadingId: undefined,
        defaultId: undefined,
        initWindows: function(){
            jQuery.ajaxSetup({async:false});
            $.get("login.html", function(data){
                $("#loginWindow").append(data)
            });
            $.get("main.html", function(data){
                $("#main").append(data)
            });
            $.get("request.html", function(data){
                $("#request").append(data)
            });
            $.get("quickLinks.html", function(data){
                $("#quickLinks").append(data)
            });
            jQuery.ajaxSetup({async:true});
            this.setLoadingWindow();
            this.setDefaultWindow();

            var requestFields = new RequestFields();
            obj["requestFields"] = requestFields;
        },
        setDefaultWindow: function(){
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
        },
        setLoadingWindow: function(){
            if($(".loading-window").length === 1){
                var loadingWindow = $(".loading-window").attr("id");
                if(loadingWindow !== undefined && loadingWindow !== null){
                    this.loadingId = loadingWindow;
                }else{
                    console.warn("Loading window has no id assigned")
                }
            }else{
                console.warn("Loading window has not been defined")
            }
        },
        hideWindow: function(id, animation){
            this.removeClasses(id);
            $("#" + id).addClass("animated").addClass(animation);
        },
        hideWindowNow: function(id, animation){
            this.removeClasses(id);
            $("#" + id).addClass("animated-now").addClass(animation);
        },
        showWindow: function(id, animation){
            this.removeClasses(id);
            $("#" + id).addClass("animated").addClass(animation);
            localStorage.setItem("currentWindow", id);
        },
        showWindowNow: function(id, animation){
            this.removeClasses(id);
            $("#" + id).addClass("animated-now").addClass(animation);
            localStorage.setItem("currentWindow", id);
        },
        removeClasses: function(id){
            $("#" + id).removeClass("animated-now")
                .removeClass("animated")
                .removeClass("slideInLeft")
                .removeClass("slideInRight")
                .removeClass("slideOutLeft")
                .removeClass("slideOutRight");
        },
        showLoading: function(){
            $("#" + this.loadingId).show();
        },
        hideLoading: function(){
            $("#" + this.loadingId).hide();
        },
        loadCurrentWindow: function(){
            this.showWindow(localStorage.getItem("currentWindow") == undefined ? this.defaultId : localStorage.getItem("currentWindow"))
        },
    };

    obj.initWindows();
    return obj;

})