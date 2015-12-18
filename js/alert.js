

var Alert = (function(type, message, dismissdelay){

	dismissdelay = dismissdelay || 1000;
	$.get("alert.html", function(data){
		var appendData = $($(data)[0]).addClass(type)[0];
		// appendData = $(appendData).append(filename);
		console.log($($(appendData).find("#alerttitle")[0]).append(message)[0]);
		console.log(appendData);
		$(".alertholder").append(appendData);
		setTimeout(function(){
			$($(".alertholder").children()[0]).addClass("animated");
			$($(".alertholder").children()[0]).addClass("fadeOut");
			setTimeout(function(){
				$(".alertholder").children()[0].remove();
			}, 500);
		}, dismissdelay);
	});


	// var type = type || 'alert-danger';
	// $('#alert_placeholder').html('<div class="alert '+
									// type +
									// ' fade in" style="position:absolute; margin: 0 auto;' +
									// ' z-index: 10; right: 0; left: 0; text-align: center; width:50%;">' +
									// '<a class="close" data-dismiss="alert">x</a><span>' + message + '</span></div>')

});