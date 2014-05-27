SurfboardApp.Models.Board = Backbone.Model.extend({
	urlRoot: "/api/boards",
	
	photos: function () {
		if(!this._photos) {
			this._photos = new SurfboardApp.Collections.BoardPhotos([], {
				imageable_id: this.id,
				imageable_type: 'boards'
			})
		}
		return this._photos;
	},

	rentals: function () {
		if(!this._rentals) {
			this._rentals = new SurfboardApp.Collections.Rentals([], {
				board: this
			})
		}
		return this._rentals;
	},

  parse: function (resp) {
  	
    if(resp.images) {
      this.photos().set(resp.images, { parse: true });
      delete resp.images;
    }

    if (resp.rentals) {
    	this.rentals().set(resp.rentals, { parse: true });
    	delete resp.rentals;
    }
    
    return resp;
  },

});
