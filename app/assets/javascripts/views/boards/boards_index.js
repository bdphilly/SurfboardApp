SurfboardApp.Views.BoardsIndex = Backbone.CompositeView.extend({
  template: JST['boards/index'],

  initialize: function () {
    // debugger
    globalView = this;

    // 1. It should render any data it has (does not do this)
    // 2. It should re-render when any data changes.
    // 3. addAllBoards, addMap should be safe to call multiple times.

    // Start to address 1.
    // _.defer(this.addAllBoards());
    this.addAllBoards();
    // _.defer(this.addMap());
    // this.addMap();
    // Wait, not rendered yet...
    // _.defer(this.addMap);
    // this.addMap();

    var that = this;
    setTimeout(function() {
      that.addMap();
    }, 0);
    this.listenTo(this.collection, 'sync', this.addAllBoards);
  },

  events: {
    "submit form" : "runSearch",
  },

  render: function () {
    var renderedContent = this.template();
    this.$el.html(renderedContent);
    this.addSearchBar();

    this.attachSubviews();
    return this;
  },

  addBoard: function (board) {
    var boardResult = new SurfboardApp.Views.BoardResult({
      model: board
    });
    this.addSubview('.board-results', boardResult);
  },

  addAllBoards: function () {
    this.$el.find('.board-results').empty();
    this.collection.each(this.addBoard.bind(this));
  },

  addSearchBar: function () {
    var searchBar = new SurfboardApp.Views.SearchBar({ 
      boards: this.collection 
    });

    this.addSubview('.search-bar', searchBar);
  },

  addMap: function () {
    var map = SurfboardApp.Models.map;
    var that = this;
    var mapResults = new SurfboardApp.Views.BoardsMap({
      model: map,
      collection: SurfboardApp.Collections.boards,
      parentView: this
    });
    
    this.addSubview('.map-view', mapResults);
  },

  runSearch: function (event) {
    event.preventDefault();
    var attrs = $(event.currentTarget).serializeJSON()['filters'];
    console.log(attrs);
    var that = this;

    if (attrs.location) {
      this.runBoundsSearch(attrs.location, function () {
        attrs = $.extend(attrs, SurfboardApp.Models.map.attributes.constraints);
        that.fetchResults(attrs);
      });
    } else {
      attrs = $.extend(attrs, SurfboardApp.Models.map.attributes.constraints);
      that.fetchResults(attrs);
    }
  },

  runBoundsSearch: function (locationAttrs, callback) {
    var map = SurfboardApp.Models.map;
    var that = this;

    this.geocodeAddress(locationAttrs, function (coordinates) {
      console.log(coordinates);
      SurfboardApp.Models.map.set({
        center: new google.maps.LatLng(coordinates.latitude, coordinates.longitude),
      });
      callback();
    });
  },

  fetchResults: function (attrs) {
    var that = this;
    this.collection.fetch({
      data: attrs,
      success: function (response) {
        that.$el.find('.board-results').empty();
      },
      error: function (response) {
        alert('error!');
      }
    });
  },

  geocodeAddress: function (address, callback) {
    var geocoder = new google.maps.Geocoder();
    // debugger
    var coordinates = {};
    geocoder.geocode({'address' : address}, function(results, status){
      if (status == google.maps.GeocoderStatus.OK) {
        coordinates['latitude'] = results[0].geometry.location.lat();
        coordinates['longitude'] = results[0].geometry.location.lng();
        callback(coordinates); 
      } else {
          result = "Unable to find address: " + status;
      }       
    });
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