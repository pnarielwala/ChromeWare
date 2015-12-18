
var URLManagement = (function(){
	
	return {
		softwareURL: "https://software.enablon.com/Software/?u=",
		requestPath: "/Referent/Rqtes",
		addMode: "&tm=1&ext=1",
		siteIdIndex: 4,
		aspQueryStartIndex: 5,
		appIdIndex: 6,
		urlParamsIndex: 7,
		serverVer: "",
		createRequestURL: function(){
			return (this.softwareURL + this.requestPath + this.addMode);
		},
		getCurrentTabURL: function(callback){
			var thisURL = "";
			chrome.tabs.query({active: true, currentWindow: true}, 
				function(tabs){ 
					thisURL = tabs[0].url;
					if(typeof(callback) == "function")
						callback(thisURL);
				});
			return thisURL;
		},
		getCurrentSiteBuilds: function(callback){
			var self = this;
			function returnSiteBuilds(currSite){
				var selfcallback = callback
				
				var siteData = self.getSiteURLData(currSite);
				if(siteData.valid){
					$("#btn-createRequest").removeAttr("disabled")
					var appVerPageUrl = siteData["appVerPageUrl"];
					
					
					$.get(appVerPageUrl,
						function (data, status) {
							if(status === 'success') {
								var buildData = $(' .VPACK b', data).parent().text();
								siteData.buildData = buildData;
								if(typeof(selfcallback) == "function" && buildData.length > 0)
									selfcallback(siteData);
								else
									new Alert("alert-warning", "You are logged out of this site", 2000);
									$("#btn-createRequest").attr("disabled","disabled");
							}else{
								console.warn("shit. something went wrong")
							}
						});
				};
			};
			
			this.getCurrentTabURL(returnSiteBuilds)
		},
		getSiteURLData: function(url){
			var retObj = {valid: false};
			var urlPieces = url.split("/");
				
			var domain = urlPieces[2];
			if(domain === 'localhost'){
				this.siteIdIndex -= 1;
				this.aspQueryStartIndex -= 1;
				this.appIdIndex -= 1;
				this.urlParamsIndex -= 1;
			} else {
				this.serverVer = urlPieces[this.siteIdIndex - 1]; //serverVer not applicable for localhost
			};
			if(domain.indexOf("enablon") == -1 && domain.indexOf("localhost") == -1) {
				return retObj;
			}
				
			var domainPieces = domain.split(".");
			var enablonServer = domainPieces[0];

			if(["inno", "innous", "inno2", "innous2", "localhost"].indexOf(enablonServer) > -1) {	
				// Determine URLs of version pages for this site
				var basicSiteUrlPieces = urlPieces.slice(0, this.aspQueryStartIndex);
				var verPageUrlStub = basicSiteUrlPieces.join("/") + '/?u=';
				var appVerPageUrl = verPageUrlStub + '/ver';
				
				retObj["basicSiteUrlPieces"] = basicSiteUrlPieces;
				retObj["verPageUrlStub"] = verPageUrlStub;
				retObj["appVerPageUrl"] = appVerPageUrl;
				retObj["enablonServer"] = enablonServer;
				retObj["requestURL"] = url;
				retObj["valid"] = true;
			}else if(localStorage.getItem("currentWindow") == "main"){
				new Alert("alert-warning", "This is not a valid site to log bugs", 2000);
			}
			return retObj;
		},
		storeSoftwareData: function(){
			//var appVerPageUrl = "https://software.enablon.com/Software/?u=/Referent/PCaRel";
			var appVerPageUrl = "https://ia-dev.enablon.com/7.2/Software.ext/go.aspx?u=/Referent/PCaRel";
			$.get(appVerPageUrl,
				function (data, status) {
					if(status === 'success') {
						if($(data).find(".releases").length!== 0){
							var releaseData = $(data).find(".releases").children();
								console.log(releaseData.length);
							var releaseObject = {};
							for(var i=0; i < releaseData.length; i++){
								var release = releaseData[i];
								var code = $(release).text();
								var id = $(release).prop("id");
								releaseObject[code] = id;
							};
							console.log("saving releases to localstorage");
							localStorage.setItem("releases", JSON.stringify(releaseObject))
						}else{
							console.warn("Cannot connect to software dev");
						}
						if($(data).find(".product-component").length!== 0){
							var prodCompData = $(data).find(".product-component").children();
							var prodCompObject = {};
							for(var i=0; i < prodCompData.length; i++){
								var component = prodCompData[i];
								var code = $(component).text();
								var id = $(component).prop("id");
								prodCompObject[code] = id;
							};
							console.log("saving components to localstorage");
							localStorage.setItem("product-components", JSON.stringify(prodCompObject))
						}else{
							console.warn("Cannot connect to software dev");
						}
					}else{
						console.warn("Could not connect to "+ appVerPageUrl)
					}
				}
			);
		}
					
	}
})