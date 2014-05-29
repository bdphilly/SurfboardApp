SurfboardApp.Views.HomePage = Backbone.CompositeView.extend({
  template: JST['home'],

  initialize: function () {
    var globalView = this;
  },

  events: {
    "submit form" : "runSearch",
  },

  render: function () {
    var renderedContent = this.template();
    this.$el.html(renderedContent); 

    this.addGoogleAutocomplete();

    return this;
  },

  addGoogleAutocomplete: function () {
    var input = this.$el.find('#home-location-picker')[0];
    var options = {
      types: ['(cities)'],
      componentRestrictions: {country: "us"}
    };
    var autocomplete = new google.maps.places.Autocomplete(input, options); 
  },

  runSearch: function (event) {
    event.preventDefault();
    var attrs = $(event.currentTarget).serializeJSON()['filters'];
    
    var that = this;

    this.geocodeAddress(attrs.location, function (coordinates) {
      
      console.log(coordinates);
      
      //make a new map wih coordinates
      var mapOptions = {
        zoom: 10,
        center: new google.maps.LatLng(coordinates.latitude, coordinates.longitude),
        mapTypeId: google.maps.MapTypeId.ROADMAP
      };
      
      var hiddenMap = new google.maps.Map(document.getElementById("hidden-map-canvas"), mapOptions);
      
      google.maps.event.addListener(hiddenMap, 'idle', function () {
        var bounds = new google.maps.LatLngBounds();
        bounds = hiddenMap.getBounds();
        var constraints = that.determineBounds(bounds);        
        SurfboardApp.Collections.boards.constraints = constraints;
      
        SurfboardApp.Collections.boards.coordinates = coordinates;

        SurfboardApp.Collections.boards.fetch({
          
          data:{ 
            latitude: coordinates.latitude,
            longitude: coordinates.longitude
          },
        });
        
        SurfboardApp.myRouter.navigate('#boards', {trigger: true});

      });
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

});

