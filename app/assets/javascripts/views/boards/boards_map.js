SurfboardApp.Views.BoardsMap = Backbone.View.extend({
  
  id: 'map',

  template: JST['boards/map'],

  initialize: function () {

    // this.map = new google.maps.Map(document.getElementById("map-canvas"), this.model.attributes);
    // this.render();

    google.maps.event.addDomListener(window, "load", this.render);

  },

  render: function () {
    // debugger
    var renderedContent = this.template({
      // board: this.model
    });

    // google.maps.event.addDomListener(window, 'load', initialize);

    // this.map = new google.maps.Map(document.getElementById("map-canvas"), this.model.attributes);

    this.$el.html(renderedContent); 
    this.map = new google.maps.Map(document.getElementById("map-canvas"), this.model.attributes);
    return this;
  },

});
