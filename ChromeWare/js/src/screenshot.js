var _modal = require("./modal");

var Screenshot = function(){};

Screenshot.prototype.takeScreenshot = function takeScreenshot(){
	self = this;
	chrome.tabs.captureVisibleTab(null, function(img) {
		filename = $("#filename").val();
		var objImages = JSON.parse(localStorage.getItem("Screenshots"));

		if(objImages == null)
			objImages = {};
		if(Object.keys(objImages).length < 3){
			if(filename == ""){
				new _modal("danger", "Sorry!", "Please enter in a filename before generating a screenshot").display();
			}else{
				var imgUrl = img.replace(/^data:image\/[^;]/, 'data:application/octet-stream');
				var link = document.createElement("a");
				link.download = filename + ".jpg";
				//link.href = imgUrl;
				link.href = img;

				var imageVersion = 1;
				while(objImages[filename] != null){
					imageVersion++;
					filename = filename + imageVersion;
				};
				objImages[filename] = img;
				localStorage.setItem("Screenshots", JSON.stringify(objImages));
				$("#filename").val("");

				$.get("screenshotListItem.html", function(data){
					var appendData = $($(data)[0]).attr("data-screenshot-name", filename)[0];
					appendData = $(appendData).append(filename);
					$(".screenshot-group").append(appendData);
					self.initScreenshotEvents();
				});
			}
		}else{
			new _modal("danger", "Sorry!", "Only 3 screenshots are allowed. Please remove one and try again.").display();
		}
	});
};
Screenshot.prototype.downloadScreenshots = function downloadScreenshots(){
	var objImages = JSON.parse(localStorage.getItem("Screenshots"));
	console.log(objImages);
	jQuery.ajaxSetup({async:false});
	for(var fileName in objImages){
		var img = objImages[fileName];
		var link = document.createElement("a");
		link.download = fileName + ".jpg";
		link.href = img;
		link.click();
	};
	jQuery.ajaxSetup({async:true});
};
Screenshot.prototype.clearScreenshots = function clearScreenshots(){
	localStorage.removeItem("Screenshots");
	$(".screenshot-group").children().remove();
};
Screenshot.prototype.validateTakeScreenshot = function validateTakeScreenshot(){
	$("#filename").each(function(){
		selfData = $(this);
		// if(selfData.val() == "" || selfData.val() == undefined){
		// $("#" + buttons.screenshot).attr("disabled", "disabled")
		// };

		selfData.keyup(function(){
			// if(selfData.val() == "" || selfData.val() == undefined){
			// $("#" + buttons.screenshot).attr("disabled", "disabled")
			// }else{
			//Download file cannot contain invalid characters: \/:*?<>|
			var sString = selfData.val().substring(selfData.val().length -1, selfData.val().length);
			if(["\\", "/", ":", "*", "?", "<", ">", "|"].indexOf(sString) != -1){
				selfData.val(selfData.val().substring(0, selfData.val().length -1));
				return
			};
			// }
		});
	});
};
Screenshot.prototype.initScreenshotEvents = function initScreenshotEvents(){
	this.validateTakeScreenshot();

	$(".screenshot-edit").click(function(event){
		event.preventDefault();
		localStorage.setItem("editImageIndex", $(this).parent().attr("data-screenshot-name"));
		chrome.tabs.query({currentWindow: true,active: true},function(tabs){chrome.tabs.create({ url: "../html/edit.html", index: (tabs[0].index + 1), openerTabId: tabs[0].id });});
	});

	$(".screenshot-save").click(function(event){
		event.preventDefault();
		var objImages = JSON.parse(localStorage.getItem("Screenshots"));
		var filename = $(this).parent().attr("data-screenshot-name");
		var img = objImages[filename];
		var link = document.createElement("a");
		link.download = filename + ".jpg";
		link.href = img;
		link.click();
	});

	$(".screenshot-remove").click(function(event){
		event.preventDefault();
		var objImages = JSON.parse(localStorage.getItem("Screenshots"));
		var filename = $(this).parent().attr("data-screenshot-name");
		delete objImages[filename];
		if(!(Object.keys(objImages).length > 2)){
			$("#" + buttons.screenshot).attr("disabled", false);
		};
		localStorage.setItem("Screenshots", JSON.stringify(objImages));
		$(this).parent().remove();
	});
};

module.exports = new Screenshot();

