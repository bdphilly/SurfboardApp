SurfboardApp.Models.User = Backbone.Model.extend({
	url: "/api/user",
	
	boards: function () {
		if(!this._boards) {
			this._boards = new SurfboardApp.Collections.Boards([], {
				board: this
			});
		}
		return this._boards;
	},

	avatar: function () {
		if(!this._avatar) {
			this._avatar = new SurfboardApp.Models.Avatar([], {
			});
		}
		return this._avatar;
	},

	rentals: function () {
		if(!this._rentals) {
			this._rentals = new SurfboardApp.Collections.Rentals([], {
			});
		}
		return this._rentals;
	},

	rentedInBoards: function () {
		if(!this._rentedInBoards) {
			this._rentedInBoards = new SurfboardApp.Collections.Boards([], {
			});
		}
		return this._rentedInBoards;

	},

	customerRentals: function () {
		if(!this._customerRentals) {
			this._customerRentals = new SurfboardApp.Collections.Rentals([], {
			});
		}
		return this._customerRentals;

	},

	rentedOutBoards: function () {
		if(!this._rentedOutBoards) {
			this._rentedOutBoards = new SurfboardApp.Collections.Boards([], {
			});
		}
		return this._rentedOutBoards;

	},

	ready: function () {
		return (this._avatar && 
            this._boards &&
            this._rentals &&
            this._customerRentals &&
            this._rentedInBoards &&
            this._rentedOutBoards
           );
	},

  parse: function (resp) {

    if(resp.avatar) {
      this.avatar().set(resp.avatar, { parse: true });
      delete resp.avatar;
    }

    if (resp.boards) {
    	this.boards().set(resp.boards, { parse: true });
    	delete resp.boards;
    }
    
    if (resp.rentals) {
    	this.rentals().set(resp.rentals, { parse: true });
    	delete resp.rentals;
    }

    if (resp.rented_in_boards) {
    	this.rentedInBoards().set(resp.rented_in_boards, { parse: true });
    	delete resp.rented_in_boards;
    }
    
    if (resp.customer_rentals) {
			this.customerRentals().set(resp.customer_rentals, { parse: true });
    	delete resp.customer_rentals;
    }

    if (resp.rented_out_boards) {
			this.rentedOutBoards().set(resp.rented_out_boards, { parse: true });
    	delete resp.rented_out_boards;
    }
    
    return resp;
  },

});