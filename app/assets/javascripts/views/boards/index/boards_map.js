SurfboardApp.Views.BoardsMap = Backbone.View.extend({

  template: JST['boards/index/map_index'],

  // tagName: "div",

  // className: "map-canvas",

  initialize: function (options) {
    
    this.parentView = options.parentView;

    this.render();
    // google.maps.event.addDomListener(window, 'load', initialize);
    this.listenTo(this.collection, 'sync', this.render);
    this.listenTo(this.collection, 'sync', this.addPins);
    // this.listenTo(this.model, 'change', this.reFetchConstraints);
    this.listenTo(this.model, 'sync', this.render);
  },

  renderMap: function () {
    // tricky! Google requires DOM node object, not JQuery! This way converts it
    // this.map = new google.maps.Map(this.el. getElementsByClassName("map-canvas")[0], this.model.attributes);
    this.map = new google.maps.Map(document.getElementById("map-canvas"), this.model.attributes);
    // google.maps.event.addDomListener("map-canvas", 'click', this.showAlert);
    this.reFetchConstraints();
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
      this.parentView.fetchResults(constraints);
      // SurfboardApp.Collections.boards.constraints = constraints;
      
      // SurfboardApp.Collections.boards.coordinates = {
      //   latitude: that.map.getCenter().lat(),
      //   longitude: that.map.getCenter().lng(),
      // }
      // console.log(SurfboardApp.Collections.boards.constraints);
  },

  reFetchConstraints: function () {
    var that = this;
    // google.maps.event.addListener(this.map, 'dragend', function () {
      
    // });
    google.maps.event.addListener(this.map, 'dragend', this.handleMapChange.bind(this));
    google.maps.event.addListener(this.map, 'zoom_changed', this.handleMapChange.bind(this));

  },

  addInfoWindow: function () {
    var infowindow = new google.maps.InfoWindow({
      content: "Hello World!"
    });

  },

  showAlert: function() {
    alert('DIV clicked');
  },

  addPins: function () {

    var board_info;
    var marker;
    var infowindow;
    var map = this.map;
    var html;

    this.collection.each(function(board){

      board_info = board.get('brand');

      infowindow = new google.maps.InfoWindow({
        
      });  

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
    // render the tempate before the map so it has a map canvas to fit in
    var renderedContent = this.template();
    // this.setElement(this.template(this.model.toJSON()));
    // this.$el = $(template(".map-canvas"))
    this.$el.html(renderedContent); 
    this.renderMap();
    this.addPins();
    // var map = new google.maps.Map(this.el.getElementsByClassName("map-canvas")[0], this.model.attributes);
    return this;
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