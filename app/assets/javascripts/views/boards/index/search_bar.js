SurfboardApp.Views.SearchBar = Backbone.View.extend({
  template: JST['boards/index/search_bar'],

  initialize: function () {
    // this.listenTo(this.collection, 'sync change', this.render);
  },

  events: {

  },

  render: function () {
    var renderedContent = this.template({
      board: this.model
    });

    this.$el.html(renderedContent);

    this.$el.find('#datepicker').datepicker({
      startDate: "today",
      autoclose: true,
      todayHighlight: true
    });

    this.$el.find( "#slider" ).slider({
      value: 50,
      range: 'max',
      min: 0,
      max: 50,
      slide: function( event, ui ) {
        $( "#filters_max_price" ).val( ui.value );
        $( "#amount" ).text( "$" + ui.value );
      }
    });

    this.addGoogleAutocomplete();

    return this;
  },

  addGoogleAutocomplete: function () {
    var input = this.$el.find('#index-location-picker')[0];
    var options = {
      types: ['(cities)'],
      componentRestrictions: {country: "us"}
    };
    var autocomplete = new google.maps.places.Autocomplete(input, options); 
  },

});
