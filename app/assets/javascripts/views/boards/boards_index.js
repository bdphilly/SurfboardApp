SurfboardApp.Views.BoardsIndex = Backbone.CompositeView.extend({
  template: JST['boards/index'],

  initialize: function () {
    globalView = this;


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
    event.preventDefault();
    var attrs = $(event.currentTarget).serializeJSON()['filters'];
    console.log(attrs);

    if (attrs.location) {
      this.geocodeAddress(attrs.location);
    }
    

    // if (SurfboardApp.Models.map.attributes.constraints) {
      attrs = $.extend(attrs, SurfboardApp.Models.map.attributes.constraints);
    // }


    this.fetchResults(attrs);

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

  geocodeAddress: function (address) {
    var geocoder = new google.maps.Geocoder();
    geocoder.geocode({'address' : address}, function(results, status){
      console.log( "latitude : " + results[0].geometry.location.lat() );
      console.log( "longitude : " + results[0].geometry.location.lng() );
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