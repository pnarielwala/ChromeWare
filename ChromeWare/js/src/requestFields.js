var _screenshotTool = new (require('./screenshot'));
var _url = new (require('./urlManagement'));
var _constants = new (require('./constants'));

var _transitions = require('./transitions');
var _modal = require('./modal');

var RequestFields = function(transition){
	this.transition = transition || new _transitions();
};

RequestFields.prototype.initialize = function(){
	var fieldsObj = this.getFields() == undefined ? {} : this.getFields();
	this.setFields(fieldsObj);

	this.storeBuildData();
	this.defaultFieldValues();
	this.fillFields();
	this.autoFillFields();
	this.rememberFields();
	this.initFieldPopover();
	this.initSectionTracking();
	this.fieldSetHandler();
	this.initFieldEvents();
	this.handleRequiredFields("required");
};

RequestFields.prototype.initLink = function($field, callback){
	var self = this;

	$field.on("keyup", function(){
		var self = this;
		var $self = $(this);
		var input = $self.val();
		
		if(input.length >= 3){
			callback(input).then(function(response){
				self.collection = JSON.parse(response);
				$self.autocomplete({
					source: Object.keys(self.collection)
				}).focusout(function(){
					if(Object.keys(self.collection).indexOf($self.val()) < 0){
						var element = $(':focus');
						$self.val("");
						self.setFieldValue($self.attr("id"), "");
						self.handleRequiredFields("required");
						element.focus();
					} else{
						$self.attr("value", self.collection[$self.val()].key)
					}
				})
			})
		} else{
			$self.autocomplete({
				source: {}
			}).autocomplete( "close" );
			delete self.collection
		}
		
	});
}

RequestFields.prototype.initReleaseLink = function(){
	
	this.initLink($("#Fld__xml_Release"), _url.getReleaseData)
}

RequestFields.prototype.initProductComponentLink = function(){
	this.initLink($("#Fld__xml_ProductComponent"), _url.getProductComponentData)
}

