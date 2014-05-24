SurfboardApp.Collections.BoardPhotos = Backbone.Collection.extend({
  model: SurfboardApp.Models.BoardPhoto,

  url: function () {
    return 'api/' + this.imageable_type + '/' + this.imageable_id + '/photos';
  },

  initialize: function (model, options) {
    this.imageable_type = options.imageable_type;
    this.imageable_id = options.imageable_id;
  },

  getOrFetch: function (id) {
    var photos = this;
  
    var photo;
    if (photo = this.get(id)) {
      photo.fetch();
    } else {
      photo = new SurfboardApp.Models.BoardPhoto({ id: id });
      photo.fetch({
        success: function () { photos.add(photo); }
      });
    }
  
    return photo;
  },  

});