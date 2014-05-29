SurfboardApp.Views.BoardsMap = Backbone.View.extend({

  template: JST['boards/index/map_index'],

  // tagName: "div",

  // className: "map-canvas",

  initialize: function () {
    // this.render();
    // google.maps.event.addDomListener(window, 'load', initialize);
    this.listenTo(this.collection, 'sync', this.render);
    this.listenTo(this.collection, 'sync', this.addPins);
  },

  renderMap: function () {
    // tricky! Google requires DOM node object, not JQuery! This way converts it
    // this.map = new google.maps.Map(this.el. getElementsByClassName("map-canvas")[0], this.model.attributes);
    this.map = new google.maps.Map(document.getElementById("map-canvas"), this.model.attributes);
    // google.maps.event.addDomListener("map-canvas", 'click', this.showAlert);
    this.addEventListeners();
  },

  addEventListeners: function () {
    google.maps.event.addListener(this.map, 'idle', function () {
      // alert('changed!');
      // var bounds = new google.maps.LatLngBounds();
      // bounds = map.getBounds();
      // var constraints = that.determineBounds(bounds);    
      // SurfboardApp.Collections.boards.constraints = constraints;
      console.log('idle');
    });

    // var infowindow = new google.maps.InfoWindow({
    //   content: contentString
    // });

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



});