RequestFields.prototype.autoFillFields = function(){
	this.initReleaseLink();
	this.initProductComponentLink();
};
RequestFields.prototype.rememberFields = function(){
	//All input text fields have this class
	var self = this;

	function rememberTextFields(){
		function storeFieldTextValue(element){
			var fieldId = $(element).attr('id');
			var fieldValue = $(element).val();
			self.setFieldValue(fieldId, fieldValue)
		}

		var formField = ".form-control";
		$("#request").find(formField).each(function() {
			storeFieldTextValue(this)
		}).focusout(function() {
			storeFieldTextValue(this);
			self.handleRequiredFields("required");
		});
	}

	function rememberRadioFields(){
		$("input:radio").click(function(){
			var fieldId = $(this).attr('name');
			var fieldValue = $(this).val();
			self.setFieldValue(fieldId, fieldValue);
		})
			.each(function(){
				var fieldId = $(this).attr('name');
				var fieldValue = $(this).val();
				self.setFieldValue(fieldId, fieldValue);
			});
	}

	function rememberCheckboxFields(){
		$("input:checkbox").click(function(){
			var fieldId = $(this).attr('id');
			var fieldValue = ($(this).prop("checked") == true) ? _constants.ebYes:_constants.ebNo;
			self.setFieldValue(fieldId, fieldValue)
		});
	}

	rememberTextFields();
	rememberRadioFields();
	rememberCheckboxFields();
};
RequestFields.prototype.fillFields = function(){
	var formField = ".form-control";
	var fieldsObj = this.getFields()

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
		var fieldValue = fieldsObj[fieldId];
		$(this).prop("checked", (fieldValue == _constants.impactLayer.product));
	});
	this.fillImages();
};
RequestFields.prototype.clearFields = function(){
	this.setFields({});

	var formField = ".form-control";
	$("#request").find(formField).each(function() {
		var fieldId = $(this).attr('id');

		if(["Fld__xml_Type", "Fld__xml_Severity", "Fld__xml_Priority"].indexOf(fieldId) > -1){
			switch(fieldId){
				case "Fld__xml_Type":
					$(this).val(_constants.type.bug);
					break;
				case "Fld__xml_Severity":
					$(this).val(_constants.severity.minor);
					break;
				case "Fld__xml_Priority":
					$(this).val(_constants.priority.normal);
					break;
			};
		}
		else{
			$(this).val("");
		}
	});
	$(".requiredErrorHeader").remove();
	$(".requiredError").removeClass("requiredError");
	$("#productLayer").prop("checked", true);
	$("#Fld__xml_Regression").prop("checked", false);
	var regressionFieldParent = $("#Fld__xml_RegressionFrom").parent();
	if(!regressionFieldParent.hasClass("hide")){
		regressionFieldParent.addClass("hide");
	}


	_screenshotTool.clearScreenshots();
};
RequestFields.prototype.defaultFieldValues = function(){
	if(this.getFields() == {}){
		this.setFieldValue("Fld__xml_ImpactedLayer", _constants.impactLayer.product);
		this.setFieldValue("Fld__xml_Type", _constants.type.bug);
		this.setFieldValue("Fld__xml_Severity", _constants.severity.minor);
		this.setFieldValue("Fld__xml_Priority", _constants.priority.normal);
	}
};
RequestFields.prototype.handleRequiredFields = function(classAttr){
	var self = this;
	var err = false;
	$("#request").find("[data-required]").each(function(){
		var element = $(this);
		var fieldSets = element.data("required");
		var value = self.getFieldValue(element.attr("id"));
		if(value == "" || value == undefined){
			if(fieldSets == ""){
				err = true;
				if(!element.hasClass(classAttr)){
					element.addClass(classAttr);
				}
			}else{
				var tempErr = true;
				for(var fieldId in fieldSets){
					var triggerValue = fieldSets[fieldId];
					if(Array.isArray(triggerValue)){
						tempErr = tempErr && (triggerValue.indexOf(self.getFieldValue(fieldId)) > -1);
					}else{
						tempErr = tempErr && (self.getFieldValue(fieldId) == triggerValue)
					};
				};
				if(tempErr){
					err = true;
					if(!element.hasClass(classAttr)){
						element.addClass(classAttr);
					}
				}else{
					element.removeClass(classAttr);
				}
			}
		}else{
			element.removeClass(classAttr);
		}
	});
	return err;
};
RequestFields.prototype.validateFields = function(){
	var err = this.handleRequiredFields("requiredError");
	$(".panel").each(function(){
		var element = $(this);
		var errCount = element.find(".requiredError").length;
		var errHeaderCount = element.find(".requiredErrorHeader").length;
		if(errCount > 0){
			if(errHeaderCount == 0){
				$(element.find(".panel-title")[0]).append("<span class='glyphicon glyphicon-exclamation-sign requiredErrorHeader' aria-hidden='true'></span>");
			}
		}else{
			element.find(".requiredErrorHeader").remove();
		}
	});
	if(err){
		new _modal("danger", "Invalid Fields!", "There are some errors in the form, please fix them to submit the form again.").display();
	};
	return err
};
RequestFields.prototype.fillImages = function(){
	var objImages = JSON.parse(localStorage.getItem("Screenshots")) || {};
	//
	$.get("screenshotListItem.html", function(data){
		for(var fileName in objImages){
			if(objImages.hasOwnProperty(fileName)){
				var appendData = $($(data)[0]).attr("data-screenshot-name", fileName)[0];
				if(fileName.length > 30){
					appendData = $(appendData).append(fileName.slice(0, 30) + "...");
				}else{
					appendData = $(appendData).append(fileName);
				};
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

	$("#" + _constants.buttons.cancelRequest).click(function(){
		self.resetSections();
		self.clearFields();
		self.defaultFieldValues();
		self.transition.cancelRequest()
	});

	$("#" + _constants.buttons.createRequest).click(function(){
		if(!self.validateFields()){
			self.createRequest();
		}
	});

	$("#" + _constants.buttons.screenshot).click(this.takeScreenshot);
	$("#" + _constants.buttons.request).click(function(){
		if(localStorage.getItem("RequestCreationAllowed") == "false"){
			new _modal("danger", _constants.invalidSiteMsgTitle, _constants.invalidSiteMsg, _constants.ebMsgHTML).display();
		}else if(localStorage.getItem("LoggedOut") == "true"){
			new _modal("danger", _constants.invalidMsgTitle, "You are signed out of this site. Please log back in and try again").display();
		}else{
			self.transition.createRequest();
			self.storeBuildData();
			self.fieldSetHandler();
			self.handleRequiredFields("required");
		}
	});
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
	var self = this;
	function getSoftwareData(){
		return new Promise(function(resolve, reject){
			var fieldsObj = self.getFields();
			var returnObj = {};
			_url.getReleaseData(fieldsObj["Fld__xml_Release"]).then(function(response){
				returnObj["releases"] = JSON.parse(response);
				_url.getProductComponentData(fieldsObj["Fld__xml_ProductComponent"]).then(function(response){
					returnObj["product-components"] = JSON.parse(response);
					resolve(JSON.stringify(returnObj));
				}, function(error){
					console.log("failed!", error);
				});

			}, function(error){
				console.log("failed!", error);
			});
		});
	};

	getSoftwareData().then(function(response){
		var requestURL = _url.createRequestURL();
		var dataObj = JSON.parse(response);
		var releaseObj = dataObj["releases"];
		var prodCompObj = dataObj["product-components"];

		var fieldsObj = self.getFields();
		for(var fieldXML in fieldsObj){
			var fieldVal = fieldsObj[fieldXML];
			if(fieldVal != "" && fieldVal != undefined){
				if(fieldXML == "Fld__xml_ProductComponent"){
					requestURL = requestURL + "&" + fieldXML + "=" + encodeURIComponent(prodCompObj[fieldVal].path || "")
				}else if(fieldXML == "Fld__xml_Release"){
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
		self.downloadScreenshots();
		self.clearFields();
		self.resetSections();
		self.transition.cancelRequest();
		chrome.tabs.query({currentWindow: true,active: true},function(tabs){chrome.tabs.create({ url: requestURL, index: (tabs[0].index + 1), openerTabId: tabs[0].id });});
	}, function(error){
		console.log("failed!", error);
	});
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
	this.transition.states.showLoading();
	_url.getCurrentSiteBuilds(storeBuildDataHelper);
	this.transition.states.hideLoading();
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
