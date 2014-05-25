SurfboardApp.Views.BoardsMap = Backbone.View.extend({

  template: JST['boards/map'],

  initialize: function () {
    // this.render();
    // google.maps.event.addDomListener(window, 'load', initialize);
  },

  renderMap: function () {
    // tricky! Google requires DOM node object, not JQuery! This way converts it
    var map = new google.maps.Map(this.el.getElementsByClassName("map-canvas")[0], this.model.attributes);
    // return map;

    // var locations = [
    //   ['Bondi Beach', -33.890542, 151.274856, 4],
    //   ['Coogee Beach', -33.923036, 151.259052, 5],
    //   ['Cronulla Beach', -34.028249, 151.157507, 3],
    //   ['Manly Beach', -33.80010128657071, 151.28747820854187, 2],
    //   ['Maroubra Beach', -33.950198, 151.259302, 1]
    // ];

    // var marker, i;

    // for (var i = 0; i < locations.length; i++) {  
    //   marker = new google.maps.Marker({
    //     position: new google.maps.LatLng(locations[i][1], locations[i][2]),
    //     map: map
    //   });
    // };

    def lat_lng(address)
  url = Addressable::URI.new(
    :scheme => "https",
    :host => "maps.googleapis.com",
    :path => "/maps/api/geocode/json",
    :query_values => {
      :address => address,
      :sensor => "false"
    }).to_s

  response = JSON.parse(RestClient.get(url))
  top_result = response["results"].first
  top_result["geometry"]["location"].values_at("lat", "lng")
end


  },

  latLngAddress: function () {
    var url = Addressable::URI.new(
      
      )
  },

  render: function () {
    // render the tempate before the map so it has a map canvas to fit in
    var renderedContent = this.template();
    this.$el.html(renderedContent); 
    
    this.renderMap();
    // var map = new google.maps.Map(this.el.getElementsByClassName("map-canvas")[0], this.model.attributes);
    return this;
  },

});
