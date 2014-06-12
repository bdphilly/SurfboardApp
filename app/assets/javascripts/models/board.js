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
    if (!attrs.model) {
        errors.push({name: 'length', message: 'Renters want to know how long it is!'});
    }
    if (!attrs.model) {
        errors.push({name: 'width', message: 'Narrow? Wide? Renters want to know this!'});
    }
    if (!attrs.model) {
        errors.push({name: 'description', message: "It's your baby...share a dang description!"});
    }
    if (!attrs.model) {
        errors.push({name: 'address', message: 'Where is someone going to pick it up?'});
    }
    if (!attrs.model) {
        errors.push({name: 'city', message: 'People want to search for a board in YOUR city! What is it?'});
    }
    if (!attrs.model) {
        errors.push({name: 'state', message: 'We only have a 1 in 50 chance of guessing your state. You know it!'});
    }
    if (!attrs.model) {
        errors.push({name: 'zipcode', message: 'Zip to the code. Please.'});
    }
    if (!attrs.model) {
        errors.push({name: 'price', message: 'How much moola do you want to get for your board?!'});
    }
    if (!attrs.model) {
        errors.push({name: 'type', message: 'Shortboard? Longboard? Pick one!'});
    }
    
    return errors.length > 0 ? errors : false;
	},


#  id                 :integer          not null, primary key
#  brand              :string(255)
#  model              :string(255)
#  length             :string(255)
#  width              :string(255)
#  thickness          :integer
#  description        :text
#  condition          :string(255)
#  owner_id           :integer          not null
#  created_at         :datetime
#  updated_at         :datetime
#  photo_file_name    :string(255)
#  photo_content_type :string(255)
#  photo_file_size    :integer
#  photo_updated_at   :datetime
#  address            :string(255)
#  city               :string(255)
#  state              :string(255)
#  zipcode            :string(255)
#  country            :string(255)
#  latitude           :float
#  longitude          :float
#  price              :integer
#  board_type         :string(255)

});
