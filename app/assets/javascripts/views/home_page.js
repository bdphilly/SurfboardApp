SurfboardApp.Views.HomePage = Backbone.CompositeView.extend({
  template: JST['home'],

  initialize: function () {

    // var autocomplete = new google.maps.places.Autocomplete(
    //   /** @type {HTMLInputElement} */(document.getElementById('autocomplete')),
    //   {
    //     types: ['(cities)'],
    //     // componentRestrictions: countryRestrict
    //   });


    // var autocomplete;
    //         function initialize() {
    //           autocomplete = new google.maps.places.Autocomplete(
    //               /** @type {HTMLInputElement} */(document.getElementById('autocomplete')),
    //               { types: ['geocode'] });
    //           google.maps.event.addListener(autocomplete, 'place_changed', function() {
    //           });
    //         }





  },

  events: {
    "submit form" : "runSearch",
  },

  render: function () {
    var renderedContent = this.template();
    this.$el.html(renderedContent); 

    var map = new google.maps.Map(document.getElementById('temp-map'));

    var input = /** @type {HTMLInputElement} */(
    this.$el.find('#location-picker')[0]);
    debugger

    var autocomplete = new google.maps.places.Autocomplete(input); 

    return this;
  },

  runSearch: function (event) {
    event.preventDefault();
    var attrs = $(event.currentTarget).serializeJSON()['filters'];
    console.log(attrs);
  }

});


// var attrs = $(event.currentTarget).serializeJSON()['filters'];
//     console.log(attrs);
//     //create new collection of BoardSearchResults...
//     this.searchResults = new SurfboardApp.Collections.BoardSearchResults();
    
//     var that = this;

//     this.searchResults.fetch({
//       data: attrs,
//       success: function (response) {
//         // you can pass additional options to the event you trigger here as well
//         console.log(that.searchResults);
//         alert('great success!');
//         that.renderSearch(that.searchResults);
//       },
//       error: function (response) {
//         // you can pass additional options to the event you trigger here as well
//         alert('error!');
//       }

//     });
//     console.log(that.searchResults);
//   },