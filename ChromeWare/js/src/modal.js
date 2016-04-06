var _constants = new (require('./constants'));

var Modal = function(type, title, message, flag){
	this.type = type;
	this.title = title;
	this.message = message;
	this.flag = flag;
	this.modalData = $("#myModal");

	this.modalData.on('hidden.bs.modal', function (e) {
		$(this).find(".modal-body").empty();
	})
};

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
};
Modal.prototype.setTitle = function(){
	this.modalData.find(".modal-title").text(this.title)
};
Modal.prototype.setMessage = function(){
	if(this.flag == _constants.ebMsgHTML){
		this.modalData.find(".modal-body").append(this.message)
	}else{
		this.modalData.find(".modal-body").text(this.message)
	}
};
Modal.prototype.display = function(){
	this.setType();
	this.setTitle();
	this.setMessage();

	this.modalData.modal('show');
};

module.exports = Modal;
