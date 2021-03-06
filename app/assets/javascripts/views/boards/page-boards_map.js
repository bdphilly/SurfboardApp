SurfboardApp.Views.PageBoardsMap = Backbone.View.extend({

  template: JST['boards/map'],

  initialize: function () {
    // this.render();
    // google.maps.event.addDomListener(window, 'load', initialize);
    this.listenTo(this.collection, 'sync', this.render);
    this.listenTo(this.collection, 'sync', this.addPins);
  },

  renderMap: function () {
    // tricky! Google requires DOM node object, not JQuery! This way converts it
    this.map = new google.maps.Map(this.el.getElementsByClassName("map-canvas")[0], this.model.attributes);
  },

  addPins: function () {
    var marker;
    var map = this.map;
    this.collection.each(function(board){
      marker = new google.maps.Marker({ 
        position: new google.maps.LatLng(board.get('latitude'), board.get('longitude')),
        map: map
      });
    });
  },

  render: function () {
    // render the tempate before the map so it has a map canvas to fit in
    var renderedContent = this.template();
    this.$el.html(renderedContent); 
    
    this.renderMap();
    // var map = new google.maps.Map(this.el.getElementsByClassName("map-canvas")[0], this.model.attributes);
    return this;
  },

});