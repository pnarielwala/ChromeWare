var _constants = new (require("./constants"));

var URLManagement = function(){
    this.softwareURL = "https://software.enablon.com/Software/?u=";
    this.requestPath = "/Referent/Rqtes";
    this.addMode = "&tm=1&ext=1";
};

URLManagement.prototype.createRequestURL = function(){
    return (this.softwareURL + this.requestPath + this.addMode);
};
URLManagement.prototype.getCurrentTabURL = function(callback){
    var thisURL = "";
    chrome.tabs.query({active: true, currentWindow: true},
        function(tabs){
            thisURL = decodeURI(tabs[0].url).toLowerCase();
            if(typeof(callback) == "function")
                callback(thisURL);
        });
    return thisURL;
};
URLManagement.prototype.getCurrentSiteBuilds = function(callback){
    var self = this;
    function returnSiteBuilds(currSite){
		var selfcallback = callback;
        var siteData = self.getSiteURLData(currSite);
		if(siteData.valid){
			var versionUrl = siteData["versionUrl"];

            $.get(versionUrl,
                function (data, status) {
                    if(status === 'success') {
						if(!($(data).filter("#LoginForm").length > 0)){
							localStorage.setItem("LoggedOut", false);
							if($('.VPACK b', data).length > 0){
								siteData.buildData = $(' .VPACK b', data).parent().text();
							}else{
								siteData.buildData = "N/A"
							};

							if(typeof(selfcallback) == "function" && siteData.buildData.length > 0){
								selfcallback(siteData);
							}
						}else{
							localStorage.setItem("LoggedOut", true);
						}
                    }else{
                        localStorage.setItem("LoggedOut", false);
                        console.warn("shit. something went wrong")
                    }
                });
        };
    };

    this.getCurrentTabURL(returnSiteBuilds)
};
URLManagement.prototype.getSiteURLData = function(url){
	var retObj = {valid: false};
	var urlSplit = url.split("/");

	if(url.indexOf("enablon.com/") == -1 && url.indexOf("localhost/") == -1){
		return retObj;
	};
	var domain = urlSplit[2].toLowerCase().split(".")[0];
	if(_constants.validSites.indexOf(domain) > -1) {
		localStorage.setItem("RequestCreationAllowed", true);
		retObj["domain"] = domain;
		retObj["url"] = url;
		retObj["valid"] = true;

		if(domain != "localhost"){
			retObj["versionUrl"] = urlSplit.slice(0, 5).join("/") + '/?u=/ver';
		}else{
			retObj["versionUrl"] = urlSplit.slice(0, 4).join("/") + '/?u=/ver';
		}

		return retObj;
	}else{
		localStorage.setItem("RequestCreationAllowed", false);
		return retObj;
	}

};

URLManagement.prototype.getReleaseData = function(input){
	var self = this;
	return new Promise(function(resolve, reject){
		var appVerPageUrl = "https://software.enablon.com/Software/?u=/Referent/PCaRel";
		$.ajax({
			url: appVerPageUrl,
			type: "POST",
			data: JSON.stringify({
				fct_name: "ocGetReleases",
				"params": {sName: input}
			}),
			contentType: "application/json",
			dataType: "json",
			success: function (data) {
				if(data.status == "OK") {
					var releases = data.data;
					var invReleases = {}
					for(var obj in releases){
						invReleases[releases[obj].Name] = {key: obj, funcComponents: releases[obj].FunctionalComponents}
					}

					resolve(JSON.stringify(invReleases))
				}else{
					this.error(data);
				}
			},
			error: function (data) {
				resolve({err: data.error})
			}
		});
	});
};

URLManagement.prototype.getProductComponentData = function(input){
	var self = this;
	return new Promise(function(resolve, reject){
		var appVerPageUrl = "https://software.enablon.com/Software/?u=/Referent/PCaRel";
		$.ajax({
			url: appVerPageUrl,
			type: "POST",
			data: JSON.stringify({
				fct_name: "ocGetProductComponents",
				"params": {sName: input}
			}),
			contentType: "application/json",
			dataType: "json",
			success: function (data) {
				if(data.status == "OK") {
					var components = data.data;
					var invComponents = {}
					for(var obj in components){
						invComponents[components[obj].Name] = {key: obj, path: components[obj].Path}
					}

					resolve(JSON.stringify(invComponents))
				}else{
					this.error(data);
				}
			},
			error: function (data) {
				resolve({err: data.error})
			}
		});
	});
};

module.exports = URLManagement;