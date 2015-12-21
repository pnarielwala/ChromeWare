
var RequestFields = (function(windowsObj){

	var ret = {
		initialize: function initialize(){
			var fieldsObj = localStorage.getItem("requestFields") == undefined ? {} : JSON.parse(localStorage.getItem("requestFields"));
			localStorage.setItem("requestFields", JSON.stringify(fieldsObj));
			
			
			var releaseObj = JSON.parse(localStorage.getItem("releases"));
			var releaseKeys = Object.keys(releaseObj);
			console.log(releaseKeys);
			$( "#Fld__xml_Release" ).autocomplete({
			  source: releaseKeys
			});
			
			var prodCompObj = JSON.parse(localStorage.getItem("product-components"));
			var prodCompObj2 = {};
			for(var key in prodCompObj){
				var obj = prodCompObj[key]; 
				prodCompObj2[obj.name] = obj.path
			}
			var prodCompKeys = Object.keys(prodCompObj2);
			$( "#Fld__xml_ProductComponent" ).autocomplete({
			  source: prodCompKeys
			});
			
			this.storeBuildData();
			this.defaultFieldValues();
			this.fillFields();
			this.rememberFields();
			this.initFieldPopover();
			this.initSectionTracking();
			this.fieldSetHandler();
			this.initFieldEvents();
			
		},
		rememberFields: function rememberFields(){
			//All input text fields have this class
			function storeFieldTextValue(element){
				var fieldId = $(element).attr('id');
				var fieldValue = $(element).val();
				var fieldsObj = JSON.parse(localStorage.getItem("requestFields"));
				fieldsObj[fieldId] = fieldValue;
				localStorage.setItem("requestFields", JSON.stringify(fieldsObj))
			};
			
			var formField = ".form-control";
			$("#request").find(formField).each(function() {
				storeFieldTextValue(this)
			});
			//consolidate the two content since its the same
			$("#request").find(formField).focusout(function() {
				storeFieldTextValue(this)
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
				fieldsObj[fieldId] = ($(this).prop("checked") == true) ? ebYes:ebNo;
				localStorage.setItem("requestFields", JSON.stringify(fieldsObj))
			});
				
		},
		fillFields: function fillFields(){
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
					case impactLayer.product:
						$("#productLayer").prop("checked", true);
						break;
					case impactLayer.as:
						$("#asLayer").prop("checked", true);
						break;
					default:
						fieldsObj["Fld__xml_ImpactedLayer"] = impactLayer.product;
					};
			});
			$("input:checkbox").each(function(){
				var fieldId = $(this).attr('id');
				var fieldsObj = JSON.parse(localStorage.getItem("requestFields"));
				$(this).prop("checked", (fieldsObj[fieldId] == impactLayer.product)? true:false);
			});
			this.fillImages();
		},
		clearFields: function clearFields(){
			var formField = ".form-control";
			$("#request").find(formField).each(function() {
				var fieldId = $(this).attr('id');
				
				if(["Fld__xml_Type", "Fld__xml_Severity", "Fld__xml_Priority"].indexOf(fieldId) > -1){
					switch(fieldId){
						case "type": 
										$(this).val(type.bug); 
										break;
						case "severity": 
										$(this).val(severity.minor); 
										break;
						case "priority": 
										$(this).val(priority.normal); 
										break;
					};
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
		defaultFieldValues: function defaultFieldValues() {
			var fieldsObj = JSON.parse(localStorage.getItem("requestFields"));
			if(Object.keys(fieldsObj).length == 0){
				fieldsObj["Fld__xml_ImpactedLayer"] = "2";
				localStorage.setItem("requestFields", JSON.stringify(fieldsObj));
			}
		},
		fillImages: function fillImages() {
			var objImages = JSON.parse(localStorage.getItem("Screenshots")) || {};
			//
			if(Object.keys(objImages).length > 2){
				$("#" + buttons.screenshot).attr("disabled", "disabled");
			};
			$.get("screenshotListItem.html", function(data){
				for(var fileName in objImages){
					if(objImages.hasOwnProperty(fileName)){
						var appendData = $($(data)[0]).attr("data-screenshot-name", fileName)[0];
						appendData = $(appendData).append(fileName);
						$(".screenshot-group").append(appendData);
					}
				};
				var ScreenshotTool = new Screenshot();
				ScreenshotTool.initScreenshotEvents();
			});
		},
		initFieldEvents: function initFieldEvents() {
			//Be aware of the order
			$("#" + buttons.request).attr("disabled","disabled");
			
			$("#" + buttons.cancelRequest).click(this.resetSections)
				.click(this.clearFields)
				.click(this.defaultFieldValues);
			
			$("#" + buttons.createRequest).click(this.downloadScreenshots)
				.click(this.createRequest)
				.click(this.clearFields)
				.click(this.resetSections);
			
			$("#" + buttons.screenshot).click(this.takeScreenshot);
			$("#" + buttons.request).click(this.storeBuildData)
				.click(this.fieldSetHandler);
		},
		fieldSetHandler: function fieldSetHandler(){
			$('[data-fieldset]').each(function(){
				var selfData = $(this);
				var myFieldId = selfData.find(".form-control").attr("id");
				var myFieldParentData = $("#" + myFieldId).parent();
				var fieldSets = selfData.data("fieldset");
				for(var fieldId in fieldSets){
					var triggerValue = fieldSets[fieldId];
					var fieldData = $("#" + fieldId);
					if(fieldData.prop("type") == "checkbox"){
						if(fieldData.prop("checked") == true)
							myFieldParentData.removeClass("hide");
						$("#" + fieldId).change(function(){
							if($(this).prop("checked") == true)
								myFieldParentData.removeClass("hide");
							if($(this).prop("checked") == false)
								myFieldParentData.addClass("hide");
						});
					}
				}
			})
		},
		initFieldPopover: function initFieldPopover() {
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
		initSectionTracking: function initSectionTracking(){
			var section = ".panel-collapse";
			this.loadLastSection();
			$(section).on('shown.bs.collapse', function () {
				var sectionId = $(this).attr("id");
				localStorage.setItem("lastSection", sectionId);
			});
		},
		loadLastSection: function loadLastSection(){
			var sectionId = localStorage.getItem("lastSection");
			if(sectionId != null)
			{
				$('#'+ sectionId).collapse({parent: "#accordion"})
			}
			else{
				this.resetSections();
			}
		},
		resetSections: function resetSections(){
			$('#collapseOne').addClass('in');
			$('#collapseOne').css({height: 'auto'});
			$('#collapseTwo').removeClass('in');
			$('#collapseTwo').css({height: '0px'});
			$('#collapseThree').removeClass('in');
			$('#collapseThree').css({height: '0px'});
			$('#collapseFour').removeClass('in');
			$('#collapseFour').css({height: '0px'});
			localStorage.setItem("lastSection", 'collapseOne');
		},
		createRequest: function createRequest(){
			var url = new URLManagement();
			var requestURL = url.createRequestURL();
			this.storeBuildData;
			
			
			var fieldsObj = JSON.parse(localStorage.getItem("requestFields"));
			for(var fieldXML in fieldsObj){
				var fieldVal = fieldsObj[fieldXML];
				if(fieldVal != "" && fieldVal != undefined){
					if(fieldXML == "Fld__xml_ProductComponent"){
						var prodCompObj = JSON.parse(localStorage.getItem("product-components"));
						var prodCompObj2 = {};
						for(var key in prodCompObj){
							var obj = prodCompObj[key]; 
							prodCompObj2[obj.name] = obj.path + " > " + obj.code;
						}
						requestURL = requestURL + "&" + fieldXML + "=" + encodeURIComponent(prodCompObj2[fieldVal] || "")
					}else if(fieldXML == "Fld__xml_Release"){
						var releaseObj = JSON.parse(localStorage.getItem("releases"));
						requestURL = requestURL + "&" + fieldXML + "=" + encodeURIComponent(releaseObj[fieldVal] || "")
					}else if(fieldXML == "Fld__xml_NeedDate"){
						var dateArray = fieldVal.split('-')[1] + "/"+ fieldVal.split('-')[2] + "/"+ fieldVal.split('-')[0];
						requestURL = requestURL + "&" + fieldXML + "=" + encodeURIComponent(dateArray && "") 
					}
					else{
						requestURL = requestURL + "&" + fieldXML + "=" + encodeURIComponent(fieldVal);
					};
				}
			};
			chrome.tabs.query({currentWindow: true,active: true},function(tabs){chrome.tabs.create({ url: requestURL, index: (tabs[0].index + 1), openerTabId: tabs[0].id });});
		},
		storeBuildData: function storeBuildData() {
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
		takeScreenshot: function takeScreenshot(){
			var screenshotTool = new Screenshot();
			screenshotTool.takeScreenshot();
		},
		downloadScreenshots: function downloadScreenshots(){
			var screenshotTool = new Screenshot();
			screenshotTool.downloadScreenshots();
			screenshotTool.clearScreenshots();
		}
	
	};
	
	ret.initialize();
	return ret;

})