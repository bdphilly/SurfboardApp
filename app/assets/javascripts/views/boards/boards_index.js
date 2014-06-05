SurfboardApp.Views.BoardsIndex = Backbone.CompositeView.extend({
  template: JST['boards/index'],

  initialize: function () {
    debugger
    globalView = this;

    // 1. It should render any data it has (does not do this)
    // 2. It should re-render when any data changes.
    // 3. addAllBoards, addMap should be safe to call multiple times.

    // Start to address 1.
    this.addAllBoards();
    // Wait, not rendered yet...
    _.defer(this.addMap);
    // this.addMap();

    // this.listenTo(this.collection, 'sync', this.render);s
    this.listenTo(this.collection, 'sync', this.addAllBoards);
    // this.listenTo(this.collection, 'sync', this.addSearchBar);
    this.listenTo(this.collection, 'sync', this.addMap);
    // this.listenTo(this.collection, 'add', this.render);

    this.listenTo(this.collection, 'change', this.runSearch);
  },

  events: {
    "submit form" : "runSearch",
  },

  render: function () {
    var renderedContent = this.template();

    this.$el.html(renderedContent);

    this.addSearchBar();
    // this.addMap();

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
    debugger
    this.collection.each(this.addBoard.bind(this));

    // this.searchResults.each(this.addBoard.bind(this));
  },

  addSearchBar: function () {
    var searchBar = new SurfboardApp.Views.SearchBar({ 
      boards: this.collection 
    });

    this.addSubview('.search-bar', searchBar);
  },

  addMap: function () {
    debugger
    // if (SurfboardApp.Models.map.coordinates) {
    //   var coords = SurfboardApp.Collections.boards.coordinates;
    //   SurfboardApp.Models.map.set({
    //     center: new google.maps.LatLng(coords.latitude, coords.longitude)
    //   });
    // } else {
    //   map = SurfboardApp.Models.map;
    // }
    var map = SurfboardApp.Models.map;

    var mapResults = new SurfboardApp.Views.BoardsMap({
      model: map,
      collection: SurfboardApp.Collections.boards,
      parentView: this
    });

    var that = this;
  //   window.setTimeout(function () {
  //   google.maps.event.addListener(map, 'center_changed', function () {
  //     alert('changed!');
  //     var bounds = new google.maps.LatLngBounds();
  //     bounds = map.getBounds();
  //     var constraints = that.determineBounds(bounds);    
  //     SurfboardApp.Collections.boards.constraints = constraints;
  //   });

  // }, 1000);

    this.addSubview('.map-view', mapResults)
    
    // google.maps.event.addDomListener(".map-canvas", 'click', this.showAlert);
  },

  scrollMap: function () {
    // debugger
    var length = $('.map-results').height() - $('.map-view').height() + $('.map-results').offset().top;

    $(window).scroll(function(){
      var scroll = $(this).scrollTop();
      var height = $('.map-view').height() + 'px';

      if (scroll < $('.map-results').offset().top) {

          $('.map-view').css({
              'position': 'absolute',
              'top': '0'
          });

      } else if (scroll > length) {

          $('.map-view').css({
              'position': 'absolute',
              'bottom': '0',
              'top': 'auto'
          });

      } else {

          $('.map-view').css({
              'position': 'fixed',
              'top': '0',
              'height': height
          });
      }
    });
  },

  runSearch: function (event) {
    debugger
    event.preventDefault();
    var attrs = $(event.currentTarget).serializeJSON()['filters'];
    console.log(attrs);

    var that = this;

    if (attrs.location) {
      // var locationAttrs = this.geocodeAddress(attrs.location);
      // debugger
      this.runBoundsSearch(attrs.location, function () {
        attrs = $.extend(attrs, SurfboardApp.Models.map.attributes.constraints);
        that.fetchResults(attrs);
      });
    } else {
      that.fetchResults(attrs);
    }
    

    // if (SurfboardApp.Models.map.attributes.constraints) {
      // attrs = $.extend(attrs, SurfboardApp.Models.map.attributes.constraints);
    // }


    // this.fetchResults(attrs);

    // this.searchResults = new SurfboardApp.Collections.BoardSearchResults();
    
    // var that = this;

    // this.searchResults.fetch({
    //   data: attrs,
    //   success: function (response) {
    //     // you can pass additional options to the event you trigger here as well
    //     console.log(that.searchResults);
    //     that.renderSearch(that.searchResults);
    //   },
    //   error: function (response) {
    //     // you can pass additional options to the event you trigger here as well
    //     alert('error!');
    //   }

    // });
    // console.log(that.searchResults);
  },

  runBoundsSearch: function (locationAttrs, callback) {
    var map = SurfboardApp.Models.map;
    var that = this;
    this.geocodeAddress(locationAttrs, function (coordinates) {
      
      console.log(coordinates);
      // SurfboardApp.Models.map.set({
      //   coordinates: coordinates
      // )};

      
      var mapOptions = {
        center: new google.maps.LatLng(coordinates.latitude, coordinates.longitude),
        zoom: SurfboardApp.Models.map.defaults.zoom
      };
      
      var newMap = new google.maps.Map(document.getElementById("map-canvas"), mapOptions);
      
      google.maps.event.addListener(newMap, 'idle', function () {
        var bounds = new google.maps.LatLngBounds();
        bounds = newMap.getBounds();
        var constraints = that.determineBounds(bounds);
        console.log(constraints);
        SurfboardApp.Models.map.set({
          constraints: constraints,
          center: newMap.center,
          zoom: newMap.zoom
        });
        callback(SurfboardApp.Models.map);
        // SurfboardApp.Collections.boards.fetch({
        //   data: constraints
        // });
        // debugger
        // SurfboardApp.myRouter.navigate('#user', {trigger: true});
      });
      // that.addMap();

    });
  },

  fetchResults: function (attrs) {
    var that = this;
    this.collection.fetch({
      data: attrs,
      success: function (response) {
        // you can pass additional options to the event you trigger here as well
        // console.log(that.searchResults);
        that.renderSearch(that.collection);
      },
      error: function (response) {
        // you can pass additional options to the event you trigger here as well
        alert('error!');
      }

    });
    // console.log(that.searchResults);

  },

  renderSearch: function () {
    // console.log(this.searchResults);
    // var resultsView = new SurfboardApp.Views.BoardsIndex({
    //   collection: this.searchResults
    // })

    this.$el.find('.board-results').empty();
    // $('.board-results').empty();

    // this.addAllBoards();
  },

  geocodeAddress: function (address, callback) {
    var geocoder = new google.maps.Geocoder();
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