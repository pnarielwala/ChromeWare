
var RequestFields = (function(windowsObj){

	var ret = {
		initialize: function(){
			var fieldsObj = localStorage.getItem("requestFields") == undefined ? {} : JSON.parse(localStorage.getItem("requestFields"));
			localStorage.setItem("requestFields", JSON.stringify(fieldsObj));
			
			
			// var releaseObj = JSON.parse(localStorage.getItem("releases"));
			// var releaseKeys = Object.keys(releaseObj);
			// console.log(releaseKeys);
			// $( "#Fld__xml_Release" ).autocomplete({
			  // source: releaseKeys
			// });
			
			// var prodCompObj = JSON.parse(localStorage.getItem("product-components"));
			// var prodCompKeys = Object.keys(prodCompObj);
			// $( "#Fld__xml_ProductComponent" ).autocomplete({
			  // source: prodCompKeys
			// });
			  
			
			
			this.storeBuildData();
			this.defaultFieldValues();
			this.fillFields();
			this.rememberFields();
			this.initFieldPopover();
			this.initSectionTracking();
			this.fieldSetHandler();
			this.initFieldEvents();
			
		},
		rememberFields: function(){
			//All input text fields have this class
			var formField = ".form-control";
			$("#request").find(formField).each(function() {
				var fieldId = $(this).attr('id');
				var fieldValue = $(this).val();
				var fieldsObj = JSON.parse(localStorage.getItem("requestFields"));
				fieldsObj[fieldId] = fieldValue;
				localStorage.setItem("requestFields", JSON.stringify(fieldsObj))
			});
			//consolidate the two content since its the same
			$("#request").find(formField).focusout(function() {
				var fieldId = $(this).attr('id');
				var fieldValue = $(this).val();
				var fieldsObj = JSON.parse(localStorage.getItem("requestFields"));
				fieldsObj[fieldId] = fieldValue;
				localStorage.setItem("requestFields", JSON.stringify(fieldsObj))
			});
			$("input:radio").click(function(){
				var fieldId = $(this).attr('id');
				var fieldsObj = JSON.parse(localStorage.getItem("requestFields"));
				switch(fieldId){
					case "productLayer":
						fieldsObj["Fld__xml_ImpactedLayer"] = $(this).val();
						break;
					case "asLayer":
						fieldsObj["Fld__xml_ImpactedLayer"] = $(this).val();
						break;
					default:
						console.warn("Remembering invalid radio field");
					};
				localStorage.setItem("requestFields", JSON.stringify(fieldsObj))
			});
			$("input:checkbox").click(function(){
				var fieldId = $(this).attr('id');
				var fieldsObj = JSON.parse(localStorage.getItem("requestFields"));
				fieldsObj[fieldId] = ($(this).prop("checked") == true) ? "2":"1"; //put these in constants in main
				localStorage.setItem("requestFields", JSON.stringify(fieldsObj))
			});
				
		},
		fillFields: function(){
			var formField = ".form-control";
			var fieldsObj = JSON.parse(localStorage.getItem("requestFields"));
			$("#request").find(formField).each(function() {
				var fieldId = $(this).attr('id');
				var fieldValue = fieldsObj[fieldId];
				if(fieldValue != null && fieldId != "filename")
				{
					$(this).val(fieldValue);
				}
			});	
			$("input:radio").each(function(){
				switch(fieldsObj["Fld__xml_ImpactedLayer"]){
					case "2":
						$("#productLayer").prop("checked", true);
						break;
					case "1":
						$("#asLayer").prop("checked", true);
						break;
					default:
						fieldsObj["Fld__xml_ImpactedLayer"] = "2";
					};
			});
			$("input:checkbox").each(function(){
				var fieldId = $(this).attr('id');
				var fieldsObj = JSON.parse(localStorage.getItem("requestFields"));
				$(this).prop("checked", (fieldsObj[fieldId] == "2")? true:false);
			});
			this.fillImages();
		},
		clearFields: function(){
			console.log("clearFields");
			var formField = ".form-control";
			$("#request").find(formField).each(function() {
				var fieldId = $(this).attr('id');
				//set to constants ex "3"
				if(["Fld__xml_Type", "Fld__xml_Severity", "Fld__xml_Priority"].indexOf(fieldId) > -1){
					switch(fieldId){
						case "type": 
										$(this).val("BG"); 
										break;
						case "severity": 
										$(this).val("3"); 
										break;
						case "priority": 
										$(this).val("3"); 
										break;
					};
					console.log("fieldId: " + fieldId);
				}
				else{
					$(this).val("");
				};
			});
			$("#productLayer").prop("checked", true);
			$("#Fld__xml_Regression").prop("checked", false);
			if(!$("#Fld__xml_RegressionFrom").parent().hasClass("hide")){
				$("#Fld__xml_RegressionFrom").parent().addClass("hide");
			}
			var fieldsObj = {};
			localStorage.setItem("requestFields", JSON.stringify(fieldsObj));;
			
			
			//Removes any validations the user did not meet
			//removeValidation();
			
			var screenshotTool = new Screenshot();
			screenshotTool.clearScreenshots();
		},
		defaultFieldValues: function() {
			var fieldsObj = JSON.parse(localStorage.getItem("requestFields"));
			if(Object.keys(fieldsObj).length == 0){
				fieldsObj["Fld__xml_ImpactedLayer"] = "2";
				localStorage.setItem("requestFields", JSON.stringify(fieldsObj));
			}
		},
		fillImages: function() {
			var objImages = JSON.parse(localStorage.getItem("Screenshots")) || {};
			//
			if(Object.keys(objImages).length > 2){
				$("#" + buttons.screenshot).attr("disabled", "disabled");
			};
			for(var fileName in objImages){
				//objImages.hasOwnProperty(fileName) to make sure we are getting the key and not other inherited property
				//todo: maybe we dont need to make this synch
				jQuery.ajaxSetup({async:false});
				myFileName = fileName;
				$.get("screenshotListItem.html", function(data){
					var appendData = $($(data)[0]).attr("data-screenshot-name", myFileName)[0];
					appendData = $(appendData).append(myFileName);
					$(".screenshot-group").append(appendData)
				});
				jQuery.ajaxSetup({async:true});
			};
			var ScreenshotTool = new Screenshot();
			ScreenshotTool.initScreenshotEvents();
		},
		initFieldEvents: function() {
			//Be aware of the order
			$("#" + buttons.request).attr("disabled","disabled");
			//todo: chain the .click(...).click(...)
			$("#" + buttons.cancelRequest).click(this.resetSections);
			$("#" + buttons.cancelRequest).click(this.clearFields);
			$("#" + buttons.cancelRequest).click(this.defaultFieldValues);
			$("#" + buttons.createRequest).click(this.downloadScreenshots);
			$("#" + buttons.createRequest).click(this.createRequest);
			$("#" + buttons.createRequest).click(this.clearFields);
			$("#" + buttons.createRequest).click(this.resetSections);
			$("#" + buttons.screenshot).click(this.takeScreenshot);
			$("#" + buttons.request).click(this.storeBuildData);
			$("#" + buttons.request).click(this.fieldSetHandler);
			
			
			// $("#" + buttons.request).click(function(){
				// console.log("supppp");
				// $('#myModal').modal('show')
			// });
		},
		fieldSetHandler: function(){
			$('[data-fieldset]').each(function(){
				//simplify html objects into a var, and boolean statements
				var myFieldId = $(this).find(".form-control").attr("id");
				console.log("myFieldId: " + myFieldId);
				var fieldSets = $(this).data("fieldset");
				for(var fieldId in fieldSets){
					var triggerValue = fieldSets[fieldId];
					if($("#" + fieldId).prop("type") == "checkbox"){
						if($("#" + fieldId).prop("checked") == true)
							$("#" + myFieldId).parent().removeClass("hide");
						$("#" + fieldId).change(function(){
							if($(this).prop("checked") == true)
								$("#" + myFieldId).parent().removeClass("hide");
							if($(this).prop("checked") == false)
								$("#" + myFieldId).parent().addClass("hide");
						});
					}
				}
			})
		},
		initFieldPopover: function() {
			var formField = ".form-control";
			$("#request").find(formField).hover(function() {
				//Retrieve the value of the field for comparison
				var popupValue = $(this).val();
				if(popupValue !== ""){
					//If the field is not empty, then it will apply
					//the popover
					var popupName = $(this).prev().text();
					console.log(popupName);
					$(this)
						.popover({content: popupName, placement:"top", container: 'body', trigger: 'focus'});
				}
				else{
					//Else, if the field is empty then the field
					//destroys the popover
					$(this).popover('destroy');
				};
			});
		},
		initSectionTracking: function(){
			var section = ".panel-collapse";
			this.loadLastSection();
			$(section).on('shown.bs.collapse', function () {
				var sectionId = $(this).attr("id");
				localStorage.setItem("lastSection", sectionId);
			});
		},
		loadLastSection: function(){
			var sectionId = localStorage.getItem("lastSection");
			if(sectionId != null)
			{
				$('#'+ sectionId).collapse({parent: "#accordion"})
			}
			else{
				this.resetSections();
			}
		},
		resetSections: function(){
			$('#collapseOne').addClass('in');
			$('#collapseOne').css({height: 'auto'});
			$('#collapseTwo').removeClass('in');
			$('#collapseTwo').css({height: '0px'});
			$('#collapseThree').removeClass('in');
			$('#collapseThree').css({height: '0px'});
			// $('#collapseFour').removeClass('in');
			// $('#collapseFour').css({height: '0px'});
			localStorage.setItem("lastSection", 'collapseOne');
		},
		createRequest: function(){
			var url = new URLManagement();
			var requestURL = url.createRequestURL();
			this.storeBuildData;
			
			
			var fieldsObj = JSON.parse(localStorage.getItem("requestFields"));
			for(var fieldXML in fieldsObj){
				requestURL = requestURL + "&" + fieldXML + "=" + encodeURIComponent(fieldsObj[fieldXML])
			};
			chrome.tabs.create({ url: requestURL });
		},
		storeBuildData: function() {
			function storeBuildDataHelper(siteData){
				console.log("storeBuildDataHelper");
				var fieldsObj = JSON.parse(localStorage.getItem("requestFields"));
				if(fieldsObj["Fld__xml_EnvironmentBuilds"] == undefined){
					fieldsObj["Fld__xml_EnvironmentBuilds"] = siteData.buildData;
					fieldsObj["Fld__xml_URL"] = siteData.requestURL;
					$("#Fld__xml_URL").val(siteData.requestURL);
					localStorage.setItem("requestFields", JSON.stringify(fieldsObj))
				}
			};
			
			var url = new URLManagement();
			url.getCurrentSiteBuilds(storeBuildDataHelper);
		},
		takeScreenshot: function(){
			var screenshotTool = new Screenshot();
			screenshotTool.takeScreenshot();
		},
		downloadScreenshots: function(){
			var screenshotTool = new Screenshot();
			screenshotTool.downloadScreenshots();
			screenshotTool.clearScreenshots();
		}
	
	};
	
	ret.initialize();
	return ret;

})