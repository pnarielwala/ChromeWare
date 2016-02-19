
var Modal = function(type, title, message){
	this.type = type;
	this.title = title;
	this.message = message;
	this.modalData = $("#myModal");
}

Modal.prototype.setType = function(){
	switch(this.type){
		case "warning":
			this.modalData.find(".modal-content").addClass("warning")
			break;
		case "danger":
			this.modalData.find(".modal-content").addClass("danger")
			break;
		case "success":
			this.modalData.find(".modal-content").addClass("success")
			break;
		default:
			break;
	}
}

Modal.prototype.setTitle = function(){
	this.modalData.find(".modal-title").text(this.title)
};

Modal.prototype.setMessage = function(){
	this.modalData.find(".modal-body").text(this.message)
};

Modal.prototype.display = function(){
	this.setType();
	this.setTitle();
	this.setMessage();

	this.modalData.modal('show');
};

Modal.prototype.myTest = function(){
	var attrs = {"id" : 'myModal'};
	//this.label = $('<label>', attrs).text("Hello World");
	this.label = $('<label>', attrs).text("Hello World");
	return this.label;
};

module.exports = Modal;
