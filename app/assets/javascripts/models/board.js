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

	ownerAvatar: function () {
		if(!this._avatar) {
			this._avatar = new SurfboardApp.Models.Avatar([], {
			});
		}
		return this._avatar;
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

    if(resp.owner_avatar) {
      this.ownerAvatar().set(resp.owner_avatar, { parse: true });
      delete resp.owner_avatar;
    }
    
    return resp;
  },

  validate: function (attrs) {
    var errors = [];

    if (!attrs.brand) {
        errors.push({name: 'brand', message: 'Please fill brand field.'});
    }
    if (!attrs.model) {
        errors.push({name: 'model', message: 'Please fill model field.'});
    }

    return errors.length > 0 ? errors : false;
	},

});
