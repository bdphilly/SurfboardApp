SurfboardApp.Models.User = Backbone.Model.extend({
	url: "/api/user",
	
	boards: function () {
		if(!this._boards) {
			this._boards = new SurfboardApp.Collections.Boards([], {
				board: this
			})
		}
		return this._boards;
	},

	avatar: function () {
		if(!this._avatar) {
			this._avatar = new SurfboardApp.Models.Avatar([], {
				
			})
		}
		return this._avatar;
	},

	rentals: function () {
		if(!this._rentals) {
			this._rentals = new SurfboardApp.Collections.Rentals([], {
				rental: this
			})
		}
		return this._rentals;
	},

  parse: function (resp) {
  	
  	// debugger

    if(resp.avatar) {
      this.avatar().set(resp.avatar, { parse: true });
      delete resp.avatar;
    }

    if (resp.boards) {
    	this.boards().set(resp.boards, { parse: true });
    	delete resp.boards;
    }
    
    if (resp.rentals) {
    	this.rentals().set(resp.rental, { parse: true });
    	delete resp.rental;
    }
    
    
    return resp;
  },

});