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
        errors.push({name: 'brand', message: "C'mon brah! You need to fill out the brand field!"});
    }
    if (!attrs.model) {
        errors.push({name: 'model', message: 'Your board has a model name, right?!'});
    }
    if (!attrs.length) {
        errors.push({name: 'length', message: 'Renters want to know how long it is!'});
    }
    if (!attrs.width) {
        errors.push({name: 'width', message: 'Narrow? Wide? Renters want to know this!'});
    }
    if (!attrs.description) {
        errors.push({name: 'description', message: "It's your baby...share a dang description!"});
    }
    if (!attrs.address) {
        errors.push({name: 'address', message: 'Where is someone going to pick it up?'});
    }
    if (!attrs.city) {
        errors.push({name: 'city', message: 'People want to search for a board in YOUR city! What is it?'});
    }
    if (!attrs.state) {
        errors.push({name: 'state', message: 'We only have a 1 in 50 chance of guessing your state. You know it!'});
    }
    if (!attrs.zipcode) {
        errors.push({name: 'zipcode', message: 'Zip to the code. Please.'});
    }
    if (!attrs.price) {
        errors.push({name: 'price', message: 'How much moola do you want to get for your board?!'});
    }
    if (!attrs.type) {
        errors.push({name: 'type', message: 'Shortboard? Longboard? Pick one!'});
    }
    
    return errors.length > 0 ? errors : false;
	},

});
