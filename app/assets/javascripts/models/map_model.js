SurfboardApp.Models.mapModel = Backbone.Model.extend({
  defaults: {
    center: new google.maps.LatLng(-34.397, 150.644),
    zoom: 8,
    mapTypeId: google.maps.MapTypeId.ROADMAP
  }
});