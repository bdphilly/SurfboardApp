SurfboardApp.Views.BoardsMap = Backbone.View.extend({
  
  id: 'map',

  template: JST['boards/map'],

  initialize: function () {

    

    this.map = new google.maps.Map(document.getElementById("map-canvas"), this.model.attributes);
    // this.render();

    // var map = new google.maps.Map(document.getElementById("map-canvas"),
    //         mapOptions);



  },

  render: function () {
    // debugger
    // var renderedContent = this.template({
    //   // board: this.model
    // });

    this.$el.html(this.map); 

    // this.attachSubviews();

    return this;
  },

});
