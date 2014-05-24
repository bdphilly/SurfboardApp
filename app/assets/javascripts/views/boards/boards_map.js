SurfboardApp.Views.BoardsMap = Backbone.View.extend({

  template: JST['boards/map'],

  initialize: function () {
    // this.render();
    // google.maps.event.addDomListener(window, 'load', initialize);
  },

  // renderMap: function () {
  //   var map = new google.maps.Map(this.el.getElementsByClassName("map-canvas")[0], this.model.attributes);
  //   debugger
  // },

  render: function () {
    // render the tempate before the map so it has a map canvas to sit in
    var renderedContent = this.template();
    this.$el.html(renderedContent); 
    // tricky! Google requires DOM node object, not JQuery! This way converts it
    var map = new google.maps.Map(this.el.getElementsByClassName("map-canvas")[0], this.model.attributes);
    return this;
  },

});
