SurfboardApp.Views.NewRenterModal = Backbone.CompositeView.extend({
  template: JST['boards/show/new_renter_modal'],

  initialize: function (options) {
    this.board = options.board; 
  },

  events: {

  },

  render: function () {
    var renderedContent = this.template({
      board: this.board,
      rental: this.model
    });
    
    this.$el.html(renderedContent);

    return this;
  },

});