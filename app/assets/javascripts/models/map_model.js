SurfboardApp.Models.mapModel = Backbone.Model.extend({
  // Centered on SF
  defaults: {
    // center: new google.maps.LatLng(37.7533, -122.4267),
    zoom: 11,
    mapTypeId: google.maps.MapTypeId.ROADMAP
  }

  // defaults: {
  //     zoom: 10,
  //     center: new google.maps.LatLng(-33.92, 151.25),
  //     mapTypeId: google.maps.MapTypeId.ROADMAP
  //   }

});

