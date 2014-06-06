SurfboardApp.Models.Rental = Backbone.Model.extend({

	// urlRoot: 'api/board_rentals',
	urlRoot: function () {
		return 'api/boards/' + this.attributes.board_id + "/board_rentals";
	},

	approve: function (callback) {
		$.ajax({
			url: "api/board_rentals/" + this.id + "/approve",
			type: 'POST',
			success: callback,
		})
		console.log('approving:' + this.id)
		
		this.set('status', 'Approved');
	},

	deny: function (callback) {
		$.ajax({
			url: "api/board_rentals/" + this.id + "/deny",
			type: 'POST',
			success: callback,
	
		})
		console.log('denying:' + this.id)
		
		this.set('status', 'Denied');
	},
	
});
