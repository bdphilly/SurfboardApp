SurfboardApp.Views.BoardsMap = Backbone.View.extend({

  template: JST['boards/index/map_index'],

  // tagName: "div",

  // className: "map-canvas-test",

  initialize: function (options) {
    // debugger
    this.parentView = options.parentView;
    // debugger
    // this.render();
    debugger
    this.renderMap();
    // var that = this;
    // setTimeout(function() {
      // that.renderMap();
    // }, 500);
    // google.maps.event.addDomListener(window, 'load', initialize);
    // this.listenTo(this.collection, 'sync', this.render);
    this.listenTo(this.collection, 'sync change', this.addPins);
    this.listenTo(this.model, 'sync change', this.renderMap);
  },

  handleMapChange: function () {
      var bounds = new google.maps.LatLngBounds();
      bounds = this.map.getBounds();
      var constraints = this.determineBounds(bounds);    
      console.log(constraints);

      SurfboardApp.Models.map.set({
        constraints: constraints,
        zoom: this.map.getZoom(),
        center: this.map.getCenter()
      });
      // debugger
      this.parentView.fetchResults(constraints);
  },

  reFetchConstraints: function () {
    // google.maps.event.addListener(this.map, 'dragend', this.handleMapChange.bind(this));
    // google.maps.event.addListener(this.map, 'zoom_changed', this.handleMapChange.bind(this));
    google.maps.event.addListener(this.map, 'idle', this.handleMapChange.bind(this));
  },

  addPins: function () {
    var board_info;
    var marker;
    var infowindow;
    var map = this.map;
    var html;

    this.collection.each(function(board){

      board_info = board.get('brand');
      infowindow = new google.maps.InfoWindow();  

      marker = new google.maps.Marker({ 
        position: new google.maps.LatLng(board.get('latitude'), board.get('longitude')),
        map: map,
        icon: 'https://s3-us-west-1.amazonaws.com/brahboards/surf-icon-green.png'
      });
      // html = "<b>" + board.get('brand') + "</b> <br/>" + board.get('model');
      var that = this;
      google.maps.event.addListener(marker, 'click', function() {
        infowindow.setContent("<b>" + board.get('brand') + "</b> <br/>" + board.get('model'));
        infowindow.open(map, this);
      });

    });
  },

  render: function () {
    // debugger
    // render the tempate before the map so it has a map canvas to fit in
    // var renderedContent = this.template();

    var that = this;

    // this.$el.html(renderedContent); 
    // _.defer(function () {
    //   that.renderMap();
    //   that.addPins();
    // });
    
  
    // setTimeout(function() {
    //     that.renderMap();
    // }, 500);

    // _.defer(this.renderMap()) ;

    // var map = new google.maps.Map(this.el.getElementsByClassName("map-canvas")[0], this.model.attributes);
    return this;
  },

  renderMap: function () {
    // tricky! Google requires DOM node object, not JQuery! This way converts it
    // this.map = new google.maps.Map(this.el. getElementsByClassName("map-canvas")[0], this.model.attributes);
    this.map = new google.maps.Map(document.getElementById("map-canvas"), this.model.attributes);
    this.reFetchConstraints();
    this.addPins();
  },


  determineBounds: function (bounds) {
    var constraints = {};
    constraints['ne-lat'] = bounds.getNorthEast().lat();
    constraints['ne-lng'] = bounds.getNorthEast().lng();
    constraints['sw-lat'] = bounds.getSouthWest().lat();
    constraints['sw-lng'] = bounds.getSouthWest().lng();
    return constraints;
  },

});