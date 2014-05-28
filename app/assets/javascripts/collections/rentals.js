SurfboardApp.Collections.Rentals = Backbone.Collection.extend({
  model: SurfboardApp.Models.Rental,

  initialize: function (models, options) {
    
  },

  getOrFetch: function (id) {
    var rentals = this;
  
    var rental;
    if (rental = this.get(id)) {
      rental.fetch();
    } else {
      rental = new SurfboardApp.Models.Rental({ id: id });
      rental.fetch({
        success: function () { rentals.add(rental); }
      });
    }
  
    return rental;
  },  

});