//var Screenshot = (function (){
//
//	return {
//		takeScreenshot: function(){
//			self = this;
//			chrome.tabs.captureVisibleTab(null, function(img) {
//				var date = new Date();
//				var screenshotUrl = img;
//				var viewTabUrl = chrome.extension.getURL('screenshot.html');
//				filename = $("#filename").val();
//				var objImages = JSON.parse(localStorage.getItem("Screenshots"));
//
//				if(objImages == null)
//					objImages = {};
//				if(Object.keys(objImages).length < 3){
//					if(filename == ""){
//						new Modal("danger", "Sorry!", "Please enter in a filename before generating a screenshot").display();
//					}else{
//						var imgUrl = img.replace(/^data:image\/[^;]/, 'data:application/octet-stream');
//						var link = document.createElement("a");
//						link.download = filename + ".jpg";
//						//link.href = imgUrl;
//						link.href = img;
//
//						var imageVersion = 1;
//						while(objImages[filename] != null){
//							imageVersion++;
//							filename = filename + imageVersion;
//						};
//						objImages[filename] = img;
//						localStorage.setItem("Screenshots", JSON.stringify(objImages));
//						$("#filename").val("");
//
//						$.get("screenshotListItem.html", function(data){
//							var appendData = $($(data)[0]).attr("data-screenshot-name", filename)[0];
//							appendData = $(appendData).append(filename);
//							$(".screenshot-group").append(appendData);
//							self.initScreenshotEvents();
//						});
//					}
//				}else{
//					new Modal("danger", "Sorry!", "Only 3 screenshots are allowed. Please remove one and try again.").display();
//				}
//			});
//		},
//		downloadScreenshots: function(){
//			var objImages = JSON.parse(localStorage.getItem("Screenshots"));
//			console.log(objImages);
//			jQuery.ajaxSetup({async:false});
//			for(var fileName in objImages){
//				var img = objImages[fileName];
//				var link = document.createElement("a");
//				link.download = fileName + ".jpg";
//				link.href = img;
//				link.click();
//			};
//			jQuery.ajaxSetup({async:true});
//		},
//		clearScreenshots: function(){
//			localStorage.removeItem("Screenshots");
//			$(".screenshot-group").children().remove();
//		},
//		validateTakeScreenshot: function validateTakeScreenshot(){
//			$("#filename").each(function(){
//				selfData = $(this);
//				// if(selfData.val() == "" || selfData.val() == undefined){
//					// $("#" + buttons.screenshot).attr("disabled", "disabled")
//				// };
//
//				selfData.keyup(function(){
//					// if(selfData.val() == "" || selfData.val() == undefined){
//						// $("#" + buttons.screenshot).attr("disabled", "disabled")
//					// }else{
//						//Download file cannot contain invalid characters: \/:*?<>|
//						var sString = selfData.val().substring(selfData.val().length -1, selfData.val().length);
//						if(["\\", "/", ":", "*", "?", "<", ">", "|"].indexOf(sString) != -1){
//							selfData.val(selfData.val().substring(0, selfData.val().length -1));
//							return
//						};
//					// }
//				});
//			});
//		},
//		initScreenshotEvents: function(){
//			this.validateTakeScreenshot();
//
//			$(".screenshot-edit").click(function(event){
//				event.preventDefault();
//				localStorage.setItem("editImageIndex", $(this).parent().attr("data-screenshot-name"));
//				chrome.tabs.query({currentWindow: true,active: true},function(tabs){chrome.tabs.create({ url: "../html/edit.html", index: (tabs[0].index + 1), openerTabId: tabs[0].id });});
//			});
//
//			$(".screenshot-save").click(function(event){
//				event.preventDefault();
//				var objImages = JSON.parse(localStorage.getItem("Screenshots"));
//				var filename = $(this).parent().attr("data-screenshot-name");
//				var img = objImages[filename];
//				var link = document.createElement("a");
//				link.download = filename + ".jpg";
//				link.href = img;
//				link.click();
//			});
//
//			$(".screenshot-remove").click(function(event){
//				event.preventDefault();
//				var objImages = JSON.parse(localStorage.getItem("Screenshots"));
//				var filename = $(this).parent().attr("data-screenshot-name");
//				delete objImages[filename];
//				if(!(Object.keys(objImages).length > 2)){
//					$("#" + buttons.screenshot).attr("disabled", false);
//				};
//				localStorage.setItem("Screenshots", JSON.stringify(objImages));
//				$(this).parent().remove();
//			});
//		}
//
//	}
//
//});