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

    var input = this.$el.find('#location-picker')[0];

    var options = {
      types: ['(cities)'],
      componentRestrictions: {country: "us"}
    };

    var autocomplete = new google.maps.places.Autocomplete(input, options); 

    return this;
  },

  runSearch: function (event) {
    event.preventDefault();
    var attrs = $(event.currentTarget).serializeJSON()['filters'];
    // console.log(attrs);
    // SurfboardApp.Collections.boards.fetch();
    SurfboardApp.myRouter.navigate('#/boards', {trigger: true});
  }

});