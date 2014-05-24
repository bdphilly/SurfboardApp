SurfboardApp.Models.Board = Backbone.Model.extend({
	urlRoot: "/api/boards",
	
	photos: function () {
		if(!this._photos) {
			this._photos = new SurfboardApp.Collections.BoardPhotos([], {
				imageable_id: this.id,
				imageable_type: 'boards'
			})
		}
		return this._photos
	},

  parse: function (resp) {
    if(resp.images) {
      this.photos().set(resp.images, { parse: true });
      delete resp.images;
    }
    return resp;
  },

});
