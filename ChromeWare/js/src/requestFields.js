var _screenshotTool = new (require('./screenshot'));
var _url = new (require('./urlManagement'));
var _constants = new (require('./constants'));

var _transitions = require('./transitions');
var _modal = require('./modal');

var RequestFields = function(transition){
	this.transition = transition || new _transitions();
};

RequestFields.prototype.initialize = function(){
	var fieldsObj = localStorage.getItem("requestFields") == undefined ? {} : JSON.parse(localStorage.getItem("requestFields"));
	localStorage.setItem("requestFields", JSON.stringify(fieldsObj));

	var dataObj = _url.getTempSoftwareData();
	var releaseObj = dataObj["releases"];
	var releaseKeys = Object.keys(releaseObj);
	$( "#Fld__xml_Release" ).autocomplete({
		source: releaseKeys
	});

	var prodCompObj = dataObj["product-components"];
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
};
RequestFields.prototype.rememberFields = function(){
	//All input text fields have this class
	var self = this;

	function rememberTextFields(){
		function storeFieldTextValue(element){
			var fieldId = $(element).attr('id');
			var fieldValue = $(element).val();
			self.setFieldValue(fieldId, fieldValue)
		};

		var formField = ".form-control";
		$("#request").find(formField).each(function() {
			storeFieldTextValue(this)
		}).focusout(function() {
			storeFieldTextValue(this)
		});
	};

	function rememberRadioFields(){
		$("input:radio").click(function(){
			var fieldId = $(this).attr('name');
			var fieldValue = $(this).val();
			self.setFieldValue(fieldId, fieldValue);
		});
	};

	function rememberCheckboxFields(){
		$("input:checkbox").click(function(){
			var fieldId = $(this).attr('id');
			var fieldsObj = JSON.parse(localStorage.getItem("requestFields"));
			fieldsObj[fieldId] = ($(this).prop("checked") == true) ? _constants.ebYes:_constants.ebNo;
			localStorage.setItem("requestFields", JSON.stringify(fieldsObj))
		});
	};

	rememberTextFields();
	rememberRadioFields();
	rememberCheckboxFields();
};
RequestFields.prototype.fillFields = function(){
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
			case _constants.impactLayer.product:
				$("#productLayer").prop("checked", true);
				break;
			case _constants.impactLayer.as:
				$("#asLayer").prop("checked", true);
				break;
			default:
				fieldsObj["Fld__xml_ImpactedLayer"] = _constants.impactLayer.product;
		}
	});

	$("input:checkbox").each(function(){
		var fieldId = $(this).attr('id');
		var fieldsObj = JSON.parse(localStorage.getItem("requestFields"));
		$(this).prop("checked", (fieldsObj[fieldId] == _constants.impactLayer.product));
	});
	this.fillImages();
};
RequestFields.prototype.clearFields = function(){
	var formField = ".form-control";

	$("#request").find(formField).each(function() {
		var fieldId = $(this).attr('id');

		if(["Fld__xml_Type", "Fld__xml_Severity", "Fld__xml_Priority"].indexOf(fieldId) > -1){
			switch(fieldId){
				case "type":
					$(this).val(_constants.type.bug);
					break;
				case "severity":
					$(this).val(_constants.severity.minor);
					break;
				case "priority":
					$(this).val(_constants.priority.normal);
					break;
			};
		}
		else{
			$(this).val("");
		}
	});
	$("#productLayer").prop("checked", true);
	$("#Fld__xml_Regression").prop("checked", false);
	var regressionFieldParent = $("#Fld__xml_RegressionFrom").parent();
	if(!regressionFieldParent.hasClass("hide")){
		regressionFieldParent.addClass("hide");
	}


	localStorage.setItem("requestFields", JSON.stringify({}));
	_screenshotTool.clearScreenshots();
};
RequestFields.prototype.defaultFieldValues = function(){
	var fieldsObj = JSON.parse(localStorage.getItem("requestFields"));
	if(Object.keys(fieldsObj).length == 0){
		fieldsObj["Fld__xml_ImpactedLayer"] = _constants.impactLayer.product;
		localStorage.setItem("requestFields", JSON.stringify(fieldsObj));
	}
};
RequestFields.prototype.fillImages = function(){
	var objImages = JSON.parse(localStorage.getItem("Screenshots")) || {};
	//
	$.get("screenshotListItem.html", function(data){
		for(var fileName in objImages){
			if(objImages.hasOwnProperty(fileName)){
				var appendData = $($(data)[0]).attr("data-screenshot-name", fileName)[0];
				appendData = $(appendData).append(fileName);
				$(".screenshot-group").append(appendData);
			}
		};

		_screenshotTool.initScreenshotEvents();
	});
};
RequestFields.prototype.initFieldEvents = function(){
	//Be aware of the order
	var self = this;
	//$("#" + buttons.request).attr("disabled","disabled");
	localStorage.setItem("RequestCreationAllowed", false);
	localStorage.setItem("LoggedOut", true);

	$("#" + _constants.buttons.cancelRequest).click(this.resetSections)
		.click(this.clearFields)
		.click(this.defaultFieldValues);

	$("#" + _constants.buttons.createRequest).click(function(){self.downloadScreenshots()})
		.click(function(){self.createRequest()})
		.click(function(){self.clearFields()})
		.click(function(){self.resetSections()});

	$("#" + _constants.buttons.screenshot).click(this.takeScreenshot);
	$("#" + _constants.buttons.request).click(function(){
		if(localStorage.getItem("RequestCreationAllowed") == "false"){
			new _modal("danger", _constants.invalidMsgTitle, _constants.invalidSiteMsg).display();
		}else if(localStorage.getItem("LoggedOut") == "true"){
			new _modal("danger", _constants.invalidMsgTitle, "You are signed out of this site. Please log back in and try again").display();
		}else{
			self.transition.createRequest();
			self.storeBuildData();
			self.fieldSetHandler();
		}
	});
	// $("#" + buttons.request).click(this.storeBuildData)
	// .click(this.fieldSetHandler);
};
RequestFields.prototype.fieldSetHandler = function(){
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
};
RequestFields.prototype.initFieldPopover = function(){
	var formField = ".form-control";
	$("#request").find(formField).hover(function() {
		//Retrieve the value of the field for comparison
		var popupValue = $(this).val();
		if(popupValue !== ""){
			//If the field is not empty, then it will apply
			//the popover
			var popupName = $(this).prev().text();
			$(this)
				.popover({content: popupName, placement:"top", container: 'body', trigger: 'focus'});
		}
		else{
			//Else, if the field is empty then the field
			//destroys the popover
			$(this).popover('destroy');
		};
	});
};
RequestFields.prototype.initSectionTracking = function(){
	var section = ".panel-collapse";
	this.loadLastSection();
	$(section).on('shown.bs.collapse', function () {
		var sectionId = $(this).attr("id");
		localStorage.setItem("lastSection", sectionId);
	});
};
RequestFields.prototype.loadLastSection = function(){
	var sectionId = localStorage.getItem("lastSection");
	if(sectionId != null)
	{
		$('#'+ sectionId).collapse({parent: "#accordion"})
	}
	else{
		this.resetSections();
	}
};
RequestFields.prototype.resetSections = function(){
	$('#collapseOne').addClass('in')
		.css({height: 'auto'});
	$('#collapseTwo').removeClass('in')
		.css({height: '0px'});
	$('#collapseThree').removeClass('in')
		.css({height: '0px'});
	$('#collapseFour').removeClass('in')
		.css({height: '0px'});
	localStorage.setItem("lastSection", 'collapseOne');
};
RequestFields.prototype.createRequest = function(){
	var requestURL = _url.createRequestURL();

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
};
RequestFields.prototype.storeBuildData = function(){
	function storeBuildDataHelper(siteData){
		var fieldsObj = JSON.parse(localStorage.getItem("requestFields"));
		if(fieldsObj["Fld__xml_EnvironmentBuilds"] == undefined){
			fieldsObj["Fld__xml_EnvironmentBuilds"] = siteData.buildData;
			fieldsObj["Fld__xml_URL"] = siteData.url;
			$("#Fld__xml_URL").val(siteData.url);
			localStorage.setItem("requestFields", JSON.stringify(fieldsObj))
		}
	};

	_url.getCurrentSiteBuilds(storeBuildDataHelper);
};
RequestFields.prototype.takeScreenshot = function(){
	_screenshotTool.takeScreenshot();
};
RequestFields.prototype.downloadScreenshots = function(){
	_screenshotTool.downloadScreenshots();
	_screenshotTool.clearScreenshots();
};

RequestFields.prototype.getFields = function(){
	return JSON.parse(localStorage.getItem("requestFields"))
};
RequestFields.prototype.setFields = function(fields){
	localStorage.setItem("requestFields", JSON.stringify(fields))
};
RequestFields.prototype.getFieldValue = function(field){
	return JSON.parse(localStorage.getItem("requestFields"))[field];
};
RequestFields.prototype.setFieldValue = function(field, value){
	var obj = JSON.parse(localStorage.getItem("requestFields"));
	obj[field] = value;
	localStorage.setItem("requestFields", JSON.stringify(obj))
};

module.exports = RequestFields;
