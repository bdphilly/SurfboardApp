SurfboardApp.Views.HomePage = Backbone.CompositeView.extend({
  template: JST['home'],

  initialize: function () {

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
    this.geocodeAddress(attrs.location, function (coordinates) {
      alert('hello');
      console.log(coordinates);
      SurfboardApp.Collections.boards.fetch({
        
        data:{ latitude: lat

        }});
      SurfboardApp.myRouter.navigate('#/boards', {trigger: true});
    });
  },

  geocodeAddress: function (address, callback) {
    var geocoder = new google.maps.Geocoder();
    var result = {};
    geocoder.geocode({'address' : address}, function(results, status){

       if (status == google.maps.GeocoderStatus.OK) {
         result['lat'] = results[0].geometry.location.lat();
         result['lng'] = results[0].geometry.location.lng();
         callback(result); 
       } else {
           result = "Unable to find address: " + status;
       }
       
    });
  },


  // geocoder.geocode({'address' : address}, function(results, status){
  //       console.log( "latitude : " + results[0].geometry.location.lat() );
  //       console.log( "longitude : " + results[0].geometry.location.lng() );
  //     });


});

