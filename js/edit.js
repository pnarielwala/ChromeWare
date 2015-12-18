$(document).ready(function(){

	var screenshotsString = localStorage.getItem("Screenshots");
	if(screenshotsString !== null){
		var screenshots = JSON.parse(localStorage.Screenshots);
		if(Object.keys(screenshots).length > 0){
			var editIndex = localStorage["editImageIndex"];
			var imageURL = screenshots[editIndex];
			console.log("imageURL");
			console.log(imageURL);
			$('#myCanvas').annotate({
				color: 'red',
				bootstrap: true,
				images: [imageURL]}
			);
		}
	}
});