var _constants = new (require("./constants"));

var URLManagement = function(){
    this.softwareURL = "https://software.enablon.com/Software/?u=";
    this.requestPath = "/Referent/Rqtes";
    this.addMode = "&tm=1&ext=1";
};

URLManagement.prototype.createRequestURL = function(){
    return (this.softwareURL + this.requestPath + this.addMode);
};

URLManagement.prototype.getCurrentTabURL = function(){
	return new Promise(function(resolve, reject){
		chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
            var url = decodeURI(tabs[0].url).toLowerCase();
            resolve(url)
        });
	})
};

URLManagement.prototype.whenLoggedIn = function whenLoggedIn(siteUrl, callback){
	var self = this;
	this.getSiteBuilds(siteUrl).then(function(data){
		var $loginForm = $(data).filter("#LoginForm");
		if(!(loginForm.length > 0)){
			callback(data)
		} else{
			console.warn("You are logged out.")
		}
	});
}

URLManagement.prototype.getSiteData = function getSiteData(siteUrl){
	return new Promise(function(resolve, reject){
		$.get(siteUrl, function (data, status) {
			if(status === 'success') {
				resolve(data);
			} else{
				reject(new Error("Unable to connect to: " + siteUrl))
			}
		})
	})
}

URLManagement.prototype.getVersionPageUrl = function getVersionPageUrl(siteUrl){
	var versionUrl;
	var urlSplit = siteUrl.split("/");

	var isValidUrl = siteUrl.indexOf("enablon.com/") > -1 || siteUrl.indexOf("localhost/") > -1;

	if(isValidUrl){
		var domain = urlSplit[2].toLowerCase().split(".")[0];
		if(domain != "localhost"){
			versionUrl = urlSplit.slice(0, 5).join("/");
		}else{
			versionUrl = urlSplit.slice(0, 4).join("/");
		}

		versionUrl += '/?u=/ver'
	};

	return versionUrl;
}

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