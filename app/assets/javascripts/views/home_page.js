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

  getLatLngt: function (attrs){
    //code here

    return latlng // [0, 0]
  },

  runSearch: function (event) {
    event.preventDefault();
    var attrs = $(event.currentTarget).serializeJSON()['filters'];
    // console.log(attrs);
    // SurfboardApp.Collections.boards.fetch();
    
    var latlgn = this.getLatLngt(attrs);

    //we'll have LAT/LNG params
    SurfboardApp.Collections.boards.fetch({
      data:{ latitude: lat

      }});
    SurfboardApp.myRouter.navigate('#/boards', {trigger: true});



  },

});