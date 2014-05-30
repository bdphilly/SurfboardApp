SurfboardApp.Models.Rental = Backbone.Model.extend({

	urlRoot: 'api/board_rentals',

	approve: function (callback) {
		$.ajax({
			url: this.url() + "/approve",
			type: 'POST',
			success: callback,
		})
		console.log('approving:' + this.id)
		
		this.set('status', 'Approved');
	},

	deny: function (callback) {
		$.ajax({
			url: this.url() + "/deny",
			type: 'POST',
			success: callback,
	
		})

		this.set('status', 'Denied');

	},
	
});
