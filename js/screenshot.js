
var Screenshot = (function (){

	return {
		takeScreenshot: function(){
			self = this;
			chrome.tabs.captureVisibleTab(null, function(img) {
				var date = new Date();
				var screenshotUrl = img;
				var viewTabUrl = chrome.extension.getURL('screenshot.html');
				filename = $("#filename").val();
				var objImages = JSON.parse(localStorage.getItem("Screenshots"));
				
				if(objImages == null)
					objImages = {};
				if(filename != ""){
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
					if(Object.keys(objImages).length > 2){
						$("#" + buttons.screenshot).attr("disabled", "disabled");
					};
					localStorage.setItem("Screenshots", JSON.stringify(objImages));
					$("#filename").val("");
					
					$.get("screenshotListItem.html", function(data){
						var appendData = $($(data)[0]).attr("data-screenshot-name", filename)[0];
						appendData = $(appendData).append(filename);
						$(".screenshot-group").append(appendData);
						self.initScreenshotEvents();
					});	
				}
			});
		},
		downloadScreenshots: function(){
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
		},
		clearScreenshots: function(){
			localStorage.removeItem("Screenshots");
			$(".screenshot-group").children().remove();
		},
		initScreenshotEvents: function(){
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
		}
		
	}

});